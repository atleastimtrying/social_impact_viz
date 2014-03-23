window.siv.Sketch = function(){
  var build_ctx = function(){
    var canvas = $('canvas#stage')[0];
    var ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;
    ctx.fillCircle = function(x,y,radius){
      this.beginPath();
      this.arc(x, y, radius, 0, Math.PI * 2, false);
      this.closePath();
      this.fill();
    };
    return ctx;
  };
  var ctx = build_ctx();

  $(siv).on('sketch', function(event, result){
    var companies = result.emitted;
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, 800, 400);
    ctx.fillStyle = "white";
    ctx.fillCircle(10,10,10);
  });
};