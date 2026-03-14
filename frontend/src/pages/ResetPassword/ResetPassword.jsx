import React from 'react'
import styles from "./ResetPassword.module.scss";
import paw from "../../img/paw.png";
import Button from "../../components/GreenButton/GreenButton";
import Envelope from "../../img/envelope.png";
import Grass from "../../img/leaves.png";
import Dog from "../../img/dog.png";
import Cat from "../../img/cat.png";
import { Link } from 'react-router-dom';

export default function ResetPassword() {

    function handleReset(){

    }
    
    return (
        <div className={styles.pageWrapper}>
                <div className={styles.pageWrapperBlurr}>
                    <div className={styles.loginWrapper}>
                        <div className={styles.header}>
                            <div className={styles.logoContainer}>
                                <img src={paw} alt="logo"></img>
                            </div>
                            <div className={styles.headerContainer}>
                                Petify
                            </div>
                        </div>
                        <div className={styles.loginBoard}>
                            <div className={styles.leftSide}>
                                <div className={styles.header}>Forgot password?</div>
                                <div className={styles.underHeader}>Enter your email address and we will send you a link to reset your password.</div>
                                <div className={styles.input}>
                                    <img src={Envelope} alt="envelope"></img>
                                    <input type="text" className={styles.inputField} placeholder="Email Address" autoComplete="off"></input>
                                </div>
                                <div className={styles.loginButtonContainer}><Button text={"Send reset link"} onClick={handleReset}/></div>
                                <div className={styles.separator}></div>
                                <div className={styles.registerContainer}><Link to="/">Back to log in</Link></div>
                            </div>
                            <div className={styles.rightSide}>
                                <img className={styles.grassImg} src={Grass} alt="grass"></img>
                                <img className={styles.dogImg} src={Dog} alt="dog"></img>
                                <img className={styles.catImg} src={Cat} alt="cat"></img> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
