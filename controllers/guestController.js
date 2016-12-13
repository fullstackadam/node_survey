import shuffle from 'shuffle-array';
import models from '../models';
import db from '../config/db';
import parser from '../config/parser';

const { question, answer } = models;

export default (app) => {
  app.get('/', (req, res) => {
    // find unanswered questions

    const sql = 'select *,questions.id from questions ' +
      'left join answers ' +
      'on questions.id = answers.question_id ' +
      'where question_id IS NULL';

    db.query(sql)
      .then((questions) => {
        const availableQuestions = [];

        // put question ids into array
        questions[0].forEach(questionItem => availableQuestions.push(questionItem.id));

        // put question id's into array
        if (availableQuestions.length === 0) {
          throw new Error('Out of questions');
        }

        // shuffle array
        shuffle(availableQuestions);

        const id = availableQuestions.pop();

        return question.findById(id);
      })
      .then((currentQuestion) => {
        console.log(currentQuestion);
        return currentQuestion.getChoices()
          .then(choices => ({ question: currentQuestion, choices }));
      })
      .then((data) => {
        const title = 'Random Question';

        res.render('guest/index', {
          title,
          question: data.question,
          choices: data.choices,
        });
      })
      .catch(() => {
        const title = 'Out of Questions';

        res.render('guest/outOfQuestions', {
          title,
        });
      });
  });

  app.post('/answer_question', (req, res) => {
    const questionId = req.param('question');
    const answerId = req.param('answer');
    const sessionId = req.session.id;

    // save answer if not already answered
    answer.findOrCreate({
      where: {
        session_id: sessionId,
        question_id: questionId,
      },
      defaults: {
        choice_id: answerId,
      },
    })
    .then(() => res.redirect('/'))
    .catch((error) => {
      console.log(error);
      res.send(error.message);
    });
  });
};
