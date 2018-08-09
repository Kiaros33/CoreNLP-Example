import { Injectable, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class D3Service {
  constructor() {}

  dataList: any;
  margin: any;
  width: number;
  height: number;
  svg: any;
  duration: number;
  root: any;
  tree: any;
  nodes: any;
  links: any;
  treeData: any;
  length: number;
  div: any;

  fetchData = tree => {
    this.div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', '0');

    if (this.length !== 0) {
      for (let i = 0; i < this.length; i++) {
        d3.select('svg').remove();
      }
      this.length = 0;
    }

    for (let i = 0; i < tree.responseTree.length; i += 1) {
      this.treeData = tree.responseTree[i];
      this.setData();
      this.length += 1;
    }
  };

  offset = el => {
    let rect = el.getBoundingClientRect();
    return [rect.left, rect.top];
  };

  setData() {
    this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
    this.width = 1500 - this.margin.left - this.margin.right;
    this.height = 1400 - this.margin.top - this.margin.bottom;

    this.svg = d3
      .select('body')
      .append('svg')
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.duration = 750;

    // declares a tree layout and assigns the size
    this.tree = d3.tree().size([this.height, this.width]);

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(this.treeData, d => {
      return d.children;
    });
    this.root.x0 = this.height / 2;
    this.root.y0 = 10;

    // Collapse after the second level
    // this.root.children.forEach(collapse);

    this.updateChart(this.root);

    // function collapse(d) {
    //   if (d.children) {
    //     d._children = d.children;
    //     d._children.forEach(collapse);
    //     d.children = null;
    //   }
    // }
  }

  click = d => {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.updateChart(d);
  };

  mouseOver = d => {
    if (d.data.posInfo) {
      this.div.style('opacity', '1');
    }

    if (d.data.posInfo && d.data.posInfo.group) {
      this.div.html(
        `
      <div>
      <span>Index: ${d.data.token.index - 1}</span><br/>
      <span>BeginsAt: ${d.data.token.characterOffsetBegin}</span><br/>
      <span>PosInfo: ${d.data.posInfo.group}</span><br/>
      <span>EndsAt: ${d.data.token.characterOffsetEnd}</span><br/>
      <span>Lemma: ${d.data.token.lemma}</span><br/>
      <span>Ner: ${d.data.token.ner}</span><br/>
      <span>Pos: ${d.data.token.pos}</span><br/>
      </div>
      `
      );
    } else if (d.data.posInfo && d.data.posInfo.description) {
      this.div.html(
        `
      <div>
      <span>PosInfo: ${d.data.posInfo.description}</span><br/>
      </div>
      `
      );
    }
    this.div
      .style('position', 'absolute')
      .style('left', this.offset(event.target)[0] + window.scrollX + 15 + 'px')
      .style('top', this.offset(event.target)[1] + window.scrollY + 15 + 'px');
  };

  mouseOut = d => {
    this.div
      .style('opacity', '0')
      .style('left', 0 + 'px')
      .style('top', 0 + 'px');
  };

  updateChart(source) {
    let i = 0;
    console.log(source);
    this.treeData = this.tree(this.root);
    this.nodes = this.treeData.descendants();
    this.links = this.treeData.descendants().slice(1);
    this.nodes.forEach(d => {
      d.y = d.depth * 100 + 100;
    });

    let node = this.svg.selectAll('g.node').data(this.nodes, d => {
      return d.id || (d.id = ++i);
    });

    let nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', this.click);

    nodeEnter
      .append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', d => {
        return d._children ? 'lightsteelblue' : '#fff';
      })
      .on('mouseover', this.mouseOver)
      .on('mouseout', this.mouseOut);

    nodeEnter
      .append('text')
      .attr('dy', '-0.9em')
      .attr('x', d => {
        return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', d => {
        return d.children || d._children ? 'end' : 'start';
      })
      .style('font', '11px sans-serif')
      .text(d => {
        return (
          d.data.word +
          ' (' +
          (d.data.posInfo && d.data.posInfo.group ? d.data.posInfo.group : d.data.pos) +
          ')'
        );
      });

    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate
      .transition()
      .duration(this.duration)
      .attr('transform', d => {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate
      .select('circle.node')
      .attr('r', 10)
      .style('stroke-width', '3px')
      .style('stroke', 'steelblue')
      .style('fill', d => {
        return d._children ? 'lightsteelblue' : '#fff';
      })
      .attr('cursor', 'pointer');

    let nodeExit = node
      .exit()
      .transition()
      .duration(this.duration)
      .attr('transform', d => {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('circle').attr('r', 1e-6);

    nodeExit.select('text').style('fill-opacity', 1e-6);

    let link = this.svg.selectAll('path.link').data(this.links, d => {
      return d.id;
    });

    let linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '2px')
      .attr('d', function(d) {
        let o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });

    let linkUpdate = linkEnter.merge(link);

    linkUpdate
      .transition()
      .duration(this.duration)
      .attr('d', d => {
        return diagonal(d, d.parent);
      });

    let linkExit = link
      .exit()
      .transition()
      .duration(this.duration)
      .attr('d', function(d) {
        let o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();

    this.nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
    function diagonal(s, d) {
      let path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;
      return path;
    }
  }
}
