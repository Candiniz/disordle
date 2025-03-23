import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cincoLetras } from './cincoLetras.js';
import styles from './Board.module.css';
import { FaBackspace } from "react-icons/fa";
import './globals.css';

// Função para remover acentos e cedilhas
const removerAcentos = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/Ç/g, 'C').replace(/ç/g, 'c')
        .replace(/Ã/g, 'A').replace(/ã/g, 'a')
        .replace(/Â/g, 'A').replace(/â/g, 'a')
        .replace(/Á/g, 'A').replace(/á/g, 'a')
        .replace(/À/g, 'A').replace(/à/g, 'a')
        .replace(/É/g, 'E').replace(/é/g, 'e')
        .replace(/Ê/g, 'E').replace(/ê/g, 'e')
        .replace(/Í/g, 'I').replace(/í/g, 'i')
        .replace(/Î/g, 'I').replace(/î/g, 'i')
        .replace(/Ó/g, 'O').replace(/ó/g, 'o')
        .replace(/Ô/g, 'O').replace(/ô/g, 'o')
        .replace(/Õ/g, 'O').replace(/õ/g, 'o')
        .replace(/Ú/g, 'U').replace(/ú/g, 'u')
        .replace(/Û/g, 'U').replace(/û/g, 'u');
};



function Board2() {
    const [palavra1, setPalavra1] = useState('');
    const [palavra2, setPalavra2] = useState('');
    const [tentativa, setTentativa] = useState(Array(5).fill(''));
    const [posicaoSelecionada, setPosicaoSelecionada] = useState(0);
    const [histórico1, setHistórico1] = useState([]);
    const [histórico2, setHistórico2] = useState([]);
    const [tabuleiro1Congelado, setTabuleiro1Congelado] = useState(false);
    const [tabuleiro2Congelado, setTabuleiro2Congelado] = useState(false);
    const [animacaoEmCurso, setAnimacaoEmCurso] = useState(false);

    const [gameOver, setGameOver] = useState(false);
    const [, setVencedor] = useState(false);
    const [erroPalavra, setErroPalavra] = useState('');
    const [showErro, setShowErro] = useState(false);
    const [copias1, setCopias1] = useState([1, 2, 3, 4, 5]);
    const [copias2, setCopias2] = useState([1, 2, 3, 4, 5]);


    const encontrarPalavraOriginal = (palavraDigitada) => {
        // Remove acentos da palavra digitada
        const palavraSemAcento = removerAcentos(palavraDigitada).toUpperCase();

        // Procurar pela palavra sem acento no array cincoLetras
        return cincoLetras.find(palavra => removerAcentos(palavra).toUpperCase() === palavraSemAcento);
    };

    const pegarPalavrasAleatorias = () => {
        try {
            // Seleciona duas palavras aleatórias do array cincoLetras
            const palavra1 = cincoLetras[Math.floor(Math.random() * cincoLetras.length)].toUpperCase();
            const palavra2 = cincoLetras[Math.floor(Math.random() * cincoLetras.length)].toUpperCase();

            // Defina essas palavras no estado
            setPalavra1(palavra1);
            setPalavra2(palavra2);

        } catch (error) {
            console.error("Erro ao carregar as palavras:", error);
        }
    };


    useEffect(() => {
        pegarPalavrasAleatorias();
    }, []);

    useEffect(() => {
        if (erroPalavra) {
            setShowErro(true);
            const timer = setTimeout(() => setShowErro(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [erroPalavra]);

    const verificarCor = (tentativa, palavra) => {
        const cores = Array(5).fill('gray');
        const palavraSemAcento = removerAcentos(palavra);
        const tentativaSemAcento = tentativa.split('').map(letra => removerAcentos(letra));

        for (let i = 0; i < 5; i++) {
            if (tentativaSemAcento[i] === palavraSemAcento[i]) {
                cores[i] = 'green';
            }
        }

        for (let i = 0; i < 5; i++) {
            if (cores[i] !== 'green' && palavraSemAcento.includes(tentativaSemAcento[i])) {
                cores[i] = 'yellow';
            }
        }

        return cores;
    };

    const handleInput = (letra) => {
        if (!gameOver) {
            const novaTentativa = [...tentativa];
            if (posicaoSelecionada < 5) {
                novaTentativa[posicaoSelecionada] = letra;
                setTentativa(novaTentativa);
            }

            if (posicaoSelecionada < 4) {
                setPosicaoSelecionada(posicaoSelecionada + 1);
            }
        }
    };

    const handleQuadradoClick = (index) => {
        setPosicaoSelecionada(index);
    };

    const handleBackspace = () => {
        const novaTentativa = [...tentativa];
        novaTentativa[posicaoSelecionada] = '';
        setTentativa(novaTentativa);

        let novaPosicao = posicaoSelecionada;
        while (novaPosicao > 0 && novaTentativa[novaPosicao] === '') {
            novaPosicao--;
        }
        setPosicaoSelecionada(novaPosicao);
    };

    const handleSubmit = () => {
        if (tentativa.join('').length === 5) {
            const palavraDigitada = tentativa.join('');
            const palavraOriginal = encontrarPalavraOriginal(palavraDigitada);

            if (!palavraOriginal) {
                setErroPalavra('Palavra não encontrada!');
                return;
            }

            const tentativaFormatada = palavraOriginal.toUpperCase();
            const cor1 = verificarCor(tentativaFormatada, palavra1);
            const cor2 = verificarCor(tentativaFormatada, palavra2);

            let novoTabuleiro1Congelado = tabuleiro1Congelado;
            let novoTabuleiro2Congelado = tabuleiro2Congelado;
            if (!tabuleiro1Congelado) {
                setHistórico1([...histórico1, { tentativa: tentativaFormatada, cor: cor1 }]);
                if (cor1.every(c => c === 'green')) {
                    novoTabuleiro1Congelado = true;
                }
            }
            if (!tabuleiro2Congelado) {
                setHistórico2([...histórico2, { tentativa: tentativaFormatada, cor: cor2 }]);
                if (cor2.every(c => c === 'green')) {
                    novoTabuleiro2Congelado = true;
                }
            }
            setAnimacaoEmCurso(true);

            setTimeout(() => {
                // ✅ Agora verificamos a vitória imediatamente!
                if (novoTabuleiro1Congelado && novoTabuleiro2Congelado) {
                    setVencedor(true);
                    setGameOver(true);
                } else if (histórico1.length === 5 || histórico2.length === 5) {
                    setGameOver(true);
                }

                setTabuleiro1Congelado(novoTabuleiro1Congelado);
                setTabuleiro2Congelado(novoTabuleiro2Congelado);

                // ✅ Reduz número de cópias somente se algum tabuleiro ainda está ativo
                if (!novoTabuleiro1Congelado) {
                    setCopias1(prevCopias1 => prevCopias1.slice(0, -1));
                }
                if (!novoTabuleiro2Congelado) {
                    setCopias2(prevCopias2 => prevCopias2.slice(0, -1));
                }
                setTentativa(Array(5).fill(''));
                setPosicaoSelecionada(0);
                setAnimacaoEmCurso(false);
            }, 1300)

        }
    };


    return (
        <div className={styles.game}>
            <div className={`${styles.status} ${showErro ? styles.visivel : styles.invisivel}`}>
                {erroPalavra}
            </div>

            <article className={styles.tabuleiroContainer}>
                {/* Tabuleiro 1 */}
                <div className={styles.tabuleiro}>
                    {/* Histórico do tabuleiro 1 */}
                    {histórico1.map((registro, index) => (
                        <div className={styles.linha} key={index}>
                            {registro.cor.map((cor, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`${styles.quadrado} ${styles[cor]}`}
                                    initial={{ backgroundColor: 'transparent', rotate: 360, opacity: 0 }}
                                    animate={{
                                        backgroundColor: cor,
                                        opacity: 1,
                                        rotate: 0
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: idx * 0.2
                                    }}
                                >
                                    {registro.tentativa[idx]}
                                </motion.div>
                            ))}
                        </div>
                    ))}

                    {/* Tentativa ativa no tabuleiro 1 */}
                    {!gameOver && !animacaoEmCurso && !tabuleiro1Congelado && (
                        <div className={styles.linha}>
                            {tentativa.map((letra, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleQuadradoClick(idx)}
                                    className={`
                                    ${styles.quadradoAtivo} 
                                    ${posicaoSelecionada === idx ? styles.selecionado : ''}`}>
                                    {letra}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Cópias para o tabuleiro 1 */}
                    {copias1.map((_, idx) => (
                        <div key={idx} className={styles.linha}>
                            {Array(5).fill('').map((_, i) => <div key={i} className={styles.quadrado}></div>)}
                        </div>
                    ))}
                </div>

                {/* Tabuleiro 2 */}
                <div className={styles.tabuleiro}>
                    {/* Histórico do tabuleiro 2 */}
                    {histórico2.map((registro, index) => (
                        <div className={styles.linha} key={index}>
                            {registro.cor.map((cor, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`${styles.quadrado} ${styles[cor]}`}
                                    initial={{ backgroundColor: 'transparent', rotate: 360, opacity: 0 }}
                                    animate={{
                                        backgroundColor: cor,
                                        opacity: 1,
                                        rotate: 0
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: idx * 0.2
                                    }}
                                >
                                    {registro.tentativa[idx]}
                                </motion.div>
                            ))}
                        </div>
                    ))}

                    {/* Tentativa ativa no tabuleiro 2 */}
                    {!gameOver && !animacaoEmCurso && !tabuleiro2Congelado && (
                        <div className={styles.linha}>
                            {tentativa.map((letra, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleQuadradoClick(idx)}
                                    className={`
                                    ${styles.quadradoAtivo} 
                                    ${posicaoSelecionada === idx ? styles.selecionado : ''}`}>
                                    {letra}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Cópias para o tabuleiro 2 */}
                    {copias2.map((_, idx) => (
                        <div key={idx} className={styles.linha}>
                            {Array(5).fill('').map((_, i) => <div key={i} className={styles.quadrado}></div>)}
                        </div>
                    ))}
                </div>
                
            </article>


            <div className={styles.teclado}>
                <div className={styles.linhaTeclado}>
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letra) => (
                        <button
                            key={letra}
                            onClick={() => handleInput(letra)}
                            className={styles.tecla}
                            disabled={gameOver}
                        >
                            {letra}
                        </button>
                    ))}
                </div>

                <div className={styles.linhaTeclado}>
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letra) => (
                        <button
                            key={letra}
                            onClick={() => handleInput(letra)}
                            className={styles.tecla}
                            disabled={gameOver}
                        >
                            {letra}
                        </button>
                    ))}
                </div>

                <div className={styles.linhaTeclado}>
                    <button onClick={handleBackspace} className={styles.tecla} disabled={gameOver}>
                        <FaBackspace />
                    </button>
                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letra) => (
                        <button
                            key={letra}
                            onClick={() => handleInput(letra)}
                            className={styles.tecla}
                            disabled={gameOver}
                        >
                            {letra}
                        </button>
                    ))}
                    <button onClick={handleSubmit} className={styles.teclaEnter} disabled={gameOver}>
                        ENTER
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Board2;
