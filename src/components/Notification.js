import React, { useState, useEffect } from 'react';
import { requestPermission, onMessageListener } from '../firebase';

function Notification() {

  useEffect(() => {
    requestPermission();
    onMessageListener()
      .then((payload) => {
        console.log('payload', payload);
      })
      .catch((err) => console.log('failed: ', err));
  }, []);;
}

export default Notification;
