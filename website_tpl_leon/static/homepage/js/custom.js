/**
 * Created by luyangxing on 15-7-30.
 */
var $$ = function (selector) {
    var cl, id, alls, arrEle = [];
    if (/^\./.test(selector)) {
        cl = selector.replace(".", "");
        alls = document.getElementsByTagName("*"), l = alls.length;
        for (var i=0; i<l; i+=1) {
            var name =     alls[i].className, arrName = [];
            if (name) {
                arrName = name.split(" "), lName = arrName.length;
                for (var j=0; j<lName; j+=1) {
                    if (arrName[j] === cl) {
                        arrEle.push(alls[i]);
                    }
                }
            }
        }
    } else if (/^#/.test(selector)) {
        id = selector.replace("#", "");
        var o = document.getElementById(id);
        if (o) {
            arrEle.push(o);
        }
    }
    return arrEle;
};
//点击方法
Array.prototype.click = function(fn) {
    var l = this.length;
    if (l) {
        for (var i=0; i<l; i+=1) {
            this[i].onclick = function() {
                fn.call(this);
            };
        }
    }
};
//执行点击
$$(".acco_title").click(function() {
    var rel = this.lang, cl = this.className, oOn = $$(".acco_title_on")[0], rel_on = oOn.lang;
    if (!/on/.test(cl) && rel && rel_on) {
        $$("#" + rel)[0].style.height = "140px";
        $$("#" + rel_on)[0].style.height = "0";
        this.className = "acco_title acco_title_on";
        oOn.className = "acco_title";
    }
});