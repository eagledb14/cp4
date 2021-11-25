const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

const upload = multer({
	dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

mongoose.connect('mongodb://localhost:27017/creature', {
	useNewUrlParser: true
});

const creatureSchema = new mongoose.Schema({
	name: String,
 	desc: String,
	path: String,
	strength: Number,
	win: Number,
	loss: Number
});

const Creature = mongoose.model('Creature', creatureSchema);

app.get("/api/", async (req, res) => {
  res.send("received");
	
});


//create creature
app.post('/api/photo', upload.single('photo'), async (req, res) => {
	if (!req.file) {
		return res.sendStatus(400);
	}
	res.send({	path: '/images/' + req.file.filename});
});

app.post("/api/creature", async (req, res) => {
	//console.log(req.body);
	const creature = new Creature({
		name: req.body.name,
		desc: req.body.desc,
		path: req.body.path,
		strength: (Math.random() * 6) - 3,
		win: 0,
		loss: 0
	});

	try{
		await creature.save();
		res.send(creature);
		//console.log(creature);
	}
	catch(err) {
		console.log(err);
		res.sendStatus(500);
	}	
});


//read creatures


app.get('/api/creature', async (req, res) => { //read every creature in the database
	try {
		let creatures = await Creature.find();
		//console.log('creatures sent');
		res.send(creatures);
	}
	catch(err) {
		console.log(err);
		res.sendStatus(500);
	}
});


//add reading single creature

//update creature

app.put('/api/creature/:id', async (req, res) => {
	let creature;
	try {
		creature = Creature.findById(req.params.id, (err, post) => {
		      if (!err) {
		      	return post;
		      }
		});
		creature.updateOne({
			name: req.body.name,
        	        desc: req.body.desc,
        		path: req.body.path,
            		strength: req.body.strength,
             		win: req.body.win,
                	loss: req.body.loss
		});
		res.sendStatus(200);
	}
	catch(err) {
		console.log(err);
		res.sendStatus(500);
	}

});




//delete creature

app.delete('/api/creature/:id', async (req, res) => {
	try {
		await Creature.deleteOne({
			_id: req.params.id
		});
		res.sendStatus(200);
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});




app.listen(3000, () => console.log("Listening on port 3000"));
