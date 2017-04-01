
/*获取class*/
function getClass (oP,oClass){
	var elm = oP.getElementsByTagName('*');
	var arr = [];
	for (var i = 0;i<elm.length;i++) {
		if (elm[i].className==oClass) {
			arr.push(elm[i]);
		}
	}
	return arr;
}

/*监听input——value*/
function listenInput(inputObj,maxLength){
	var oInput = inputObj;
	var timer;
	inputObj.onfocus = function(){
		timer = setInterval(listen, 1000);
		
		function listen(){
			if (oInput.value!=='') {
				if(oInput.value.length>=maxLength){
					console.log(oInput.value);
				}
			}
		}
	}
	inputObj.onblur = function(){
		clearInterval(timer)
	}
}

/*获取div到浏览器的高度*/
function getDivHeight(divObj){

	var OYhh = divObj;
	if(window.pageYOffset){//这一条滤去了大部分， 只留了IE678
			var oscroll = window.pageYOffset;
		}else if(document.documentElement.scrollTop ){//IE678 的非quirk模式
			oscroll = document.documentElement.scrollTop;
		}else if(document.body.scrolltop){//IE678 的quirk模式
			oscroll = document.body.scrolltop;
		}else {//都不成立就是0
			oscroll = 0
		}
	return OYhh.offsetTop - oscroll
}
/*获取滚轮的高度*/
function getScrollHeight(){

	if(window.pageYOffset){//这一条滤去了大部分， 只留了IE678
			var oscroll = window.pageYOffset;
		}else if(document.documentElement.scrollTop ){//IE678 的非quirk模式
			oscroll = document.documentElement.scrollTop;
		}else if(document.body.scrolltop){//IE678 的quirk模式
			oscroll = document.body.scrolltop;
		}else {//都不成立就是0
			oscroll = 0
		}
	return oscroll
}


/*获取浏览器的型号*/
function getAppName(){
	var agent = navigator.userAgent.toLowerCase() ;
	var regStr_ie = /msie [\d.]+;/gi ;
	var regStr_ff = /firefox\/[\d.]+/gi
	var regStr_chrome = /chrome\/[\d.]+/gi ;
	var regStr_saf = /safari\/[\d.]+/gi ;
	//IE
	if(agent.indexOf("msie") > 0)
	{
	return agent.match(regStr_ie) ;
	}
	//firefox
	if(agent.indexOf("firefox") > 0)
	{
	return agent.match(regStr_ff) ;
	}
	//Chrome
	if(agent.indexOf("chrome") > 0)
	{
	return agent.match(regStr_chrome) ;
	}
	//Safari
	if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
	{
	return agent.match(regStr_saf) ;
	}
}

/*选项卡*/
/*调用*/
/*var t1 = new Tab(tab,tabnav,tablist);
	t1.autoPlay();
*/

function Tab(tabObj,tabNav,tabList){
	this.oParent = tabObj;
	this.aInput = tabNav;
	this.aDiv = tabList;
	this.iNow = 0;
	this.init();
}

Tab.prototype.init = function(){
	var This = this;
	for(var i=0;i<this.aInput.length;i++){
		this.aInput[i].index = i;
		this.aInput[i].onclick = function(){
			This.change(this);
		};
	}
};

Tab.prototype.change = function(obj){
	for(var i=0;i<this.aInput.length;i++){
		this.aInput[i].className = '';
		this.aDiv[i].style.display = 'none';
	}
	obj.className = 'active';
	this.aDiv[obj.index].style.display = 'block';
};

Tab.prototype.autoPlay = function(){
	
	var This = this;
	
	setInterval(function(){
		
		if(This.iNow == This.aInput.length-1){
			This.iNow = 0;
		}
		else{
			This.iNow++;
		}
		
		for(var i=0;i<This.aInput.length;i++){
			This.aInput[i].className = '';
			This.aDiv[i].style.display = 'none';
		}
		This.aInput[This.iNow].className = 'active';
		This.aDiv[This.iNow].style.display = 'block';
		
		
	},2000);
	
};


/*vichily运动框架*/
/*调用
vichilyMove(obj, oTarget, iType, fnCallBack, fnDuring)
obj：运动的对象
oTarget：运动的属性 如{left：100}
iType：运动的形式  vichilyType.BUFFER缓冲  vichilyType.FLEX弹性
fnCallBack：回调函数
fnDuring：运动过程中调用的函数*/

