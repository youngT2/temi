const bcrypt = require('bcryptjs');
const User = require('./models/User');

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('adminpassword', salt, (err, hash) => {
    if (err) throw err;
    const newUser = new User({
      username: 'adminUser',
      password: hash,
      role: 'admin'
    });

    newUser.save().then(user => {
      console.log('Admin user created');
    });
  });
});
