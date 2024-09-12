import { motion } from 'framer-motion';

const gradients = [
  {
    id: 'Gradient1',
    colorStart: 'rgba(255, 0, 255, 1)',
    colorEnd: 'rgba(255, 0, 255, 0)',
    duration: 34,
  },
  {
    id: 'Gradient2',
    colorStart: 'rgba(255, 255, 0, 1)',
    colorEnd: 'rgba(255, 255, 0, 0)',
    duration: 23.5,
  },
  {
    id: 'Gradient3',
    colorStart: 'rgba(0, 255, 255, 1)',
    colorEnd: 'rgba(0, 255, 255, 0)',
    duration: 21.5,
  },
  {
    id: 'Gradient4',
    colorStart: 'rgba(0, 255, 0, 1)',
    colorEnd: 'rgba(0, 255, 0, 0)',
    duration: 23,
  },
  {
    id: 'Gradient5',
    colorStart: 'rgba(0,0,255, 1)',
    colorEnd: 'rgba(0,0,255, 0)',
    duration: 24.5,
  },
  {
    id: 'Gradient6',
    colorStart: 'rgba(255,0,0, 1)',
    colorEnd: 'rgba(255,0,0, 0)',
    duration: 25.5,
  },
];

function AnimatedRect({
  gradientId,
  rotateFrom,
  rotateTo,
  duration,
  xValues,
  yValues,
}) {
  return (
    <motion.rect
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      fill={`url(#${gradientId})`}
      animate={{
        x: xValues,
        y: yValues,
        rotate: [rotateFrom, rotateTo],
      }}
      transition={{ duration, repeat: Infinity }}
    />
  );
}

export default function () {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        {gradients.map((gradient) => (
          <radialGradient
            key={gradient.id}
            id={gradient.id}
            cx="50%"
            cy="50%"
            r=".5"
          >
            <stop offset="0%" stopColor={gradient.colorStart} />
            <stop offset="100%" stopColor={gradient.colorEnd} />
          </radialGradient>
        ))}
      </defs>

      <AnimatedRect
        gradientId="Gradient1"
        rotateFrom={0}
        rotateTo={360}
        duration={7}
        xValues={['25%', '0%', '25%']}
        yValues={['0%', '25%', '0%']}
      />
      <AnimatedRect
        gradientId="Gradient2"
        rotateFrom={0}
        rotateTo={360}
        duration={12}
        xValues={['-25%', '0%', '-25%']}
        yValues={['0%', '50%', '0%']}
      />
      <AnimatedRect
        gradientId="Gradient3"
        rotateFrom={360}
        rotateTo={0}
        duration={9}
        xValues={['0%', '25%', '0%']}
        yValues={['0%', '25%', '0%']}
      />
    </svg>
  );
}
