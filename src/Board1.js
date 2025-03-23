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
    .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
    .replace(/Ç/g, 'C')
    .replace(/ç/g, 'c')
    .replace(/Ã/g, 'A')
    .replace(/ã/g, 'a')
    .replace(/Â/g, 'A')
    .replace(/â/g, 'a')
    .replace(/Á/g, 'A')
    .replace(/á/g, 'a')
    .replace(/À/g, 'A')
    .replace(/à/g, 'a')
    .replace(/É/g, 'E')
    .replace(/é/g, 'e')
    .replace(/Ê/g, 'E')
    .replace(/ê/g, 'e')
    .replace(/Í/g, 'I')
    .replace(/í/g, 'i')
    .replace(/Î/g, 'I')
    .replace(/î/g, 'i')
    .replace(/Ó/g, 'O')
    .replace(/ó/g, 'o')
    .replace(/Ô/g, 'O')
    .replace(/ô/g, 'o')
    .replace(/Õ/g, 'O')
    .replace(/õ/g, 'o')
    .replace(/Ú/g, 'U')
    .replace(/ú/g, 'u')
    .replace(/Û/g, 'U')
    .replace(/û/g, 'u');
};


// Função para procurar uma palavra com ou sem acento no array cincoLetras
const encontrarPalavraOriginal = (palavraDigitada) => {
  // Remove acentos da palavra digitada
  const palavraSemAcento = removerAcentos(palavraDigitada).toUpperCase();

  // Procurar pela palavra sem acento no array cincoLetras
  return cincoLetras.find(palavra => removerAcentos(palavra).toUpperCase() === palavraSemAcento);
};

const pegarPalavraAleatoria = () => {
  const indiceAleatorio = Math.floor(Math.random() * cincoLetras.length);
  return cincoLetras[indiceAleatorio].toUpperCase(); // Palavra original com acento
};

