window.siv = {};
window.siv.APIS = function(){
  var hokey_cokey = function(label_in, label_out){
    $(siv).on(label_in, function(event, url){
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
        success: function(response){
          $(siv).trigger('emit_' + label_out, { emitted: response });
        },
        error: function(error){
          console.log(error);
        }
      });
    });
  };

  hokey_cokey('retrieve_categories', 'categories');
  hokey_cokey('retrieve_subcategories', 'subcategories');
  hokey_cokey('retrieve_subcategory', 'subcategory');
  hokey_cokey('retrieve_company', 'company');
  hokey_cokey('search_companies', 'company');
};
window.siv.read = function(){
  var params_string = window.location.toString().split('?')[1];
  if(params_string){
    siv.params = params_string.split('&').map(function(element){ 
      var key_values = element.split('='); 
      return { 
        key:key_values[0], 
        value: key_values[1] 
      }; 
    });
  }
};