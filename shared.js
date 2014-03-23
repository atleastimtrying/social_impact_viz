window.siv = {};
window.siv.APIS = function(){
  var root = "http://10.10.63.64:9292";
  var companies_list = "/api/companies/"
  var categories_list = "/api/categories/"

  var find_company_url = function(name){
    return root + companies_list + name;
  };

  var build_company_url = function(append){
    return root + encodeURIComponent(append);
  };

  var build_categories_url = function(){
    return root + categories_list;
  };

  var build_subcategories_url = function(append){
    return root + encodeURIComponent(append);
  };

  var build_category_url = function(name){
    return root + categories_list + name
  };

  var search_companies = function(event, name){
    var url = find_company_url(name);
    jsonp(url, function(company){
      emit('company', company);
    });
  };

  var jsonp = function(url, callback){
    $.ajax({
      type: 'GET',
      url: url,
      async: false,
      contentType: "application/json",
      dataType: 'jsonp',
      beforeSend: function(){
        $('#thinking').show();
      },
      complete: function(){
        $('#thinking').hide();
      },
      success: function(data){
        callback(data);
      },
      error: function(error){
        console.log(error);
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
  var retrieve_subcategories = function(event, url){
    var url = build_subcategories_url(url);
    jsonp(url, function(subcategories){
      emit('subcategories', subcategories);
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
  $(siv).on('retrieve_subcategories', retrieve_subcategories);
  $(siv).on('retrieve_category', retrieve_category);
  $(siv).on('retrieve_company', retrieve_company);
  $(siv).on('search_companies', search_companies);
};