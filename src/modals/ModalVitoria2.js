import { motion } from "framer-motion";
import { useState } from "react";
import { getItem } from '../utils/localStorage.js';
import styles from "./ModalVitoria.module.css";

// Função que busca a descrição da palavra na API
const openDicio1 = async (palavra1, setDescricao1) => {
    try {
        const palavraMinuscula1 = palavra1.toLowerCase();

        const response = await fetch(`https://api.dicionario-aberto.net/word/${palavraMinuscula1}`);
        const data = await response.json();

        if (data.length > 0) {
            const xml = data[0].xml;

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");

            // Verifica se houve erro no parsing
            const parserError = xmlDoc.getElementsByTagName("parsererror");
            if (parserError.length > 0) {
                console.error('Erro no parsing do XML:', parserError[0].textContent);
                setDescricao1("Erro ao processar a definição.");
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
                setDescricao1(definitions.join("\n\n"));
            } else {
                setDescricao1("Descrição não encontrada.");
            }
        } else {
            setDescricao1("Descrição não encontrada.");
        }
    } catch (error) {
        console.error("Erro ao buscar a palavra:", error);
        setDescricao1("Erro ao buscar a descrição.");
    }
};
const openDicio2 = async (palavra2, setDescricao2) => {
    try {
        const palavraMinuscula2 = palavra2.toLowerCase();

        const response = await fetch(`https://api.dicionario-aberto.net/word/${palavraMinuscula2}`);
        const data = await response.json();

        if (data.length > 0) {
            const xml = data[0].xml;

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");

            // Verifica se houve erro no parsing
            const parserError = xmlDoc.getElementsByTagName("parsererror");
            if (parserError.length > 0) {
                console.error('Erro no parsing do XML:', parserError[0].textContent);
                setDescricao2("Erro ao processar a definição.");
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
                setDescricao2(definitions.join("\n\n"));
            } else {
                setDescricao2("Descrição não encontrada.");
            }
        } else {
            setDescricao2("Descrição não encontrada.");
        }
    } catch (error) {
        console.error("Erro ao buscar a palavra:", error);
        setDescricao2("Erro ao buscar a descrição.");
    }
};

const ModalVitoria2 = ({ vencedor, onClose }) => {
    // Definindo os hooks de estado fora do 'if'
    const lsPalavra1 = getItem('b2palavra1');
    const lsPalavra2 = getItem('b2palavra2');
    const [descricao1, setDescricao1] = useState(null);
    const [descricao2, setDescricao2] = useState(null);
    const [palavraSelecionada, setPalavraSelecionada] = useState(null);
    const [showDescricaoModal, setShowDescricaoModal] = useState(false);

    if (!vencedor) return null; // Garantindo que o componente só será renderizado se houver um vencedor

    // Função chamada ao clicar na palavra 1
    const handleOpenDicio1 = async () => {
        await openDicio1(lsPalavra1, setDescricao1); // Faz a requisição e atualiza a descrição
        setPalavraSelecionada(1); // Define que a palavra 1 foi clicada
        setShowDescricaoModal(true); // Exibe a nova modal com a descrição
    };

    // Função chamada ao clicar na palavra 2
    const handleOpenDicio2 = async () => {
        await openDicio2(lsPalavra2, setDescricao2); // Faz a requisição e atualiza a descrição
        setPalavraSelecionada(2); // Define que a palavra 2 foi clicada
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
                    <h2>VOCÊ VENCEU!</h2>
                    <p>As palavras eram:</p>
                    <div className={styles.palavrasCertas} onClick={handleOpenDicio1}>
                        <h3>{lsPalavra1}</h3>
                    </div>
                    <p>&</p>
                    <div className={styles.palavrasCertas} onClick={handleOpenDicio2}>
                        <h3>{lsPalavra2}</h3>
                    </div>
                    <button className={styles.button} onClick={onClose}>
                        JOGAR NOVAMENTE
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
                        {/* Exibe a palavra correspondente */}
                        <h2>{palavraSelecionada === 1 ? lsPalavra1 : lsPalavra2}</h2>

                        {/* Exibe a descrição correspondente */}
                        <ul>
                            {palavraSelecionada === 1 && descricao1 && Array.isArray(descricao1) ? (
                                descricao1.map((desc, index) => (
                                    <li className={styles.desc} key={index}>{desc}</li>
                                ))
                            ) : palavraSelecionada === 2 && descricao2 && Array.isArray(descricao2) ? (
                                descricao2.map((desc, index) => (
                                    <li className={styles.desc} key={index}>{desc}</li>
                                ))
                            ) : (
                                <li>{palavraSelecionada === 1 ? descricao1 : descricao2}</li>
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

export default ModalVitoria2;
