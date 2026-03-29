import React from 'react';
import WhiteLoading from '../../img/icons/whiteLoading.png';

import styles from './GreenButton.module.scss';
export default function GreenButton({ text, onClick, loading }) {
  return loading ? (
    <div className={styles.buttonWrapper} disabled>
      <img src={WhiteLoading} alt="loading"></img>
    </div>
  ) : (
    <div className={styles.buttonWrapper} onClick={onClick}>
      {text}
    </div>
  );
}
