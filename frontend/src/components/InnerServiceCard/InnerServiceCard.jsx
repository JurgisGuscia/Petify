import React from 'react';
import styles from './InnerServiceCard.module.scss';
import Grooming from '../../img/icons/grooming.png';
import Training from '../../img/icons/training.png';
import Medical from '../../img/icons/medical.png';
import Boarding from '../../img/icons/boarding.png';
import Nutrition from '../../img/icons/nutrition.png';
import Transport from '../../img/icons/transport.png';
import Breeding from '../../img/icons/breeding.png';
import Delete from '../../img/icons/delete.png';

export default function InnerServiceCard({ service, refreshServices, refreshServiceList }) {
  function handleDeleteService() {
    fetch(`http://localhost:8000/api/services/${service.id}`, {
      method: 'DELETE',
    }).then(() => {
      refreshServices();
      refreshServiceList();
    });
  }

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <img
          src={
            service.category_snapshot === 'Grooming'
              ? Grooming
              : service.category_snapshot === 'Medical'
                ? Medical
                : service.category_snapshot === 'Boarding & Care'
                  ? Boarding
                  : service.category_snapshot === 'Training'
                    ? Training
                    : service.category_snapshot === 'Nutrition'
                      ? Nutrition
                      : service.category_snapshot === 'Transport'
                        ? Transport
                        : Breeding
          }
          alt="service icon"
        ></img>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.name}>{service.name_snapshot}</div>
        <div className={styles.date}>{service.date}</div>
      </div>
      <div className={styles.price}>{service.price_snapshot}€</div>
      <div className={styles.deleteWrapper} onClick={handleDeleteService}>
        <img src={Delete} alt="delete icon" />
      </div>
    </div>
  );
}