function Board1() {
  const [palavra, setPalavra] = useState('');
  const [tentativa, setTentativa] = useState(Array(5).fill(''));  // Agora é um array de 5 posições
  const [posicaoSelecionada, setPosicaoSelecionada] = useState(0); // Índice do quadrado selecionado
  const [histórico, setHistórico] = useState([]);
  const [, setTeclado] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [vencedor, setVencedor] = useState(false);
  const [erroPalavra, setErroPalavra] = useState('');
  const [showErro, setShowErro] = useState(false);
  const [copias, setCopias] = useState([1, 2, 3, 4, 5]);
  const [animacaoEmCurso, setAnimacaoEmCurso] = useState(false);

  useEffect(() => {
    const palavraAleatoria = pegarPalavraAleatoria();
    setPalavra(palavraAleatoria);  // Armazena a palavra original com acento no estado
    setTeclado('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
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

    // Normalizar as palavras (remover acentos) para a comparação
    const palavraSemAcento = removerAcentos(palavra);
    // Garantir que 'tentativa' seja um array, caso seja uma string
    const tentativaSemAcento = Array.isArray(tentativa) ? tentativa.map(letra => removerAcentos(letra)) : tentativa.split('').map(letra => removerAcentos(letra));

    // Comparar as letras nas mesmas posições
    for (let i = 0; i < 5; i++) {
      if (tentativaSemAcento[i] === palavraSemAcento[i]) {
        cores[i] = 'green'; // Verde para letra correta na posição certa
      }
    }

    // Comparar as letras que existem na palavra, mas em posições diferentes
    for (let i = 0; i < 5; i++) {
      if (cores[i] === 'green') continue; // Ignorar letras que já são verdes
      if (palavraSemAcento.includes(tentativaSemAcento[i]) && tentativaSemAcento[i] !== palavraSemAcento[i]) {
        cores[i] = 'yellow'; // Amarelo para letras corretas, mas na posição errada
      }
    }

    return cores;
  };


  const handleInput = (letra) => {
    if (!gameOver) {
      const novaTentativa = [...tentativa];
      novaTentativa[posicaoSelecionada] = letra;
      setTentativa(novaTentativa);

      let proximaPosicao = posicaoSelecionada;
      while (proximaPosicao < 4 && novaTentativa[proximaPosicao] !== '') {
        proximaPosicao++;
      }
      setPosicaoSelecionada(proximaPosicao);
    }
  };

  const handleQuadradoClick = (index) => {
    setPosicaoSelecionada(index);
  };

  const handleSubmit = () => {
    if (tentativa.join('').length === 5) {
      const palavraDigitada = tentativa.join('');
      const palavraOriginal = encontrarPalavraOriginal(palavraDigitada);

      if (!palavraOriginal) {
        setErroPalavra('');
        setShowErro(false);

        setTimeout(() => {
          setErroPalavra('Palavra não encontrada!');
          setShowErro(true); // Exibe a mensagem de erro
        }, 10);

        return;
      } else {
        setTimeout(() => {
          setCopias(prevCopias => {
            if (prevCopias.length > 0) {
              // Remove a última cópia da lista
              return prevCopias.slice(0, prevCopias.length - 1);
            }
            return prevCopias;
          });
        }, 1300)

        // Atualiza o histórico e aplica a cor imediatamente
        const palavraRestaurada = palavraOriginal.toUpperCase(); // Palavra restaurada com acentos
        const novaTentativa = [...histórico, palavraRestaurada];

        // Atualiza o histórico de tentativas
        setHistórico(novaTentativa);

        // Inicia a animação, deixando a tentativa ativa invisível
        setAnimacaoEmCurso(true);

        // Atraso de 1300ms para atualizar o estado do jogo (gameOver, vencedor, setTentativa)
        setTimeout(() => {
          // Restaura a visibilidade da tentativa ativa após a animação
          setAnimacaoEmCurso(false);

          // Resetando os estados após a animação
          setTentativa(Array(5).fill(''));
          setPosicaoSelecionada(0);
          setErroPalavra(''); // Limpa o erro após o delay

          // Verifica se a palavra foi acertada após o delay
          if (removerAcentos(palavraRestaurada) === removerAcentos(palavra)) {
            setVencedor(true);
            setGameOver(true);
            setCopias(prevCopias => [...prevCopias, prevCopias.length + 1]);
          } else if (novaTentativa.length === 6) {
            setGameOver(true);
          }

          // Desabilita o teclado e outras ações relacionadas ao estado do jogo
          setTeclado([]); // Desabilita o teclado
        }, 1300);
      }
    } else {
      // Se a palavra for menor que 5 caracteres
      setErroPalavra('');
      setShowErro(false);

      setTimeout(() => {
        setErroPalavra('Palavra muito pequena!');
        setShowErro(true); // Exibe a mensagem de erro
      }, 10);
    }
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

  return (
    <div className={styles.game}>

      <div className={`${styles.status} ${showErro ? styles.visivel : styles.invisivel}`}>
        {erroPalavra}
      </div>

      <div className={styles.tabuleiro}>
        {histórico.map((tentativa, index) => (
          <div className={styles.linha} key={index}>
            {verificarCor(tentativa, palavra).map((cor, idx) => (
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
                {tentativa[idx]}
              </motion.div>

            ))}
          </div>
        ))}

        {!gameOver && !animacaoEmCurso &&
          <div className={styles.linha}>
            {Array.from({ length: 5 }, (_, idx) => (
              <div
                key={idx}
                className={`${styles.quadradoAtivo} ${posicaoSelecionada === idx ? styles.selecionado : ''}`}
                onClick={() => handleQuadradoClick(idx)}
              >
                {tentativa[idx]}
              </div>
            ))}
          </div>
        }


        <div>
          {/* Renderiza as 5 cópias */}
          {copias.map((_, idx) => (
            <div key={idx} className={styles.linha}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className={styles.quadrado}>
                  {/* Aqui você pode deixar vazio ou preenchê-lo com algum estado */}
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>

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


      {vencedor && <div className={styles.status}>Você venceu!</div>}
      {gameOver && !vencedor && <div className={styles.status}>Game Over! A palavra era: {palavra}</div>}
    </div>
  );
}

export default Board1;