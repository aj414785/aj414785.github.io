//模块1 tab顶部
var titleNav = ["最新", "新闻", "公告", "活动", "赛事"];
$("#tab-top-box").find(".box:first").show(); //为每个BOX的第一个元素显示

$("#tab-top-box")
  .find(".box:first")
  .find("span")
  .html("[" + titleNav[0] + "]");

$("#top-menu a").click(function () {
  var i = $(this).index(); //下标第一种写法
  $(this).addClass("hover").siblings().removeClass("hover");
  $("#tab-top-box .box").eq(i).show().siblings().hide();
  $("#tab-top-box .box")
    .eq(i)
    .find("span")
    .html("[" + titleNav[i] + "]");
});

//新闻列表
/*	var wraps = $('.top-list');
	var chanelID = [3996, 4000, 4001, 4003, 4467];
	var chanelName = ['最新', '新闻', '公告', '活动', '赛事']
	for (var i = 0; i < wraps.length; i++) {
		fillNews.list({
			gameID: '182',
			type: 'iTarget',
			id: chanelID[i],
			newsType: 'news',
			pageSize: 6,
			source: 'web_pc',
			// 详情页地址，因为前面设置了newsType:'news', 所以会在详情页地址后面自动加上?newsid=XXX
			detailURL: '/web201908/detail_news.html',
			tpl: '<li><a href="{url}" title="{sTitle}" target="_blank" onclick="PTTSendReport({\'action\': \'click\',\'targetid\': \'{iNewsId}\',\'targettype\':\'news\', \'from\': \'v4\'})"><span>[' + chanelName[i] + ']</span>{sTitle}</a><i>{sIdxTimeShort}</i></li>',
			wrap: wraps[i],
			callback: function (result) {
				// 填充完的回调
				$('li', this.wrap).eq(0).addClass('first'); // this指向option
				for (var j = 0; j < result.msg.result.length; j++) {
					PTTSendReport({
						action: 'pop',
						targetid: result.msg.result[j].iNewsId, //支持批量上报，targetid用英文逗号分隔
						targettype: "news",
						from: 'v4'
					})
				}
			}
		});
	};*/
Swiper1();
if ($(".newpaly .swiper-slide").length <= 1) {
  $(".newpaly").removeClass(".swiper-container");
} else {
  Swiper1();
}
// 刺激爆料
$(".plist-style-1-wrap").find(".plist-style-1:first").show();
$(".gama-data li").on("click", function () {
  var i = $(this).index();
  $(".gama-data li").removeClass("on").eq(i).addClass("on");
  $(".sec2_left .plist-style-1-wrap")
    .show()
    .eq(i)
    .siblings(".plist-style-1-wrap")
    .hide();
  $(".plist-style-1-wrap .plist-style-1")
    .eq(i)
    .show()
    .siblings(".plist-style-1")
    .hide();
  if ($(this).index() === 0) {
    if ($(".newpaly .swiper-slide").length <= 1) {
      $(".newpaly").removeClass(".swiper-container");
    } else {
      // Swiper1();
      return;
    }
  } else if ($(this).index() === 3) {
    if ($(".newvehicle .swiper-slide").length <= 1) {
      $(".newvehicle").removeClass(".swiper-container");
    } else {
      Swiper2();
    }
  }
  mySwiper8.update();
  PTTSendClick("btn", "gognew" + (i + 1) + "", "玩法资料" + (i + 1) + "");
});

function Swiper1() {
  var mySwiper4 = new Swiper(".newpaly", {
    pagination: ".newpaly-pagination",
    autoplay: 3000,
    // loop: true,
    paginationClickable: true,
    autoplayDisableOnInteraction: false,
    observer: true,
    observeParents: true,
  });
}

