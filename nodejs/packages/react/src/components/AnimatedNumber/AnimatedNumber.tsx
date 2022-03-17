import React from 'react';

interface AnimatedNumberProps {
  duration?: number;
  value: number;
  formatValue?: (v: number) => string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ duration = 1000, value, formatValue = (v) => `${v}`}) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  const [animateOpt, setAnimateOpt] = React.useState({ duration, toValue: 0 });
  React.useEffect(() => {
    setAnimateOpt({ duration, toValue: value });
  }, [duration, value]);
  React.useEffect(() => {
    let tick = -1;
    const startTime : number = +new Date();
    const endTime : number = new Date().valueOf() + duration;
    const startValue = animatedValue;
    const endValue = animateOpt.toValue;
    const runAnimation = () => {
      const t = +new Date();
      if (t >= endTime) {
        setAnimatedValue(endValue);
        return;
      }
      const remained = endTime - t;
      const percent = remained / (endTime - startTime);
      const val = startValue + ((endValue - startValue) * percent);
      setAnimatedValue(val);
      tick = requestAnimationFrame(runAnimation);
    };
    runAnimation();
    return () => cancelAnimationFrame(tick);
  }, [animateOpt]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <span>
      {formatValue(animatedValue)}
    </span>
  );
};

export default AnimatedNumber;
