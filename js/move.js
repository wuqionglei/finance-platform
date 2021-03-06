window.onload=function(){
	var leftTr=$("#channel-service-left tbody tr:eq(0)");
	var rightTr=$("#channel-service-right tbody tr:eq(0)");
	var json={};       //获取服务代码与服务名称对应关系
	var a=$("tbody tr");  
	for(var t=0;t<a.length;t++)
	 {
	 	json[$(a[t]).find(".serNum").text().toString()]=$(a[t]).find(".serName").text().toString(); 
	 }  
	var num=0;                  //获取选中input数量
	var serNum=new Array();     //获取选中input的服务代码
	var aIn=new Array();        //存储选中的input
	
	function getInput(id){     //将选中的input写入num、serNum、aIn中
		 num=0;
		 serNum.length=0;
		 aIn.length=0;
		 var aInput=$(id+" tbody input");
				    for(var i=0;i<aInput.length;i++)
				    {
				   	 if($(aInput[i]).prop("checked"))
				   	  {
				   	  	aIn.push(aInput[i]);
				   	  	num++;
				   	  	serNum.push($(aInput[i]).parent().parent().find(".serNum").html());
				   	  }
				    } 
	}
	 
	function addTr(id,text,position){  //将选中的input加入tbody
		   $("#service").modal("show").find("span").html(text);
		    $(".ok").click(function(){ 
				for(var i=0;i<num;i++)
				  {
					$(aIn[i]).parent().parent().remove();
					var newTr=$(position).clone(true);
					newTr.find(".serNum").html(serNum[i]); 
					newTr.find(".serName").html(json[serNum[i]]);
					move(newTr);
					$(id+" tbody").append(newTr); 
				  }  
			})
		    $("#service").on("hide.bs.modal",function(){
				$(".ok").unbind("click")
			})
		 
	}
	
	function move(obj){   //移动选中的input
		$(obj).on({"mousedown":function(ev){  
          if($(obj).find("input").prop("checked"))
	        {      
	         	    var position="right";               //获取鼠标点击的位置left或right
	         	    if(ev.clientX<$('#channel-service-left').outerWidth())
	         	      {
	         	      	position="left"
	         	      	getInput("#channel-service-left");
	         	      }else{
	         	      	getInput("#channel-service-right");
	         	      } 
				    $(window).on({"mousemove":function(ev){ 
		         		$(".move").find(".span1").html(num);
		         		$(".move").find(".span2").html(serNum.join(","));
		         		$(".move").css({"top":ev.clientY,"left":ev.clientX-200,"display":"block"});
		         		$(aIn).css("display","none").parent().css("background","#fff").siblings().css({"background":"#fff","color":"#fff"});
		         		if(position=="right")
		         		{
		         			$(aIn).parent().siblings().find("a").css("color","#fff")
		         		} 
		        },"mouseup":function(ev){ 
		         		$(window).off("mousemove");
		         		$(".move").css("display","none");
		         		$(aIn).css("display","block").parent().css("background","").siblings().css({"background":"","color":"#333333"});
		         		if(position=="right")
		         		{
		         			$(aIn).parent().siblings().find("a").css("color","")
		         		}
		         		
		         		if(position=="left")
		         		  {
		         		  	if(ev.clientX+200>$('#channel-service-left').outerWidth())
		         		  	{  
		         		  		addTr("#channel-service-right","是否添加该服务！",rightTr)
		         		  	}
		         		  }else{
			         		  	if(ev.clientX-200<$('#channel-service-left').outerWidth())
			         		  	{
			         		  		addTr("#channel-service-left","是否删除该服务！",leftTr) 
			         		  	}
		         		  } 
		         		 $(window).off("mouseup");
		         	}}) 
	           return false;
		    }
       },"mouseup":function(){ 
	       	$(window).off("mousemove");
	       	$(window).off("mouseup");
       }})
	} 
	
	$("tbody tr").each(function(i,elem){ //为每一个tr添加移动事件
		move(elem);
	}) 
	
	$(".add-ser").click(function(ev){ //为添加按钮添加事件
		getInput("#channel-service-left");
		if(num!=0)
		{
			addTr("#channel-service-right","是否添加该服务！",rightTr)
		} 
		ev.preventDefault(); 
	})
	
	$(".remove-ser").click(function(ev){ //为移除按钮添加事件
		getInput("#channel-service-right");
		if(num!=0)
		{
			addTr("#channel-service-left","是否删除该服务！",leftTr)
		}
		ev.preventDefault(); 
	})
}
