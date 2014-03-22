
window.siv.Comparator = function(){
  this.apis = new siv.APIS();
  $('#go').click(function(event){
    event.preventDefault();
  });
  this.draw = new siv.Draw();
};

$(function(){
  window.comparator = new siv.Comparator();
});