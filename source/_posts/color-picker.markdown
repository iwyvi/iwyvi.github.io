---
title:  Color Picker
date:   2016-03-28 15:59:15
categories: angular
tags:
- angular
- 前端
- 颜色
---
这个是16年寒假的时候学习`angular`时写的一个demo，可以实现颜色HEX、RGB、HSB转换，因为是初学所以有什么用什么，写的代码也很乱，所以就不在github上建一个项目放了，代码空间见[ColorPicker](https://coding.net/u/IwYvI/p/ColorPicker/git)。<!--more-->

<iframe src="https://iwyvi.coding.me/ColorPicker" frameborder="0" style="width:100%;height: 650px;overflow: hidden;"></iframe>

**演示在IE下完全跪了，不用看了**

整体的样式参照了dribble上的[Ranjith Alingal](https://dribbble.com/shots/2415041-Daily-UI-45-Colorrrs)所做的图，使用angular对数据和view层进行了绑定，同时将color储存在localStorage里。

*本来是想直接在post的文章里面放这份演示的，然后发现jekyll会解析两个大括号，然后导致angular绑定的直接跪了，所以最后使用了coding的pages用iframe来处理演示*


###### 关于颜色转换

``` javascript
//HEX to RGB
var HexToRgb = function(hex){
    var rgb = {r:0,g:0,b:0};
    if(/^#{0,1}([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(hex)){
        var aNum = hex.replace(/#/,"").split("");
        if(aNum.length === 6){
            rgb.r = parseInt("0x" + aNum[0] + aNum[1]);
            rgb.g = parseInt("0x" + aNum[2] + aNum[3]);
            rgb.b = parseInt("0x" + aNum[4] + aNum[5]);
        }else if(aNum.length === 3){
            rgb.r = parseInt("0x" + aNum[0] + aNum[0]);
            rgb.g = parseInt("0x" + aNum[1] + aNum[1]);
            rgb.b = parseInt("0x" + aNum[2] + aNum[2]);
        }
    }
    return rgb;
};

//RGB to HEX
var RgbToHex = function(r,g,b){
    var hex = [];
    if(r < 16){
        hex.push("0" + Number(r).toString(16));
    }else{
        hex.push(Number(r).toString(16));
    }
    if(g < 16){
        hex.push("0" + Number(g).toString(16));
    }else{
        hex.push(Number(g).toString(16));
    }
    if(b < 16){
        hex.push("0" + Number(b).toString(16));
    }else{
        hex.push(Number(b).toString(16));
    }
    return '#' + hex[0] + hex[1] + hex[2];
};

//RGB to HSB
var RgbToHsb = function(r,g,b){
    var rgb_Min = Math.min(Math.min(r,g),b);
    var rgb_Max = Math.max(Math.max(r,g),b);
    var hsb = {h:0,s:0,b:0};
    if(rgb_Min == rgb_Max) {
        hsb.h = 0;
    } else if(rgb_Max == r && g >= b) {
        hsb.h = 60 * ( (g - b) / (rgb_Max - rgb_Min) );
    } else if(rgb_Max == r && g < b) {
        hsb.h = 60 * ( (g - b) / (rgb_Max - rgb_Min) ) + 360;
    } else if(rgb_Max == g) {
        hsb.h = 60 * ( (b - r) / (rgb_Max - rgb_Min) ) + 120;
    } else if(rgb_Max == b) {
        hsb.h = 60 * ( (r - g) / (rgb_Max - rgb_Min) ) + 240;
    }
    hsb.h = (hsb.h>=360) ? 0 : Math.round(hsb.h);
    if(rgb_Max === 0 ){
        hsb.s = 0;
    }else{
        hsb.s = Math.round((1-(rgb_Min/rgb_Max))*100);
    }
    hsb.b = Math.round(rgb_Max/255*100);
    return hsb;
};

//HSB to RGB
var HsbToRgb = function  (h,s,b) {
    var rgb = {r:0,g:0,b:0};
    s/=100;
    b/=100;
    if(s === 0){
        rgb.r= rgb.g = rgb.b = Math.round(b * 255);
    }else{
        var i = Math.floor(h / 60)%6;
        var f = h/60 -i;
        var p = b*(1-s);
        var q = b*(1-s*f);
        var t = b*(1-s*(1-f));
        switch(i){
        case 0:
            rgb.r = b;
            rgb.g = t;
            rgb.b = p;
            break;
        case 1:
            rgb.r = q;
            rgb.g = b;
            rgb.b = p;
            break;
        case 2:
            rgb.r = p;
            rgb.g = b;
            rgb.b = t;
            break;
        case 3:
            rgb.r = p;
            rgb.g = q;
            rgb.b = b;
            break;
        case 4:
            rgb.r = t;
            rgb.g = p;
            rgb.b = b;
            break;
        case 5:
            rgb.r = b;
            rgb.g = p;
            rgb.b = q;
            break;
        }
        rgb.r = Math.round(rgb.r * 255);
        rgb.g = Math.round(rgb.g * 255);
        rgb.b = Math.round(rgb.b * 255);
    }
    return rgb;
};
```



