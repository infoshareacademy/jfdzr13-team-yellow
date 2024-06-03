import React from 'react';
import { ClipLoader } from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const Spinner = ({ loading }) => {
  return (
    <ClipLoader color={'#023853'} loading={loading} css={override} size={100} />
  );
};

export default Spinner;