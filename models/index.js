import Sequelize from 'sequelize';
import dbConnection from '../config/db';
import seedData from './seedData';

const foreignKeyConstraints = true;

// models

const user = dbConnection.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const question = dbConnection.define('question', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const choice = dbConnection.define('choice', {
  question_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const answer = dbConnection.define('answer', {
  session_id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  question_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  choice_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const session = dbConnection.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.STRING,
  expires: Sequelize.DATE,
  data: Sequelize.STRING(50000),
});

// associations

question.hasMany(choice, {
  as: 'Choices',
  foreignKey: 'question_id',
  constraints: foreignKeyConstraints,
});

choice.belongsTo(question, {
  foreignKey: 'question_id',
  constraints: foreignKeyConstraints,
});

question.hasMany(choice, {
  as: 'Choices',
  foreignKey: 'question_id',
  constraints: foreignKeyConstraints,
});

choice.belongsTo(question, {
  foreignKey: 'question_id',
  constraints: foreignKeyConstraints,
});

session.hasMany(answer, {
  as: 'Answers',
  foreignKey: 'session_id',
  targetkey: 'sid',
  constraints: foreignKeyConstraints,
});

answer.belongsTo(session, {
  foreignKey: 'session_id',
  targetkey: 'sid',
  constraints: foreignKeyConstraints,
});

answer.hasOne(choice, {
  as: 'Choice',
  foreignKey: 'choice_id',
  constraints: foreignKeyConstraints,
});

choice.belongsTo(answer, {
  foreignKey: 'choice_id',
  constraints: foreignKeyConstraints,
});

const models = {
  user,
  question,
  choice,
  answer,
  session,
};

// set up tables and seed data

dbConnection.authenticate()
  .then(() => dbConnection.sync({ force: true, logging: console.log }))
  .then(() => seedData(models))
  .catch((error) => {
    console.log(error);
    console.log('dbConnection failed');
  });

export default models;
