import crypto from 'crypto';
import general from '../config/general';

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = general;
const salt = crypto.randomBytes(16).toString('hex');

export default (model) => {
  model.user.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    hash: ((password) => {
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
      return hash;
    })(ADMIN_PASSWORD),
    salt,
  })
  .catch(error => console.log(error));

  model.question.bulkCreate([{
    text: 'How do you feel about the election outcome?',
  }, {
    text: 'How do you feel about growth hacking?',
  }])
  .catch(error => console.log(error));

  model.choice.bulkCreate([{
    question_id: 1,
    text: 'I\'m ready for America to be great again',
  }, {
    question_id: 1,
    text: 'Can\'t wait for Obamacare to disappear',
  }, {
    question_id: 1,
    text: 'Meh, I didn\'t vote',
  }, {
    question_id: 1,
    text: 'I\'m ready to leave the country',
  }, {
    question_id: 1,
    text: 'I\'m ready to leave the planet',
  }, {
    question_id: 2,
    text: 'It\'s awesome. Can\'t wait to get rich',
  }, {
    question_id: 2,
    text: 'Meh. It\'s nothing new',
  }, {
    question_id: 2,
    text: 'Bah. It\'s modern snakeoil.',
  }])
  .catch(error => console.log(error));
};
