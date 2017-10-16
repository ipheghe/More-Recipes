import React from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends React.Component {

  render() {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>I'm sorry, the page you were looking for cannot be found!</p>
        <p><Link to="/">Back to Home</Link></p>
        
      </div>
    );
  }
}
export default NotFoundPage;  