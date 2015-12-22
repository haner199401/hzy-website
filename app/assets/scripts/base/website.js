(function() {

	template.openTag = "<!--[";
	template.closeTag = "]-->";

	// 模板帮助方法，绝对化图片地址
	template.helper('$absImg', function(content) {
		return config.server + content;
	});

	// 模板帮助方法，转换时间戳成字符串
	template.helper('$formatDate', function(content, type, defaultValue) {
		if (content) {
			return Tools.formatDate(content, type);
		} else {
			return defaultValue || '';
		}
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

    //导航设置
    setNav();

    var body = $('body');
    //分页点击
    body.on('click', '.pager a[data-page-num]', function () {
        if (typeof config.pageRequest == 'function') {
            console.log($(this).attr('data-page-num'));
            config.currentPage = config.page = $(this).attr('data-page-num');
            config.pageRequest();
        }
    });

    //上一页,下一页
    body.on('click', '.pager .pre,.pager .next', function () {
        if (typeof config.pageRequest == 'function') {
            var cPage = parseInt($(this).siblings('.active').text()) || 1;
            $(this).is($('.pager .pre')) ? cPage -= 1 : cPage += 1;
            config.currentPage = config.page = cPage < 1 ? 1 : cPage;
            config.pageRequest();
        }
    });


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