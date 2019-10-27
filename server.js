const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();
const PORT = 4000;

let House = require('./models/house.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/houses', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

routes.route('/').get(function(req, res) {
    House.find(function(err, houses) {
        if (err) {
            console.log(err);
        } else {
            res.json(houses);
        }
    });
	console.log("hello world");
});

routes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    House.findById(id, function(err, house) {
        res.json(house);
    });
});

routes.route('/update/:id').post(function(req, res) {
    House.findById(req.params.id, function(err, house) {
        if (!house)
            res.status(404).send("data is not found");
        else
            house.todo_description = req.body.todo_description;
            house.todo_responsible = req.body.todo_responsible;
            house.todo_priority = req.body.todo_priority;
            house.todo_completed = req.body.todo_completed;

            house.save().then(house => {
                res.json('House updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

routes.route('/add').post(function(req, res) {
    let house = new House(req.body);
    house.save()
        .then(house => {
            res.status(200).json({'house': 'house added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new house failed');
        });
});

app.use('/houses', routes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

