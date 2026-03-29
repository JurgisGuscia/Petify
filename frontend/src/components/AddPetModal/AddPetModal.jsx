import React, { useEffect, useMemo, useState } from 'react';
import styles from './AddPetModal.module.scss';
import Logo from '../../img/paw.png';
import GreenButton from '../GreenButton/GreenButton';
import GreenLoading from '../../img/icons/greenLoading.png';

export default function AddPetModal({ onClick, user, refreshPetData }) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [preview, setPreview] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [breedList, setBreedList] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [typesRes, breedsRes] = await Promise.all([
          fetch('http://localhost:8000/api/petTypes'),
          fetch('http://localhost:8000/api/breeds'),
        ]);

        const types = await typesRes.json();
        const breeds = await breedsRes.json();

        setTypeList(types);
        setBreedList(breeds);

        if (types.length > 0) {
          const firstTypeId = String(types[0].id);
          setType(firstTypeId);

          const firstBreed = breeds.find((b) => String(b.petTypes_id) === firstTypeId);
          if (firstBreed) {
            setBreed(String(firstBreed.id));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    }

    loadData();
  }, []);

  const filteredBreeds = useMemo(() => {
    return breedList.filter((item) => String(item.petTypes_id) === String(type));
  }, [breedList, type]);

  useEffect(() => {
    if (filteredBreeds.length > 0) {
      const currentBreedStillValid = filteredBreeds.some(
        (item) => String(item.id) === String(breed),
      );

      if (!currentBreedStillValid) {
        setBreed(String(filteredBreeds[0].id));
      }
    } else {
      setBreed('');
    }
  }, [type, filteredBreeds, breed]);

  async function handleAddAnimal() {
    if (!name.trim() || !user?.id || !breed) return;

    setLoading(true);

    try {
      const petRes = await fetch('http://localhost:8000/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          users_id: user.id,
          breeds_id: Number(breed),
        }),
      });

      const petText = await petRes.text();
      let petData;

      try {
        petData = JSON.parse(petText);
      } catch {
        petData = { raw: petText };
      }

      console.log('pet response:', petData);

      if (!petRes.ok) {
        throw new Error(petData.message || `Pet save failed: ${petRes.status}`);
      }

      if (picture) {
        const formData = new FormData();
        formData.append('picture', picture);
        formData.append('pets_id', String(petData.id));

        const pictureRes = await fetch('http://localhost:8000/api/petPictures', {
          method: 'POST',
          body: formData,
        });

        const pictureText = await pictureRes.text();
        console.log('picture response:', pictureText);

        let pictureData;
        try {
          pictureData = JSON.parse(pictureText);
        } catch {
          pictureData = { raw: pictureText };
        }

        if (!pictureRes.ok) {
          throw new Error(pictureData.message || `Upload failed: ${pictureRes.status}`);
        }
      }

      onClick();
    } catch (err) {
      console.error('handleAddAnimal error:', err);
    } finally {
      setLoading(false);
      refreshPetData();
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPicture(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      {fetching ? (
        <div className={styles.UserModalWrapper}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={styles.title}>Add New Pet</div>
          </div>
          <div className={styles.body}>
            <img src={GreenLoading} className={styles.loadingScreenSaver} alt="loading" />
          </div>
          <div className={styles.footer}>
            <button className={styles.cancelButton} onClick={onClick}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.UserModalWrapper}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={styles.title}>Add New Pet</div>
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
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                  />
                </div>
              </label>
            </div>

            <div className={styles.rightSide}>
              <div className={styles.topRow}>
                <div className={styles.topLeftSide}>
                  <div className={styles.label}>Name</div>
                  <input
                    type="text"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.topRightSide}></div>
              </div>

              <div className={styles.middleRow}>
                <div className={styles.middleLeftSide}>
                  <div className={styles.label}>Type</div>
                  <select
                    className={styles.input}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {typeList.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.middleRightSide}>
                  <div className={styles.label}>Breed</div>
                  <select
                    className={styles.input}
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  >
                    {filteredBreeds.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.saveButtonWrapper}>
              <GreenButton text="Save" onClick={handleAddAnimal} loading={loading} />
            </div>
            <button className={styles.cancelButton} onClick={onClick}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
