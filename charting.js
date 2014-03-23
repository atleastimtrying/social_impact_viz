window.Charting = (function() {

  var Charting = function(data) {
    this.draw = function(type) {
      if(chart_type == 'pie') {
        this.types.pieChart();
      }
    }

    this.types = {

      groupedBarChart: function() {
        nv.addGraph(function() {
          var chart = nv.models.multiBarChart()
            .transitionDuration(350)
            .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
            .rotateLabels(0)      //Angle to rotate x-axis labels.
            .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
            .groupSpacing(0.1)    //Distance between each group of bars.
          ;

          chart.xAxis
              .tickFormat(d3.format(',f'));

          chart.yAxis
              .tickFormat(d3.format(',.1f'));

          d3.select('#chart svg')
              .datum(exampleData())
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });
      },

      pieChart: function() {
        console.log("Data:", data);
        nv.addGraph(function() {
          var chart = nv.models.pieChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .showLabels(true);

          d3.select("#chart svg")
            .datum(data)
            .transition().duration(350)
            .call(chart);
          return chart;
        });
      }
    };
  }

  return Charting;
})()