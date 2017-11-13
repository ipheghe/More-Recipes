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

export default (ComposedComponent) => {
/**
 * ProfileHeader Authentication
 * @class Authentication
 * @extends {Component}
 */
  class Authentication extends Component {

    static propTypes = {
      children: PropTypes.any,
      authenticated: PropTypes.bool,
      location: PropTypes.string
    };

  /**
   * render
   * @return {ReactElement} markup
   */
    render() {
      return (
        <div>
        {
          this.props.authenticated ?
            <ComposedComponent {...this.props} /> :
            <Redirect
              to={{
                pathname: '/login',
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
