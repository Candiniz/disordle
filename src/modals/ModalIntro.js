import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./ModalIntro.module.css";
import { IoCloseCircleSharp } from "react-icons/io5";


const ModalVitoria = ({ vencedor, onClose }) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const handleCheckboxChange = () => {
        setDontShowAgain(!dontShowAgain);
        localStorage.setItem("dontShowModal", !dontShowAgain ? "true" : ""); // Salva no localStorage
    };

    return (
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
                <h2>BEM VINDO AO DISORDLE</h2>
                <p className={styles.interrogacao}>Você consegue descobrir a palavra escondida?</p>
                <article className={styles.linhasIntro}>
                    <p>A cada tentativa, as letras irão te dar pistas:</p>
                    <div className={styles.introSQ1}>
                        <div className={styles.introSQyellow}>T</div>
                        <div className={styles.introSQyellow}>Ê</div>
                        <div className={styles.introSQgray}>N</div>
                        <div className={styles.introSQgray}>I</div>
                        <div className={styles.introSQgray}>S</div>
                    </div>
                    <p>As letras T e E fazem parte da palavra e não estão nas posições corretas!</p>
                </article>
                <article className={styles.linhasIntro}>
                    <p>A cada tentativa, as letras irão te dar pistas:</p>
                    <div className={styles.introSQ1}>
                        <div className={styles.introSQgray}>P</div>
                        <div className={styles.introSQgreen}>R</div>
                        <div className={styles.introSQgray}>A</div>
                        <div className={styles.introSQgray}>Z</div>
                        <div className={styles.introSQgreen}>O</div>
                    </div>
                    <p>As letras R e O fazem parte da palavra e estão nas posições corretas!</p>
                    <p>As letras cinzas não existem na palavra!</p>
                </article>
            
                <article className={styles.linhasIntro}>
                    <p>Quando você acertar todas as posições, você vence!</p>
                    <div className={styles.introSQ1}>
                        <div className={styles.introSQgreen}>E</div>
                        <div className={styles.introSQgreen}>R</div>
                        <div className={styles.introSQgreen}>E</div>
                        <div className={styles.introSQgreen}>T</div>
                        <div className={styles.introSQgreen}>O</div>
                    </div>
                </article>
                <div className={styles.closeDiv}>
                    <div><button className={styles.button} onClick={onClose}>
                        <IoCloseCircleSharp />
                    </button></div>
                    <div><label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={dontShowAgain}
                            onChange={handleCheckboxChange}
                        />
                        Não mostrar novamente
                    </label></div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ModalVitoria;
