import React from 'react';
import styles from './BlueButton.module.scss';
export default function GreBlueButtonenButton({ text, onClick }) {
  return (
    <div className={styles.buttonWrapper} onClick={onClick}>
      {text}
    </div>
  );
}
