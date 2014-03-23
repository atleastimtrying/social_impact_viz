window.siv.Sketch = function(){
  var build_ctx = function(){
    var canvas = $('canvas#stage')[0];
    var ctx = canvas.getContext('2d');
    canvas.width = $(window).width();
    canvas.height = 500;
    ctx.fillCircle = function(x,y,radius){
      this.beginPath();
      this.arc(x, y, radius, 0, Math.PI * 2, false);
      this.closePath();
      this.fill();
    };
    return ctx;
  };
  var ctx = build_ctx();
  var x = 100;
  var y = 100;

  var hue_from = function(percentage){
    if(percentage){
      return 3.6 * percentage;
    }else{
      return 0;
    }
  };

  var move = function(){
    x += 100;
    if(x > 1000){
      x = 100;
      y += 100;
    }
  };

  var draw_company = function(ctx, element){
    ctx.fillStyle = "hsl(" + hue_from(element.ratings.community) + ", 60%, 60%)";
    console.log(ctx.fillStyle);
    ctx.fillCircle(x,y, element.ratings.community / 2);

    ctx.fillStyle = "#333";
    ctx.font = "10px sans-serif";
    ctx.fillText(element.name, x - 50 + ctx.measureText(element.name).width/2, y + 50);
    move();
  };

  $(siv).on('sketch', function(event, result){
    var companies = result.emitted;
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    $.each(companies, function(index, element){
      draw_company(ctx, element);
    });
  });
};