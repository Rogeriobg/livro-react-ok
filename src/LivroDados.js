import { useState } from 'react';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';
import { useNavigate } from 'react-router-dom';


const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

const LivroDados = () => {
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);
    const navigate = useNavigate();

    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = (event) => {
        event.preventDefault();
        const livro = {
            codigo: 0,
            codEditora,
            titulo,
            resumo,
            autores: autores.split('\n').map(author => author.trim())
        };
        controleLivro.incluir(livro);
        navigate('/');
    };

    return (
        <main >
            <h1>Cadastrar Livro</h1>
            <form onSubmit={incluir} >
                <div class="form-group">
                    <label>
                        Título:
                        <input type="text" class="form-control col-lg-6" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </label>
                </div>
                <br />
                <div class="form-group">
                    <label >
                        Resumo:
                        <textarea class="form-control col-lg-6" value={resumo} onChange={(e) => setResumo(e.target.value)} />
                    </label>
                </div>
                <br />

                <div class="form-group">
                    <label>
                        Editora:
                        <br />
                        <select class="custom-selectcol-lg-6" value={codEditora} onChange={tratarCombo}>
                            {opcoes.map((opcao) => (
                                <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <br />
                <div class="form-group">
                    <label>
                        Autores: (um por linha)
                        <textarea class="form-control col-lg-6" value={autores} onChange={(e) => setAutores(e.target.value)} />
                    </label>
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Salvar Dados</button>
            </form>
        </main>
    );
};

export default LivroDados;