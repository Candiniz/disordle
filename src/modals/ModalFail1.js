import { motion } from "framer-motion";
import { useState } from "react";
import { getItem } from '../utils/localStorage.js';
import styles from "./ModalVitoria.module.css";

// Função que busca a descrição da palavra na API
const openDicio = async (palavra, setDescricao) => {
  try {
    const palavraMinuscula = palavra.toLowerCase();

    const response = await fetch(`https://api.dicionario-aberto.net/word/${palavraMinuscula}`);
    const data = await response.json();

    if (data.length > 0) {
      const xml = data[0].xml;

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");

      // Verifica se houve erro no parsing
      const parserError = xmlDoc.getElementsByTagName("parsererror");
      if (parserError.length > 0) {
        console.error('Erro no parsing do XML:', parserError[0].textContent);
        setDescricao("Erro ao processar a definição.");
        return;
      }

      // Encontra todas as tags <def> - convertemos para array para facilitar
      const defElements = Array.from(xmlDoc.getElementsByTagName("def"));

      let definitions = [];

      defElements.forEach(def => {
        const text = def.textContent.trim();

        if (text.includes("\n")) {
          definitions.push(...text.split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0));
        } else if (text.length > 0) {
          definitions.push(text);
        }
      });

      if (definitions.length > 0) {
        setDescricao(definitions.join("\n\n"));
      } else {
        setDescricao("Descrição não encontrada.");
      }
    } else {
      setDescricao("Descrição não encontrada.");
    }
  } catch (error) {
    console.error("Erro ao buscar a palavra:", error);
    setDescricao("Erro ao buscar a descrição.");
  }
};

const ModalFail1 = ({ vencedor, onClose }) => {
  // Definindo os hooks de estado fora do 'if'
  const lsPalavra = getItem('b1palavra1');
  const [descricao, setDescricao] = useState(null);  // Estado da descrição
  const [showDescricaoModal, setShowDescricaoModal] = useState(false);  // Controle da exibição da modal

  // Função chamada ao clicar na palavra
  const handleOpenDicio = async () => {
    await openDicio(lsPalavra, setDescricao); // Faz a requisição e atualiza a descrição
    setShowDescricaoModal(true); // Exibe a nova modal com a descrição
  };

  return (
    <>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modalContent}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro do modal
        >
          <h2>NÃO FOI DESSA VÊZ!</h2>
          <p>A palavra era:</p>
          <div className={styles.palavrasCertas} onClick={handleOpenDicio}>
            <h3>{lsPalavra}</h3>
          </div>
          <button className={styles.button} onClick={onClose}>
            TENTAR NOVAMENTE
          </button>
        </motion.div>
      </motion.div>

      {/* Se a nova modal estiver ativa, mostra a modal com a descrição */}
      {showDescricaoModal && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDescricaoModal(false)} // Fecha a modal ao clicar fora
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro da nova modal
          >
            <h2>{lsPalavra}</h2>
            <ul>
              {descricao && Array.isArray(descricao) ? (
                descricao.map((desc, index) => (
                  <li className={styles.desc} key={index}>{desc}</li>
                ))
              ) : (
                <li>{descricao}</li> // Caso não seja um array, exibe a descrição como texto
              )}
            </ul>
            <button className={styles.button} onClick={() => setShowDescricaoModal(false)}>
              FECHAR DESCRIÇÃO
            </button>
          </motion.div>
        </motion.div>
      )}

    </>
  );
};

export default ModalFail1;
