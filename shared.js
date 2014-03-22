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
  $(siv).on('search_companies', search_companies);
};