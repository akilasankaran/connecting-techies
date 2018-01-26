const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({
  extended: true }
));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

var db;

MongoClient.connect('mongodb://akila:akila1995@ds145385.mlab.com:45385/fw-connecting-techies', (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database.db('fw-connecting-techies');
  app.listen(3000, function () {
    console.log('listening on 3000');
  });
});

// example 1

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// example 2
// app.get('/', (req, res) => {
//   res.sendFile('/Users/Akilasankaran/MERN/crudCheck/index.html');
// });

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('saved to database');
    res.redirect('/');
  });
});
//
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
      // renders index.ejs
    res.render('index.ejs', {quotes: result});
    // console.log(result);
  });
});
app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Joel'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send({message: 'A Lijack quote got deleted'});
  });
});
