import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={`notification ${message.type}`}>{message.value}</div>;
};

export default Notification;
