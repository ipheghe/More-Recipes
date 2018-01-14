import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage component
 * @returns {component} NotFoundPage
 */
const NotFoundPage = () => (
  <div>
    <div className="notFound-background">
      <div className="notFound-body">
        <h1><span>4</span><span style={{ color: '#5cb85c' }}>0</span>4</h1>
        <h2>Page Not Found</h2>
        <p>I am sorry, the page you were looking for cannot be found!</p>
        <p>
          <Link to="/" className="btn btn-success btn-lg">
            <span><i className="fa fa-home" /></span>Back to Home
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
