function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).send('Not authorized as admin');
  }
}
