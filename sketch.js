window.siv.Sketch = function(){
  var proportional = function(arr, field, value, canvas_max) {
    var ratings = arr.map(function(element) { return element.ratings });
    var max = d3.max(ratings, function(rating) { return rating[field]; });
    var min = d3.min(ratings, function(rating) { return rating[field]; });
    console.log( ((value - min) * canvas_max) / (max - min) );
    return ((value - min) * canvas_max) / (max - min);
  };

  $(siv).on('sketch', function(event, result){
    var companies = result.emitted;
    var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("#stage").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var node = svg.selectAll(".node")
        .data(companies)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
          return "translate(" + (d.ratings.governance * 8) + "," + ((d.ratings.community * 6) + 50) + ")"; 
        })

    node.append("title")
        .text(function(d) {
          return d.name; 
        });

    node.append("circle")
        .attr("r", function(d) { 
          if(d.ratings.employees){
            return d.ratings.employees;
          }else{
            return 10;
          }
        })
        .style("fill", function(d) { 
          if(d.ratings.environment){
            return 'hsl(' + (d.ratings.environment * 3.6) + ', 60%, 60%)';
          }else{
            return '#eee';
          }
        });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { 
          return d.name;
        });

    d3.select(self.frameElement).style("height", 600 + "px");
  });
};