function Swiper2() {
  var mySwiper5 = new Swiper(".newvehicle", {
    autoplay: 3000,
    autoplayDisableOnInteraction: false,
    loop: true,
    pagination: ".newvehicle-pagination",
    paginationClickable: true,
    observer: true,
    observeParents: true,
  });
}
var mySwiper8;
contennt();
function contennt() {
  $.ajax({
    url: "//gp.qq.com/zlkdatasys///data_zlk_gwsybl.json",
    type: "get",
    async: true,
    contentType: "application/json",
    dataType: "jsonp",
    jsonpCallback: "xbbblcallback",
    success: function (data2) {
      for (var i=0;i<data2.bldtzh_94.length;i++){
        if(data2.bldtzh_94[i].constructor === Object){
          data2.bldtzh_94[i]["bldtm_e1"] = filterXSS(data2.bldtzh_94[i]["bldtm_e1"]);
          data2.bldtzh_94[i]["bldt_3c"] = filterXSS(data2.bldtzh_94[i]["bldt_3c"]);
          data2.bldtzh_94[i]["blsj_82"] = filterXSS(data2.bldtzh_94[i]["blsj_82"]);
        }
      }
      // 新地图 循环小图
      var html = "";
      var Img = data2.bldtzh_94;
      var len = Img.length;
      var html7 = "";
      if(len <= 4){
        $('.sec2_list3 .swiper-wrapper').css({'display':'flex','justify-content':'center'});
      }
      $.each(Img, function (i, obj) {
        if (i <= 4) {
          $(".plist_map .swiper-3-prev").hide();
          $(".plist_map .swiper-3-next").hide();
        } else {
          $(".plist_map .swiper-3-prev").show();
          $(".plist_map .swiper-3-next").show();
        }
        html +=
          "<li class='swiper-slide'>" +
          '<img src="' +
          filterXSS(obj.bldt_3c) +
          '" alt="' +
          filterXSS(obj.bldtm_e1) +
          '" class="map_listmig">' +
          '<span class="map_text">' +
          filterXSS(obj.bldtm_e1) +
          "</span>" +
          "</li>";
      });
      $(".map_list").html(html);
      mySwiper9 = new Swiper(".sec2_list3", {
        slidesPerView: 5,
        prevButton: ".swiper-button-prev2",
        nextButton: ".swiper-button-next2",
        spaceBetween : 16,
        observer: true,
        observeParents: true,
      });
      // 新地图 判断是否超过两个显示隐藏
      // if (len >= 2) {
      //   $(".map_list").show();
      // } else {
      //   $(".map_list").hide();
      // }
      // 新地图 点击小图替换大图
      $(".plist_map .map_img").attr("src", filterXSS(data2.bldtzh_94[0].bldt_3c));
      $(".map_list li").first().addClass("on");
      $(".map_list li").on("click", function () {
        var index = $(this).index();
        var Src = filterXSS(data2.bldtzh_94[index].bldt_3c);
        $(".map_list li").eq(index).addClass("on").siblings().removeClass("on");
        $(".plist_map .map_img").attr("src", Src);
        PTTSendClick(
          "btn",
          "xinditu" + (index + 1) + "",
          "新地图" + (index + 1) + ""
        );
      });

      // 新玩法
      for (var i=0;i<data2.blwfz_cf.length;i++){
        if(data2.blwfz_cf[i].constructor === Object){
          data2.blwfz_cf[i]["bldtm_e1"] = filterXSS(data2.blwfz_cf[i]["bldtm_e1"]);
          data2.blwfz_cf[i]["bldt_3c"] = filterXSS(data2.blwfz_cf[i]["bldt_3c"]);
          data2.blwfz_cf[i]["blsj_82"] = filterXSS(data2.blwfz_cf[i]["blsj_82"]);
          data2.blwfz_cf[i]["blwfjs_b0"] = filterXSS(data2.blwfz_cf[i]["blwfjs_b0"]);
          data2.blwfz_cf[i]["blwfm_5b"] = filterXSS(data2.blwfz_cf[i]["blwfm_5b"]);
          data2.blwfz_cf[i]["blwft_7e"] = filterXSS(data2.blwfz_cf[i]["blwft_7e"]);
          data2.blwfz_cf[i]["blwftl_0f"] = filterXSS(data2.blwfz_cf[i]["blwftl_0f"]);
        }
      }
      var html2 = "";
      var Img2 = data2.blwfz_cf;
      $.each(Img2, function (i, obj) {
        html2 +=
          '<div class="swiper-slide">' +
          '<img src="' +
          filterXSS(obj.blwft_7e) +
          '" alt="' +
          filterXSS(obj.blwfm_5b) +
          '" class="map_img">' +
          // '<p class="play_cont">' + obj.blwfjs_b0 + '</p>'+
          "</div>";
      });
      $(".newpaly .swiper-wrapper").append(html2);

      // 新载具
      var html3 = "";
      for (var i=0;i<data2.blzjzh_4c.length;i++){
        if(data2.blzjzh_4c[i].constructor === Object){
          data2.blzjzh_4c[i]["bldtm_e1"] = filterXSS(data2.blzjzh_4c[i]["bldtm_e1"]);
          data2.blzjzh_4c[i]["bldt_3c"] = filterXSS(data2.blzjzh_4c[i]["bldt_3c"]);
          data2.blzjzh_4c[i]["blsj_82"] = filterXSS(data2.blzjzh_4c[i]["blsj_82"]);
          data2.blzjzh_4c[i]["blwfjs_b0"] = filterXSS(data2.blzjzh_4c[i]["blwfjs_b0"]);
          data2.blzjzh_4c[i]["blwfm_5b"] = filterXSS(data2.blzjzh_4c[i]["blwfm_5b"]);
          data2.blzjzh_4c[i]["blwft_7e"] = filterXSS(data2.blzjzh_4c[i]["blwft_7e"]);
          data2.blzjzh_4c[i]["blwftl_0f"] = filterXSS(data2.blzjzh_4c[i]["blwftl_0f"]);
          data2.blzjzh_4c[i]["blzjjs_f0"] = filterXSS(data2.blzjzh_4c[i]["blzjjs_f0"]);
          data2.blzjzh_4c[i]["blzjm_53"] = filterXSS(data2.blzjzh_4c[i]["blzjm_53"]);
          data2.blzjzh_4c[i]["blzjt_1b"] = filterXSS(data2.blzjzh_4c[i]["blzjt_1b"]);
        }
      }
      var Img3 = data2.blzjzh_4c;
      $.each(Img3, function (i, obj) {
        html3 +=
          '<div class="swiper-slide">' +
          '<img src="' +
          filterXSS(obj.blzjt_1b) +
          '" alt="' +
          filterXSS(obj.blzjm_53) +
          '" class="map_img">' +
          // '<p class="play_cont">' + obj.blzjjs_f0 + '</p>'+
          "</div>";
      });
      $(".newvehicle .swiper-wrapper").html(html3);

      // 武器轮播
      var wq = "";
      var blwq = data2.blqxzh_17;
      $.each(blwq, function (i, obj) {
        if (i <= 5) {
          $(".sec2_box .swiper-2-prev").hide();
          $(".sec2_box .swiper-2-next").hide();
        } else {
          $(".sec2_box .swiper-2-prev").show();
          $(".sec2_box .swiper-2-next").show();
        }
        wq +=
          '<div class="swiper-slide" >' +
          '<span class="swip_sp1">' +
          '<img src="' +
          filterXSS(obj.blqdt_98) +
          '" alt="' +
          filterXSS(obj.blqxm_ee) +
          '">' +
          "</span>" +
          '<span class="swip_sp2">' +
          filterXSS(obj.blqxm_ee) +
          "</span>" +
          "</div>";
      });
      $(".swiper-container1 .swiper-wrapper").html(wq);
      $(".swiper-container1 .swiper-wrapper .swiper-slide")
        .eq(0)
        .addClass("on");
      mySwiper8 = new Swiper(".swiper-container1", {
        slidesPerView: 6,
        prevButton: ".swiper-button-prev1",
        nextButton: ".swiper-button-next1",
        observer: true,
        observeParents: true,
      });
      function weapon(k) {
        // 枪名详细信息
        html1 = "";
        html1 +=
          '<span class="sec2_sp1">' +
          filterXSS(blwq[k].blqxm_ee) +
          "</span>" +
          '<span class="sec2_sp2" >' +
          filterXSS(blwq[k].blqxlm_08) +
          "</span>" +
          '<span class="sec2_sp3"><i>口径：</i>' +
          filterXSS(blwq[k].kj_14) +
          "</span>" +
          '<span class="sec2_sp4">' +
          filterXSS(blwq[k].blqjswa_78) +
          "</span>";
        $(".sec2_top").html(html1);
        // 配件
        html2 = "";
        $.each(blwq[k].blqxpjzh_b2, function (i, obj) {
          html2 +=
            "<li>" +
            '<span class="sec2_list_sp1">' +
            '<img src="' +
            filterXSS(obj.blqpjt_8d) +
            '" alt="' +
            filterXSS(obj.pjm_40) +
            '">' +
            "</span>" +
            '<span class="sec2_list_sp2">' +
            filterXSS(obj.pjm_40) +
            "</span>" +
            "</li>";
        });
        $(".sec2_list").html(html2);
        // 皮肤
        html7 = "";
        var swop = data2.blqxzh_17;
        if (swop[k].qxpfzh_79 && swop[k].qxpfzh_79.length > 0) {
          for (var i = 0; i < swop[k].qxpfzh_79.length; i++) {
            html7 +=
              '<li class="swiper-slide">' +
              '<span class="sec2_list_sp1">' +
              '<img src="' +
              filterXSS(swop[k].qxpfzh_79[i].blqpf_bc) +
              '" alt="' +
              filterXSS(swop[k].qxpfzh_79[i].qxpft2_ac) +
              '">' +
              "</span>" +
              '<span class="sec2_list_sp2">' +
              filterXSS(swop[k].qxpfzh_79[i].qxpft2_ac) +
              "</span>" +
              "</li>";
          }
          $(".sec2_list2 .swiper-wrapper").html(html7);
          $(".sec2_box_pf").show();
        } else {
          $(".sec2_box_pf").hide();
        }
      }
      // 点击枪械切换
      $(".swiper-wrapper2 .swiper-slide").on("click", function () {
        var index = $(this).index();
        var Src = filterXSS(data2.blqxzh_17[index].blqdt_98);
        $(".swiper-wrapper2 .swiper-slide")
          .eq(index)
          .addClass("on")
          .siblings()
          .removeClass("on");
        $(".sec2_bigimg img").attr("src", Src);
        $(".sec2_box_pf").removeClass("sec2_box_jt");
        $(".sec2_list2").hide();
        weapon(index);
        k = 1;
        PTTSendClick(
          "btn",
          "xinqiangxie" + (index + 1) + "",
          "新枪械" + (index + 1) + ""
        );
      });
      weapon(0);

      // 皮肤切换
      $(".sec2_list2 ul").on("click", "li", function () {
        var i = $(this).index();
        var imgSrc = $(this).find("img").attr("src");
        $(".sec2_bigimg img").attr("src", imgSrc);
        $(".sec2_list2").hide();
        $(".sec2_box_pf").removeClass("sec2_box_jt");
        $(this).addClass("on").siblings().removeClass("on");
        if ($(".sec2_box_pf").hasClass("sec2_box_jt")) {
          $(".sec2_list2").show();
          $(".sec2_box_pf").addClass("sec2_box_jt");
        } else {
          $(".sec2_list2").hide();
          $(".sec2_box_pf").removeClass("sec2_box_jt");
        }
        // $(".pf-swiper").toggle();
        k = 1;
        PTTSendClick("btn", "pfqh" + (i + 1) + "", "皮肤切换" + (i + 1) + "");
      });
      $(".swiper-wrapper2 .swiper-slide-active").click();
    },
  });
}
$(".sec3_right_data a").on("click", function () {
  var index = $(this).index();
  $(this).addClass("on").siblings("a").removeClass("on");
});
var k = 1;
// 皮肤显示隐藏
$(".sec2_box_pf").on("click", function () {
  if (k == 1) {
    $(".sec2_list2").show();
    $(".sec2_box_pf").addClass("sec2_box_jt");
    k = 0;
    pifu();
  } else {
    $(".sec2_list2").hide();
    $(".sec2_box_pf").removeClass("sec2_box_jt");
    k = 1;
    pifu();
  }
});

