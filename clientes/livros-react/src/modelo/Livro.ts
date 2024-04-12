export default class Livro {
	codigo: string;
	codEditora: number;
	titulo: string;
	resumo: string;
	autores: string[];

	constructor(titulo: string, resumo: string, autores: string[], codEditora: number, codigo: string = '0') {
		this.codigo = codigo;
		this.codEditora = codEditora;
		this.titulo = titulo;
		this.resumo = resumo;
		this.autores = autores;
	}
}
