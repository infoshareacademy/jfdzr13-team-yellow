import { useEffect, useState } from 'react';
import Select from 'react-select';
import { locations } from '../locationsList';
import styles from './SelectLocation.module.css';

const SelectLocation = ({placeholder, onChange, name, value}) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

      useEffect(() => {
        const optionsData = locations.map((doc) => {
          return { value: `${doc.city}, ${doc.voivodeship}`, label: `${doc.city}, ${doc.voivodeship}` };
        });
        setOptions([{ value: 'ZDALNIE', label: 'ZDALNIE, Cała Polska' }, ...optionsData]);
      }, []);

  const handleInputChange = (inputValue) => {
    const isValid = options.some(option => 
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (isValid) {
      setInputValue(inputValue);
    } else {
      setInputValue('');
    }
  };


  return <Select className={styles.select} options={options} placeholder={placeholder} onChange={onChange} onInputChange={handleInputChange} name={name} value={value} inputValue={inputValue}
  isClearable isSearchable/>;
};

export default SelectLocation;