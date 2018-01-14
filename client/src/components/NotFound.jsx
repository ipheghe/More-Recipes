import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage component
 * @returns {component} NotFoundPage
 */
const NotFoundPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>I am sorry, the page you were looking for cannot be found!</p>
    <p><Link href="/">Back to Home</Link></p>
  </div>
);

export default NotFoundPage;
