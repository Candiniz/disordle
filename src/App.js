import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';  // Importando motion do Framer Motion
import styles from './App.module.css';
import { ReactComponent as Hand1 } from './assets/icons/hand1.svg';
import { ReactComponent as Hand2 } from './assets/icons/hand2.svg';
import { ReactComponent as Hand4 } from './assets/icons/hand4.svg';
import DayNightBt from './DayNightBt.js';
import './globals.css';
import { useTheme } from './ThemeContext.js'; // Importando o hook useTheme
import ModalIntro from './modals/ModalIntro.js'
import { FaInfoCircle } from "react-icons/fa";
import { LuCircleUserRound } from "react-icons/lu";



export default function App() {
  const { isDark } = useTheme(); // Acessando o estado do tema (escuro/claro)
  const videoRef = useRef(null); // Ref para acessar o vídeo diretamente
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    // Verifica no localStorage se o usuário já escolheu não mostrar novamente
    const dontShow = localStorage.getItem("dontShowModal");
    if (dontShow) {
      setIsModalOpen(false);
    }
  }, []);

  const videoDay = 'day.mp4';
  const videoNight = 'night.mp4';

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="MainApp">
      {isModalOpen && <ModalIntro onClose={handleClose} />}
      <motion.div
        key={videoDay}  // Adicionamos key para garantir que o React re-renderize quando o src mudar
        initial={{ opacity: 0 }}  // Inicia com o vídeo invisível
        animate={{ opacity: isDark ? 0 : 1 }}  // Controla a opacidade de acordo com o tema
        exit={{ opacity: 0 }}  // Saída do vídeo quando a troca acontecer
        transition={{ duration: 1 }}  // Duração da animação
        className={`${styles.videoContainer} ${!isDark ? styles.visible : ''}`}
        style={{ zIndex: !isDark ? 0 : -1 }}  // Z-index para garantir que o vídeo visível esteja acima
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          id="background-video"
        >
          <source src={videoDay} type="video/mp4" />
        </video>
      </motion.div>

      <motion.div
        key={videoNight}  // Adicionamos key para garantir que o React re-renderize quando o src mudar
        initial={{ opacity: 0 }}  // Inicia com o vídeo invisível
        animate={{ opacity: isDark ? 1 : 0 }}  // Controla a opacidade de acordo com o tema
        exit={{ opacity: 0 }}  // Saída do vídeo quando a troca acontecer
        transition={{ duration: 1 }}  // Duração da animação
        className={`${styles.videoContainer} ${isDark ? styles.visible : ''}`}
        style={{ zIndex: isDark ? 0 : -1 }}  // Z-index para garantir que o vídeo visível esteja acima
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          id="background-video"
        >
          <source src={videoNight} type="video/mp4" />
        </video>
      </motion.div>

      <div className={styles.menuLeft}>
        <DayNightBt />
        <ul className={styles.menuLeftUl}>
          <Link to="/" className={styles.romanNumber}>
            <div className={styles.hand1}>
              <Hand1 className={styles.svgs} style={{ fill: 'white' }} />
              <h2 className={styles.romanNumber}>I</h2>
            </div>
          </Link>
          <Link to="/II" className={styles.romanNumber}>
            <div className={styles.hand2}>
              <Hand2 className={styles.svgs} style={{ fill: 'white' }} />
              <h2 className={styles.romanNumber}>II</h2>
            </div>
          </Link>
          <Link to="/IV" className={styles.romanNumber}>
            <div className={styles.hand4}>
              <Hand4 className={styles.svgs} style={{ fill: 'white' }} />
              <h2 className={styles.romanNumber}>IV</h2>
            </div>
          </Link>
        </ul>
        <div className={styles.userAndInfo}>
          <button onClick={openModal}><FaInfoCircle /></button>
          <button><LuCircleUserRound /></button>
        </div>
      </div>
      <div className={styles.menuRight}>
        <img src='disordle-logo.png' alt='Disordle Logo' className={styles.logo} />
      </div>
    </div>
  );
}
