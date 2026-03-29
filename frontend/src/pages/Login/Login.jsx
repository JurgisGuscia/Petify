import React, { useState } from 'react';
import styles from './Login.module.scss';
import paw from '../../img/paw.png';
import Button from '../../components/GreenButton/GreenButton';
import Envelope from '../../img/envelope.png';
import Lock from '../../img/lock.png';
import Eye from '../../img/eye.png';
import Grass from '../../img/leaves.png';
import Dog from '../../img/dog.png';
import Cat from '../../img/cat.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState('');
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleEyeClick() {
    setPasswordVisible(!passwordVisible);
  }

  async function handleLogin() {
    if (username.trim().length > 0 && password.trim().length > 0) {
      setErrorState('');
      setLoading(true);
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setErrorState('Invalid credentials');
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.user_id) {
        localStorage.setItem('user_id', data.user_id);
        navigate('/Home');
      }

      setLoading(false);
    } else {
      setErrorState('Username and password can not be empty');
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageWrapperBlurr}>
        <div className={styles.loginWrapper}>
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <img src={paw} alt="logo"></img>
            </div>
            <div className={styles.headerContainer}>Petify</div>
          </div>
          <div className={styles.loginBoard}>
            <div className={styles.leftSide}>
              <div className={styles.header}>Welcome back!</div>
              <div className={styles.underHeader}>Log in to manage your pets and appointments.</div>
              <div className={styles.input}>
                <img src={Envelope} alt="envelope"></img>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Username"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div className={styles.input}>
                <img src={Lock} alt="lock"></img>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className={styles.inputField}
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <img className={styles.eyeImg} src={Eye} alt="eye" onClick={handleEyeClick}></img>
              </div>

              <div className={styles.loginButtonContainer}>
                <Button text={'Log in'} onClick={handleLogin} loading={loading} />
              </div>
              <div className={styles.separator}></div>
              <div className={styles.registerContainer}>
                Don't have an account?
                <span className={styles.linkContainer}>
                  <Link to="/Register">Sign up</Link>
                </span>
              </div>
            </div>
            <div className={styles.rightSide}>
              <img className={styles.grassImg} src={Grass} alt="grass"></img>
              <img className={styles.dogImg} src={Dog} alt="dog"></img>
              <img className={styles.catImg} src={Cat} alt="cat"></img>
            </div>
          </div>
        </div>
        {errorState !== '' && <div className={styles.errorDisplay}>{errorState}</div>}
      </div>
    </div>
  );
}
