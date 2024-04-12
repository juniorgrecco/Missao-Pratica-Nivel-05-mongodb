'use client';

import ControleEditora from '@/classes/controle/ControleEditora';
import ControleLivros from '@/classes/controle/ControleLivros';
import Livro from '@/classes/modelo/Livro';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LivroDados() {
	const controleLivros = new ControleLivros();
	const controleEditora = new ControleEditora();

	const opcoes = controleEditora
		.getEditoras()
		.map((editora) => ({ value: editora.codEditora, text: editora.nome }));

	const [titulo, setTitulo] = React.useState('');
	const [resumo, setResumo] = React.useState('');
	const [autores, setAutores] = React.useState('');
	const [codEditora, setCodEditora] = React.useState(opcoes[0].value);

	const navigate = useRouter();

	function incluirLivro(livro: Livro) {
		controleLivros.incluir(livro).then(() => navigate.push('/'));
	}

	function tratarCombo(evento: any) {
		setCodEditora(+evento.target.value);
	}

	function incluir(event: any) {
		event.preventDefault();

		incluirLivro(
			new Livro(
				titulo,
				resumo,
				autores.split(`,`).map((text) => text.trim()),
				codEditora
			)
		);
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
