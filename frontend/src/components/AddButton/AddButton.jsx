import React from 'react';
import Plus from '../../img/plus.png';
import styles from './AddButton.module.scss';
export default function AddButton({ text, callBack }) {
  return (
    <div className={styles.button} onClick={callBack}>
      <div className={styles.iconWrapper}>
        <img src={Plus} alt="plus"></img>
      </div>
      <div className={styles.textWrapper}>{text}</div>
    </div>
  );
}
