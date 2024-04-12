import Livro from '../modelo/Livro';

const baseURL = 'http://localhost:3030/livros';

interface LivroMongo {
	_id?: string;
	titulo: string;
	resumo: string;
	autores: string[];
	codEditora: number; // Adicionado codEditora
}

export default class ControleLivros {
	async obterLivros(): Promise<Livro[]> {
		const response = await fetch(baseURL);
		const data: LivroMongo[] = await response.json();
		return data.map((livroMongo) => ({
			codigo: livroMongo._id!,
			codEditora: livroMongo.codEditora, // Atualizado para usar codEditora de LivroMongo
			titulo: livroMongo.titulo,
			resumo: livroMongo.resumo,
			autores: livroMongo.autores,
		}));
	}

	async incluir(livro: Livro): Promise<boolean> {
		const livroMongo: LivroMongo = {
			titulo: livro.titulo,
			resumo: livro.resumo,
			autores: livro.autores,
			codEditora: livro.codEditora, // Atualizado para usar codEditora de Livro
		};
		const response = await fetch(baseURL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(livroMongo),
		});
		return response.ok;
	}

	async excluir(codigo: string): Promise<boolean> {
		const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
		return response.ok;
	}
}
