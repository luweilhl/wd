//验证码
var c = document.getElementById("c");
var ctx = c.getContext("2d");
//创建矩形为验证创建背景(随机颜色)
ctx.fillStyle = rc(180,230);
ctx.fillRect(0,0,120,30);
//创建4个字符绘制背景上
var pool = "ABCDEFGHIJKLMNOOPQRISTUVWXYZabcdefghijkminopqrxtuvwxyz0123456789";
for(var i=0;i<4;i++){
    var c4 = pool[rn(0,pool.length)];
    ctx.textBaseline = "top";
    ctx.font = "23px SimHei";
    ctx.fillStyle = rc(80,180);
    ctx.fillText(c4,i*25,5);
}
//创建5条干扰线
for(var i=0;i<5;i++){
    ctx.beginPath();
    ctx.strokeStyle = rc(0,255)
    ctx.moveTo(rn(0,120),rn(0,30));
    ctx.lineTo(rn(0,120),rn(0,30));
    ctx.stroke();
}
//创建20个干扰点
for(var i=0;i<20;i++){
    ctx.fillStyle = rc(0,255);
    ctx.beginPath();
    ctx.arc(rn(0,120),rn(0,30),1,0,2*Math.PI);
    ctx.fill();
}
//创建二个基本函数 
    //返回指定范围随机数
function rn(min,max){
    var n = Math.random()*(max-min)+min;
    return Math.floor(n);
} 
    //返回指定范围颜色
