/* global d3,d3jsData */

var svg = d3.select('.view'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

var color = d3.scaleOrdinal(d3.schemeCategory20);
var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function (d) {
        return d.id;
    }))
    .force('charge', d3.forceManyBody().strength(10).distanceMax(400).distanceMin(200))
    .force('center', d3.forceCenter(480, 300));

function rect(dataSet) {
    svg.selectAll("*").remove();
    var link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(dataSet.links)
        .enter().append('line')
        .attr('stroke-width', 5);

    var node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(dataSet.nodes)
        .enter().append('circle')
        .attr('r', 7)
        .attr('fill', 'blue')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    node.append('title')
        .text(function (d) {
            return d.id;
        });

    simulation
        .nodes(dataSet.nodes)
        .on('tick', ticked);

    simulation.force('link')
        .links(dataSet.links);

    function ticked() {
        link
            .attr('x1', function (d) {
                return d.source.x;
            })
            .attr('y1', function (d) {
                return d.source.y;
            })
            .attr('x2', function (d) {
                return d.target.x;
            })
            .attr('y2', function (d) {
                return d.target.y;
            });

        node
            .attr('cx', function (d) {
                console.log(d.x);
                return d.x;
            })
            .attr('cy', function (d) {
                console.log(d.y);
                return d.y;
            });
    }
}

function dragstarted(d) {
    if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) {
        simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
}
