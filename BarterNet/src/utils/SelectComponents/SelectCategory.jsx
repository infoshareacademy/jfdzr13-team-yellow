import React, { useEffect, useState } from 'react'
import categories from '../categoriesList';
import Select from 'react-select';
import styles from './SelectLocation.module.css';

const SelectCategory = ({placeholder, onChange, name, value}) => {
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
        useEffect(() => {
          const optionsData = categories.map((doc) => {
            return { value: `${doc.category}`, label: `${doc.category}` };
          });
          setOptions(optionsData);
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
  
  export default SelectCategory;