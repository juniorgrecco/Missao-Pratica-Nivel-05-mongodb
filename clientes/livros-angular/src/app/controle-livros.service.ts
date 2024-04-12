import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Livro } from './livro';

const baseURL = 'http://localhost:3030/livros';

export interface LivroMongo {
  _id?: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

export const LIVRO_ARRAY_TOKEN = new InjectionToken<Livro[]>('LivroArray');

@Injectable({
  providedIn: 'root',
})
export class ControleLivrosService {
  constructor() {}

  async obterLivros(): Promise<LivroMongo[]> {
    const response = await fetch(baseURL);
    const data = await response.json();
    return data;
  }

  async excluir(codigo: string): Promise<boolean> {
    const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
    const data = await response.json();
    return data.ok;
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };

    const response = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livroMongo),
    });

    const data = await response.json();
    return data.ok;
  }
}
