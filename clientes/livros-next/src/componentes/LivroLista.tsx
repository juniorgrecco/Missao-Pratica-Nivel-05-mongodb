'use client';

import React from 'react';
import LinhaLivro from './LinhaLivro';
import Livro from '@/classes/modelo/Livro';
import ControleLivros from '@/classes/controle/ControleLivros';

export default function LivroLista() {
	const [livros, setLivros] = React.useState<Livro[]>([]);
	const [carregado, setCarregado] = React.useState(false);

	const controleLivros = new ControleLivros();

	React.useEffect(() => {
		controleLivros
			.obterLivros()
			.then((res) => setLivros(res))
			.finally(() => setCarregado(true));
	}, [carregado]);

	function excluirLivro(codigo: string) {
		setCarregado(false);
		controleLivros.excluir(codigo).finally(() => setCarregado(true));
	}

	return (
		<main className='container'>
			<h1 className='my-3'>Tabela de livros</h1>
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Título</th>
						<th>Resumo</th>
						<th>Autores</th>
						<th>Código do livro</th>
						<th>Editora</th>
					</tr>
				</thead>
				<tbody>
					{livros.map((livro, index) => (
						<LinhaLivro
							key={index}
							livro={livro}
							excluir={() => {
								excluirLivro(livro.codigo);
								setCarregado(false);
							}}
						/>
					))}
				</tbody>
			</table>
		</main>
	);
}
