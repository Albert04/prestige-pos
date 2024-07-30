function checkAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).send('Unauthorized'); // or redirect to login
    }
    next();
  }

module.export = checkAdmin;