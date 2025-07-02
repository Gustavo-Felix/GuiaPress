const expreess = require('express');
const router = expreess.Router();
const User = require('./User');

router.get('/admin/users', (req, res) => {
    res.send("Página de usuários");

});

router.get('/admin/users/create', (req, res) => {
    res.render("admin/users/create");
});

router.post('/users/create', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    res.json({
        email: email,
        password: password
    });
});

module.exports = router;