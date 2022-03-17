import React from 'react';

interface AnimatedNumberProps {
  duration?: number;
  value: number;
  formatValue?: (v: number) => string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ duration = 1000, value, formatValue = (v) => `${v}`}) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  const [animateOpt, setAnimateOpt] = React.useState({ duration, toValue: 0, startTime: +new Date() });
  React.useEffect(() => {
    setAnimateOpt({ duration, toValue: value, startTime: +new Date() });
  }, [duration, value]);
  React.useEffect(() => {
    if (animatedValue === animateOpt.toValue) return;
    const startTime : number = animateOpt.startTime;
    const endTime : number = animateOpt.startTime + animateOpt.duration;
    const endValue = animateOpt.toValue;
    const timeRange = endTime - startTime;
    const nums = timeRange / 1000 * 30 - 2;
    const remaining = endValue - animatedValue;
    const inc = nums > 0 ? (remaining / nums) : remaining;
    let nextVal = animatedValue + inc;
    if (timeRange < (1000 / 30 * 2)) {
      nextVal = endValue;
    }
    const t = requestAnimationFrame(() => {
      setAnimatedValue(nextVal);
    });
    return () => cancelAnimationFrame(t);
  }, [animateOpt, animatedValue]);
  return (
    <span>
      {formatValue(animatedValue)}
    </span>
  );
};
