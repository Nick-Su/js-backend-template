const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
const router = express.Router();
const app = express();
const jsonParser = express.json();
const port = 4000;
const db_uri = "mongodb://127.0.0.1:27017/demo";

app.use(cors());
app.use("/", router);

app.listen(port, function() {
  console.log('The Server is running on port ' + port);
})

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(db_uri);
}

mongoose.connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});





const Ticket = require("./models/ticket");

app.get('/api/tickets', (req, res) => {
  Ticket.find({}, function(err, result) {
    return err ? res.send(err) : res.send(result);
  }) 
});

app.post('/api/tickets', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);

  const ticketTemplate = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title ?? 'N/A'
  }

  const ticket = new Ticket(ticketTemplate);

  ticket.save(function(err) {
    if(err) return console.error(err);
    res.send(ticket);
  })
})

app.delete('/api/ticket:id', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);

  Ticket.deleteOne({id: req.body.id}, (err, data) => {
    if(err) { 
      res.sendStatus(400)
    } else {
      res.sendStatus(200);
    }
  })
})

app.patch('/api/ticket/:id', jsonParser, (req, res) => {
  if (!req.body || !req.params.id) { res.sendStatus(500) }

  Ticket.findOneAndUpdate({id: req.params.id}, req.body, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    else{
        console.log("Ticket updated");
        res.sendStatus(200);
    }
  })
})

app.delete('/api/ticket/:id', (req, res) =>  {
  if (!req.params.id) { res.sendStatus(500) }

  Ticket.findOneAndDelete({id: req.params.id}, (err) => {
    if (err) { res.sendStatus(500) }

    console.log('Ticket has been deleted')
    res.sendStatus(200);
  })

})