$(function () {
	// 封装一个数组求和函数
	function NumList(list) {
		var sun = 0;
		for (var i = 1; i < list.length; i++) {
			sun += parseFloat(list[i]);
		}
		return sun;
	}
	// 封装一个函数 用来结算总数量或总金额
	function numSun(ojb, type1) {
		// ojb 为需要遍历的对象 type1 为文本类型 例如 text val
		// 声明一个总和
		var sun = 0;
		$(ojb).each(function (index, domEle) {
			sun += $(domEle).type1();
		});
		return sun;
	}
	// 禁止用户右键和选中
	// contextmenu 主要控制应该何时显示上下文菜单，主要由于程序员取消默认的上下文菜单
	document.addEventListener("contextmenu", function (e) {
		e.preventDefault();
	});
	// 禁止鼠标选中(selectstart 开始选中)
	document.addEventListener("selectstart", function (event) {
		event.preventDefault();
	});
	// 用户点击删除 当前元素的大盒子删除 并且重新结算总和
	$(".commodity")
		.find(".remove")
		.click(function () {
			$(this).parent().parent(".commodity").remove();
			// 将所有购物车上的价格求和 并转化为数组
			var quantity = $(".commodity").find(".sun").text().split("￥");
			// 将获取的数组求和
			var priceSun = NumList(quantity).toFixed(2);
			// 将价格的和放在结算元素里面
			$(".money_sun").text("￥" + priceSun);
			// 将商品的数量总和添加到 结算模块
			var sun = 0;
			$(".input_val").each(function (index, domEle) {
				sun += $(domEle).val() - "";
			});
			$(".num").text(sun);
		});
	$(".commodity").index();
	var num = $(".input_val").val();
	// console.log(num);
	// 点击增加或减少商品模块
	$(".add").click(function () {
		var num = $(this).siblings("li").children(".input_val").val();
		num++;
		$(this).siblings().children(".input_val").val(num);
		// $(".num").html(num);
		// 将结算好的价格保留两位小数
		var price = (
			num * $(this).parents(".amount").siblings(".price").text().substr(1)
		).toFixed(2);
		$(this)
			.parents(".amount")
			.siblings(".sun")
			.html("￥" + price);
		$(".money_sun").html("￥" + price);
		// console.log()
		// 将所有购物车上的价格求和 并转化为数组
		var quantity = $(".commodity").find(".sun").text().split("￥");
		// 将获取的数组求和
		var priceSun = NumList(quantity).toFixed(2);
		// 将价格的和放在结算元素里面
		$(".money_sun").text("￥" + priceSun);
		// 将商品的数量总和添加到 结算模块
		var sun = 0;
		$(".input_val").each(function (index, domEle) {
			sun += $(domEle).val() - "";
		});
		// console.log(numSun('.input_val','val'))
		$(".num").text(sun);
	});
	$(".reduce").click(function () {
		var num = $(this).siblings("li").children(".input_val").val();
		if (num <= 0) {
			alert("当前数量为0 ,不能再减少");
			num = 0;
		} else {
			num--;
		}
		// 将物品的件数赋值给 总量
		// $(".num").html(num);
		$(this).siblings("li").siblings().children(".input_val").val(num);
		var price = (
			num * $(this).parents(".amount").siblings(".price").text().substr(1)
		).toFixed(2);
		$(this)
			.parents(".amount")
			.siblings(".sun")
			.text("￥" + price);
		// 将所有购物车上的价格求和 并转化为数组
		var quantity = $(".commodity").find(".sun").text().split("￥");
		// 将获取的数组求和
		var priceSun = NumList(quantity).toFixed(2);
		// 将价格的和放在结算元素里面
		$(".money_sun").text("￥" + priceSun);
		// 将商品的数量总和添加到 结算模块
		var sun = 0;
		$(".input_val").each(function (index, domEle) {
			sun += $(domEle).val() - "";
		});
		$(".num").text(sun);
	});
	// 如果用户直接在表单里面输入商品数量 则重新计算价格
	$(".input_val").change(function () {
		var price =
			$(this).val() *
			$(this).parents(".amount").siblings(".price").text().substr(1);
		$(this)
			.parents(".amount")
			.siblings(".sun")
			.text("￥" + price);
		// 将所有购物车上的价格求和 并转化为数组
		var quantity = $(".commodity").find(".sun").text().split("￥");
		// 将获取的数组求和
		var priceSun = NumList(quantity).toFixed(2);
		// 将价格的和放在结算元素里面
		$(".money_sun").text("￥" + priceSun);
		// 将商品的数量总和添加到 结算模块
		var sun = 0;
		$(".input_val").each(function (index, domEle) {
			sun += $(domEle).val() - "";
		});
		$(".num").text(sun);
	});
	// 点击全选按钮 ，复选框全部选中 ,取消全选 复选框全部取消
	$("#checked_all").change(function () {
		var trans = $(this).prop("checked");
		$("input[type = checkbox]").prop("checked", trans);
		if ($(this).prop("checked")) {
			$(".check").parents(".commodity").css("background-color", "#fff5e7");
		} else {
			$(".check").parents(".commodity").css("background-color", "");
		}
	});
	// 当我们单击复选框全部选中时 全选按钮应该也要选中 ：checked 查看当前有多少复选框选中
	var check_num = $(".check").length; // 将复选框个数赋值给 check_num
	$(".check").change(function () {
		// 判断用户是否全部选中商品
		if ($(".check:checked").length == check_num) {
			$("#checked_all").prop("checked", true);
		} else {
			$("#checked_all").prop("checked", false);
		}
	});
	// 点击删除选中的商品 选中的商品删除
	$(".delete").click(function () {
		$(".check").each(function (index, ele) {
			if ($(ele).prop("checked") == true) {
				$(ele).parent().remove();
			}
		});
		// 将所有购物车上的价格求和 并转化为数组
		var quantity = $(".commodity").find(".sun").text().split("￥");
		// 将获取的数组求和
		var priceSun = NumList(quantity).toFixed(2);
		// 将价格的和放在结算元素里面
		$(".money_sun").text("￥" + priceSun);
		// 将商品的数量总和添加到 结算模块
		var sun = 0;
		$(".input_val").each(function (index, domEle) {
			sun += $(domEle).val() - "";
		});
		$(".num").text(sun);
	});
	// 点击清空购物车 商品模块清除
	$(".emoty").click(function () {
		$(".commodity").remove();
	});
	// 将选中的商品添加背景
	$(".check").change(function () {
		if ($(this).prop("checked")) {
			$(this).parents(".commodity").css("background-color", "#fff5e7");
		} else {
			$(this).parents(".commodity").css("background-color", "");
		}
	});
});
