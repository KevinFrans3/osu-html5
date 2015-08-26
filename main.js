/**
 * enchant();
 * Preparation for using enchant.js.
 * (Exporting enchant.js class to global namespace.
 *  ex. enchant.Sprite -> Sprite etc..)
 *
 * enchant.js を使う前に必要な処理。
 * (enchant.js 本体や、読み込んだプラグインの中で定義されている enchant.Foo, enchant.Plugin.Bar などのクラスを、
 *  それぞれグローバルの Foo, Bar にエクスポートする。)
 */
enchant();

var hitobjects = [];
var ready = false;

var thingsonscreen = [];

var buttonstate = 0;

/*
 * window.onload
 *
 * The function which will be executed after loading page.
 * Command in enchant.js such as "new Core();" will cause an error if executed before entire page is loaded.
 *
 * ページがロードされた際に実行される関数。
 * すべての処理はページがロードされてから行うため、 window.onload の中で実行する。
 * 特に new Core(); は、<body> タグが存在しないとエラーになるので注意。


 */
window.onload = function(){

    var game = new Core(600, 500);

    var sound = new Howl({
      urls: ['beatmaps/test/wonder.mp3']
    })

    var start;

    game.fps = 30;

    game.preload("hitcircleoverlay.png");
    game.preload("approachcircle.png");

    game.keybind(88, 'left');
    // game.preload("beatmaps/test/wonder.mp3");

    var framecount = 0;

    var hitcount = 0;
    var clickedcount = 0;

    game.onload = function(){
        // var bear = new Bear();

        // bear.x = 10;
        // bear.y = 10;

        game.rootScene.addEventListener('enterframe', function(){
            if(ready)
            {

                if(!game.input.left && buttonstate == 2){
                    buttonstate = 0;
                }
                if(game.input.left && buttonstate == 1){
                    buttonstate = 2;
                }
                if(game.input.left && buttonstate == 0){
                    buttonstate = 1;
                    // console.log("changed");
                }



                // console.log(hitobjects[hitcount]);
                var now = new Date().getTime();

                var currenttime = now-start + 1000;

                if(buttonstate == 0){
                    // console.log("down");

                    // var time = hitobjects[hitcount].time - currenttime;
                    var time = hitobjects[clickedcount].time - currenttime;

                    if(time < 0)
                    {
                        time = 999999;
                    }
                    var score = 0;
                    if(time < 100)
                    {
                        score = 300;
                        clickedcount++;
                    }
                    else if(time < 500)
                    {
                        score = 0;
                    }
                    else if(time < 1000)
                    {
                        score = 0;
                    }
                    else
                    {
                        score = 0;
                    }
                    $("#console").text("currentime: " + currenttime + " hit:  " + hitobjects[clickedcount].time + " diff: " + time + " score: " + score);
                    // console.log(score);
                }

                if(currenttime > hitobjects[hitcount].time)
                {

                        if(hitobjects[hitcount].type == "slider")
                        {
                            var bear = new Slider();
                        // console.log(hitobjects[hitcount].x);
                        // console.log(hitobjects[hitcount].y);
                            bear.x = hitobjects[hitcount].x;
                            bear.y = hitobjects[hitcount].y;
                            bear.tl.setTimeBased();
                            bear.tl.delay(1000+ (300*hitobjects[hitcount].points.length)).then(function(){ game.rootScene.removeChild(this); console.log("kkkasdad")});

                            var extra = new Approach();
                            extra.x = hitobjects[hitcount].x;
                            extra.y = hitobjects[hitcount].y;

                            console.log(hitobjects[hitcount].type);
                            // console.log("HELL YEAG" + hitobjects[hitcount].points.length);
                            var prevx = bear.x;
                            var prevy = bear.y;
                            for(var i = 0; i < hitobjects[hitcount].points.length; i++)
                            {
                                console.log(hitobjects[hitcount].points[i].x);
                                var bear2 = new Slider();
                                bear2.x = hitobjects[hitcount].points[i].x;
                                bear2.y = hitobjects[hitcount].points[i].y;

                                bear2.tl.setTimeBased();
                                bear2.tl.delay(1000+ (300*hitobjects[hitcount].points.length)).then(function(){ game.rootScene.removeChild(this); console.log("kkkasdad")});

                                var ball = new Ball();
                                ball.x = prevx;
                                ball.y = prevy;
                                console.log(ball.derp);

                                ball.tl.delay((300*i) + 1000).scaleTo(1,1,10).moveTo(hitobjects[hitcount].points[i].x,hitobjects[hitcount].points[i].y,300).then(function(){ game.rootScene.removeChild(this)});

                                var dist = lineDistance(prevx,bear2.x,prevy,bear2.y);

                                for(var u = 0; u < Math.round(dist/10); u++)
                                {
                                    var bear3 = new Slider();
                                    bear3.x = bear2.x + ((prevx - bear2.x)/Math.round(dist/10)) * u;
                                    bear3.y = bear2.y + ((prevy - bear2.y)/Math.round(dist/10)) * u;

                                    bear3.tl.setTimeBased();
                                    bear3.tl.delay(1000+ (300*hitobjects[hitcount].points.length)).then(function(){ game.rootScene.removeChild(this); console.log("kkkasdad")});
                                }

                                prevx = bear2.x;
                                prevy = bear2.y;

                            }
                            // hitcount++;
                        }
                        else if(hitobjects[hitcount].type == "point")
                        {
                            var bear = new Bear();
                            bear.x = hitobjects[hitcount].x;
                            bear.y = hitobjects[hitcount].y;

                            var extra = new Approach();
                            extra.x = hitobjects[hitcount].x;
                            extra.y = hitobjects[hitcount].y;

                            console.log(hitobjects[hitcount].type);
                        }

                        else if(hitobjects[hitcount].type == "spin")
                        {
                            var bear = new Spinner();
                            bear.x = hitobjects[hitcount].x;
                            bear.y = hitobjects[hitcount].y;

                            // var extra = new Approach();
                            // extra.x = hitobjects[hitcount].x;
                            // extra.y = hitobjects[hitcount].y;

                            console.log(hitobjects[hitcount].type);
                        }
                        hitcount++;
                }
            }

            // if()
            // console.log((now - start) + 'ms elapsed');
            // framecount++;
            // console.log(framecount);
        });

    };

    setTimeout(function () {
        $.get('beatmaps/test/wonder.osu', function(data) {
      // alert(data);
        var n = data.indexOf("[HitObjects]");
        console.log(n);
        var res = data.substring(n, data.length-1);
        // console.log(res);
        var stringarray = res.split("\n");
        stringarray.splice(0, 1);
        console.log(stringarray);

        // var hitobjects = [];
        for(var i = 0; i < stringarray.length; i++)
        {
            var hit = {};
            var rawstrings = stringarray[i].split(",");
            hit.x = parseInt(rawstrings[0]);
            hit.y = parseInt(rawstrings[1]);
            hit.time = parseInt(rawstrings[2]);

            if(rawstrings.length == 11)
            {
                for(var u = 0; u < thingsonscreen.length; u++)
                {
                    game.rootScene.removeChild(thingsonscreen[u]);
                    thingsonscreen = [];
                }
                var points = [];
                //this means its a slider!
                var rawpoints = rawstrings[5];
                var rawonlypoint = rawpoints.split("|");
                rawonlypoint.shift();
                for(var u = 0; u < rawonlypoint.length; u++)
                {
                    console.log(rawonlypoint[u]);
                    var indexofsep = rawonlypoint[u].indexOf(":");
                    points[u] = {};
                    points[u].x = parseInt(rawonlypoint[u].substring(0,indexofsep));
                    console.log(points[u].x);
                    points[u].y = parseInt(rawonlypoint[u].substring(indexofsep+1,rawonlypoint[u].length-1));
                }
                hit.points = points;
                hit.type = "slider";
            }
            else if(rawstrings.length == 7)
            {
                hit.type = "spin";
            }
            else
            {
                hit.type = "point";
            }
            console.log(hit);
            hitobjects.push(hit);
        }
        start = new Date().getTime();
        ready = true;

        sound.play();

        });
    }, 1000);


    game.start();

    Bear = Class.create(Sprite, { // declare a custom class called Bear
        initialize:function(){ // initialize the class (constructor)
        Sprite.call(this,128,128); // initialize the sprite
        this.image = game.assets['hitcircleoverlay.png']; // set the image
        this.frame = 0;
        this.scale(0.5,0.5);
        // this.alpha(0);
        game.rootScene.addChild(this);
        thingsonscreen.push(this);
        this.tl.setTimeBased()
        // this.tl.fadeTo(0);
        this.tl.fadeTo(1, 1000).then(function(){ game.rootScene.removeChild(this);});
        }
    });
    Approach = Class.create(Sprite, { // declare a custom class called Bear
        initialize:function(){ // initialize the class (constructor)
        Sprite.call(this,128,128); // initialize the sprite
        this.image = game.assets['approachcircle.png']; // set the image
        this.frame = 0;
        this.scale(1,1);
        this.originX = 64;
        this.originY = 64;
        game.rootScene.addChild(this);
        thingsonscreen.push(this);
        this.tl.setTimeBased()
        this.tl.scaleTo(0.5, 1000).then(function(){ game.rootScene.removeChild(this);});
        //     this.addEventListener('enterframe', function(){
        //         this.scale(this.scale.x - 0.01, this.scale.y - 0.01);
        // });
        }
    });

    Slider = Class.create(Sprite, { // declare a custom class called Bear
        initialize:function(){ // initialize the class (constructor)
        Sprite.call(this,128,128); // initialize the sprite
        this.image = game.assets['hitcircleoverlay.png']; // set the image
        this.frame = 0;
        this.scale(0.5,0.5);
        game.rootScene.addChild(this);
        }
    });

    Ball = Class.create(Sprite, { // declare a custom class called Bear
        initialize:function(){ // initialize the class (constructor)
        Sprite.call(this,128,128); // initialize the sprite
        this.image = game.assets['hitcircleoverlay.png']; // set the image
        this.frame = 0;
        this.derp = "herp";
        this.scale(0,0);
        this.tl.setTimeBased();
        game.rootScene.addChild(this);
        }
    });


    Spinner = Class.create(Sprite, { // declare a custom class called Bear
        initialize:function(){ // initialize the class (constructor)
        Sprite.call(this,128,128); // initialize the sprite
        this.image = game.assets['hitcircleoverlay.png']; // set the image
        this.frame = 0;
        this.scale(2,2);
        // this.fade = 0;
        game.rootScene.addChild(this);
        thingsonscreen.push(this);
        this.tl.setTimeBased()
        // this.tl.fadeTo(0);
        // this.tl.fadeTo(1, 1000).then(function(){ game.rootScene.removeChild(this);});
        }
    });
};


function lineDistance( x1, x2,y1,y2 )
{
  var xs = 0;
  var ys = 0;

  xs = x2 - x1;
  xs = xs * xs;

  ys = y2 - y1;
  ys = ys * ys;

  return Math.sqrt( xs + ys );
}



function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume,loop)
    {
        this.finish=false;
        this.volume=volume;
        this.loop=loop;
    }
}




