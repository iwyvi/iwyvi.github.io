var app = angular.module('colorPicker', []);
app.controller('colorPickerCtrl', function($scope) {

	$scope.color = localStorage && localStorage.color ? JSON.parse(localStorage.color) :
	{
		RGB:{
			r:0,
			g:0,
			b:0,
		},
		HSB:{
			h:0,
			s:0,
			b:0,
		},
		HEX:'#000000',
	};
    $scope.checkedpicker = 'hsb';
    $scope.lastcheckedpicker='rgb';
    $scope.page = 'show';

    $scope.getHex = function  () {
    	return $scope.color.HEX.toUpperCase();
    };

    $scope.getContrastColor = function  () {
        if($scope.color.HSB.b > 70){
            return '#222';
        }else{
            return '#ddd';
        }
    };

    $scope.getFamiliarColor = function  () {
        var rgb;
        if($scope.color.HSB.b - 30 < 1){
            rgb = $scope.HsbToRgb($scope.color.HSB.h,$scope.color.HSB.s,parseInt($scope.color.HSB.b) + 30);
        }else{
            rgb = $scope.HsbToRgb($scope.color.HSB.h,$scope.color.HSB.s,parseInt($scope.color.HSB.b) - 30);
        }
        return 'rgb(' + rgb.r +',' + rgb.g + ',' + rgb.b + ')';
    };

    $scope.updateRGB = function  () {
    	var hex = [];
    	for(var c in $scope.color.RGB){
    		if($scope.color.RGB[c]<16){
    			hex.push("0" + Number($scope.color.RGB[c]).toString(16));
    		}else{
    			hex.push(Number($scope.color.RGB[c]).toString(16));
    		}
    	}
    	$scope.color.HEX = '#' + hex[0] + hex[1] + hex[2];
        var hsb = $scope.RgbToHsb($scope.color.RGB.r,$scope.color.RGB.g,$scope.color.RGB.b);
        for(var d in $scope.color.HSB){
            $scope.color.HSB[d] = hsb[d];
        }
    	$scope.saveChange();
    };
    $scope.updateHSB = function  () {
        var rgb = $scope.HsbToRgb($scope.color.HSB.h,$scope.color.HSB.s,$scope.color.HSB.b);
        for(var c in $scope.color.RGB){
            $scope.color.RGB[c] = rgb[c];
        }
        var hex = [];
        for(var d in $scope.color.RGB){
            if($scope.color.RGB[d]<16){
                hex.push("0" + Number($scope.color.RGB[d]).toString(16));
            }else{
                hex.push(Number($scope.color.RGB[d]).toString(16));
            }
        }
        $scope.color.HEX = '#' + hex[0] + hex[1] + hex[2];
        $scope.saveChange();
    };
    $scope.updateHEX = function  () {
        if(/^#{0,1}([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test($scope.color.HEX)){
            var aNum = $scope.color.HEX.replace(/#/,"").split("");
            if(aNum.length === 6){
                $scope.color.RGB.r = parseInt("0x" + aNum[0] + aNum[1]);
                $scope.color.RGB.g = parseInt("0x" + aNum[2] + aNum[3]);
                $scope.color.RGB.b = parseInt("0x" + aNum[4] + aNum[5]);
            }else if(aNum.length === 3){
                $scope.color.RGB.r = parseInt("0x" + aNum[0] + aNum[0]);
                $scope.color.RGB.g = parseInt("0x" + aNum[1] + aNum[1]);
                $scope.color.RGB.b = parseInt("0x" + aNum[2] + aNum[2]);
            }
            $scope.isHexError = false;
        }else{
            $scope.isHexError = true;
        }
        $scope.updateRGB();
        $scope.saveChange();
    };

    $scope.RgbToHsb = function(r,g,b){
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

    $scope.HsbToRgb = function  (h,s,b) {
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
    $scope.saveChange = function  () {
        if(localStorage){
            localStorage.color = JSON.stringify($scope.color);
        }
    };
});
mdbtn.init();
