import React from 'react';
import './ProgressRing.scss';

const ProgressRing = (id, radius, stroke, progress, color) => {

    const normalizedRadius = radius - stroke * 2;
    const circumference    = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
  
    return (
        <div id={id} class="progress-ring">
            <svg height={radius * 2} width={radius * 2} >
                <circle class="progress-circle"
                    stroke={color}
                    fill="transparent"
                    strokeWidth={ stroke }
                    strokeDasharray={ circumference + ' ' + circumference }
                    style={ { strokeDashoffset } }
                    stroke-width={ stroke }
                    r={ normalizedRadius }
                    cx={ radius }
                    cy={ radius }
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
}

export default ProgressRing;