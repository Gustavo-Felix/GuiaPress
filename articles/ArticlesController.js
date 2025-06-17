const express = require('express');
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("Rota de articles")
});

router.get("/admin/articles", (req, res) => {
    res.send("Rota do admin articles")
});

module.exports = router;