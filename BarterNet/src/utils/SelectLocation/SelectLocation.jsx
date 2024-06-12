import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { db } from '../../config/firebase';
import styles from './SelectLocation.module.css'

const SelectLocation = ({placeholder, onChange, name, value}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'locations'), (querySnapshot) => {
      const optionsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { value: `${data.city}, ${data.voivodeship}`, label: `${data.city}, ${data.voivodeship}` };
      });
      setOptions(optionsData);
    }, (error) => {
      console.error('Error fetching data:', error);
    });

    return () => unsubscribe();
  }, []);

  return <Select className={styles.select} options={options} placeholder={placeholder} onChange={onChange} name={name} value={value}/>;
};

export default SelectLocation;