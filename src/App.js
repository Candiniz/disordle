
import styles from './App.module.css'

import { ReactComponent as Hand1 } from './assets/icons/hand1.svg';
import { ReactComponent as Hand2 } from './assets/icons/hand2.svg';
import { ReactComponent as Hand4 } from './assets/icons/hand4.svg';

export default function App() {
  return (
    <>
      <div className={styles.menuLeft}>
        <ul className={styles.menuLeftUl}>
          <div>
            <Hand1 className={styles.svgs} style={{ fill: 'white' }} />
            <h2>I</h2>
          </div>
          <div>
            <Hand2 className={styles.svgs} style={{ fill: 'white' }} />
            <h2>II</h2>
          </div>
          <div>
            <Hand4 className={styles.svgs} style={{ fill: 'white' }} />
            <h2>IV</h2>
          </div>
        </ul>
      </div>
      <div className={styles.menuRight}>

      </div>
    </>
  )
}