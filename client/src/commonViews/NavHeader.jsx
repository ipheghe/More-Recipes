import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MainHeader,
  UserNavHeader,
} from '../commonViews';

/**
 * NavHeader component
 *
 * @class NavHeader
 *
 * @extends {React.Component}
 */
class NavHeader extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired
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
          <UserNavHeader /> : <MainHeader />
      }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export { NavHeader as PureNavHeader };
export default connect(mapStateToProps)(NavHeader);
