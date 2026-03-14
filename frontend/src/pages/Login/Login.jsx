import {React, useState} from 'react'
import styles from "./Login.module.scss";
import paw from "../../img/paw.png";
import Button from "../../components/GreenButton/GreenButton";
import Envelope from "../../img/envelope.png";
import Lock from "../../img/lock.png";
import Eye from "../../img/eye.png";
import Grass from "../../img/leaves.png";
import Dog from "../../img/dog.png";
import Cat from "../../img/cat.png";
import { Link } from 'react-router-dom';
export default function Login() {

    const [passwordVisible, setPasswordVisible] = useState(false);

    function handleEyeClick(){
        passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true);
    }

    function handleLogin(){

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
                            <div className={styles.header}>Welcome back!</div>
                            <div className={styles.underHeader}>Log in to manage your pets and appointments.</div>
                            <div className={styles.input}>
                                <img src={Envelope} alt="envelope"></img>
                                <input type="text" className={styles.inputField} placeholder="Email Address" autoComplete="off"></input>
                            </div>
                            <div className={styles.input}>
                                <img src={Lock} alt="lock"></img>
                                <input type={passwordVisible?"texxt":"password"} className={styles.inputField} placeholder="Password" autoComplete="off"></input>
                                <img className={styles.eyeImg} src={Eye} alt="eye" onClick={handleEyeClick}></img>
                            </div>
                            <div className={styles.forgotPassword}><Link to="/ResetPassword">Forgot password?</Link></div>
                            <div className={styles.loginButtonContainer}><Button text={"Log in"} onClick={handleLogin}/></div>
                            <div className={styles.separator}></div>
                            <div className={styles.registerContainer}>Don't have an account?<span className={styles.linkContainer}><Link to="/Register">Sign up</Link></span></div>
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
