module.exports = function(app) {
  app.get('/admin', function(req,res) {
    res.render('admin/index');
  });
};