import bodyParser from 'body-parser';

export default {
  json: bodyParser.json(),
  url: bodyParser.urlencoded({
    extended: true,
  }),
};
