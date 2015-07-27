    var runPage;
    runPage = new FullPage({

        id : 'pageContain',                            // id of contain
        slideTime : 800,                               // time of slide
        effect : {                                     // slide effect
            transform : {							   // tranform
                translate : 'Y',					   // 'X'|'Y'|'XY'|'none'
                scale : [1, 1],					   // [scalefrom, scaleto]
                rotate : [0, 0]					   // [rotatefrom, rotateto]
            },                  					   // transform ['X'|'Y'|'XY',scalefrom, scaleto]
            opacity : [0, 1]                           // [opacityfrom, opacityto]
        },
        mode : 'wheel,touch,nav:navBar',               // mode of fullpage
        easing :  [.33, 1.81, 1, 1]                               // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1] )
        //  callback : function(index, thisPage) {     // callback when pageChange

        //  }
    });