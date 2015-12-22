/**
 * Created by haner on 15/9/20.
 */
new Swiper ('.static_banner', {
    loop: true,
    autoplay:!0,
    speed:2000,
    effect : 'fade',
    paginationClickable:!0,
    pagination: '.swiper-pagination'
});

var body = $('body');

//最新产品
Ajax.custom({
    url:config.IProductList,
    renderFor:'product_tmpl',
    renderEle:'#product_area'
},initProductSwiper);

//查看产品详情



//最新新闻
Ajax.custom({
    url:config.INewsList + '?pageSize=5',
    renderFor:'newslist_tmpl',
    renderEle:'#newsList'
});

//查看新闻详情
body.on('click','#newsList a',function(){

});

function initProductSwiper(){
    new Swiper ('.product_list', {
        loop: !!0,
        autoplay:!0,
        speed:2000,
        slidesPerView: 3,
        spaceBetween: 20,
        freeMode: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });
}