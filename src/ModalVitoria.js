import { motion } from "framer-motion";
import styles from "./ModalVitoria.module.css";

const ModalVitoria = ({ vencedor, onClose }) => {
  if (!vencedor) return null;

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
        <h2>🎉 Você Venceu! 🎉</h2>
        <button className={styles.button} onClick={onClose}>
          Fechar
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ModalVitoria;
