import { React, useState } from 'react';
import styles from './ServiceCard.module.scss';
import Grooming from '../../img/icons/grooming.png';
import Training from '../../img/icons/training.png';
import Medical from '../../img/icons/medical.png';
import Boarding from '../../img/icons/boarding.png';
import Nutrition from '../../img/icons/nutrition.png';
import Transport from '../../img/icons/transport.png';
import Breeding from '../../img/icons/breeding.png';

export default function ServiceCard({ service, petList }) {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.logo}>
        <img
          src={
            !service
              ? ''
              : service.category_snapshot === 'Grooming'
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
      <div className={styles.info}>
        <div className={styles.infoTop}>
          {service ? petList.filter((pet) => pet.id === service.pet_id)[0].name : ''}
        </div>
        <div className={styles.infoBottom}>{service ? service.name_snapshot : ''}</div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.price}>{service ? service.price_snapshot : ''}€</div>
        <div className={styles.date}>{service ? service.date : ''}</div>
      </div>
    </div>
  );
}
