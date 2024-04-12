import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editora } from '../editora';
import { Livro } from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livro-lista.component.html',
  styleUrl: './livro-lista.component.css',
})
export class LivroListaComponent {
  editoras: Editora[] = [];
  livros: Livro[] = [];

  private servEditora: ControleEditoraService;
  private servLivros: ControleLivrosService;

  constructor() {
    this.servEditora = new ControleEditoraService();
    this.servLivros = new ControleLivrosService();
  }

  ngOnInit() {
    this.editoras = this.servEditora.getEditoras();
    this.servLivros
      .obterLivros()
      .then(
        (livros) =>
          (this.livros = livros.map(
            (livro) =>
              new Livro(
                livro._id!,
                livro.codEditora,
                livro.titulo,
                livro.resumo,
                livro.autores
              )
          ))
      );
  }

  excluir(codigo: string) {
    this.servLivros.excluir(codigo).then(() => {
      this.servLivros
        .obterLivros()
        .then(
          (livros) =>
            (this.livros = livros.map(
              (livro) =>
                new Livro(
                  livro._id!,
                  livro.codEditora,
                  livro.titulo,
                  livro.resumo,
                  livro.autores
                )
            ))
        );
    });
  }

  obterNome(codEditora: number): string {
    return this.servEditora.getNomeEditora(codEditora);
  }
}
