
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class Authentication extends Component {

    //   componentWillMount() {
    //     if (!this.props.authenticated) {
    //       location.hash = '#login';
    //     }
    //   }

    //   componentWillUpdate(nextProps) {
    //     if (!nextProps.authenticated) {
    //       location.hash = '#login';
    //     }
    //   }

    //   render() {
    //     return <ComposedComponent {...this.props} />;
    //   }
    // }
    render() {
      return (
        <div>
          {this.props.authenticated
            ? <ComposedComponent {...this.props} />
            :
            <Redirect to={{
              pathname: '/login',
              state: { from: this.props.location }
            }}
            />
          }
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
