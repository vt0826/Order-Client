import React from 'react';

export const AccountInfo = props => {
  return (
    <div>
      <div className="userIcon">
        <img src={require('../assets/thyhive-logo.png')} alt="Logo" />
      </div>
      <div>
        <h6>First Name : </h6>
        <p> {props.account.firstName} </p>
      </div>
      <div>
        <h6>Last Name : </h6>
        <p> {props.account.lastName}</p>
      </div>
      <div>
        <h6> Email : </h6>
        <p> {props.account.email}</p>
      </div>
      <div>
        <h6> Phone : </h6>
        <p> {props.account.phone}</p>
      </div>
      <div>
        <h6> Address : </h6>
        <p> {props.account.address}</p>
      </div>
    </div>
  );
};
