import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import piechartStyle from './piechart.module.scss';

interface Props {
  data: number[];
  size: number;
  animationTime: number;
  radiusRatio: number; // Determines the thickness of the pie chart ring - 0 gives full circle, 1 just the border
  textSize: number; // Inner text size
}

const COLOUR_CYCLES = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow'];

const dataTransition = (arc: any) => (data: any) => (t: number) =>
  arc({
    ...data,
    startAngle: t * data.startAngle,
    endAngle: t * data.endAngle,
  });

const drawArcs = (domElement: any, props: Props) => {
  const { size, data, radiusRatio, animationTime } = props;
  const outerRadius = size / 2;
  const innerRadius = radiusRatio * outerRadius;
  const pie = d3.pie().sort(null);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const pieSliceData = pie(data);

  const group = domElement
    .append('g')
    .attr('transform', `translate(${size / 2},${size / 2})`)
    .attr('class', 'arcs');

  group
    .selectAll('.arcs.arc')
    .data(pieSliceData)
    .enter()
    .append('path')
    .attr('class', 'arc')
    .attr('fill', (_: any, i: number) => COLOUR_CYCLES[i])
    .transition()
    .duration(animationTime)
    .attrTween('d', dataTransition(arc));
};

const drawCenterNumber = (domElement: any, props: Props) => {
  const { data, textSize, animationTime } = props;
  const numberToShow = data.reduce((el: number, sum: number) => sum + el, 0);

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

const drawChart = (props: Props, ref: any) => {
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
      className={piechartStyle.svg}
    />
  );
};

export default PieChart;
