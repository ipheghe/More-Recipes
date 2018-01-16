import React from 'react';

/**
   * handle form event error
   *
   * @param {bool} stateError
   * @param {string} propsErrorMessage
   * @param {string} stateErrorMessage
   * @param {string} color
   *
   * @returns {string} errorMessage
   */
const renderErrorAlert = (stateError, propsErrorMessage, stateErrorMessage, color) => {
  if (stateError) {
    return (
      <div>
        <p className="alert error-alert" style={{ color }}>
          <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
          {stateErrorMessage}
        </p>
      </div>
    );
  } else if (propsErrorMessage) {
    return (
      <div>
        <p className="alert error-alert" style={{ color }}>
          <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
          {propsErrorMessage}
        </p>
      </div>
    );
  }
};

export default renderErrorAlert;
