/**
 * Created by haner on 15/9/20.
 */
var msg;
$('#suggest_form').submit(function(e){
    e.preventDefault();

    if(!! (msg=valided())) {
        alert(msg);
        return;
    }

    Ajax.submitForm({
        url:config.ISaveSuggest,
        data:$(this)
    },function(res){
        alert('提交成功');
        location.replace(location.href);
    })
});

/**
 * 表单验证
 * @param form
 */
function valided(){
    var phone = $('[name="phone"]').val(),
        email = $('[name="mail"]').val();
    if($('[name="name"]').val().isEmpty()){
        return '姓名不能为空';
    }

    if(phone.isEmpty()){
        return '电话不能为空';
    }

    if($('[name="title"]').val().isEmpty()){
        return '主题不能为空';
    }

    if(!phone.isPhone()){
        return '电话号码格式不正确';
    }

    if(email&&!email.isValidMail()){
        return '邮箱格式不正确';
    }
}