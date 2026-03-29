import { React, useEffect, useState } from 'react';
import styles from './UserModal.module.scss';
import Logo from '../../img/paw.png';
import GreenButton from '../GreenButton/GreenButton';
export default function UserModal({ onClick, user }) {
  const [picture, setPicture] = useState();
  const [profileType, setProfileType] = useState('Loading...');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);

  useEffect(() => {
    const profileId = user.priceProfiles_id;
    if (!profileId) return;
    fetch(`http://localhost:8000/api/priceProfiles/${profileId}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileType(data.name + ' User');
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/userPictures/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const path = data.url;
        setPreview(`${path}`);
      })
      .catch((err) => console.error(err));
  }, []);

  async function handleUpdateInfo() {
    if (
      password.trim().length > 0 &&
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      dateOfBirth.trim().length > 0
    ) {
      setLoading(true);

      try {
        // 1. Update user info
        const userRes = await fetch(`http://localhost:8000/api/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: password,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
          }),
        });

        const userData = await userRes.json();

        user.password = userData.password;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.dateOfBirth = userData.dateOfBirth;

        // 2. Upload picture if one exists
        if (picture) {
          const formData = new FormData();
          formData.append('picture', picture);
          formData.append('users_id', user.id);

          const pictureRes = await fetch('http://localhost:8000/api/userPictures', {
            method: 'POST',
            body: formData,
          });
          if (!pictureRes.ok) {
            throw new Error(`Upload failed: ${pictureRes.status}`);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const filePreview = URL.createObjectURL(file);
    setPicture(file);
    setPreview(filePreview);
  };

  return (
    <div className={styles.UserModalWrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo"></img>
        </div>
        <div className={styles.title}>User menu</div>
      </div>
      <div className={styles.body}>
        <div className={styles.leftSide}>
          <label className={styles.imageWrapper}>
            <div
              className={styles.preview}
              style={{
                backgroundImage: preview ? `url(${preview})` : 'none',
              }}
            >
              <input
                type="file"
                className={styles.hiddenInput}
                accept=".jpg,.jpeg,image/jpeg"
                onChange={handleFileChange}
              />
            </div>
          </label>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.topRow}>
            <div className={styles.topLeftSide}>
              <div className={styles.label}>Username</div>
              <input className={styles.input} disabled value={username}></input>
            </div>
            <div className={styles.topRightSide}>
              <div className={styles.label}>Password</div>
              <input
                className={styles.input}
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div className={styles.middleRow}>
            <div className={styles.middleLeftSide}>
              <div className={styles.label}>First Name</div>
              <input
                className={styles.input}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className={styles.middleRightSide}>
              <div className={styles.label}>Last Name</div>
              <input
                className={styles.input}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className={styles.bottomRow}>
            <div className={styles.bottomLeftSide}>
              <div className={styles.label}>Date Of Birth</div>
              <input
                className={styles.input}
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              ></input>
            </div>
            <div className={styles.bottomRightSide}>
              <div className={styles.label}>Profile Type</div>
              <input className={styles.input} disabled type="text" value={profileType}></input>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.saveButtonWrapper}>
          <GreenButton text={'Save'} onClick={handleUpdateInfo} loading={loading} />
        </div>
        <button className={styles.cancelButton} onClick={onClick}>
          Cancel
        </button>
      </div>
    </div>
  );
}
