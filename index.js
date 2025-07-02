const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

// View engine
app.set('view engine', 'ejs');

// session - storage padrão - Não recomendável
app.use(session({
    secret: "pq0912oiewh87vy67",
    cookie: {
        maxAge: 60000 * 60 // 1 hora
    }
}));

// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso!');
    }).catch((erro) => {
        console.log(erro);
    });

app.use('/', categoriesController); // Pode ser também usado algum prefixo, como pode ser visto no linha de baixo 
app.use('/', articlesController);
app.use('/', usersController);

// Rotas de sessão - Exemplo
app.get("/session", (req, res) => {
    req.session.treinamento = "Curso de Node.js";
    req.session.ano = 2025;
    res.send("Sessão criada com sucesso!");
});

app.get("/leitura", (req, res) => {
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano
    })
});

app.get('/', (req, res) => {
    Article.findAll({
        order:[
            ["id", "DESC"]
        ],
        limit: 4
    }).then((articles) => {
        Category.findAll().then((categories) => {
            res.render("index", {articles: articles, categories: categories});

        });
    });
});

app.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then((article) => {
        if(article != undefined){
            Category.findAll().then((categories) => {
                res.render("article", {article: article, categories: categories});
            });
        }else{
            res.redirect('/');
        }
    }).catch((erro) => {
        res.redirect('/');
    });
});

app.get('/categories/:slug', (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then((category) => {
        if(category != undefined){
            Category.findAll().then((categories) => {
                res.render('index', {articles: category.articles, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch((erro) => {
        res.redirect("/");
    });
});

app.listen(8000, () => {
    console.log('O Servidor está rodando!');
});