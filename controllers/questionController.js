import models from '../models';
import requireLogin from '../middleware/authMiddleware';
import parser from '../config/parser';

const { question } = models;

export default (app) => {
  app.get('/question', requireLogin, (req, res) => res.send('nothing here :)'));

  app.post('/question', requireLogin, (req, res) => {
    question.create({ text: req.body.text })
      .then(data => res.redirect(`/admin/question/edit/${data.id}`));
  });

  app.put('/question/:id', requireLogin, (req, res) => {
    question.update({
      text: req.body.text,
    }, {
      where: {
        id: req.params.id,
      },
    })
    .then(data => res.send(data))
    .catch(error => console.log(error));
  });

  app.delete('/question/:id', requireLogin, (req, res) => {
    console.log(req.params.id);
    question.destroy({ where: { id: req.params.id } })
      .then(() => res.send(''));
  });
};
