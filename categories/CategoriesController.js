const express = require('express');
const slugify = require('slugify');
const router = express.Router();
const Category = require('./Category')

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if(title){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/");
        });
            
    }else{
        res.redirect("/admin/categories/new");
    };
});

router.get("/admin/categories", (req, res) => {
    Category.findAll({ row: true, order: [
        ['id', 'ASC'] 
    ] }).then((categories) => {
        res.render('admin/categories/index', {
            categories: categories
        });
    });
});

module.exports = router;