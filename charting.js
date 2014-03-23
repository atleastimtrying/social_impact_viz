window.Charting = (function() {

  var Charting = function(all_data, comparison_value) {

    var specialise_results = function(){
      return $.map(all_data, function(company){
        if(company.name && company.basic_ratings[comparison_value]){
          return {
            label: company.name,
            value: company.basic_ratings[comparison_value]
          };
        }
      });
    };

    var collate_results = function(){
      var out = [];
      if(all_data.length === 0) {
        return out;
      }
      var structure = all_data[0].basic_ratings;
      $.each(structure, function(key) {
        $.each(all_data, function(company) {
          out.push({key: key, value: company.basic_ratings[key]})
        })
      });
      console.log(out);
      return out;
    };

    if(comparison_value) {
      all_data = specialise_results();
    } else {
      all_data = collate_results();
    }


    this.draw = function(type) {
      if(type == 'pie') {
        this.types.pieChart();
      } else if(type == 'bar') {
        this.types.groupedBarChart();
      }
    }

    this.types = {

      groupedBarChart: function() {
        $('#chart svg').remove();
        $('#chart').append('<svg></svg>');
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
              .datum(all_data)
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });
      },

      pieChart: function() {
        nv.addGraph(function() {
          var chart = nv.models.pieChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .showLabels(true);

          d3.select("#chart svg")
            .datum(all_data)
            .transition().duration(350)
            .call(chart);
          return chart;
        });
      }
    };
  }

  return Charting;
})()