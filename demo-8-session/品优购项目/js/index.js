$(function () {

	// 当页面滚动到一定位置时，显示侧边导航栏
	function block() {
		var Top = $(".branding_like").offset().top;
		if ($(document).scrollTop() >= Top) {
			$(".sidebar").fadeIn(400);
		} else {
			$(".sidebar").fadeOut(400);
		}
	}
	// 页面滑动到哪个位置 侧边导航栏就显示相应的位置
	function sid() {
		$(".w").each(function (i, ele) {
			if ($(document).scrollTop() > $(ele).offset().top - 200) {
				console.log(i);
				$(".sidebar")
					.children("li")
					.eq(i)
					.addClass("sidebarStyle")
					.siblings()
					.removeClass("sidebarStyle");
			}
		});
	}
	// 节流阀
	// 当我们点击率小 li 此时不需要执行滚动事件的背景选择
	var flag = true;
	sid();
	console.log($(".branding_ul").offset().top);
	block();
	$(window).scroll(function () {
		block();
		sid()
	});
	// 当页面滚动到内容区 显示返回顶部
	function sidebar_block() {
		var sidebar_top = $(".branding_ul").offset().top;
		if ($(document).scrollTop() > sidebar_top) {
			$(".sidebar_top").fadeIn(200);
		} else {
			$(".sidebar_top").fadeOut(200);
		}
	}
	sidebar_block();
	$(window).scroll(function () {
		sidebar_block();
	});
	// 点击返回顶部 页面有动画的返回到顶部
	$(".sidebar_top").click(function () {
		$("html")
			.stop()
			.animate(
				{
					scrollTop: 0,
				},
				function () {
					flag = true;
				}
			);
	});
	// 点击侧边导航栏标签 跳转到相应的模块
	$(".sidebar")
		.children("li")
		.click(function () {
			flag = false;
			$(this).addClass("sidebarStyle").siblings().removeClass("sidebarStyle");
			// console.log($(this).index());
			var sidebarTop = $(".w").eq($(this).index()).offset().top - 200;
			// console.log(sidebarTop);
			$("html").stop().animate(
				{
					scrollTop: sidebarTop,
				},
				400
			);
		});
	// $(".sidebar")
	// 	.children("li")
	// 	.eq(0)
	// 	.click(function () {
	// 		var sidebarTop = $(".branding_ul").offset().top;
	// 		$("html")
	// 			.stop()
	// 			.animate(
	// 				{
	// 					scrollTop: sidebarTop - 200,
	// 				},
	// 				400
	// 			);
	// 		$(this)
	// 			.css("background-color", "#B2191B")
	// 			.siblings()
	// 			.css("background-color", "");
	// 		$(this).css("color", "white").siblings().css("color", "#666");
	// 	});
	// $(".sidebar")
	// 	.children("li")
	// 	.eq(1)
	// 	.click(function () {
	// 		var sidebarTop = $(".branding_amusin").offset().top;
	// 		$("html")
	// 			.stop()
	// 			.animate(
	// 				{
	// 					scrollTop: sidebarTop - 200,
	// 				},
	// 				400
	// 			);
	// 		$(this)
	// 			.css("background-color", "#B2191B")
	// 			.siblings()
	// 			.css("background-color", "");
	// 		$(this).css("color", "white").siblings().css("color", "#666");
	// 	});
	// $(".sidebar")
	// 	.children("li")
	// 	.eq(2)
	// 	.click(function () {
	// 		var sidebarTop = $(".wiring_top").offset().top;
	// 		$("html")
	// 			.stop()
	// 			.animate(
	// 				{
	// 					scrollTop: sidebarTop - 200,
	// 				},
	// 				400
	// 			);
	// 		$(this)
	// 			.css("background-color", "#B2191B")
	// 			.siblings()
	// 			.css("background-color", "");
	// 		$(this).css("color", "white").siblings().css("color", "#666");
	// 	});
	// $(".sidebar")
	// 	.children("li")
	// 	.eq(3)
	// 	.click(function () {
	// 		var sidebarTop = $(".mobile_top").offset().top;
	// 		$("html")
	// 			.stop()
	// 			.animate(
	// 				{
	// 					scrollTop: sidebarTop - 200,
	// 				},
	// 				400
	// 			);
	// 		$(this)
	// 			.css("background-color", "#B2191B")
	// 			.siblings()
	// 			.css("background-color", "");
	// 		$(this).css("color", "white").siblings().css("color", "#666");
	// 	});
	// $(".sidebar")
	// 	.children("li")
	// 	.eq(4)
	// 	.click(function () {
	// 		var sidebarTop = $(".computer_top").offset().top;
	// 		$("html")
	// 			.stop()
	// 			.animate(
	// 				{
	// 					scrollTop: sidebarTop - 200,
	// 				},
	// 				400
	// 			);
	// 		$(this)
	// 			.css("background-color", "#B2191B")
	// 			.siblings()
	// 			.css("background-color", "");
	// 		$(this).css("color", "white").siblings().css("color", "#666");
	// 	});
	// $(".sidebar")
	// 	.children("li")
	// 	.eq(5)
	// 	.click(function () {
	// 		var sidebarTop = $(".hot").offset().top;
	// 		$("html")
	// 			.stop()
	// 			.animate(
	// 				{
	// 					scrollTop: sidebarTop - 200,
	// 				},
	// 				400
	// 			);
	// 		$(this)
	// 			.css("background-color", "#B2191B")
	// 			.siblings()
	// 			.css("background-color", "white");
	// 		$(this).css("color", "white").siblings().css("color", "#666");
	// 	});
	// 当页面滑动到某个模块 相应的导航栏就显示当前的的背景颜色

	// $(window).scroll(function () {
	// 	// sid()
	// });
});
