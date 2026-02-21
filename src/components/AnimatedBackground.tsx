import React from 'react';

const particles = [
  { top: '10%', left: '5%', size: 6, delay: '0s', duration: '8s' },
  { top: '20%', left: '90%', size: 4, delay: '1s', duration: '10s' },
  { top: '40%', left: '20%', size: 8, delay: '2s', duration: '12s' },
  { top: '60%', left: '75%', size: 5, delay: '0.5s', duration: '9s' },
  { top: '75%', left: '10%', size: 7, delay: '3s', duration: '11s' },
  { top: '85%', left: '50%', size: 4, delay: '1.5s', duration: '13s' },
  { top: '30%', left: '55%', size: 5, delay: '4s', duration: '7s' },
  { top: '50%', left: '40%', size: 3, delay: '2.5s', duration: '15s' },
  { top: '15%', left: '65%', size: 6, delay: '0.8s', duration: '10s' },
  { top: '70%', left: '85%', size: 4, delay: '3.5s', duration: '8s' },
  { top: '90%', left: '30%', size: 5, delay: '1.2s', duration: '12s' },
  { top: '5%', left: '45%', size: 3, delay: '4.5s', duration: '9s' },
];

const AnimatedBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 dark:opacity-10"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: 'currentColor',
            animation: `float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
