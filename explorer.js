window.siv.UI = function(){
  var retrieve_company = function(event){
    event.preventDefault();
    var link = $(event.currentTarget);
    $(siv).trigger('retrieve_company', link.data('href'));
  };
  $('#go').click(function(event){
    event.preventDefault();
    var value = $('select#categories').val();
    $(siv).trigger('retrieve_category', value);
  });
  $('#canvas').on({
    click: retrieve_company
  }, '.build_company');

  $(siv).trigger('retrieve_categories');
  $('#categories').change(function(event){
    $(event.currentTarget).find("option:checked").data('subcategories');
  });
};

window.siv.Draw = function(){
  var canvas = $('#canvas');
  var select = $('select#categories');
  var company_card = $('#company_card').html();
  var categories_template = $('#categories_options').html();
  var companies_list = $('#companies_list').html();

  var render_company = function(company){
    canvas.html(Mustache.render(company_card, company));
  };

  var render_companies = function(companies){
    canvas.html(Mustache.render(companies_list, companies));
  };

  var render_categories = function(categories){
    console.log(categories);
    select.html(Mustache.render(categories_template, categories));
  };

  $(siv).on('emit_company', function(event, company){
    render_company(company);
  });

  $(siv).on('emit_categories', function(event, categories){
    render_categories(categories);
  });

  $(siv).on('emit_category', function(event, category){
    render_companies(category);
  });
};

window.siv.Explorer = function(){
  this.apis = new siv.APIS();
  this.ui = new siv.UI();
  this.draw = new siv.Draw();
};

$(function(){
  window.explorer = new siv.Explorer();
});