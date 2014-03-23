window.siv.Comparator = function(){
  this.apis = new siv.APIS();
  var companies = [];

  var generate_results = function(comparison_value){
    return $.map(companies, function(company){
      if(company.name && company.basic_ratings[comparison_value]){
        return { 
          label: company.name, 
          value: company.basic_ratings[comparison_value]  
        }; 
      }
    });
  };

  var render = function(results){
    console.log(results);
    nv.addGraph(function() {
      var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(true);

      d3.select("#chart svg")
        .datum(results)
        .transition().duration(350)
        .call(chart);
      return chart;
    });
  };

  var render_compare = function(event){
    event.preventDefault();
    var comparison_value = $(event.currentTarget).data('compare');
    render(generate_results(comparison_value));
  };

  var find_company_url = function(name){
    return "http://10.10.63.58:9292/api/companies/" + name;
  };
  
  $('#go').click(function(event){
    event.preventDefault();
    var names = $('.company_name').map(function(){ 
      if($(this).val()){
        return $(this).val();
      } 
    });
    $('#cards').html('');
    companies = [];
    $(names).each(function(index, name){
      $(siv).trigger('search_companies', find_company_url(name));
    });
  });
  $('.more').click(function(event){
    event.preventDefault();
    $('.inputs').append('<li><input class="company_name" placeholder="Company Name" /><a href="#" class="delete">x</a></li>');
  });
  $('li a.delete').click(function(event){
    event.preventDefault();
    $(this).parents('li').remove();
  });
  $(siv).on('emit_company', function(event, company){
    companies.push(company.emitted);
    $('#cards').append(Mustache.render($('#card').html(), company.emitted));
  });
  $('#cards').on({
    click: render_compare
  }, '.compare');
};

$(function(){
  window.comparator = new siv.Comparator();
});