function pifu() {
  // var mySwiper3 = new Swiper('.sec2_list2', {
  // 	slidesPerView: 'auto',
  // 	observer: true,
  // 	observeParents: true,
  // 	observeSlideChildren: true,
  // })
}

// 视频中心
$(".vlist_wrap").find(".vlist_style_1:first").show();
$(".video-ul-1 li").on("click", function () {
  var i = $(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(".vlist_wrap .vlist_style_1")
    .eq(i)
    .show()
    .siblings(".vlist_style_1")
    .hide();
  PTTSendClick("btn", "gogvideo" + (i + 1) + "", "视频中心" + (i + 1) + "");
});
/*	var vlist = $('.vlist_wrap .vlist_style_1');
	var chanelID = [4007, 4009, 4008, 4466];
	var chanelName = ['官方视频', '人气主播', '进阶教学', '赛事专栏']
	for (var i = 0; i < vlist.length; i++) {
		fillNews.list({
			gameID: '182',
			type: 'iTarget',
			id: chanelID[i],
			newsType: 'video',
			pageSize: 6,
			source: 'web_pc',
			// 独立详情页，因为前面设置了newsType:'video', 所以会在详情页地址后面自动加上?videoid=XXX
			detailURL: '/web201908/detail_video.html',
			tpl: '<li><a target="_blank" href="{url}" onclick="PTTSendReport({\'action\': \'click\',\'targetid\': \'{iVideoId}\',\'targettype\':\'video\', \'from\': \'v4\'})"><div class="img_wrap"><img src="{sIMG}" alt="{sTitle}"></div><div class="tbox"><p class="stitp1">{sTitle}</p></div></a></li>',
			wrap: vlist[i],
			callback: function (result) {
				// 填充完的回调
				$('.vlist_wrap_1 .vlist_style_1').eq(0).addClass('first'); // this指向option
				for (var j = 0; j < result.msg.result.length; j++) {
					PTTSendReport({
						action: 'pop',
						targetid: result.msg.result[j].iVideoId, //支持批量上报，targetid用英文逗号分隔
						targettype: "video",
						from: 'v4'
					})
				}
			}
		});
	};*/

// 热门排行榜
$(".sec3_right_data a").on("click", function () {
  var i = $(this).index();
  var rankdata = $(this).data("rank");
  list.update({
    rank: rankdata,
  });
  $(this).addClass("active").siblings("a").removeClass("active");
  PTTSendClick("btn", "phb" + i + "", "排行榜" + i + "");
});
var list = fillNews.list({
  gameID: "182",
  newsType: "video",
  id: 3998,
  rank: "dpvlist", // dpvlist|wpvlist|mpvlist|tpvlist|newlist 天|周|月|总|最新 榜
  pageSize: 6,
  detailURL: "/web201908/detail_video.html", // 详情页，根据newsType的不同，会在后面加上?newsid=XXX 或 ?videoid=XXX;
  tpl: function (json, index) {
    if (index == 0) {
      return '<li class="sec3_new_list1"><a href="{url}" class="text" target="_blank" onclick="PTTSendReport({\'action\': \'click\',\'targetid\': \'{iVideoId}\',\'targettype\':\'video\', \'from\': \'v4\'})"><span class="list">{idx1}</span><div class="sec3_img"><img src="{sIMG}" alt="{sTitle}"></div><span class="sec_text">{sTitle}</span><span class="sec3_list3 fl">{sAuthor}</span><span class="vide">{iTotalPlay}</span></a></li>\n';
    }
    return "<li><a href=\"{url}\" class=\"text\" target=\"_blank\" onclick=\"PTTSendReport({'action': 'click','targetid': '{iVideoId}','targettype':'video', 'from': 'v4'})\"><span class=\"list\">{idx1}</span>{sTitle}<span class=\"vide\">{iTotalPlay}</span></a></li>";
  },
  wrap: ".sec3_new_list",
  callback: function (result) {
    // 填充完的回调
    // console.log(result)
    for (var j = 0; j < result.msg.dpvlist.length; j++) {
      PTTSendReport({
        action: "pop",
        targetid: result.msg.dpvlist[j].iVideoId, //支持批量上报，targetid用英文逗号分隔
        targettype: "video",
        from: "v4",
      });
    }
  },
});
// 攻略中心
$(".sec4_left .strategy_ul li").on("click", function () {
  var i = $(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(".sec4_left .sec4_vlist").eq(i).show().siblings(".sec4_vlist").hide();
  PTTSendClick("btn", "gogstrategy" + (i + 1) + "", "攻略中心" + (i + 1) + "");
});
/*	var strlists = $('.sec4_left .sec4_vlist');
	var chanelID = [3997, 4006, 4541];
	var chanelName = ['落地选择', '攻楼技巧', '游戏设置']
	for (var i = 0; i < strlists.length; i++) {
		fillNews.list({
			gameID: '182',
			type: 'iTarget',
			id: chanelID[i],
			newsType: 'news',
			pageSize: 4,
			source: 'web_pc',
			// 详情页地址，因为前面设置了newsType:'news', 所以会在详情页地址后面自动加上?newsid=XXX
			detailURL: '/web201908/detail_news.html',
			tpl: '<li><a target="_blank" href="{url}" ontouchend="PTTSendReport({\'action\': \'click\',\'targetid\': \'{iNewsId}\',\'targettype\':\'news\', \'from\': \'v4\'})"><div class="img_wrap"><img src="{sIMG}" alt="{sTitle}"></div><div class="tbox"><p class="stitp1">{sTitle}</p><span class="itosp1">阅读量&nbsp;&nbsp;<i>{iTotalPlay}</i></span><span class="itosp2">{sIdxTimeShort}</span></div></a></li>',
			wrap: strlists[i],
			callback: function (result) {
				// 填充完的回调
				//   $(".strlist_wrap .plist_style_2").eq(0).addClass('first'); // this指向option
				for (var j = 0; j < result.msg.result.length; j++) {
					PTTSendReport({
						action: 'pop',
						targetid: result.msg.result[j].iNewsId, //支持批量上报，targetid用英文逗号分隔
						targettype: "news",
						from: 'v4'
					})
				}
			}
		});
	};*/

// 精品栏目
$(".sec4_right .strategy_ul li").on("click", function () {
  var i = $(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(".sec4_right .sec4_vlist2").eq(i).show().siblings(".sec4_vlist2").hide();
  PTTSendClick("btn", "gogstrategy" + (i + 1) + "", "精品栏目" + (i + 1) + "");
});
/*	var strlists = $('.sec4_right .sec4_vlist2');
	var chanelID = [5035, 5039, 5037, 4503],
		type, shiurl;
	for (var i = 0; i < 4; i++) {
		if (i == 3) {
			type = 'news';
			shiurl = '/web201908/detail_news.html'
		} else if (i === 0 || i === 1 || i === 2) {
			type = 'video';
			shiurl = '/web201908/detail_video.html'
		}
		var v4Str = '', newType1 = ''
		if (type == 'news') {
			v4Str = '<li><a href=\"{url}\" target="_blank" onclick="PTTSendReport({\'action\': \'click\',\'targetid\': \'{iNewsId}\',\'targettype\':\'news\', \'from\': \'v4\'})"><div class=\"img_wrap1\"><img src=\"{sIMG}\" alt=\"{sTitle}\"></div><div class=\"tbox1\"><p class=\"stitp1\">{sTitle}</p><span class=\"itosp1\">{iTotalPlay}</span><span class=\"itosp2\">{sIdxTimeShort}</span></div></a></li>\n'
		} else {
			v4Str = '<li><a href=\"{url}\" target="_blank" onclick="PTTSendReport({\'action\': \'click\',\'targetid\': \'{iVideoId}\',\'targettype\':\'video\', \'from\': \'v4\'})"><div class=\"img_wrap1\"><img src=\"{sIMG}\" alt=\"{sTitle}\"></div><div class=\"tbox1\"><p class=\"stitp1\">{sTitle}</p><span class=\"itosp1\">{iTotalPlay}</span><span class=\"itosp2\">{sIdxTimeShort}</span></div></a></li>\n'
		}

		fillNews.list({
			gameID: '182',
			type: 'iTarget',
			id: chanelID[i],
			newsType: type,
			pageSize: 6,
			source: 'web_pc',
			// 详情页地址，因为前面设置了newsType:'news', 所以会在详情页地址后面自动加上?newsid=XXX
			detailURL: shiurl,
			tpl: v4Str,
			wrap: strlists[i],
			callback: function (result) {
				
				PTTSendReport({
					action: 'pop',
					targetid: result.msg.result.iVideoId,//支持批量上报，targetid用英文逗号分隔
					targettype: "video",
					from: 'v4'
				})

			}
		});
	};

		v4Str1 = '<li><a href=\"{url}\" target="_blank" onclick="PTTSendReport({\'action\': \'click\',\'targetid\': \'{iNewsId}\',\'targettype\':\'news\', \'from\': \'v4\'})"><div class=\"img_wrap1\"><img src=\"{sIMG}\" alt=\"{sTitle}\"></div><div class=\"tbox1\"><p class=\"stitp1\">{sTitle}</p><span class=\"itosp1\">{iTotalPlay}</span><span class=\"itosp2\">{sIdxTimeShort}</span></div></a></li>\n'
		fillNews.list({
			gameID: '182',
			type: 'iTarget',
			id: chanelID[3],
			newsType: 'news',
			pageSize: 6,
			source: 'web_pc',
			// 详情页地址，因为前面设置了newsType:'news', 所以会在详情页地址后面自动加上?newsid=XXX
			detailURL: shiurl,
			tpl: v4Str1,
			wrap: strlists[3],
			callback: function (result) {
				PTTSendReport({
					action: 'pop',
					targetid: result.msg.result.iNewsId,//支持批量上报，targetid用英文逗号分隔
					targettype: "news",
					from: 'v4'
				})

			}
		});*/

// 活动中心
fillNews.list({
  gameID: "182",
  type: "iTarget",
  id: 4634,
  newsType: "news",
  pageSize: 5,
  source: "web_pc",
  // 详情页地址，因为前面设置了newsType:'news', 所以会在详情页地址后面自动加上?newsid=XXX
  detailURL: "/web201908/detail_news.html",
  tpl:
    "<div class=\"swiper-slide\"><a href=\"{url}\" onclick=\"PTTSendReport({'action': 'click','targetid': '{iNewsId}','targettype':'news', 'from': 'v4'})\"><img src=\"{sIMG}\" alt=\"{sTitle}\"></a></div>",
  wrap: ".sec2_right_swi .swiper-wrapper",
  callback: function (result) {
    // 填充完的回调
    var mySwiper7 = new Swiper(".sec2_right_swi", {
      autoplay: 3000, //可选选项，自动滑动
      loop: true,
      observer: true,
      observeParents: true,
      pagination: ".swiper-pagination",
      paginationClickable: true,
      onInit: function (swiper) {
        //Swiper初始化了
        for (var i = 0; i < $(".sec2_right_swi .swiper-slide").length; i++) {
          if (
            $(".sec2_right_swi .swiper-slide").eq(i).find("a").attr("href") ==
            "https://gp.qq.com/main.shtml"
          ) {
            $(".sec2_right_swi .swiper-slide")
              .eq(i)
              .find("a")
              .attr("href", "javascript:;");
          }
        }
      },
    });
    for (var j = 0; j < result.msg.result.length; j++) {
      PTTSendReport({
        action: "pop",
        targetid: result.msg.result[j].iNewsId, //支持批量上报，targetid用英文逗号分隔
        targettype: "news",
        from: "v4",
      });
    }
  },
});

// KOL大触
// var chanelID3 = [4497, 4499, 4500, 4498, 4502, 4501];
// var list6 = fillNews.list({
//   gameID: "182",
//   type: "iTarget",
//   id: 4910,
//   newsType: "news",
//   pageSize: 7,
//   tpl:
//     "<li>" +
//     "<a href=\"javascript:;\" target=\"_blank\" onclick=\"PTTSendReport({'action': 'click','targetid': '{iNewsId}','targettype':'news', 'from': 'v4'})\">" +
//     '<div class="img-warp">' +
//     '<img src="{sIMG}" alt="{sTitle}">' +
//     "</div>" +
//     '<span class="sec6_text">{sTitle}</span>' +
//     "</a>" +
//     "</li>",
//   wrap: ".sec6_content ul",
//   detailURL: "/web201908/list_video.html", // 详情页，根据newsType的不同，会在后面加上?newsid=XXX 或 ?videoid=XXX;
//   callback: function (result) {
//     // 填充完的回调
//     $.each($(".sec6_content ul li").find("a"), function (i, k) {
//       $(this).attr("href", "/gicp/video/694/0/" + chanelID3[i] + "/1.html");
//     });
//     for (var j = 0; j < result.msg.result.length; j++) {
//       PTTSendReport({
//         action: "pop",
//         targetid: result.msg.result[j].iNewsId, //支持批量上报，targetid用英文逗号分隔
//         targettype: "news",
//         from: "v4",
//       });
//     }
//   },
// });

// 游戏特色
function gameimg(){
	$.ajax({
	  url: "//gp.qq.com/zlkdatasys///data_zlk_gwsykvtst.json",
	  type: "get",
	  async: true,
	  contentType: "application/json",
	  dataType: "jsonp",
	  jsonpCallback: "gwsycallback",
	  success: function (data3) {
	  	for (var i=0;i<data3.gwsykv_18.length;i++){
	  		
	        if(data3.gwsykv_18[i].constructor === Object){
	          data3.gwsykv_18[i]["gwsbdt_12"] = filterXSS(data3.gwsykv_18[i]["gwsbdt_12"]);
	          data3.gwsykv_18[i]["gwxbdt_37"] = filterXSS(data3.gwsykv_18[i]["gwxbdt_37"]);
	        }
	    }
	  	for (var j=0;i<data3.mdtst_88.length;i++){
	        if(data3.mdtst_88[i].constructor === Object){
	          data3.mdtst_88[i]["pcdtst_c0"] = filterXSS(data3.mdtst_88[i]["pcdtst_c0"]);
	          data3.mdtst_88[i]["tstms_20"] = filterXSS(data3.mdtst_88[i]["tstms_20"]);
	        }
	    }
	  	for (var e=0;i<data3.tst_db.length;i++){
	        if(data3.tst_db[i].constructor === Object){
	          data3.tst_db[i]["pcdtst_c0"] = filterXSS(data3.tst_db[i]["pcdtst_c0"]);
	          data3.tst_db[i]["tstms_20"] = filterXSS(data3.tst_db[i]["tstms_20"]);
	        }
	    }
	    $(".bg .bg1").css(
	      "background",
	      "url(" + filterXSS(data3.gwsykv_18[0].gwsbdt_12) + ") no-repeat top center"
	    );
	    $(".bg .bg2").css(
	      "background",
	      "url(" + filterXSS(data3.gwsykv_18[0].gwxbdt_37) + ") no-repeat top center"
	    );
	
	    // 游戏特色轮播
	    setTimeout(function () {
	      var mySwiper2 = new Swiper(".sec5_swiper", {
	        autoplay: 2000, //可选选项，自动滑动
	        loop: true, //可选选项，开启循环
	        autoplayDisableOnInteraction: false,
	        observer: true,
	        observeParents: true,
	        prevButton: ".arrow-left",
	        nextButton: ".arrow-right",
	      });
	    }, 1000);
	
	    var htmlts = "";
	    $.each(data3.tst_db, function (y, obj4) {
	      htmlts +=
	        '<div class="swiper-slide">' +
	        '<img src="' +
	        filterXSS(obj4.pcdtst_c0) +
	        '" alt="' +
	        filterXSS(obj4.tstms_20) +
	        '">' +
	        "</div>";
	    });
	    $(".sec5_swiper .swiper-wrapper").html(htmlts);
	  },
	});
}
gameimg();

// 活动中心
/* data start*/
var curStart = 0,
  newsTotal = 0,
  curIdx = 0,
  activityNewsList = [];
/* data end*/

/* methods start*/
// 获取活动资讯列表
var getActivityNewsList = function () {
  if (curIdx + 6 <= activityNewsList.length) {
    updateNews(activityNewsList.slice(curIdx, curIdx + 6));
    return;
  }

  var params = {
    serviceId: 182,
    source: "web_pc",
    typeids: "1,2",
    logic: "or",
    filter: "channel",
    chanid: 4003,
    start: curStart,
    limit: 24,
    isJson: true,
  };

  $.ajax({
    type: "get",
    url: "https://apps.game.qq.com/cmc/cross",
    data: params,
    success: function (res) {
      newsTotal = res.data.total;
      curStart += 24;
      activityNewsList = activityNewsList.concat(res.data.items);

      updateNews(activityNewsList.slice(curIdx, curIdx + 6));
    },
  });
};

// 获取活动资讯列表上一页
var getActNewsPrePage = function () {
  if (curIdx < 6) return;
  curIdx -= 6;
  updateNews(activityNewsList.slice(curIdx, curIdx + 6));
};

// 获取活动资讯列表下一页
var getActNewsNextPage = function () {
  if (curIdx + 6 > newsTotal) return;
  curIdx += 6;
  getActivityNewsList();
};

// 更新按钮样式
var setNewsBtnClass = function () {
  if (curIdx >= 6) {
    $(".last-lage").addClass("select");
  } else {
    $(".last-lage").removeClass("select");
  }

  if (curIdx + 6 < newsTotal) {
    $(".next-lage").addClass("select");
  } else {
    $(".next-lage").removeClass("select");
  }
};

// 更新页面上的列表内容
var updateNews = function (newsList) {
  for (var i = 0; i < 6; i++) {
    // 活动资讯标题
    $(".new-tit")[i].innerHTML = newsList[i].sTitle;

    // 活动资讯跳转链接
    $(".new-link")[i].href =
      "https://gp.qq.com/gicp/news/684/" + newsList[i].iNewsId + ".html";

    // 活动资讯时间
    $(".new-time")[i].innerHTML = newsList[i].sIdxTime.substr(5, 5);
  }

  setNewsBtnClass();
};
/* methods end*/

/* action start*/
$(".acttit2").click(function () {
  if (curIdx > 0) return;

  getActivityNewsList();
});

$(".last-lage").click(function () {
  getActNewsPrePage();
});

$(".next-lage").click(function () {
  getActNewsNextPage();
});
/* action end*/

/* #t6Hl8#FBFDFC5AD8D8A824867213ADF68925AA */