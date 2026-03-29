import { React, useEffect, useState } from 'react';
import styles from './AnimalCard.module.scss';
export default function AnimalCard({
  id,
  name,
  breed_id,
  picture,
  setActivePet,
  setBackDropVisible,
  setPetModalVisible,
  refreshPets,
}) {
  const [breed, setBreed] = useState(null);
  const [services, setServices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const breedDataRes = await fetch(`http://localhost:8000/api/breeds/${breed_id}`);
      const breedData = await breedDataRes.json();
      setBreed(breedData.name);
    };
    fetchData();
  }, [breed_id]);

  useEffect(() => {
    const fetchData = async () => {
      const serviceDataRes = await fetch(`http://localhost:8000/api/getServicesByPetId/${id}`);
      const serviceData = await serviceDataRes.json();
      setServices(serviceData);
    };
    fetchData();
  }, [id, refreshPets]);

  return (
    <div
      className={styles.mainWrapper}
      onClick={() => {
        document.body.classList.add('noScroll');
        setBackDropVisible(true);
        setPetModalVisible(true);
        setActivePet(id);
      }}
    >
      <div className={styles.imgWrapper}>
        <img src={picture} alt="pet"></img>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.infoName}>{name}</div>
        <div className={styles.infoBreed}>{breed != null ? breed : ''}</div>
      </div>
      <div className={styles.nextVisitWrapper}>
        Upcoming Services:{' '}
        {services
          ? services.filter((service) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
              endOfMonth.setHours(23, 59, 59, 999);
              const serviceDate = new Date(service.date);
              serviceDate.setHours(0, 0, 0, 0);
              return serviceDate >= today && serviceDate <= endOfMonth;
            }).length
          : 'No data'}{' '}
      </div>
    </div>
  );
}
