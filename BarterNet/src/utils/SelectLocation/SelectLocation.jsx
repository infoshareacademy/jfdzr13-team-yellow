import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { db } from '../../config/firebase';
import styles from './SelectLocation.module.css'
import {locations} from '../locationsList'

const SelectLocation = ({placeholder, onChange, name, value}) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'locations'), (querySnapshot) => {
      const optionsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { value: `${data.city}, ${data.voivodeship}`, label: `${data.city}, ${data.voivodeship}` };
      });
      setOptions([{value: 'ZDALNIE', label: 'ZDALNIE'}, ...optionsData]);
    }, (error) => {
      console.error('Error fetching data:', error);
    });
    setOptions(optionsData);
  
    return () => unsubscribe();
}, []);

  

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  // const handleChange = (selectedOption) => {
  //   if (selectedOption) {
  //     onChange(selectedOption);
  //   } else if (inputValue.toLowerCase() === 'zdalnie') {
  //     onChange({ value: 'ZDALNIE', label: 'ZDALNIE' });
  //   }
  // };

  return <Select className={styles.select} options={options} placeholder={placeholder} onChange={onChange} onInputChange={handleInputChange} name={name} value={value} inputValue={inputValue}
  isClearable/>;
};

export default SelectLocation;