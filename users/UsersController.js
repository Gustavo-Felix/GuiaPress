const expreess = require('express');
const bcrypt = require('bcryptjs');
const router = expreess.Router();
const User = require('./User');
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/users', adminAuth, (req, res) => {
    User.findAll().then((users) => {
        res.render("admin/users/index", {users: users});
    })

});

router.get('/admin/users/create', adminAuth, (req, res) => {
    res.render("admin/users/create");
});

router.post('/users/create', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then((user) => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch((erro) => {
                res.redirect('/');
            });
        }else {
            res.render('admin/users/create');
        }
    });
});

router.get('/login', (req, res) => {
    res.render("admin/users/login", {user: req.session.user});
});

router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: 
        {
            email: email
        }
    }).then((user) => {
        if(user.email != undefined){
            var correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles")
            }
            else{
                res.redirect("/login")
            }
        }
        else{
            res.redirect("/login")
        }
    });
});

router.get('/logout', adminAuth, (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router;