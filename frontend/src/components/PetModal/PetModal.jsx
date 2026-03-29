import { React, useState, useEffect } from 'react';
import noImage from '../../img/noImg.png';
import styles from './PetModal.module.scss';
import Close from '../../img/icons/close.png';
import Loading from '../../img/icons/greenLoading.png';
import InnerServiceCard from '../InnerServiceCard/InnerServiceCard';
import AddButton from '../AddButton/AddButton';
import GreenButton from '../GreenButton/GreenButton';

export default function PetModal({
  petId,
  backDropVisible,
  petModalVisible,
  priceProfile,
  refreshServiceList,
  refreshPetData,
}) {
  const [photoLoading, setPhotoLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [reloadServiceData, setReloadServiceData] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [monthPeriod, setMonthPeriod] = useState(true);
  const [addServiceVisible, setAddServiceVisible] = useState(false);
  const [availableServices, setAvailableServices] = useState({});
  const [serviceCategories, setServiceCategories] = useState({});
  const [servicePrices, setServicePrices] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedService, setSelectedService] = useState(1);
  const [userDiscount, setUserDiscout] = useState(0);
  const [pictureUrl, setPictureUrl] = useState('');
  const [petData, setPetData] = useState({});
  const [breedData, setBreedData] = useState({});
  const [typeData, setTypeData] = useState({});
  const [date, setDate] = useState();
  const [servicesData, setServicesData] = useState([]);
  const [creatingService, setCreatingService] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  function refreshServices() {
    setReloadServiceData((prev) => !prev);
  }

  function toggleHistory() {
    historyVisible ? setHistoryVisible(false) : setHistoryVisible(true);
  }

  function showAddService() {
    setHistoryVisible(false);
    setAddServiceVisible(true);
  }

  const handleDateChange = (e) => {
    const selected = e.target.value;

    if (!selected) {
      setDate('');
      return;
    }

    if (selected < today) {
      setDate(today);
    } else {
      setDate(selected);
    }
  };

  function handleAddService() {
    setCreatingService(true);
    const pet_id = petId;
    const service_date = date;
    const name_snapshot = availableServices.filter((service) => {
      return service.id === Number(selectedService);
    })[0].name;

    const category_snapshot = serviceCategories.filter(
      (category) => category.id === Number(selectedCategory),
    )[0].name;
    const price_snapshot =
      (Number(
        servicePrices.filter((price) => price.availableServices_id === Number(selectedService))[0]
          .price,
      ) *
        (100 - Number(userDiscount.discount))) /
      100;

    const postData = async () => {
      fetch('http://localhost:8000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pet_id,
          date: service_date,
          name_snapshot,
          category_snapshot,
          price_snapshot,
        }),
      })
        .then()
        .then(() => {
          setCreatingService(false);
          setAddServiceVisible(false);
          refreshServiceList();
          refreshServices();
          refreshPetData();
        });
    };
    postData();
  }

  useEffect(() => {
    setPhotoLoading(true);
    setDataLoading(true);
    setServicesLoading(true);
    setDate(today);

    const fetchData = async () => {
      const petRes = await fetch(`http://localhost:8000/api/pets/${petId}`);
      const petData = await petRes.json();
      setPetData(petData);

      const pictureRes = await fetch(`http://localhost:8000/api/getPicturesByPetId/${petId}`);
      const pictureData = await pictureRes.json();
      pictureData[0] === undefined ? setPictureUrl('') : setPictureUrl(pictureData[0].url);
      setPhotoLoading(false);

      const breedRes = await fetch(`http://localhost:8000/api/breeds/${petData.breeds_id}`);
      const breedData = await breedRes.json();
      setBreedData(breedData);

      const typeRes = await fetch(`http://localhost:8000/api/petTypes/${breedData.petTypes_id}`);
      const typeData = await typeRes.json();
      setTypeData(typeData);
      setDataLoading(false);

      const servicesRes = await fetch(`http://localhost:8000/api/getServicesByPetId/${petId}`);
      const servicesData = await servicesRes.json();
      setServicesData(servicesData);
      setServicesLoading(false);
    };

    fetchData();
  }, [petId, reloadServiceData]);

  useEffect(() => {
    const fetchData = async () => {
      const availableServicesRes = await fetch(`http://localhost:8000/api/availableServices`);
      const availableServicesData = await availableServicesRes.json();
      setAvailableServices(availableServicesData);

      const serviceCategoriesRes = await fetch(`http://localhost:8000/api/serviceCategories`);
      const serviceCategoriesData = await serviceCategoriesRes.json();
      setServiceCategories(serviceCategoriesData);

      const servicePricesRes = await fetch(`http://localhost:8000/api/servicePrices`);
      const servicePricesData = await servicePricesRes.json();
      setServicePrices(servicePricesData);

      const discountRes = await fetch(`http://localhost:8000/api/priceProfiles/${priceProfile}`);
      const discountData = await discountRes.json();
      setUserDiscout(discountData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.mainWrapper}>
        {addServiceVisible && <div className={styles.secondBackDrop}></div>}
        {addServiceVisible && (
          <div className={styles.addService}>
            <div className={styles.title}>
              <span>Add New Service</span>
              <img
                src={Close}
                alt="close"
                onClick={() => {
                  setAddServiceVisible(false);
                }}
              ></img>
            </div>
            <div className={styles.body}>
              <div className={styles.selectWrapper}>
                <div className={styles.selectTitle}>Select service category:</div>
                <select
                  className={styles.select}
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                >
                  {serviceCategories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.selectWrapper}>
                <div className={styles.selectTitle}>Select service:</div>
                <select
                  value={selectedService}
                  className={styles.select}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                  }}
                >
                  {availableServices
                    .filter((item) => item.serviceCategories_id === Number(selectedCategory))
                    .map((service) => {
                      return (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className={styles.selectWrapper}>
                <div className={styles.selectTitle}>Service price:</div>
                <div className={styles.select}>
                  {Number(
                    servicePrices.filter(
                      (price) => price.availableServices_id === Number(selectedService),
                    )[0].price,
                  )}
                  €
                </div>
              </div>
              <div className={styles.selectWrapper}>
                <div className={styles.selectTitle}>Your price (-{userDiscount.discount}%):</div>
                <div className={styles.select}>
                  {(Number(
                    servicePrices.filter(
                      (price) => price.availableServices_id === Number(selectedService),
                    )[0].price,
                  ) *
                    (100 - Number(userDiscount.discount))) /
                    100}
                  €
                </div>
              </div>
              <div className={styles.selectWrapper}>
                <div className={styles.selectTitle}>Select service time:</div>
                <input
                  type="date"
                  className={styles.select}
                  min={today}
                  value={date}
                  onChange={handleDateChange}
                ></input>
              </div>
              <div className={styles.controlWrapper}>
                <GreenButton
                  text="Add service"
                  loading={creatingService}
                  onClick={handleAddService}
                />
              </div>
            </div>
          </div>
        )}
        <div className={styles.leftSide}>
          <div className={styles.pictureWrapper}>
            {photoLoading ? (
              <img className={styles.loading} src={Loading} alt="Loading" />
            ) : (
              <img
                className={styles.image}
                src={pictureUrl === '' ? noImage : `http://localhost:8000/storage/${pictureUrl}`}
                alt="pet"
              ></img>
            )}
          </div>
          {dataLoading ? (
            <img className={styles.loading} src={Loading} alt="Loading" />
          ) : (
            <>
              <div className={styles.infoTitleDisplay}>Name:</div>
              <div className={styles.infoDisplay}>{petData.name}</div>
              <div className={styles.infoTitleDisplay}>Breed:</div>
              <div className={styles.infoDisplay}>{breedData.name}</div>
              <div className={styles.infoTitleDisplay}>Type:</div>
              <div className={styles.infoDisplay}>{typeData.type}</div>
            </>
          )}
        </div>
        <div className={styles.rightSide}>
          <div className={styles.control}>
            <img
              src={Close}
              alt="Close"
              onClick={() => {
                document.body.classList.remove('noScroll');
                petModalVisible(false);
                backDropVisible(false);
              }}
            />
          </div>
          <div className={styles.serviceListTitle}>
            <div className={styles.titleContainer}>Upcoming services</div>

            <div className={styles.serviceTotalPrice}>
              {servicesData
                .filter((service) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const serviceDate = new Date(service.date);
                  serviceDate.setHours(0, 0, 0, 0);
                  return serviceDate >= today;
                })
                .reduce((sum, service) => sum + Number(service.price_snapshot), 0)}
              €
            </div>
          </div>
          <div className={styles.serviceList}>
            {servicesLoading ? (
              <img className={styles.loading} src={Loading} alt="Loading" />
            ) : servicesData.length === 0 ? (
              'No services added'
            ) : (
              servicesData
                .filter((service) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const serviceDate = new Date(service.date);
                  serviceDate.setHours(0, 0, 0, 0);
                  return serviceDate >= today;
                })
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((service) => (
                  <InnerServiceCard
                    key={service.id}
                    service={service}
                    refreshServices={refreshServices}
                    refreshServiceList={refreshServiceList}
                  />
                ))
            )}
          </div>
          <div className={styles.controlButtonContainer}>
            {dataLoading ? (
              ''
            ) : (
              <>
                <button className={styles.historyControlButton} onClick={toggleHistory}>
                  Show history
                </button>
                <AddButton text={'Add Service'} callBack={showAddService} />
              </>
            )}
          </div>
        </div>
      </div>
      <div id="historyDisplay" className={historyVisible ? styles.historyDisplay : styles.hidden}>
        <div className={styles.filterWrapper}>
          <button
            className={styles.filterButton}
            onClick={() => {
              setMonthPeriod(true);
            }}
          >
            This month
          </button>
          <button
            className={styles.filterButton}
            onClick={() => {
              setMonthPeriod(false);
            }}
          >
            All time
          </button>
          <div className={styles.expenseDisplay}>
            <div className={styles.title}>Total expense:</div>
            <div className={styles.expenses}>
              {monthPeriod
                ? servicesData
                    .filter((service) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                      const serviceDate = new Date(service.date);
                      serviceDate.setHours(0, 0, 0, 0);
                      return serviceDate >= startOfMonth && serviceDate < today;
                    })
                    .reduce((sum, service) => sum + Number(service.price_snapshot), 0)
                : servicesData
                    .filter((service) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const serviceDate = new Date(service.date);
                      serviceDate.setHours(0, 0, 0, 0);
                      return serviceDate < today;
                    })
                    .reduce((sum, service) => sum + Number(service.price_snapshot), 0)}
              €
            </div>
          </div>
        </div>
        <div className={styles.serviceHistory}>
          {monthPeriod
            ? servicesData
                .filter((service) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                  const serviceDate = new Date(service.date);
                  serviceDate.setHours(0, 0, 0, 0);
                  return serviceDate >= startOfMonth && serviceDate < today;
                })
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((service) => (
                  <InnerServiceCard
                    key={service.id}
                    service={service}
                    refreshServices={refreshServices}
                  />
                ))
            : servicesData
                .filter((service) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const serviceDate = new Date(service.date);
                  serviceDate.setHours(0, 0, 0, 0);
                  return serviceDate < today;
                })
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((service) => (
                  <InnerServiceCard
                    key={service.id}
                    service={service}
                    refreshServices={refreshServices}
                  />
                ))}
        </div>
      </div>
    </>
  );
}
