import crypto from 'crypto';
import requireLogin from '../middleware/authMiddleware';
import parser from '../config/parser';
import models from '../models';

const { question, user } = models;

export default (app) => {
  app.post('/login', parser.url, (req, res) => {
    user.findOne({ where: { email: req.body.email } })
      .then((currentUser) => {
        if (!currentUser) {
          // flash message 'Invalid email or password.'
        } else {
          const hash = crypto.pbkdf2Sync(req.body.password, currentUser.salt, 1000, 64).toString('hex');

          if (hash === currentUser.hash) {
            const sess = req.session;
            sess.admin = true;
            // console.log(req.session);
            res.redirect('/admin');
          } else {
            res.redirect('/login');
          }
        }
      });
  });

  app.get('/login', (req, res) => {
    const title = 'Login';

    res.render('admin/login', {
      title,
    });
  });

  app.get('/logout', requireLogin, (req, res) => {
    const sess = req.session;
    sess.admin = undefined;
    res.redirect('/');
  });

  app.get('/admin', requireLogin, (req, res) => {
    const title = 'Questions';

    question.findAll()
      .then((questions) => {
        res.render('admin/index', {
          title,
          questions,
        });
      })
      .catch(() => res.send('No questions found'));
  });

  app.get('/admin/question/edit/:id', requireLogin, parser.url, (req, res) => {
    const title = 'Edit Question';

    const render = (currentQuestion, choices) => {
      res.render('admin/question/edit', {
        title,
        question: currentQuestion,
        choices,
      });
    };

    question.findById(req.params.id)
      .then((currentQuestion) => {
        currentQuestion.getChoices()
          .then(choices => (render(currentQuestion, choices)));
      })
      .catch(() => res.send('No question found'));
  });

  app.get('/admin/question/add', requireLogin, (req, res) => {
    const title = 'Add Question';

    res.render('admin/question/add', {
      title,
    });
  });
};
