import React from 'react';
import { Dictionary } from '../../model';

import legendStyle from './legend.module.scss';

interface Props {
  data: Dictionary<number>;
}

const COLOUR_CYCLES = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow'];
const radius = 5;

export const Legend = ({ data }: Props) => (
  <ul className={legendStyle.legendList}>
    {Object.keys(data).map((job, index) => (
      <li>
        <svg width={2 * radius} height={2 * radius}>
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill={COLOUR_CYCLES[index % COLOUR_CYCLES.length]}
          />
        </svg>
        {job}
      </li>
    ))}
  </ul>
);
