/*!
 * 魔方效果
 */


arr = document.querySelectorAll(".magic-box-page");
// 遍历六个面
for (var n = 0; n < arr.length; n++){
  // 外循环控制行
  for (var r = 0; r < 3; r++) {
    // 内循环控制列
    for (var c = 0; c < 3; c++) {
      // 创建元素
      var divs = document.createElement("div")
      divs.style.cssText = "width: 40px;height: 40px;border: 1px solid #fff;box-sizing: border-box;position: absolute;background-image: url('/styles/images/magic/a"+n+".jpg');background-size:120px 120px;";
      arr[n].appendChild(divs);

      divs.style.left = c*40+"px";
      divs.style.top = r*40+"px";
      // 背景图像定位
      divs.style.backgroundPositionX = -c*40+"px";
      divs.style.backgroundPositionY = -r*40+"px";
    }
  }
}
