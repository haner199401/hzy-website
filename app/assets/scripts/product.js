/**
 * Created by haner on 15/9/20.
 */

(function () {

    var body = $('body');

    /**
     * 分类查看
     */
    body.on('click', '#wu-detail a[data-type]', function () {
        $('#wu-detail li').removeClass('active');
        $(this).parent().addClass('active');
        $('.nav_show').text($(this).text());
        config.page = 1;
        config.pageRequest();
    });

    /**
     * 获取新闻列表
     */
    config.pageRequest = function () {
        $('.newsDetailArea').hide();
        $('.newsListArea').show();
        Ajax.pageRequest({
            url: config.IProductList,
            renderEle: '#productList',
            data: {
                typeId: $('#wu-detail li.active a').attr('data-type')
            }
        });
    };


    /**
     * 获取新闻分类
     */
    Ajax.custom({
        url: config.IProductType
    });


    /**
     * 查看新闻详情
     */
    var id = location.href.getQueryValue('id');
    body.on('click', '#productList a[data-id]', function(){
        id = null;
        getNewsDetail($(this));
    });

    id ? getNewsDetail():config.pageRequest();

    function getNewsDetail(_this) {
        Ajax.queryRecord({
            url: config.IProductDetail + (id || _this.attr('data-id')),
            renderFor:'news_detail_tmpl',
            renderEle:'#news_detail'
        }, function (res) {
            $('.newsListArea').hide();
            $('.newsDetailArea').show();
            $('.news_content').html(res.data.text);
        });
    }

})();