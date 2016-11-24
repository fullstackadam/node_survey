module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('guest/index');
  });

  app.get('/admin', function(req,res) {
    res.send('you\'re admin');
  });
};