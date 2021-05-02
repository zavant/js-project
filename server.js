const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient



MongoClient.connect('mongodb+srv://"username:pw".f5s4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes-whatamI')
    const quotesCollection = db.collection('quotesNew')

    //Middlewares
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    
    //Routes
    app.get('/', (req, res) => {
      db.collection('quotesNew').find().toArray()
      .then(results => {
        console.log(results)
        res.render('index.ejs', {quotes: results})
      })
        .catch(error => console.error(error))
      
    })
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    //Listen
    app.listen(3000, function() {
      console.log('listening on 3000')
    }) 
  })
  .catch(error => console.error(error))







