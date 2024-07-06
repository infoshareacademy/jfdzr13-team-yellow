import { useEffect, useState } from 'react';
import Select from 'react-select';
import { locations } from '../locationsList';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '3px',
    border: `2px solid ${state.isFocused ? '#000' : 'var(--form-border-color)'}`,
    borderRadius: '25px',
    cursor: 'pointer',
    
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#778da9',
    fontSize: '16px',
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeight: 'normal',
  }),
  placeholder: (provided) => ({
    ...provided,
    // color: '#778da999',
    fontSize: '16px',
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeight: 'normal',
  }),
  options: (provided) => ({
    ...provided,
    border: `2px solid ${state.isFocused ? '#000' : 'var(--form-border-color)'}`,
    borderRadius: '25px',
  }),
};


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


  return <Select styles={customStyles} options={options} placeholder={placeholder} onChange={onChange} onInputChange={handleInputChange} name={name} value={value} inputValue={inputValue}
  isClearable isSearchable/>;
};

export default SelectLocation;


