import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Spinner.module.css';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const Spinner = ({ loading }) => {
    return (
      <div className={styles.spinnerContainer}>
        <ClipLoader color={'#023853'} loading={loading} css={override} size={100} />
      </div>
    );
  };

export default Spinner;