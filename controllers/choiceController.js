import models from '../models';
import requireLogin from '../middleware/authMiddleware';
import parser from '../config/parser';

const { choice } = models;

export default (app) => {
  /* app.get('/choice', requireLogin, (req, res) => {
  });*/

  app.post('/choice', requireLogin, parser.json, (req, res) => {
    req.body.choices.forEach((choiceItem) => {
      const choiceObj = {
        question_id: choiceItem.question_id,
        text: choiceItem.text,
      };

      // if not new choice add id to choice object

      if (choiceItem.id !== 'new') {
        choiceObj.id = choiceItem.id;
      }

      choice.upsert(choiceObj)
        .then(data => console.log(data));
    });

    res.send('');
  });

  /* app.put('/choice/:id', requireLogin, parser.json, (req, res) => {

  });*/

  app.delete('/choice/:id', requireLogin, parser.url, (req, res) => {
    choice.destroy({ where: { id: req.params.id } })
      .then(data => console.log(data));
    res.send('');
  });
};
