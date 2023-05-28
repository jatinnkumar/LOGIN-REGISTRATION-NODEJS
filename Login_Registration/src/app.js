const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
require('./db/conn');
const Register = require("./models/registers");
const { resolveSoa } = require('dns');
const port = process.env.PORT || 8000;


const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// creating new user in database
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if (password === confirmPassword) {
            const registerEmployee = new Register({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                consfirmPassword: req.body.confirmPassword
            })
            const registered = await registerEmployee.save();
            res.status(202).render("index");
        } else {
            res.send('Password not matched !');
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

// login check
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Register.findOne({ email: email });
        if (userEmail.password == password) {
            res.status(202).render("index");
        } else {
            res.send('Invalid Email or Password !');
        }
    } catch (error) {
        res.status(404).send('Invalid Email!');
    }
});

app.listen(port, () => {
    console.log(`Server is running at port no. ${port}`);
});
