// prefill category and subcategory from url params


window.siv.UI = function(){
  var retrieve_company = function(event){
    event.preventDefault();
    var link = $(event.currentTarget);
    $(siv).trigger('retrieve_company', link.data('href'));
  };
  
  $('select#subcategories').change(function(){
    var value = $('select#subcategories').val();
  });
  $('a.goFilter').click(function (){

    var filtersValue = $("#filters").val();
    var comparersValue = $("#comparers").val();
    var compareValueValue = $("#compareValue").val();

    var value = "";

    if (filtersValue && compareValue && compareValueValue) {
      value = "http://10.10.63.58:9292/api/companies/search/" + filtersValue + "/" + comparersValue + "/" + compareValueValue;
    }
    else{
      value = "http://10.10.63.58:9292/api/companies/search/";
    }
    console.log("goFilter" + value); //url to poll

    $(siv).trigger('retrieve_subcategory', value);
  })
  $('a.goSubcategories').click(function (){

    value = $("#subcategories").val();
    console.log("goSub:" + value); //url to poll

    $(siv).trigger('retrieve_subcategory', value);
  })

  $('#categories').change(function(event){
    var sub_url = $(event.currentTarget).find("option:checked").data('subcategories');
    if(sub_url){
      $(siv).trigger('retrieve_subcategories', sub_url);
    }
  });
  $(siv).trigger('retrieve_categories', "http://10.10.63.58:9292/api/categories/");
};

window.siv.Draw = function(){
  //things i will render into
  var canvas = $('#canvas');
  var select = $('select#categories');
  var subselect = $('select#subcategories');
  var card = $('#card');
  var card_render = $('#card_render');

  //templates
  var company_card = $('#company_card').html();
  var categories_template = $('#categories_options').html();
  var subcategories_template = $('#subcategories_options').html();
  var companies_list = $('#companies_list').html();

  var render_company = function(company){
    card.show();
    card_render.html(Mustache.render(company_card, company));
  };

  var render_companies = function(companies){
    $(siv).trigger('sketch', companies);
    canvas.html(Mustache.render(companies_list, companies));
  };

  var render_categories = function(categories){
    select.html(Mustache.render(categories_template, categories));
    if(siv.params){
      var category_param = $.grep(siv.params, function(element){ return element.key === "category" ; })[0];
      if(category_param){
        select.find('option').filter(function() {
          return $(this).text() == decodeURIComponent(category_param.value); 
        }).prop('selected', true);
        select.trigger('change');
      }
    }
  };

  var render_subcategories = function(subcategories){
    subselect.html(Mustache.render(subcategories_template, subcategories));
    subselect.removeClass('hidden');
    if(siv.params){
      var subcategory_param = $.grep(siv.params, function(element){ return element.key === "subcategory" ; })[0];
      if(subcategory_param){
        var option = subselect.find('option').filter(function() {
          return $(this).text() == decodeURIComponent(subcategory_param.value); 
        }).prop('selected', true);
        if(option){
          subselect.trigger('change');
        }
      }
    }
  };

  var bind_to_emit = function(label, callback){
    $(siv).on('emit_' + label, function(event, result){
      callback(result);
    });
  };

  bind_to_emit('company', render_company );
  bind_to_emit('categories',render_categories);
  bind_to_emit('subcategories',render_subcategories);
  bind_to_emit('category',render_companies);
  bind_to_emit('subcategory',render_companies);

};
window.siv.Explorer = function(){
  this.apis = new siv.APIS();
  this.ui = new siv.UI();
  this.draw = new siv.Draw();
  this.sketch = new siv.Sketch();
};

$(function(){
  siv.read();
  window.explorer = new siv.Explorer();
});