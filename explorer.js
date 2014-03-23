window.siv.UI = function(){
  var retrieve_company = function(event){
    event.preventDefault();
    var link = $(event.currentTarget);
    $(siv).trigger('retrieve_company', link.data('href'));
  };
  $('#go').click(function(event){
    event.preventDefault();
    var value = $('select#subcategories').val();
    $(siv).trigger('retrieve_subcategory', value);
  });
  $('#canvas').on({
    click: retrieve_company
  }, '.build_company');

  $(siv).trigger('retrieve_categories');
  $('#categories').change(function(event){
    var sub_url = $(event.currentTarget).find("option:checked").data('subcategories');
    if(sub_url){
      $(siv).trigger('retrieve_subcategories', sub_url);
    }
  });
};

window.siv.Draw = function(){
  var canvas = $('#canvas');
  var select = $('select#categories');
  var subselect = $('select#subcategories');
  var company_card = $('#company_card').html();
  var categories_template = $('#categories_options').html();
  var subcategories_template = $('#subcategories_options').html();
  var companies_list = $('#companies_list').html();

  var render_company = function(company){
    canvas.html(Mustache.render(company_card, company));
  };

  var render_companies = function(companies){
    console.log(companies);
    canvas.html(Mustache.render(companies_list, companies));
  };

  var render_categories = function(categories){
    select.html(Mustache.render(categories_template, categories));
  };

  var render_subcategories = function(subcategories){
    subselect.html(Mustache.render(subcategories_template, subcategories));
    subselect.removeClass('hidden');
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
};

$(function(){
  window.explorer = new siv.Explorer();
});