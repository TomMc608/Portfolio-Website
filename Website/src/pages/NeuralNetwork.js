import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NeuralNetwork = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', '100vw')
      .attr('height', '100vh')
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const layers = 4; // Number of layers in the network
    const nodesPerLayer = 6; // Number of nodes per layer

    // Generate nodes
    const nodes = [];
    for (let i = 0; i < layers; i++) {
      for (let j = 0; j < nodesPerLayer; j++) {
        nodes.push({ id: `layer${i}_node${j}`, layer: i });
      }
    }

    // Generate links
    const links = [];
    for (let i = 0; i < layers - 1; i++) {
      for (let j = 0; j < nodesPerLayer; j++) {
        for (let k = 0; k < nodesPerLayer; k++) {
          links.push({ source: `layer${i}_node${j}`, target: `layer${i + 1}_node${k}` });
        }
      }
    }

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-30))
      .force('x', d3.forceX().strength(0.5).x(d => d.layer * (width / (layers - 1))))
      .force('y', d3.forceY().strength(0.5).y((d, i) => (i % nodesPerLayer) * (height / nodesPerLayer)))
      .on('tick', ticked);

    function ticked() {
      svg.selectAll('.link')
        .data(links)
        .join('line')
        .attr('class', 'link')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 2);

      svg.selectAll('.node')
        .data(nodes)
        .join('circle')
        .attr('class', 'node')
        .attr('r', 10)
        .attr('fill', '#69b3a2')
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      svg.selectAll('.node')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      svg.selectAll('.link')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function animateFlow() {
      const nodeSelection = svg.selectAll('.node');
      const linkSelection = svg.selectAll('.link');

      function glowPath(index) {
        if (index >= links.length) {
          index = 0;
        }

        linkSelection
          .filter((d, i) => i === index)
          .attr('stroke', '#ffab00')
          .attr('stroke-width', 4)
          .transition()
          .duration(500)
          .attr('stroke', '#ddd')
          .attr('stroke-width', 2)
          .on('end', () => glowPath(index + 1));
      }

      function glowNode(index) {
        if (index >= nodes.length) {
          index = 0;
        }

        nodeSelection
          .filter((d, i) => i === index)
          .attr('r', 15)
          .attr('fill', '#ffab00')
          .transition()
          .duration(500)
          .attr('r', 10)
          .attr('fill', '#69b3a2')
          .on('end', () => glowNode(index + 1));
      }

      glowPath(0);
      glowNode(0);
    }

    animateFlow();

    return () => {
      svg.selectAll('*').remove();
    };
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default NeuralNetwork;
