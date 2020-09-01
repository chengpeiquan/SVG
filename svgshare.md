# <center>svg 动画实战备份</center>
## 1.SVG 含义
### svg一般是指<font color=red>可伸缩矢量图形</font>,一般使用XML描述2D图形的语言，基于<font color=red>万维网的标准</font>
## 2.SVG 常用场景
### 图表视图(echart（有svg模式))、地图视图(WEB-GIS)
### 形象(AI)的全网应用
### UI 产品的设计
### SVG 动画
## 3.有那些工具可以辅助生成svg
### svg.js snap.js 可以操作svg的dom元素（增删改），可以赋予元素事件
## 4.常用标签
### 预定义图形标签：rect（矩形）、circle（圆型）、ellipse（椭圆）、line（线）、polyline（折线）、polygon（多边形）
	1.rect 常用属性：x,y->代表左上角的坐标位置,rx,ry-》代表圆角x,y方向的半径，不能为负值
	实例代码：
		<rect x="10" y="10" width="30" height="30"/>
		<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
	2.cricle 常用属性：r 半径 cx,cy 圆心坐标
	实例代码：
		<circle cx="100" cy="100" r="50" fill="#fff"></circle>
	3.ellipse 常用属性 rx,ry 圆x,y半径。cx,cy 圆心卫星
	实例代码：
		<ellipse cx="75" cy="75" rx="20" ry="5"/>
	4.line 常用属性 x1 x2 y1 y2 其中 x1 y1 为起点坐标 x2 y2 为终点坐标
	实例代码：
		<line x1="10" x2="50" y1="110" y2="150"/>
	5.polyline 折线 常用属性  points 点集数列 每个点必须包含两个数字，即坐标点
	实例代码：
		<polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145"/>
	6.polygon 多边形 points 点集数列 与折线差不多，但是多边形这个最后一个点会与第一个点相连
	实例代码：
		<polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"/>
### 路径标签：path 上述预定义标签度可以通过路径标签实现
	path 常用属性：d 定义路径
	常用d命令：M 起点 （0，0） L 经过的点（x,y） H (水平线，x) V （垂直线 y） A 圆弧 rx ry 圆弧的x,y轴半径 x 旋转角度 l 0/1 代表弧线小于180或大于180 s 0/1 顺时针/逆时针 x y 为圆心
	实例代码：
		d="M 0 10 L 59.6 10" 线路径
		d="M10 315 L 110 215 A 30 50 0 0 1 162.55 162.45  L 172.55 152.45" 圆弧
### 集合标签：g、symbol、defs [详细对比可戳此处查看](http://www.cnblogs.com/dxy1982/archive/2012/05/17/2503782.html  "详细对比可戳此处查看")
	<g>：组合标签。添加 id 属性来作为引用的钩子，可在 <g> 标签上设置这组元素的相关属性（填色、描边等等）。
	<symbol>：模板标签。与 <g> 标签一样，通过 id 进行引用。不同点在于，symbol 元素本身不会被渲染；symbol 元素拥有属性 viewBox 和 preserveAspectRatio，这些允许 symbol 缩放图形。
	<defs>：定义标签。不仅仅是图形对象的合集，还可以是渐变效果、蒙版、滤镜等等，设置好 id，在对应的属性（例如渐变就是 fill、蒙版就是 mask、滤镜就是 filter）中引用即可，引用格式为“url(#id)”
## 5.svg动画实战
#### 1.css 主要使用到的属性 stroke-dasharray 虚实线长度（ps:只填一个，为等长，如：stroke-dasharray：10； 填三个侧按按照顺序进行绘制与不绘制操作）  stroke-dashoffset 虚线偏移位置
##### 可参考keyframe使用方式，通过百分比或者from to进行动画控制/直接通过插件
##### demo可参考easyanimation文件夹
#### 2.js 需通过amine.js/snap.js 本文使用时amine.js，这个使用于需要动态路径情况下或者路径复杂情况下，需要通过插件计算实线长度驱动动画进行
	如果当我们需要绘制路线图时，需要获取对应的坐标点，由于本活动查询专题只提供了对应的方块位置,并不是实际坐标点，因此需要计算每个方块的中心点，根据中心点进行连接，如果需要箭头，可以通过计算对应的箭头的路径实际上是一个等腰三角形的路线，所以用sin,cos,tan等三角函数则可准确计算出箭头的位置和方向,可通过drawLineArrow（）直接得出箭头函数需要的坐标点，然后生成线路数据后，就可以通过amine进行动画了
##### 具体参数可参考amine.js [中文官网api文档](https://www.animejs.cn/documentation/#lineDrawing "中文官网api文档")
##### demo可参考activity文件夹