function rc(min,max){
    var r = rn(min,max);
    var g = rn(min,max);
    var b = rn(min,max);
    return `rgb(${r},${g},${b})`;
}
//注册验证
var step_1=$(".reg-1");
var step_2=$(".reg-2");
var step_3=$(".reg-3");
var pro_1_index=$("#content .progress-bar .pro-step.pro-step-1 .step-index");
var pro_1_desc=$("#content .progress-bar .pro-step.pro-step-1 .step-desc");
var pro_line_1=$("#content .progress-bar .pro-line.pro-line-1");
var pro_2_index=$("#content .progress-bar .pro-step.pro-step-2 .step-index");
var pro_2_desc=$("#content .progress-bar .pro-step.pro-step-2 .step-desc");
var pro_line_2=$("#content .progress-bar .pro-line.pro-line-2");
var pro_3_index=$("#content .progress-bar .pro-step.pro-step-3 .step-index");
var pro_3_desc=$("#content .progress-bar .pro-step.pro-step-3 .step-desc");
pro_1_index.css("backgroundPosition","0 -200px");
pro_1_index.css("color","#fff");
pro_1_desc.css("color","#3b4");
step_2.hide();
step_3.hide();
//封装验证输入内容是否正确的函数
var is_phone=function(){
	var that=$("#reg-phone");
	var reg=/^1[3-8]\d{9}$/;
	if($(that).val()==""||$(that).val()=="建议使用常用的手机号"){
		$(".msg-phone").html("手机号不能为空！");
		$(that).css("border","1px solid red");
	}else if(!reg.test($("#reg-phone").val())){
		$(".msg-phone").html("格式有误");
		$(that).css("border","1px solid red");
	}else{
		$(".msg-phone").html("");
		$(that).css("border","1px solid green");
	}
};
var is_code=function(){
	var that=$("#reg-code");
	var reg=/^\w{4}$/;
	if($(that).val()==""||$(that).val()=="请输入验证码"){
		$(".msg-code").html("验证码不能为空！");
		$(that).css("border","1px solid red");
	}else if(!reg.test($("#reg-code").val())){
		$(".msg-code").html("格式有误");
		$(that).css("border","1px solid red");
	}else{
		$(".msg-code").html("");
		$(that).css("border","1px solid green");
	}
};
var is_uname=function(){
	var that=$("#reg-uname");
	var reg=/^\w{3,9}$/;
	var uname=$("#reg-uname").val();
	$.ajax({
		url:"/register/issign",
		type:"post",
		data:"uname="+uname,
		success:function(data){
			if(data.length>0){
				$(".msg-uname").html("用户名已存在！");
				$(".item-uname").css("border","1px solid red");
			}else if($("#reg-uname").val()==""||$("#reg-uname").val()=="请输入3~9位的字母或数字"){
				$(".msg-uname").html("账号不能为空！");
				$(".item-uname").css("border","1px solid red");
			}else if(!reg.test($("#reg-uname").val())){
				$(".msg-uname").html("格式有误，请输入3~9位的字母或数字");
				$(".item-uname").css("border","1px solid red");
			}else{
				$(".msg-uname").html("");
				$(".item-uname").css("border","1px solid green");
			}
		}
	})
};
var is_upwd=function(){
	var that=$("#reg-upwd");
	var reg=/^\w{6,8}$/;
	if($(that).val()==""||$(that).val()=="请输入6~8位的字母或数字"){
		$(".msg-upwd").html("密码不能为空！");
		$(".item-upwd").css("border","1px solid red");
	}else if(!reg.test($("#reg-upwd").val())){
		$(".msg-upwd").html("格式有误，请输入6~8位的字母或数字");
		$(".item-upwd").css("border","1px solid red");
	}else{
		$(".msg-upwd").html("");
		$(".item-upwd").css("border","1px solid green");
	}
}
var is_onupwd=function(){
	var that=$("#reg-onupwd");
	var pwd1=$("#reg-upwd").val();
	var pwd2=$(that).val();
	if(($(that).val()==""||$(that).val()=="请再次输入密码")&&(pwd1==""||pwd1=="请输入6~8位的字母或数字")){
		return;
	}else if(pwd2!=pwd1){
		$(".msg-onupwd").html("两次密码输入不一致");
		$(".item-onupwd").css("border","1px solid red");
	}else{
		$(".msg-onupwd").html("");
		$(".item-onupwd").css("border","1px solid green");
	}
}
var is_email=function(){
	var that=$("#reg-email");
	var reg=/[^\.@]+@[^\.@]+\.[com|cn|net](\.cn)?/;
	if($(that).val()==""||$(that).val()=="请输入邮箱"){
		$(".msg-email").html("邮箱不能为空！");
		$(".item-email").css("border","1px solid red");
	}else if(!reg.test($("#reg-email").val())){
		$(".msg-email").html("格式有误");
		$(".item-email").css("border","1px solid red");
	}else{
		$(".msg-email").html("");
		$(".item-email").css("border","1px solid green");
	}
}
//验证输入内容是否正确
$(function(){
    (function reg(){
        $("#reg-phone").blur(function(){
            is_phone();
        });
		$("#reg-code").blur(function(){
            is_code();
        });
        $("#reg-uname").blur(function(){
            is_uname();
        });
        $("#reg-upwd").blur(function(){
            is_upwd();
        });
        $("#reg-onupwd").blur(function(){
            is_onupwd();
        });
        $("#reg-email").blur(function(){
            is_email();
        });
    })()
});
//点击下一步跳转到第二步
function next(){
	is_phone();
	is_code();
    if($("#reg-phone").val()&&!$(".msg-phone").html()&&$("#reg-code").val()&&!$(".msg-code").html()){
        step_1.hide();
        step_2.show();
        pro_1_index.css("backgroundPosition","0 0");
        pro_1_index.html("");
        pro_1_desc.css("color","#3b4");
        pro_line_1.css("backgroundPosition","0 -130px");
        pro_2_index.css("backgroundPosition","0 -200px");
        pro_2_index.css("color","#fff");
        pro_2_desc.css("color","#3b4");
    }else{
        step_1.show();
    }
}
//点击注册
function register(){
	is_uname();
	is_upwd();
	is_onupwd();
	is_email();
    if($("#reg-uname").val()&&$("#reg-upwd").val()&&$("#reg-onupwd").val()&&$("#reg-email").val()&&!$(".msg-uname").html()&&!$(".msg-upwd").html()&&!$(".msg-onupwd").html()&&!$(".msg-email").html()){
        //添加到数据库
        var uname=$("#reg-uname").val();
        var upwd=$("#reg-upwd").val();
        var phone=$("#reg-phone").val();
        var email=$("#reg-email").val();
        $.ajax({
            url:"/register/sign",
            type:"post",
            data:"uname="+uname+"&upwd="+upwd+"&phone="+phone+"&email="+email,
            success:function(data){
                //console.log(data.affectedRows);
                step_2.hide();
                step_3.show();
                pro_2_index.css("backgroundPosition","0 0");
                pro_2_index.html("");
                pro_line_2.css("backgroundPosition","0 -130px");
                pro_3_index.css("backgroundPosition","0 -200px");
                pro_3_index.css("color","#fff");
                pro_3_desc.css("color","#3b4");
            }
        });
    }else{
        step_2.show();
    }
};