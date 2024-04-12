const mongoose = require('./conexao.js');

let LivroSchema = new mongoose.Schema({
	titulo: String,
	resumo: String,
	autores: [String],
	codEditora: Number,
});

let Livro = mongoose.model('Livro', LivroSchema, 'livros');

module.exports = Livro;
