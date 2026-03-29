import { React, useState } from 'react';
import styles from './Register.module.scss';
import paw from '../../img/paw.png';
import Button from '../../components/GreenButton/GreenButton';
import Envelope from '../../img/envelope.png';
import Lock from '../../img/lock.png';
import Eye from '../../img/eye.png';
import Grass from '../../img/leaves.png';
import Dog from '../../img/dog.png';
import Cat from '../../img/cat.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState('');
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  function handleEyeClick() {
    passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true);
  }

  async function handleRegister() {
    setErrorState('');
    if (!username || !password || !repeatPassword) {
      setErrorState('Please fill in all fields');
      return;
    }

    if (password !== repeatPassword) {
      setErrorState('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorState('Registration failed');
        setLoading(false);
        return;
      }
      setErrorState('User registered successfully');
      setUsername('');
      setPassword('');
      setRepeatPassword('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setErrorState('Server error');
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
              <div className={styles.header}>Create an account</div>
              <div className={styles.underHeader}>
                Register to manage your pets and appointments
              </div>
              <div className={styles.input}>
                <img src={Envelope} alt="envelope"></img>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={styles.input}>
                <img src={Lock} alt="lock"></img>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className={styles.inputField}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img className={styles.eyeImg} src={Eye} alt="eye" onClick={handleEyeClick}></img>
              </div>
              <div className={styles.input}>
                <img src={Lock} alt="lock"></img>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className={styles.inputField}
                  placeholder="Repeat Password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <div className={styles.loginButtonContainer}>
                <Button text={'Register'} onClick={handleRegister} loading={loading} />
              </div>
              <div className={styles.separator}></div>
              <div className={styles.registerContainer}>
                Already have an account?
                <span className={styles.linkContainer}>
                  <Link to="/">Log in</Link>
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
