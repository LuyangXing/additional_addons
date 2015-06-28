runSection = new FullPage({

	id : 'article',                            // id of contain
	slideTime : 800,                               // time of slide
    effect : {                                     // slide effect
        transform : {
        	translate : 'Y',					   // 'X'|'Y'|'XY'|'none'
        	scale : [0, 1],					   // [scalefrom, scaleto]
        	rotate : [0, 0]					   // [rotatefrom, rotateto]
        },
        opacity : [0, 1]                           // [opacityfrom, opacityto]
    },
	mode : 'touch,wheel',               // mode of fullpage
	easing : [0, .93, .39, .98],
	callback : function(index, thisPage) {     // callback when pageChange
    }
});

interval = setTimeout(function() {
    runPage.go(runPage.thisPage() + 1);
}, 5000);

