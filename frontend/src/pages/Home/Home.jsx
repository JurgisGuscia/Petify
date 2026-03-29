import { React, useState, useEffect } from 'react';
import styles from './Home.module.scss';
import Paw from '../../img/paw.png';
import Dog from '../../img/dog.png';
import Cat from '../../img/cat.png';
import Grass from '../../img/leavesNoBg.png';
import AddButton from '../../components/AddButton/AddButton';
import AnimalCard from '../../components/AnimalCard/AnimalCard';
import DefaultPetPhoto from '../../img/noImg.png';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import BlueButton from '../../components/BlueButton/BlueButton';
import User from '../../img/icons/user.png';
import { useNavigate } from 'react-router-dom';
import BackDrop from '../../components/BackDrop/BackDrop';
import UserModal from '../../components/UserModal/UserModal';
import AddPetModal from '../../components/AddPetModal/AddPetModal';
import PetModal from '../../components/PetModal/PetModal';
import Loading from '../../img/icons/greenLoading.png';
import Calendar from '../../img/calendar.png';
export default function Home() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [petList, setPetList] = useState([]);
  const [petPictures, setPetPictures] = useState([]);
  const [userModalVisible, setUserModaLVisible] = useState(false);
  const [backDropvisible, setBackDropVisible] = useState(false);
  const [addPetModalVisible, setAddPetModalVisible] = useState(false);
  const [petsLoading, setPetsLoading] = useState(false);
  const [refreshPets, setRefreshPets] = useState(false);
  const [petModalVisible, setPetModalVisible] = useState(false);
  const [PetToEdit, setPetToEdit] = useState(null);
  const [serviceList, setServiceList] = useState(0);
  const [serviceRefresh, setServiceRefresh] = useState(0);

  function refreshServices() {
    setServiceRefresh((prev) => !prev);
  }

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!Array.isArray(petList) || petList.length < 1) return;
    const requestBody = petList.map((pet) => pet.id);
    fetch('http://localhost:8000/api/getServicesByPetIds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        petIds: requestBody,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setServiceList(
          data.filter((service) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            endOfMonth.setHours(23, 59, 59, 999);
            const serviceDate = new Date(service.date);
            serviceDate.setHours(0, 0, 0, 0);
            return serviceDate >= today && serviceDate <= endOfMonth;
          }),
        );
      })
      .catch((err) => console.error(err));
  }, [petList, serviceRefresh]);

  useEffect(() => {
    setPetsLoading(true);
    if (!user) return;
    fetch(`http://localhost:8000/api/usersPets/${user.id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setPetList(data);
      })
      .catch((err) => console.error(err));
  }, [user, refreshPets]);

  useEffect(() => {
    if (!Array.isArray(petList) || petList.length === 0) {
      setPetPictures([]);
      setPetsLoading(false);
      return;
    }

    const petIds = petList.map((pet) => pet.id);

    fetch('http://localhost:8000/api/petUserPetPictures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        pets_ids: petIds,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPetPictures(data);
      })
      .catch((err) => console.error(err));
    setPetsLoading(false);
  }, [petList, refreshPets]);

  function showUserModal() {
    document.body.classList.add('noScroll');
    setBackDropVisible(true);
    setUserModaLVisible(true);
  }

  function showPetModal() {
    document.body.classList.add('noScroll');
    setBackDropVisible(true);
    setAddPetModalVisible(true);
  }

  function hideUserModal() {
    document.body.classList.remove('noScroll');
    setBackDropVisible(false);
    setUserModaLVisible(false);
  }

  function hidePetModal() {
    document.body.classList.remove('noScroll');
    setBackDropVisible(false);
    setAddPetModalVisible(false);
  }

  function handleLogout() {
    localStorage.removeItem('user_id');
    navigate('/');
  }

  function refreshPetData() {
    setRefreshPets((prev) => !prev);
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainBlurrer}>
        {/* Modal section */}
        {backDropvisible && <BackDrop />}
        {userModalVisible && <UserModal onClick={hideUserModal} user={user} />}
        {addPetModalVisible && (
          <AddPetModal onClick={hidePetModal} user={user} refreshPetData={refreshPetData} />
        )}
        {petModalVisible && (
          <PetModal
            petId={PetToEdit}
            backDropVisible={setBackDropVisible}
            petModalVisible={setPetModalVisible}
            priceProfile={user.priceProfiles_id}
            refreshServiceList={refreshServices}
            refreshPetData={refreshPetData}
          />
        )}
        {/* Modal section */}
        <div className={styles.pageWrapper}>
          <div className={styles.headerWrapper}>
            <div className={styles.headerLogoWrapper}>
              <div className={styles.headerLogo}>
                <img src={Paw} alt="paw"></img>
              </div>
              <div className={styles.headerTitle}>Petify</div>
            </div>
            <div className={styles.userPanelWrapper}>
              <div className={styles.userMenuWrapper}>
                <img src={User} alt="user" onClick={showUserModal}></img>
              </div>
              <div className={styles.logoutWrapper}>
                <BlueButton text="Logout" onClick={handleLogout} />
              </div>
            </div>
          </div>
          <div className={styles.titleSection}>
            <div className={styles.leftSide}>
              <div className={styles.title}>Welcome Back, {user ? user.firstName : ''}</div>
              <div className={styles.underTitle}>
                Manage your pets, services, appointments and expenses.
              </div>
              <div className={styles.infoCardContainer}>
                <div className={styles.card}>
                  <div className={styles.cardLeftSide}>
                    <img src={Paw} alt="paw" />
                  </div>
                  <div className={styles.cardRightSide}>
                    <div className={styles.cardRightSideTop}>Pets</div>
                    <div className={styles.cardRightSideBottom}>
                      {petList.length > 0 ? petList.length : 0}
                    </div>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardLeftSide}>
                    <img src={Calendar} alt="calendar" />
                  </div>
                  <div className={styles.cardRightSide}>
                    <div className={styles.cardRightSideTop}>Services</div>
                    <div className={styles.cardRightSideBottom}>
                      {serviceList ? serviceList.length : 0}
                    </div>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardLeftSide}>
                    <img src={Calendar} alt="calendar" />
                  </div>
                  <div className={styles.cardRightSide}>
                    <div className={styles.cardRightSideTop}>Expenses</div>
                    <div className={styles.cardRightSideBottom}>
                      {serviceList.length >= 0
                        ? serviceList.reduce(
                            (sum, service) => sum + Number(service.price_snapshot),
                            0,
                          )
                        : 0}
                      €
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rightSide}>
              <img src={Grass} className={styles.grassImage} alt="grass"></img>
              <img src={Dog} className={styles.dogImage} alt="dog"></img>
              <img src={Cat} className={styles.catImage} alt="cat"></img>
            </div>
          </div>

          <div className={styles.bodyWrapper}>
            <div className={styles.leftSection}>
              <div className={styles.leftSectionTitleWrapper}>
                <div className={styles.leftSectionTitle}>My Pets</div>
                <AddButton text={'Add Pet'} callBack={showPetModal} />
              </div>
              <div className={styles.leftSectionBodyWrapper}>
                {petsLoading ? (
                  <img src={Loading} alt="Loading" className={styles.petsLoading} />
                ) : petList.length >= 0 ? (
                  petList.map((pet) => {
                    const pic = petPictures?.find?.((p) => p.pets_id === pet.id);

                    return (
                      <AnimalCard
                        key={pet.id}
                        id={pet.id}
                        name={pet.name}
                        breed_id={pet.breeds_id}
                        refreshPets={refreshPets}
                        picture={
                          pic?.url ? `http://localhost:8000/storage/${pic.url}` : DefaultPetPhoto
                        }
                        setActivePet={setPetToEdit}
                        setBackDropVisible={setBackDropVisible}
                        setPetModalVisible={setPetModalVisible}
                      />
                    );
                  })
                ) : (
                  <div className={styles.noPets}>No pets added yet</div>
                )}
              </div>
            </div>
            <div className={styles.middleSection}>
              <div className={styles.middleSectionTop}>
                <div className={styles.middleSectionTopTitleWrapper}>
                  <div className={styles.middleSectionTopTitle}>Upcoming services</div>
                </div>
                <div className={styles.middleSectionTopBody}>
                  {serviceList.length >= 0
                    ? serviceList
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((service) => (
                          <ServiceCard key={service.id} service={service} petList={petList} />
                        ))
                    : 'No services'}
                </div>
              </div>
            </div>
            <div className={styles.rightSection}>
              <div className={styles.rightSectionTitleWrapper}>
                <div className={styles.rightSectionTitle}>Expenses</div>
              </div>
              <div className={styles.rightSectionBody}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
