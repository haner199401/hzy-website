/**
 * Created by haner on 15/10/15.
 */

var body = $('body');

body.on('click', '.left_nav li a', function () {
    $('.left_nav li').removeClass('active');
    $(this).parent().addClass('active');
    $('#info,#education,#other').hide();
    $($(this).attr('href')).show();
});