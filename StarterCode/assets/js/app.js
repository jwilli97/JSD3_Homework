// @TODO: YOUR CODE HERE!
let svgWidth = 500
let svgHeight = 500

let margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };
  
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;
 
let svg = d3
 .select("#scatter")
 .append("svg")
 .attr("width", svgWidth)
 .attr("height", svgHeight);

let chartGroup = svg.append("g")
 .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("../../assets/data/data.csv").then(healthData => {

    healthData.forEach(function(data) {
        data.smokes = +data.smokes;
        data.age = +data.age;
      });

let xLinearScale = d3.scaleLinear()
  .domain([20, d3.max(healthData, d => d.age)])
  .range([0, width]);

let yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(healthData, d => d.smokes)])
  .range([height, 0]);

let bottomAxis = d3.axisBottom(xLinearScale);
let leftAxis = d3.axisLeft(yLinearScale);

let circlesGroup = chartGroup.selectAll("circle")
  .data(healthData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.age))
  .attr("cy", d => yLinearScale(d.smokes))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", ".75");

chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Smokes");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Age)");

  chartGroup.append("text")
  .selectAll("tspan")
  .data(healthData)
  .enter()
  .append("tspan")
      .attr("x", d => xLinearScale(d.age))
      .attr("y", d => yLinearScale(d.smokes))
      .attr("text-anchor", "middle")
      .text(function(data) {
          return data.abbr
      })
      .attr("fill", "white")
      .attr("font-size", 10, "bold");

chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);
  
chartGroup.append("g")
  .call(leftAxis);


  });