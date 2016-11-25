module.exports = function(app) {
  app.get('/', function(req, res) {
    //get random survey question
    //avoid already answered questions
    res.render('guest/index');
  });
};