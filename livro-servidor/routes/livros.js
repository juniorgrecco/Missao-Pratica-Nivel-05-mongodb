const express = require('express');
const router = express.Router();
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

router.get('/', async (req, res) => {
	let livros = await obterLivros();
	res.json(livros);
});

router.post('/', async (req, res) => {
	try {
		let livro = req.body;
		await incluir(livro);
		res.json({ message: 'Livro incluído com sucesso!' });
	} catch (err) {
		res.json({ message: 'Falha ao incluir o livro.' });
	}
});

router.delete('/:codigo', async (req, res) => {
	try {
		let codigo = req.params.codigo;
		await excluir(codigo);
		res.json({ message: 'Livro excluído com sucesso!' });
	} catch (err) {
		res.json({ message: 'Falha ao excluir o livro.' });
	}
});

module.exports = router;
