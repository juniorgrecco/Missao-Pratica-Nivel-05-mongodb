const mongoose = require('mongoose');

let options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

mongoose.connect(
	'mongodb+srv://felipe218411:Codigo11881@cluster0.gu97kq6.mongodb.net/livraria?retryWrites=true&w=majority',
	options
);

module.exports = mongoose;
