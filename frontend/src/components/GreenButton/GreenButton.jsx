import React from 'react'
import styles from "./GreenButton.module.scss";
export default function GreenButton({text, onClick}) {
  return (
    <div className={styles.buttonWrapper}>{text}</div>
  )
}
