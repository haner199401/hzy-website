(function() {

	template.openTag = "<!--[";
	template.closeTag = "]-->";

	// 模板帮助方法，绝对化图片地址
	template.helper('$absImg', function(content) {
		return content;
	});

	// 模板帮助方法，转换时间戳成字符串
	template.helper('$formatDate', function(content, type, defaultValue) {
		if (content) {
			return Tools.formatDate(content, type);
		} else {
			return defaultValue || '';
		}
	});

	// 模板帮助方法，验证是否已登录
	template.helper('$isLogin', function() {
		return !!config.getId();
	});

	// 模板帮助方法，转换房源你的标签
	template.helper('$convertTag', function(content) {
		if (content) {
			var result = '';
			var arr = content.split(',');
			for (var i in arr) {
				if (/^\s*$/.test(arr[i])) {
					continue;
				}
				result += '<span>' + arr[i] + '</span>';
			}
			return result;
		} else {
			return '--';
		}
	});

	//模板帮助方法，编码url参数
	template.helper('$encodeUrl', function(content) {
		return encodeURIComponent(content);
	});

	//模板帮助方法，格式化货币
	template.helper('$formatCurrency', function(content, defaultValue, unit) {
		if (!content) {
			return defaultValue || '--';
		}

		var mod = content.toString().length % 3;
		var sup = '';
		if (mod == 1) {
			sup = '00';
		} else if (mod == 2) {
			sup = '0';
		}

		content = sup + content;
		content = content.replace(/(\d{3})/g, '$1,');
		content = content.substring(0, content.length - 1);
		if (sup.length > 0) {
			content = content.replace(sup, '');
		}

		return content + unit || '';
	});

    //模板帮助方法，格式化货币
    template.helper('$formatMoney', function(money,isRound) {
        if (!money) {
            return '';
        }
        if(isRound){
            return (Math.round((parseFloat(money,10) || 0))) || '';
        }
        return (Math.round((parseFloat(money,10) || 0) / 10000)) || '';
    });

    template.helper('$formatPercent', function(money) {
        return ((parseFloat(money,10) || 0) * 100) || '';
    });

    //模板帮助方法，同比计算
    template.helper('$calcYoy', function(arg1,arg2) {
        try{
        return arg2 > 0 ? (Math.round((arg1-arg2)/arg2*100) || 0) : 0;
        }catch (e){
            return '';
        }
    });
    //模板帮助方法，同比计算
    template.helper('$absCalcYoy', function(arg1,arg2) {
        try{
            return arg2 > 0 ? (Math.abs(Math.round((arg1-arg2)/arg2*100)).toFixed(2)) : 0;
        }catch (e){
            return '';
        }
    });

    //模板帮助方法，格式化货币
    template.helper('$calcMoney', function(money,type) {
        if (!money) {
            return '';
        }
        var result = new Number(money/10000);
        if(type == 1){
            return result.toFixed(1);
        }
        return money;
    });

	//模板帮助方法，\r\n替换换行
	template.helper('$convertRN', function(content) {
		if (!content) {
			return '--';
		}
		return content.replace(/\r\n/gi, '<br/>');
	});

	//模板帮助方法，根据序列值添加样式名
	template.helper('$addClassByIdx', function(i, v, className) {
		if (i == v) {
			return className || '';
		}
	});

	//模板帮助方法，度量房源标题长度
	template.helper('$lengthHouseTitle', function(content) {
		var screenWidth = screen.width;
		var size = 10;
		if (screenWidth < 320) {
			size = 12;
		} else if (screenWidth < 480) {
			size = 20;
		} else if (screenWidth < 960) {

		}

		return content.substring(0, size) + '...';
	});

    //模板帮助方法，数字省略位数
    template.helper('$number2Fixed', function(num,digit,def) {
        //数字转换异常
        try{
            return (num ? new Number(num).toFixed(digit || 1) : (def || 0));
        }catch (e){
            return def || 0;
        }
    });

    //模板帮助方法，数字省略位数
    template.helper('$number2Fixed2', function(num,digit,def) {
        //数字转换异常
        if(!num){return ''}
        num +='';
        try{
            return num.substr(num.indexOf('.') + 1).length > 2 ? parseFloat(num,10).toFixed(digit || 1) : num;
        }catch (e){
            return def || 0;
        }
    });

    //导航设置
    setNav();


})();

function setNav(){
    var navArr = [{path:'company_info',pos:1},{path:'product',pos:2},{path:'company_news',pos:3},{path:'suggest',pos:4},{path:'contact',pos:5}];
    $('ul.nav a:eq(0)').addClass('active');
    $.each(navArr,function(i,o){
        if(location.href.indexOf(o.path) != -1){
            $('ul.nav a').removeClass('active');
            $('ul.nav a:eq('+ navArr[i].pos +')').addClass('active');
        }
    });
}