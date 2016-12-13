export default (req, res, next) => {
  const sess = req.session;
  
  if (!sess.admin) {
    console.log('fail--');
    res.redirect('/login');
  } else {
    console.log('pass--');
    next();
  }
};
