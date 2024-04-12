import React from 'react';
import Livro from '../modelo/Livro';
import { controleLivro } from '../LivroLista';
import LinhaLivro from './LinhaLivro';

export default function LivroLista() {
	const [livros, setLivros] = React.useState<Livro[]>([]);
	const [carregado, setCarregado] = React.useState(false);

	React.useEffect(() => {
		controleLivro.obterLivros().then((livros) => {
			setLivros(livros);
			setCarregado(true);
		});
	}, [carregado]);

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
								controleLivro.excluir(livro.codigo).then(() => {
									setCarregado(false);
								});
							}}
						/>
					))}
				</tbody>
			</table>
		</main>
	);
}
