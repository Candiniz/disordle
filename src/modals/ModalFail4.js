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

const openDicio3 = async (palavra3, setDescricao3) => {
    try {
        const palavraMinuscula3 = palavra3.toLowerCase();

        const response = await fetch(`https://api.dicionario-aberto.net/word/${palavraMinuscula3}`);
        const data = await response.json();

        if (data.length > 0) {
            const xml = data[0].xml;

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");

            // Verifica se houve erro no parsing
            const parserError = xmlDoc.getElementsByTagName("parsererror");
            if (parserError.length > 0) {
                console.error('Erro no parsing do XML:', parserError[0].textContent);
                setDescricao3("Erro ao processar a definição.");
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
                setDescricao3(definitions.join("\n\n"));
            } else {
                setDescricao3("Descrição não encontrada.");
            }
        } else {
            setDescricao3("Descrição não encontrada.");
        }
    } catch (error) {
        console.error("Erro ao buscar a palavra:", error);
        setDescricao3("Erro ao buscar a descrição.");
    }
};

const openDicio4 = async (palavra4, setDescricao4) => {
    try {
        const palavraMinuscula4 = palavra4.toLowerCase();

        const response = await fetch(`https://api.dicionario-aberto.net/word/${palavraMinuscula4}`);
        const data = await response.json();

        if (data.length > 0) {
            const xml = data[0].xml;

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");

            // Verifica se houve erro no parsing
            const parserError = xmlDoc.getElementsByTagName("parsererror");
            if (parserError.length > 0) {
                console.error('Erro no parsing do XML:', parserError[0].textContent);
                setDescricao4("Erro ao processar a definição.");
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
                setDescricao4(definitions.join("\n\n"));
            } else {
                setDescricao4("Descrição não encontrada.");
            }
        } else {
            setDescricao4("Descrição não encontrada.");
        }
    } catch (error) {
        console.error("Erro ao buscar a palavra:", error);
        setDescricao4("Erro ao buscar a descrição.");
    }
};

const ModalFail4 = ({ vencedor, onClose }) => {

    const lsPalavra1 = getItem('b4palavra1');
    const lsPalavra2 = getItem('b4palavra2');
    const lsPalavra3 = getItem('b4palavra3');
    const lsPalavra4 = getItem('b4palavra4');
    const [descricao1, setDescricao1] = useState(null);
    const [descricao2, setDescricao2] = useState(null);
    const [descricao3, setDescricao3] = useState(null);
    const [descricao4, setDescricao4] = useState(null);
    const [palavraSelecionada, setPalavraSelecionada] = useState(null);
    const [showDescricaoModal, setShowDescricaoModal] = useState(false);

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

    // Função chamada ao clicar na palavra 3
    const handleOpenDicio3 = async () => {
        await openDicio3(lsPalavra3, setDescricao3); // Faz a requisição e atualiza a descrição
        setPalavraSelecionada(3); // Define que a palavra 3 foi clicada
        setShowDescricaoModal(true); // Exibe a nova modal com a descrição
    };

    // Função chamada ao clicar na palavra 4
    const handleOpenDicio4 = async () => {
        await openDicio4(lsPalavra2, setDescricao4); // Faz a requisição e atualiza a descrição
        setPalavraSelecionada(4); // Define que a palavra 4 foi clicada
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
                    <p>As palavras eram:</p>
                    <div className={styles.palavrasCertas} onClick={handleOpenDicio1}>
                        <h3>{lsPalavra1},</h3>
                    </div>
                    <div className={styles.palavrasCertas} onClick={handleOpenDicio2}>
                        <h3>{lsPalavra2},</h3>
                    </div>
                    <div className={styles.palavrasCertas} onClick={handleOpenDicio3}>
                        <h3>{lsPalavra3},</h3>
                    </div>
                    <p>&</p>
                    <div className={styles.palavrasCertas} onClick={handleOpenDicio4}>
                        <h3>{lsPalavra4}</h3>
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
                        {/* Exibe a palavra correspondente */}
                        <h2>
                            {palavraSelecionada === 1 ? lsPalavra1 :
                                palavraSelecionada === 2 ? lsPalavra2 :
                                    palavraSelecionada === 3 ? lsPalavra3 :
                                        lsPalavra4}
                        </h2>

                        {/* Exibe a descrição correspondente */}
                        <ul>
                            {palavraSelecionada === 1 && descricao1 ? (
                                descricao1.split("\n\n").map((desc, index) => (
                                    <li className={styles.desc} key={index}>{desc}</li>
                                ))
                            ) : palavraSelecionada === 2 && descricao2 ? (
                                descricao2.split("\n\n").map((desc, index) => (
                                    <li className={styles.desc} key={index}>{desc}</li>
                                ))
                            ) : palavraSelecionada === 3 && descricao3 ? (
                                descricao3.split("\n\n").map((desc, index) => (
                                    <li className={styles.desc} key={index}>{desc}</li>
                                ))
                            ) : palavraSelecionada === 4 && descricao4 ? (
                                descricao4.split("\n\n").map((desc, index) => (
                                    <li className={styles.desc} key={index}>{desc}</li>
                                ))
                            ) : (
                                <li>Descrição não encontrada.</li>
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

export default ModalFail4;
