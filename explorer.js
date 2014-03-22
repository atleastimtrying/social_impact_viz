window.siv = {};

window.siv.APIS = function(){
  var root = "http://socialimpact.harryrickards.com";
  var companies_list = "/api/companies/"
  var categories_list = "/api/categories/"

  var build_companies_url = function(name){
    return root + companies_list + name;
  };

  var build_company_url = function(append){
    return root + encodeURIComponent(append);
  };

  var build_categories_url = function(){
    return root + categories_list;
  };

  var build_category_url = function(name){
    return root + categories_list + name
  };

  var search_companies = function(event, options){
    var url = build_companies_url(options);
    jsonp(url, emit_company);
  };

  var jsonp = function(url, callback){
    $('#thinking').show();
    $.ajax({
      type: 'GET',
      url: url,
      async: false,
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(data){
        $('#thinking').hide();
        callback(data);
      }
    });
  };

  var emit = function(string, object){
    $(siv).trigger('emit_' + string, { emitted: object });
  };

  var retrieve_categories = function(){
    var url = build_categories_url();
    jsonp(url, function(categories){
      emit('categories', categories);
    });
  };

  var retrieve_category = function(event, category){
    var url = build_category_url(category);
    jsonp(url, function(category){
      emit('category', category);
    });
  };

  var retrieve_company = function(event, url){
    var url = build_company_url(url);
    jsonp(url, function(company){
      emit('company', company);
    });
  };

  $(siv).on('retrieve_categories', retrieve_categories);
  $(siv).on('retrieve_category', retrieve_category);
  $(siv).on('retrieve_company', retrieve_company);
  $(siv).on('company_search', search_companies);
};

window.siv.UI = function(){
  var retrieve_company = function(event){
    event.preventDefault();
    var link = $(event.currentTarget);
    $(siv).trigger('retrieve_company', link.data('href'));
  };
  $(siv).trigger('retrieve_categories');
  $('#go').click(function(event){
    event.preventDefault();
    var value = $('select#categories').val();
    $(siv).trigger('retrieve_category', value);
  });
  $('#canvas').on({
    click: retrieve_company
  }, '.build_company');
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