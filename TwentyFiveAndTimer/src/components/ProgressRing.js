import React from 'react';

import styles from "../styles/ProgressRing.module.css";

const ProgressRing = ({ id, width, stroke, ratio, color }) => {

  const radius = (width / 2) - stroke - 5;   // 5 pixels padding
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference * (1 - ratio);

  return (
    <div id={id} className={styles.progressRing}>
      <svg>
        <circle
          className={styles.staticCircle}
          fill={"transparent"}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={`${stroke + 3}`}
          r={`${radius}`}
          cx={`${width / 2}`}
          cy={`${width / 2}`}
        />
        <circle
          className={styles.progressCircle}
          fill={"transparent"}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={`${stroke}`}
          strokeLinecap={"round"}
          r={`${radius}`}
          cx={`${width / 2}`}
          cy={`${width / 2}`}
          style={{ strokeDashoffset: `${strokeDashoffset}`,
                   stroke: `${color}`,
                   filter: `drop-shadow(0 0 3px ${color})`
      }}
        />
      </svg>
    </div>
  );

  //or
  // <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 36 36">
  //     <g id="circles" stroke-width="4">
  //         <circle r="16" cx="18" cy="18" fill="none" stroke="lightgray" />
  //         <circle r="16" cx="18" cy="18" fill="none" stroke="teal" stroke-dasharray="100 100" id="circle-meter" />
  //     </g>

  //     <style>
  //         #circle-meter{
  //             transform-origin: 50% 50%;
  //             transform: rotate(-90deg); // Start at the top of the circle
  //             stroke-dashoffset: 20; // This will result in an 80% filled circle
  //         }
  //     </style>
  // </svg>
};

export default ProgressRing;
