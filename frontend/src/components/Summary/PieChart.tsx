import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import tippy from 'tippy.js';

import { Dictionary } from '../../model';
import pieChartStyle from './pieChart.module.scss';
import { COLOUR_CYCLES } from '../../utils/colours';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  data: Dictionary<number>;
  size: number;
  animationTime: number;
  radiusRatio: number; // Determines the thickness of the pie chart ring - 0 gives full circle, 1 just the border
  textSize: number; // Inner text size
}

const dataTransition = (arc: d3.Arc<void, any>) => (
  data: d3.PieArcDatum<Dictionary<number>>
) => (t: number) =>
  arc({
    ...data,
    startAngle: t * data.startAngle,
    endAngle: t * data.endAngle,
  });

const drawArcs = (domElement: any, props: Props) => {
  const { size, data, radiusRatio, animationTime } = props;
  const outerRadius = size / 2;
  const innerRadius = radiusRatio * outerRadius;
  const pie = d3
    .pie<{ value: number }>()
    .sort(null)
    .value(({ value }: { value: number }) => value);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const pieSliceData = pie(d3.entries(data));

  const group = domElement
    .append('g')
    .attr('transform', `translate(${size / 2},${size / 2})`)
    .attr('class', 'arcs');

  group
    .selectAll('.arcs.arc')
    .data(pieSliceData)
    .enter()
    .append('path')
    .attr(
      'class',
      ({ index }: d3.PieArcDatum<Dictionary<number>>) => `arc${index}`
    )
    .attr('fill', (_: any, i: number) => COLOUR_CYCLES[i])
    .on('mouseover', (d: d3.PieArcDatum<Dictionary<number>>) => {
      tippy(`.arc${d.index}`, {
        content: `${d.data.key} - ${d.data.value} hours`,
      });
    })
    .transition()
    .duration(animationTime)
    .attrTween('d', dataTransition(arc));
};

const drawCenterNumber = (domElement: any, props: Props) => {
  const { data, textSize, animationTime } = props;
  const numberToShow = Object.values(data).reduce(
    (el: number, sum: number) => sum + el,
    0
  );

  domElement
    .append('g')
    .attr('class', 'text-group')
    .append('text')
    .attr('x', '50%')
    .attr('y', '50%')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('alignment-baseline', 'central')
    .attr('font-size', 0)
    .text(numberToShow)
    .transition()
    .duration(animationTime)
    .attr('font-size', textSize);
};

const drawChart = (props: Props, ref: React.RefObject<SVGElement>) => {
  const domElement = d3.select(ref.current);

  domElement.selectAll('*').remove();
  drawArcs(domElement, props);
  drawCenterNumber(domElement, props);
};

const PieChart = (props: Props) => {
  const { size } = props;
  const svgRef = useRef(null);
  useEffect(() => drawChart(props, svgRef), [props]);
  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      className={pieChartStyle.svg}
    />
  );
};

export default PieChart;
