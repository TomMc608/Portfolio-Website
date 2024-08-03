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

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const margin = 20; // Margin to prevent nodes from being cut off

      svg.attr('width', width).attr('height', height);

      const layers = 5; // Fixed number of layers (input, 3 hidden, output)
      const nodesPerLayer = [3, 5, 4, 6, 2]; // Custom number of nodes per layer [3 inputs, 3 hidden layers, 2 outputs]

      // Generate nodes
      const nodes = [];
      nodesPerLayer.forEach((count, layerIndex) => {
        for (let i = 0; i < count; i++) {
          nodes.push({ id: `layer${layerIndex}_node${i}`, layer: layerIndex });
        }
      });

      // Generate links
      const links = [];
      for (let i = 0; i < layers - 1; i++) {
        for (let j = 0; j < nodesPerLayer[i]; j++) {
          for (let k = 0; k < nodesPerLayer[i + 1]; k++) {
            links.push({ source: `layer${i}_node${j}`, target: `layer${i + 1}_node${k}` });
          }
        }
      }

      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('x', d3.forceX().strength(1).x(d => margin + d.layer * (width - 2 * margin) / (layers - 1)))
        .force('y', d3.forceY().strength(1).y((d, i) => {
          const layerNodes = nodesPerLayer[d.layer];
          return margin + (i % layerNodes) * (height - 2 * margin) / layerNodes + (height - 2 * margin) / (2 * layerNodes);
        }))
        .on('tick', ticked);

      function ticked() {
        const node = svg.selectAll('.node')
          .data(nodes)
          .join('g')
          .attr('class', 'node')
          .attr('transform', d => `translate(${d.x},${d.y})`)
          .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

        node.selectAll('circle').remove();

        node.append('circle')
          .attr('r', 10)
          .attr('fill', '#69b3a2');

        svg.selectAll('.link')
          .data(links)
          .join('line')
          .attr('class', 'link')
          .attr('stroke', '#ddd')
          .attr('stroke-width', 2)
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node.attr('transform', d => `translate(${d.x},${d.y})`);
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
        const nodeSelection = svg.selectAll('.node circle');
        const linkSelection = svg.selectAll('.link');

        function highlightNodeAndLinks(nodeIndex) {
          if (nodeIndex >= nodes.length) {
            nodeIndex = 0;
          }

          const currentNode = nodes[nodeIndex];
          const outgoingLinks = links.filter(link => link.source.id === currentNode.id);
          const incomingLinks = links.filter(link => link.target.id === currentNode.id);

          nodeSelection
            .filter((d, i) => i === nodeIndex)
            .transition()
            .duration(1000)
            .attr('fill', '#FFFF00')
            .transition()
            .duration(1000)
            .attr('fill', '#69b3a2')
            .on('end', function() {
              highlightNodeAndLinks(nodeIndex + 1);
            });

          linkSelection
            .filter(link => outgoingLinks.includes(link) || incomingLinks.includes(link))
            .transition()
            .duration(1000)
            .attr('stroke', '#FFFF00')
            .attr('stroke-width', 4)
            .transition()
            .duration(1000)
            .attr('stroke', '#ddd')
            .attr('stroke-width', 2);
        }

        highlightNodeAndLinks(0);
      }

      animateFlow();
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      svg.selectAll('*').remove();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default NeuralNetwork;
