import React from 'react'
import { ToastContainer} from "react-toastify";
import styles from './ToastContainer.module.css'


const Toast = () => {
  return (
    <ToastContainer
    className={styles.toast}
    position="bottom-center"
    autoClose={11113000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
  )
}

export default Toast