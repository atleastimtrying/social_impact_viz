window.Charting = (function() {

  var Charting = function(all_data) {

    var collate_results = function(){
      var out = [];
      if(all_data.length === 0) {
        return out;
      }
      var structure = all_data[0].basic_ratings;
      $.each(structure, function(key) {
        out.push({
          key: key,
          values: all_data.map(function(company) {
            return {x: company.name, y: company.basic_ratings[key]};
          })
        });
      });
      console.log(out);
      return out;
    };


    all_data = collate_results();


    this.draw = function(type) {
      this.types.groupedBarChart();
    }

    this.types = {
      groupedBarChart: function() {
        $('#chart svg').remove();
        $('#chart').append('<svg></svg>');
        nv.addGraph(function() {
          var chart = nv.models.multiBarChart()
            .transitionDuration(350)
            .rotateLabels(0)      //Angle to rotate x-axis labels.
            .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
            .groupSpacing(0.1)    //Distance between each group of bars.
          ;

          chart.yAxis
              .tickFormat(d3.format(',.1f'));

          d3.select('#chart svg')
              .datum(all_data)
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });
      }
    };
  }

  return Charting;
})()