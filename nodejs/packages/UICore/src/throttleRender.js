/**
 *
 * throttleRender
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, isEqual } from 'lodash';

export const throttleRender = (View, throttleTime = 100) => {

  class ThrottleView extends React.Component {

    timer = null;
    shouldUpdate = true;

    state = { count: 0 };

    shouldComponentUpdate(nextProps, nextState) {
      if (this.shouldUpdate) {
        return true;
      }
      if (this.timer == null) {
        this.timer = setTimeout(() => {
          this.timer = null;
          this.shouldUpdate = true;
          this.setState((sts) => ({ count: sts.count + 1 }));
        }, throttleTime);
      }
      this.shouldUpdate = false;
      return false;
    }

    componentDidUpdate() {
      this.shouldUpdate = false;
      if (this.timer == null) {
        setTimeout(() => {
          this.shouldUpdate = true;
        }, throttleTime);
      }
    }

    render() {
      return <View {...this.props} />;
    }
  }

  return (props) => <ThrottleView {...props} />;
};


export default throttleRender;
