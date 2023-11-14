import { useState, useEffect } from 'react';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

const LinhaLivro = ({ livro, excluir }) => {
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (

        <tr key={livro.codigo}>
            <td  >{livro.titulo}
                <br />   <button class="btn btn-danger" onClick={() => excluir(livro.codigo)}>Excluir</button>

            </td>
            <td >{livro.resumo}</td>
            <td >{nomeEditora}</td>
            <td >
                <ul >
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>

        </tr>

    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        setLivros(controleLivro.obterLivros());
        setCarregado(true);
    }, [carregado]);

    const excluir = (codigoLivro) => {
        controleLivro.excluir(codigoLivro);
        setCarregado(false);
    };

    return (
        <main class="container   " >
            <h1 class="text-center ">Catálogos de Livros</h1>
            <table class="table table-striped table-hover table-md align-middle ">
                <thead class="table-dark  ">
                    <tr >
                        <th class="d-none d-sm-table-cell">Título</th>
                        <th class="d-none d-sm-table-cell">Resumo</th>
                        <th class="d-none d-sm-table-cell">Editora</th>
                        <th class="d-none d-sm-table-cell">Autores</th>
                    </tr>
                </thead>
                <tbody >
                    {livros.map((livro) => (
                        <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;