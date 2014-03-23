window.siv = {};
window.siv.APIS = function(){
  var root = "http://10.10.63.58:9292";
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


  var emit_from_url = function(name, url){
    jsonp(url, function(response){
      emit(name, response);
    });
  };

  var emit = function(string, object){
    $(siv).trigger('emit_' + string, { emitted: object });
  };

  $(siv).on('retrieve_categories', function(){
    emit_from_url('categories', build_categories_url());
  });

  $(siv).on('retrieve_subcategories', function(event, url){
    emit_from_url('subcategories', url);
  });

  $(siv).on('retrieve_category', function(event, category){
    emit_from_url('category', build_category_url(category));
  });

  $(siv).on('retrieve_subcategory', function(event, url){
    emit_from_url('subcategory', url);
  });

  $(siv).on('retrieve_company', function(event, url){
    emit_from_url('subcategory', build_company_url(url));
  });

  $(siv).on('search_companies', function(event, name){
    emit_from_url('company', find_company_url(name));
  });
};