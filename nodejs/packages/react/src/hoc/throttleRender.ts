/**
 *
 * throttleRender
 *
 */
import * as React from 'react';

interface Props {} // eslint-disable-line

type State = {
  count: number;
};

export const throttleRender =
  (throttleTime = 100) =>
  (View: React.ComponentType<Props>): React.FC<Props> => {
    class ThrottleView extends React.Component<Props, State> {
      timer: NodeJS.Timeout | null = null;
      shouldUpdate: boolean = true;

      state = { count: 0 };

      shouldComponentUpdate() {
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
        return React.createElement(View, this.props);
      }
    }

    const ThrottledView = (props: Props) => React.createElement(ThrottleView, props);
    ThrottledView.displayName = `Throttled${
      View.displayName ? `(${View.displayName})` : ''
    }<${throttleTime}>`;
    return ThrottledView;
  };

export default throttleRender;
