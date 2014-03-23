window.siv.Comparator = function(){
  this.apis = new siv.APIS();
  var companies = [];
  var new_company_input ='<li><input class="company_name" placeholder="Company Name" tabindex="0" /><a href="#" class="delete" tabindex="3">x</a></li>';

  if(siv.params) {
    $.each(siv.params, function(idx, pair) {
      $('.company_name').first().before(new_company_input);
      $('.company_name').first().val(decodeURI(pair.key));
    });
  }

  var render = function(){
    var chart = new Charting(companies);

    $('#chart').slideDown(function() {
      chart.draw($('.chart_type:checked').val());
    });
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
    companies = [];
    $(names).each(function(index, name){
      $(siv).trigger('search_companies', find_company_url(name));
    });
  });
  $('.more').click(function(event){
    event.preventDefault();
    $('.inputs').append(new_company_input);
    $('.inputs li:last-child input').focus();
  });
  $('li a.delete').click(function(event){
    event.preventDefault();
    $(this).parents('li').remove();
  });
  $(siv).on('emit_company', function(event, company){
    companies.push(company.emitted);
    render();
  });

  var inputHasChanged = function(event) {
    if(event.keyCode == 13 && $(event.currentTarget).hasClass('company_name')) {
      $('#go').trigger('click');
    }
  }
  $('.chart_type').on('change', render);
  $('.inputs').on(
    {
      keyup: inputHasChanged,
      change: inputHasChanged
    }, 'input'
  );
};

$(function(){
  siv.read();
  window.comparator = new siv.Comparator();
  var resize = function() {
    var chart_height = $(document).outerHeight() - ($('#ui').outerHeight() + 60);
    $('#chart').height(chart_height);
  };
  resize();
  $(window).on('resize', resize);
  if(siv.params && siv.params.length > 0) {
    $('#go').trigger('click');
  }

});