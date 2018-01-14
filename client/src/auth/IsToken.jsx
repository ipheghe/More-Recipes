import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import decodeToken from '../helpers/decodeToken';

let checkToken = false;
const token = window.localStorage.getItem('token');

if (token) {
  const decodedToken = decodeToken(token);
  if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
    checkToken = false;
  } else {
    checkToken = true;
  }
}

export default (ComposedComponent) => {
/**
 * ProfileHeader Authentication
 * @class Authentication
 *
 * @extends {Component}
 */
  class Authentication extends Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      location: PropTypes.objectOf(PropTypes.string).isRequired
    };

    /**
   * render
   * @return {ReactElement} markup
   */
    render() {
      return (
        <div>
          {
          !checkToken && (this.props.location.pathname !== '/login' || this.props.location.pathname !== '/signup' || this.props.location.pathname !== '/') ?
            <ComposedComponent {...this.props} /> :
            <Redirect
              to={{
                pathname: '/dashboard',
                state: {
                  from: this.props.location
                }
              }}
            />
        }
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps)(Authentication);
};