function css(obj, attr, value)
{
	if(arguments.length==2)
	{
		if(attr!='opacity')
		{
			return parseInt(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
		}
		else
		{
			return Math.round(100*parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]));
		}
	}
	else if(arguments.length==3)
		switch(attr)
		{
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				obj.style[attr]=value+'px';
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value+")";
				obj.style.opacity=value/100;
				break;
			default:
				obj.style[attr]=value;
		}
	
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
}

var vichilyType={
	BUFFER: 1,
	FLEX: 2
};

function vichilyStopMove(obj)
{
	clearInterval(obj.timer);
}

function vichilyMove(obj, oTarget, iType, fnCallBack, fnDuring)
{
	var fnMove=null;
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	
	switch(iType)
	{
		case vichilyType.BUFFER:
			fnMove=vichilyDoMoveBuffer;
			break;
		case vichilyType.FLEX:
			fnMove=vichilyDoMoveFlex;
			break;
	}
	
	obj.timer=setInterval(function (){
		fnMove(obj, oTarget, fnCallBack, fnDuring);
	}, 30);
}

function vichilyDoMoveBuffer(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		cur=css(obj, attr);
		if(oTarget[attr]!=cur)
		{
			bStop=false;
			
			speed=(oTarget[attr]-cur)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			css(obj, attr, cur+speed);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);
	}
}

function vichilyDoMoveFlex(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		if(!obj.oSpeed)obj.oSpeed={};
		if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
		cur=css(obj, attr);
		if(Math.abs(oTarget[attr]-cur)>=1 || Math.abs(obj.oSpeed[attr])>=1)
		{
			bStop=false;
			
			obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
			obj.oSpeed[attr]*=0.7;
			
			css(obj, attr, cur+obj.oSpeed[attr]);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);
	}
}



/*通过a标签滑动到指定的Id*/


/*$(window).scroll(function () {

	var a = $(".nav_a");
	var scrollTop = $(document).scrollTop();

	if (scrollTop >=170) {
		a.css({ position: 'fixed',top:'0'});
		$("article").css({padding:'55px 0 0 0'});
	
	}else{
			a.css({ position: 'relative'});
			$("article").css({padding:'0'});
	} 

});*/



function A_scroll(aid) {
					
	$(".nav_a a").click(function(){
		
		$(".nav_a a").removeClass("active");
		$(this).addClass("active");
		
		var hr = $(this).attr("href");
		var anh = $(hr).offset().top;
		$("html,body").stop().animate({scrollTop:anh},800);
	})
}


/*滑动到页面顶部*/
function goTop(){ //点击图片时触发点击事件
        timer=setInterval(function(){ //设置一个计时器
        var ct = document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
        ct-=10;
        if(ct>0){//如果与顶部的距离大于零
             window.scrollTo(0,ct);//向上移动10px
        }
        else{//如果距离小于等于零
             window.scrollTo(0,0);//移动到顶部
             clearInterval(timer);//清除计时器
        }
    },6);//隔10ms执行一次前面的function，展现一种平滑滑动效果
}



/*	var timer=null;

	var oUl = document.getElementsByTagName('ul')[0];
	var oAlist =  oUl.getElementsByTagName('a');
	for (var i = 0; i < oAlist.length; i++) {
		oAlist[i].onclick = function(){
			var hr = this.hash;
			var ohr = hr.substring(1);
			var oThis = document.getElementById(ohr);
			var oheight =  oThis.offsetTop;//元素到顶部的高度

			timer=setInterval(function(){
				var ct = getScrollHeight();//点击时候滚轮的高度

				var hei = oheight - ct;

				if (hei<0) {
					hei+=10;
					if (hei<0) {
						window.scrollTo(0,hei);//向上移动10px
					}else{//如果距离小于等于零
		             //window.scrollTo(0,oheight);
		             //clearInterval(timer);//清除计时器
		        	}
				}else if (hei>0) {
					ct-=10;
					if (hei>0) {
						//window.scrollTo(0,hei);//向上移动10px
					}else{//如果距离小于等于零
		             //window.scrollTo(0,oheight);
		             //clearInterval(timer);//清除计时器
		        	}
				}
			 },15)
		}
	}*/

/*function scrollTop(obj, len){
    if (typeof len === 'undefined') {
        return obj.scrollTop;
    } else {
        obj.scrollTop = len;
    }
}
 
var div = document.getElementById("wgt-user");
scrollTop(div, 100); // 设置
var st = scrollTop(div); // 100 获取*/