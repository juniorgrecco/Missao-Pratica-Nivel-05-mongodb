import React from 'react';
import ControleEditora from '../controle/ControleEditora';
import ControleLivros from '../controle/ControleLivros';
import { useNavigate } from 'react-router-dom';
import Livro from '../modelo/Livro';

const controleEditora = new ControleEditora();
const controleLivro = new ControleLivros();

export default function LivroDados() {
	const opcoes = controleEditora
		.getEditoras()
		.map((editora) => ({ value: editora.codEditora, text: editora.nome }));

	const [titulo, setTitulo] = React.useState('');
	const [resumo, setResumo] = React.useState('');
	const [autores, setAutores] = React.useState('');
	const [codEditora, setCodEditora] = React.useState(opcoes[0].value);

	const navigate = useNavigate();

	function tratarCombo(evento: any) {
		setCodEditora(+evento.target.value);
	}

	function incluir(event: any) {
		event.preventDefault();
		const livro = new Livro(titulo, resumo, autores.split('\n'), codEditora);
		controleLivro.incluir(livro).then(() => {
			navigate('/');
		});
	}

	return (
		<main className='container'>
			<h1 className='mb-4'>Adicionar livro</h1>
			<form onSubmit={incluir}>
				<div className='mb-3'>
					<label className='form-label'>Titulo</label>
					<input
						required
						value={titulo}
						onChange={(e) => setTitulo(e.target.value)}
						className='form-control'
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Resumo</label>
					<input
						required
						value={resumo}
						onChange={(e) => setResumo(e.target.value)}
						className='form-control'
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Autores</label>
					<input
						required
						value={autores}
						onChange={(e) => setAutores(e.target.value)}
						className='form-control'
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Editoras</label>
					<select onChange={tratarCombo} className='form-select'>
						{opcoes.map((opcao, index) => (
							<option key={index} value={opcao.value}>
								{opcao.text}
							</option>
						))}
					</select>
				</div>
				<button className='btn btn-primary'>Enviar</button>
			</form>
		</main>
	);
}
