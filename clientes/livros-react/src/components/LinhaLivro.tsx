import React from 'react';
import Livro from '../modelo/Livro';
import { controleEditora } from '../LivroLista';

export default function LinhaLivro(props: { livro: Livro; excluir: () => void }) {
	const nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);

	return (
		<tr>
			<td>
				<button onClick={props.excluir} className='btn btn-danger btn-sm mr-2'>
					Excluir
				</button>
				{props.livro.titulo}
			</td>
			<td>{props.livro.resumo}</td>
			<td>
				<ul className='list-unstyled'>
					{props.livro.autores.map((autor, index) => (
						<li key={index}>{autor}</li>
					))}
				</ul>
			</td>
			<td>{props.livro.codigo}</td>
			<td>{nomeEditora}</td>
		</tr>
	);
}
