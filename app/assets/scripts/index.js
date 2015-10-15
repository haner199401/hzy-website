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

