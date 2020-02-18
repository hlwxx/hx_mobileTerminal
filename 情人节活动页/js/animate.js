//定义数组 用来放下方初始为1的灰色卡片 
let greyCard=[0,0];

let initArr = [];
let imgEle;
var shakeTimer;

$(function () {
  
  // 抽奖页面点击关闭按钮的方法
  $("#closeBtn").click(function(){
    $(imgEle).attr('src','./images/img_prize/bh_behind.png');
    
    var element=document.getElementById("dy");
    element.parentNode.removeChild(element);

    
    $("#mask-card").css('display','none');//收掉遮罩层
    $(".item").css('transform', 'unset');
    let parent = $(imgEle).parent().parent();
    $("#list li.item").removeClass('cartoon');

    // 收牌
    $(parent).css('left', '4.08rem');
    $(parent).css('top', '3.35rem');

    $(".item").css('z-index','1');
    imgEle = null;

    // 隐藏关闭图标(再次发牌后关闭图标淡入)
    $("#closeBtn").css('display', 'none');

    // 清除定时器--执行轮流选中的摇晃动画
    clearInterval(shakeTimer);

    init(1);//重新发牌

  });

    var $cards = $("#list li"),//所有卡牌
        $maskCard = $("#mask-card"),//翻牌遮罩
        length = $cards.length,
        index = length,//轮流滚动的卡牌下标
        data = {count: 6},//次数
        rem = 130,
        initArr = [[0.26, 0.23], 
                    [2.2, 0.23], 
                    [4.08, 0.23], 
                    [0.26, 1.79], 
                    [2.2, 1.79], 
                    [4.08, 1.79],
                    [0.26, 3.35], 
                    [2.2, 3.35], 
                    [4.08, 3.35]],//卡牌位置数组
        clickTime = 0,
        timer;//轮流提示定时器
       
    init(1);

    function init(flag) {
      bool = false,//首次点击时不能在卡牌归位期间(发完牌才能点击)
      $maskCard.hide();
      //卡牌归位动画(新)
      if(flag ==1){
        for(let index=0;index<9;index++){
          setTimeout(function(){
            $($("#list li.item")[index]).addClass('cartoon');
          },index*300);
          if(index == 8){
            bool = true;//卡牌归位，可以点击

            // 执行轮流选中的摇晃动画
            let i=0;
            shakeTimer=setInterval(function(){
              let index = i%9;
              i++;
              activeShake (index); //调用轮流选中的摇晃动画的方法
            },2000);

          }
        }

      }
       
    }

    // 设置轮流选中的摇晃动画
    function activeShake (index){
      $("#list img").removeClass("active");
      $( $("#list img")[index] ).addClass("active");
    }

    //点击卡牌翻转
    $("#list").on("click", "li", function () {
        
        if (new Date() - clickTime > 2000 && bool) {//两次点击的间隔不能小于2秒
            if (data.count > 0) {

                data.count--;

                /*console.log(222);
                data.count--;
                $("#change").html(data.count);*/
                // console.log(222);
                let imgNode = $(this).find('img')[0];
                if(imgNode==imgEle){
                    return;
                }
                imgEle = imgNode;
                // $(imgEle).src='./images/img_prize/bh_behind.png';
                $(imgEle).attr('src','./images/img_prize/bh_front.png');

                var className = this.firstElementChild.lastElementChild.className.split(" ")[1];
                $("."+className).hide();

                $maskCard.show();
                $(this).css('z-index', 3);
                $(this).css('transform', 'scale(1.5)');
                shake(this);
                 
                // 关闭图标的淡入动画：
                $("#closeBtn").fadeIn(3000);
                // 翻牌后出现图片
                $("#dianzhui").css('display', 'inline-block');
                $("#blink").css('display', 'inline-block');
                
                

            } else {
              alert("没有次数了~");
            }
        }
    });

    function shake(ele){
        $("#list .item").removeClass('cartoon');

        $(ele).css('transform', 'scale(1.5)');
        $(ele).css('left', '2.1rem');
        $(ele).css('top', '1.79154rem');

        var i = 0;
        var timer = setInterval(function(){
            i++;
            if(i == 7){
                revese(ele);
                // $(ele).css('transform','rotateY(180deg)');
                clearInterval(timer);
                 $(ele).css('left','2.1rem');
            }
            if(i%2 == 0){
                $(ele).css('left','2.0rem');
            }else{
                $(ele).css('left','2.2rem');
            }
        },50);
    }

    function revese(ele){
        // 中间位置
        // let position = $(ele).offset();
        setPosition(ele);
        var i = 0;
        var deg = 0;
         // $(ele).css('transform', 'scale(1.5)');
        var timer = setInterval(function(){
            // $(ele).css('transform', 'scale(1.5)');
            deg+=18;
            $(ele).css('transform','rotateY('+deg+'deg)');
            if(i==9){
                clearInterval(timer);
                $(ele).css('left','2.1rem');
                $(ele).css('transform', 'scale(1.5)');

                // 设置翻奖随机数
                let num = Math.floor(Math.random()*10);
                $("#dy").html(num);
                
                // 获取随机数后 下方卡片列表的处理(点中卡片切换颜色)：
                if(num==3){
                  $('#secondImg').attr('src','./images/img_prize/sh_red.png');
                }else if(num==4){
                  $('#fourthImg').attr('src','./images/img_prize/sh_red.png');
                }else if(num==1){
                  
                  if(greyCard[0]==0){
                    $('#firstImg').attr('src','./images/img_prize/sh_red.png');
                    greyCard[0]=1;//重新赋值为非0的数字

                  }else{
                    $('#thirdImg').attr('src','./images/img_prize/sh_red.png');
                  }
                } 

                if( //若卡片列表下都是红心图
                  $('#firstImg').attr('src')=="./images/img_prize/sh_red.png" &&
                  $('#secondImg').attr('src')=="./images/img_prize/sh_red.png" &&
                  $('#thirdImg').attr('src')=="./images/img_prize/sh_red.png" &&
                  $('#fourthImg').attr('src')=="./images/img_prize/sh_red.png" 
                ){
                  $( $('#text a')[0] ).css('display','none');//隐藏 我的卡片
                  $( $('#text a')[1] ).css('display','inline-block'); //显示 我要抽奖
                }

                
            }
            i++;
        },50);
    }

    //中奖信息提示
    $("#close,.win,.btn").click(function () {
        clickTime = new Date();//时间更新
        index = length;//卡牌选中重新从第一张开始
        init();
    });

    //奖品展示
    var show = new Swiper(".swiper-container", {
        direction: "horizontal",//水平方向滑动。 vertical为垂直方向滑动
        loop: false,//是否循环
        slidesPerView: "auto"//自动根据slides的宽度来设定数量
    });
});

// 收回牌
function back(){
  $("#list li.item").css('left', '4.08rem');
  $("#list li.item").css('top', '3.35rem');

  // 隐藏关闭图标(再次发牌后关闭图标淡入)
  $("#closeBtn").css('display', 'none');
}

// 动态生成翻奖后的动态数字标签
function setPosition(ele){
  let sp = $(ele).find('span');
  $(sp).append('<span id="dy"></span>');
}






