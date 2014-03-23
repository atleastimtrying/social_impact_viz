window.siv = {};
window.siv.APIS = function(){
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

  $(siv).on('retrieve_categories', function(event, url){
    emit_from_url('categories', url);
  });

  $(siv).on('retrieve_subcategories', function(event, url){
    emit_from_url('subcategories', url);
  });
  
  $(siv).on('retrieve_subcategory', function(event, url){
    emit_from_url('subcategory', url);
  });
  
  $(siv).on('retrieve_company', function(event, url){
    emit_from_url('company', url);
  });
  
  $(siv).on('search_companies', function(event, url){
    emit_from_url('company', url);
  });
};