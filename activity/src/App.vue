<template>
	<div id="app" :class="">
		<div class="showTips" v-show="istexttips">{{ texttips }}</div>
		<div class="loading" style="display: none;" v-show="loading">
			<div class="container animation-1">
				<div class="shape shape1"></div>
				<div class="shape shape2"></div>
				<div class="shape shape3"></div>
				<div class="shape shape4"></div>
			</div>
		</div>
		<div class="topHead">
			<div class="topHead-mes">
				<div class="back" @click="back()"></div>
				<p class="title">明日方舟活动查询</p>
				<div class="share" @click="tt.showShareMenu()"></div>
			</div>
		</div>
		<div class="scroll">
			<div class="search" :class="isbegin ? (showPicker ? 'right-iconan' : 'right-iconanb') : ''">
				<van-search shape="round" v-model="value" placeholder="输入或者右侧下拉菜单选择您要查询的地图" @input="input(value)" clear-trigger="always" @clear="clear()">
					<template #left-icon>
						<div class="searchicon"></div>
					</template>
					<template #right-icon>
						<div class="dropDown" @click="onDropDown"></div>
					</template>
				</van-search>
				<div class="searchlist" v-show="isdrop">
					<ul :class="isWx ? 'listb' : 'list'">
						<li v-for="(item, index) in maplist" :key="index" @click="mapdetail(item.id, item.name)">{{ item.name }}</li>
					</ul>
				</div>
			</div>
			<div class="mapShowBg" v-show="ismapdetail">
				<div class="svglx" v-show="issvg">
					<svg>
						<!-- <defs>
				    <marker id="Triangle" viewBox="0 0 20 20" refX="0" refY="10"
				        markerWidth="10" markerHeight="10" orient="auto">
				      <path d="M 0 0 L 20 10 L 0 20 z" marker-end="url(#Triangle)"/>
				    </marker>
				  </defs> -->
						<path class="path" :d="svg" fill="none" stroke="rgba(217,38,38,.8)" stroke-width="4"></path>
						<!-- <path d="M0,0 L240,0 L240,240 L0,240 Z" fill="#fff" stroke="#000" stroke-width="1" transform="translate(5,5)"></path> -->
					</svg>
					<svg><path class="pathb" :d="svgb" fill="none" stroke="rgba(250,209,216,.95)" stroke-width="2"></path></svg>
				</div>
				<ul class="list">
					<li class="item" v-for="(item, index) in map_data" :key="index">
						<!-- <p class="lattice" v-for="(itemb,indexb) in item" :key="indexb" :class="isclass(itemb)" :id="'mapzb'+itemb" :data-id="itemb" :data-zm="letter(item[2]) + indexb" v-runonce:[Centralpoint]="{'id':itemb,'coordinate':letter(item[2]) + indexb}" > -->
						<p
							class="lattice"
							v-for="(itemb, indexb) in item"
							:key="indexb"
							:class="isclass(itemb)"
							:id="'mapzb' + itemb"
							:data-id="itemb"
							:data-zm="letter(item[2]) + indexb"
						>
							<span v-show="index == map_data.length - 1 && isclass(itemb) != ''">{{ letter(zimu[index]) + (indexb + 1) }}</span>
							<span v-show="index !== map_data.length - 1 && isclass(itemb) != ''">
								{{ letter(zimu[index]) + (indexb + 1) }}
								<!-- {{letter("喔喔") + (indexb+1)}} -->
							</span>
							<!-- <i :class="zb($event)"></i> -->
							<!-- <span>{{itemb}}</span> -->
							<!-- <span v-show="isclass(itemb)!=''">{{letter(itemb)+Math.ceil(itemb/10)}}</span> -->
						</p>
					</li>
				</ul>
			</div>
			<p class="texttips" v-show="!ismapdetail">
				最新地图数据以游戏上线实际内容为准，游戏更新后我们会在第一时间更新数据。想吐槽工具，或者想要更多功能，欢迎加入QQ群836829121与我们沟通交流，我们等着你哟~=w=
			</p>
			<div class="picExample" v-show="ismapdetail">
				<div class="title">
					<div class="icon"></div>
					<div class="mes">图例</div>
				</div>
				<ul class="picExampleList">
					<li class="item">
						<div class="itemBg">
							<div class="pubSty smallicona"></div>
							<div class="itemMes">禁入区</div>
						</div>
					</li>
					<li class="item">
						<div class="itemBg">
							<div class="pubSty smalliconb"></div>
							<div class="itemMes">不可放置位</div>
						</div>
					</li>
					<li class="item">
						<div class="itemBg">
							<div class="pubSty smalliconc"></div>
							<div class="itemMes">平地</div>
						</div>
					</li>
					<li class="item">
						<div class="itemBg">
							<div class="pubSty smallicond"></div>
							<div class="itemMes">高台</div>
						</div>
					</li>
					<li class="item">
						<div class="itemBg">
							<div class="pubSty smallicone"></div>
							<div class="itemMes">起点</div>
						</div>
					</li>
					<li class="item">
						<div class="itemBg">
							<div class="pubSty smalliconf"></div>
							<div class="itemMes">终点</div>
						</div>
					</li>
					<li class="item">
						<div class="itemBg">
							<div class="pubSty smallicong"></div>
							<div class="itemMes">特殊区域</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="enemyExample" v-show="ismapdetail">
				<div class="title">
					<div class="icon"></div>
					<div class="mes">敌兵</div>
				</div>

				<ul class="enemyExampleList">
					<li class="first">
						<p><span>序号</span></p>
						<p><span>敌兵图片</span></p>
						<p><span>敌兵数量</span></p>
						<p><span>出现次序</span></p>
						<p><span>出现间隔</span></p>
						<p><span>出现时间点</span></p>
						<p><span>阶段时间点</span></p>
						<p><span>出现位置</span></p>
						<p><span>经过位置</span></p>
						<p><span>结束位置</span></p>
					</li>
					<li class="pub" v-for="(item, index) in enemylist" :key="index">
						<p>
							<span>{{ item.sort }}</span>
						</p>
						<p>
							<span class="pic"><img :src="item.enemy_img" /></span>
							<span class="pathbtn" @click="path(item.route, index)"><van-button round type="info">路线图</van-button></span>
						</p>
						<p>
							<span>{{ item.num }}</span>
						</p>
						<p>
							<span>{{ item.frequency }}</span>
						</p>
						<p>
							<span>{{ item.interval }}s</span>
						</p>
						<p>
							<span>{{ item.time_point }}s</span>
						</p>
						<p>
							<span>{{ item.stage_time_point }}s</span>
						</p>
						<p>
							<span>{{ htmldata(item.route[0], 0) }}</span>
						</p>
						<p>
							<span>
								<!-- <span v-for="(itemb,index) in item.route" :key="index"> -->
								{{ htmldata(item.route, 1) }}
							</span>
						</p>
						<p>
							<span>{{ htmldata(item.route[item.route.length - 1], 2) }}</span>
							<!-- <span>{{item.route[item.route.length-1]}}</span> -->
							<!-- <span v-for="(itemb,index) in item.route" :key="index">
								{{htmldata(itemb[item.route[index].length-1],2)}}
							</span> -->
						</p>
					</li>
				</ul>
				<!-- </div> -->
			</div>
		</div>
	</div>
</template>

<style lang="stylus">
.tinytiger--mobile__share .tinytiger--mobile__share-list
	height 6em !important
#app
	font-family Avenir, Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
	background #FFFFFF
	width 100%
	height 100%
	display flex
	flex-direction column
	.showTips
		position fixed
		font-size 30px
		text-align center
		width 74vw
		line-height 45px
		left 10vw
		top 50%
		transform translateY(-50%)
		z-index 3
		background-color rgba(0, 0, 0, 0.65)
		color white
		border-radius 2px
		padding 3vw
		box-shadow 0px 0px 2px 0px #fff
	.texttips
		color #FF0000
		width 637.5px
		margin 0 auto
		text-align justify
		font-size 20px
		font-weight 600
	.van-field__control
		display flex
		align-items center
		&::-webkit-input-placeholder
			color #bbb
			padding-top 1vw
	.van-cell
		line-height 1
	.scroll
		display flex
		flex-direction column
		flex 1
		overflow-y hidden
	.enemyExample
		width 100%
		display flex
		justify-content center
		flex-wrap wrap
		// margin-bottom 60px
		flex 1
		overflow hidden
		flex-direction column
		.enemyscroll
			overflow hidden
			/* overflow: auto; */
			width 100%
			display flex
		.enemyExampleList
			flex 1
			width 100%
			height 99%
			display flex
			flex-wrap wrap
			overflow-x auto
			padding 0 0 7.5px 0
			&::-webkit-scrollbar
				width 10px
				height 10px
			&::-webkit-scrollbar-thumb
				border-radius 15px
				-webkit-box-shadow inset 0 0 5px rgba(0, 0, 0, 0.2)
				background #535353
			&::-webkit-scrollbar-track
				-webkit-box-shadow inset 0 0 5px rgba(0, 0, 0, 0.2)
				border-radius 15px
				background #EDEDED
			.first
				height 60px
				width 100%
				display flex
				flex none
				font-size 28px
				font-family PingFangre
				font-weight 400
				color rgba(140, 140, 140, 1)
				p
					background rgba(245, 245, 245, 1)
			.pub
				// height 80px
				width 100%
				display flex
				flex none
				padding 0 0 7.5px 0
				// border-bottom 2px solid #F5F5F5
				// margin 10px 0
				p
					// height 60px
					// padding 8px 0
					border-bottom 2px solid #F5F5F5
					flex-wrap wrap
					padding 7.5px 0
					span
						width 100%
				.pathbtn
					width 60%
					// height 80%
					font-size 15px
					margin-left 0.7vw
				.pic
					display inline-block
					width 50px
					height 50px
					img
						width 100%
						height 100%
			li
				p
					width 25%
					height 100%
					flex none
					display flex
					align-items center
					justify-content center
					font-size 28px
					font-family PingFangre
					font-weight 400
					color rgba(38, 38, 38, 1)
					&:nth-child(9)
						width 50%
						flex-wrap wrap
						// padding 0 20px
		.title
			margin auto
			width 710px
			display flex
			justify-content left
			align-items center
			// padding-bottom 28px
			// margin-bottom 18px
			border-bottom #F5F5F5 2px solid
			.icon
				background url('assets/img/Bossicon.png') no-repeat
				background-size 100% 100%
				width 32px
				height 40px
				margin-right 6px
			.mes
				font-size 32px
				font-family PingFangSemibold
				font-weight 600
				color rgba(38, 38, 38, 1)
	.picExample
		width 100%
		display flex
		justify-content center
		flex-wrap wrap
		// margin-bottom 70px
		.picExampleList
			width 710px
			display flex
			justify-content left
			flex-wrap wrap
			.itemMes
				font-size 28px
				font-family PingFangre
				font-weight 400
				color rgba(38, 38, 38, 1)
				margin 20px 12px
			.pubSty
				width 36px
				height 36px
				margin 20px 12px
			.smallicona
				background rgba(22, 22, 22, 1)
			.smalliconb
				background rgba(52, 52, 52, 1)
			.smalliconc
				background rgba(117, 117, 117, 1)
			.smallicond
				background rgba(188, 188, 188, 1)
			.smallicone
				background rgba(192, 51, 72, 1)
			.smalliconf
				background rgba(60, 130, 218, 1)
			.smallicong
				background url('assets/img/smallicon.png') no-repeat
				background-size 100% 100%
			li
				width 33%
				// flex 1
				height 60px
				display flex
				justify-content left
				align-items center
				margin-bottom 20px
				&:nth-child(3n+3)
					justify-content flex-end
				.itemBg
					min-width 60px
					height 100%
					background rgba(245, 245, 245, 1)
					display flex
					justify-content left
					align-items center
		.title
			width 710px
			display flex
			justify-content left
			align-items center
			// padding-bottom 28px
			// margin-bottom 18px
			border-bottom #F5F5F5 2px solid
			.icon
				background url('assets/img/Development.png') no-repeat
				background-size 100% 100%
				width 32px
				height 32px
				margin-right 6px
			.mes
				font-size 32px
				font-family PingFangSemibold
				font-weight 600
				color rgba(38, 38, 38, 1)
	.mapShowBg
		width 750px
		// height:594px;
		background rgba(44, 41, 41, 1)
		border-bottom 14px solid #f5f5f5
		// margin-bottom 50px
		position relative
		svg
			position absolute
			z-index 4
			width 698px
			height 100%
			left 50%
			margin-left -349px
			top 0
		.list
			width 698px
			height 100%
			margin auto
			.item
				display flex
				width 100%
				p
					flex 1
					width 52px
					height 52px
					background rgba(22, 22, 22, 1)
					margin 2px
					display flex
					justify-content center
					align-items center
					span
						font-size 12px
						font-family PingFangSemibold
						font-weight 600
						color rgba(140, 140, 140, 1)
				.smallicona
					background rgba(22, 22, 22, 1)
				.smalliconb
					background rgba(52, 52, 52, 1)
				.smalliconc
					background rgba(117, 117, 117, 1)
				.smallicond
					background rgba(188, 188, 188, 1)
				.smallicone
					background rgba(192, 51, 72, 1)
				.smalliconf
					background rgba(60, 130, 218, 1)
				.smallicong
					background url('assets/img/smallicon.png') no-repeat
					background-size 100% 100%
	.right-iconan
		.dropDown
			-webkit-transform rotate(180deg)
			transform rotate(180deg)
			-webkit-animation-name rightrotate
			animation-name rightrotate
			animation-delay 0s
			animation-duration 0.8s
			animation-iteration-count 1
	.right-iconanb
		.dropDown
			-webkit-animation-name rightrotateb
			animation-name rightrotateb
			animation-delay 0s
			animation-duration 0.8s
			animation-iteration-count 1
	.search
		width 100%
		height 100px
		display flex
		flex-wrap wrap
		justify-content center
		position relative
		z-index 5
		.searchlist
			width 637.5px
			height 450px
			background rgba(245, 245, 245, 1)
			display flex
			flex-wrap wrap
			overflow-y auto
			position absolute
			top 93px
			.list
				width 100%
				display flex
				flex-wrap wrap
				justify-content center
				align-content baseline
				li
					// flex none
					width 95%
					text-align left
					font-size 28px
					margin 15px 0
			.listb
				width 100%
				li
					// flex none
					width 95%
					text-align left
					font-size 28px
					margin 15px auto
		.searchicon
			background url('assets/img/searchicon.png') no-repeat
			background-size 100% 100%
			width 32px
			height 32px
			margin 0 10px 0 20px
		.dropDown
			background url('assets/img/dropicon.png') no-repeat
			background-size 100% 100%
			width 28px
			height 18px
			margin-right 22.5px
		.van-search
			padding-bottom 0
		.van-field__body
			input
				font-size 28px
		.van-search__content
			background rgba(245, 245, 245, 1)
			width 690px
			height 76px
			align-items center
			.van-icon
				font-size 32px
				margin 0 20px
	.topHead
		width 750px
		height 96px
		background rgba(255, 255, 255, 1)
		.topHead-mes
			width 93%
			height 100%
			margin auto
			align-items center
			justify-content space-between
			display flex
			.back
				background url('assets/img/back.png') no-repeat
				background-size 100% 100%
				width 28px
				height 40px
			.title
				color #2a2a28
				font-family 'PingFangSC-Regular'
				font-size 28px
				font-weight 400
			.share
				background url('assets/img/sharebtn.png') no-repeat
				background-size 100% 100%
				width 40px
				height 40px
.rightrotate
	-webkit-animation-name rightrotate
	animation-name rightrotate
@keyframes rightrotate
	0%
		-webkit-transform rotate(0)
		transform rotate(0)
		transform-origin center
		left 0
	100%
		-webkit-transform rotate(180deg)
		transform rotate(180deg)
		transform-origin center
		left 0
.rightrotateb
	-webkit-animation-name rightrotateb
	animation-name rightrotateb
@keyframes rightrotateb
	0%
		-webkit-transform rotate(180deg)
		transform rotate(180deg)
		transform-origin center
	100%
		-webkit-transform rotate(0)
		transform rotate(0)
		transform-origin center
</style>
<script>
import './assets/css/base.css';
import './assets/css/loading.css';
// import sharecom from './components/share.vue';
import underscore from 'underscore';
import anime from 'animejs/lib/anime.es.js';
import html2canvas from './assets/js/html2canvas.min.js';
var browser = {
	versions: (function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == ' qq' //是否QQ
		};
	})(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
export default {
	name: 'app',
	data() {
		let _that = this;
		return {
			urlid: '',
			testid: '',
			isbegin: false,
			showPicker: false,
			loading: false,
			isshare: false,
			istest: false,
			value: '',
			maplist: [],
			maplistb: [],
			enemylist: [],
			isdrop: false,
			isdropb: false,
			tile_forbidden: '',
			tile_road: '',
			tile_wall: '',
			tile_floor: '',
			tile_start: '',
			tile_end: '',
			tile_special: '',
			map_data: '',
			startlist: [],
			map_maxnum: 0,
			zimu: [],
			svg: 'M13,13.5 L 41,13.5 L 41 40.5 L13 40.5 Z',
			svgb: 'M13,13.5 L 41,13.5 L 41 40.5 L13 40.5 Z',
			Centralpoint: {},
			tt: '',
			svgnum: -1,
			ismapdetail: false,
			isWx: false,
			init: {
				width: 0,
				height: 0
			},
			url: '',
			apiurl: '//toolsapi.tinytiger.cn/',
			issvg: false,
			texttips: '复制成功！',
			istexttips: false
		};
	},
	components: {
		// sharecom,
	},
	computed: {},
	created() {
		this.tt = new TinyTigerApi('master');
		this.testid = this.$route.query.Version;
		this.fromdata = this.$route.query.from;
		this.urlid = this.$route.query.id != '' && this.$route.query.id != undefined && this.$route.query.id != null ? this.$route.query.id : 0;
		let url, tt;
		let type = this.$route.query.type;

		if (!this.tt.isMobile) {
			if (type != 'pc') {
				window.location.href = 'https://tools.tinytiger.cn/mtbox_toratools_pc/index.html?from=' + this.fromdata + '&id=' + this.urlid + '&type=pc';
			} else {
			}
		} else {
		}
		if (browser.versions.weixin) {
			this.isWx = true;
		} else {
			this.isWx = false;
		}
	},
	mounted() {
		this.loading = true;
		let _that = this;
		let isshow = this.$route.query.isshow ? this.$route.query.isshow : null;
		if (isshow) {
			document.getElementsByClassName('topHead')[0].style.display = 'none';
		}
		let test = this.$route.query.Version;
		let url;
		this.apiurl = '//toolsapi.tinytiger.cn/';
		if (this.tt.isMobile) {
			url = 'https://tools.tinytiger.cn/mrfz_tools/hdcx/index.html?id=' + this.urlid;
		} else {
			url = 'https://tools.tinytiger.cn/mtbox_toratools_pc/index.html?id=' + this.urlid + '&type=pc';
		}
		console.log(url);
		this.tt.initShare({
			title: '明日方舟活动查询',
			desc: '明日方舟活动查询',
			imgUrl: 'https://cdn.tinytiger.cn/mrfztools/sharepic.png',
			link: url,
			isDebug: false,
			wb: {
				title: '2020方舟夏活攻略，尽在ToraTools，点击查看！'
			}
		});
		var wechat = document.querySelector('.wechat'),
			wechatfriend = document.querySelector('.wechat-friend'),
			qq = document.querySelector('.qq'),
			qzone = document.querySelector('.qzone'),
			weibo = document.querySelector('.weibo'),
			link = document.querySelector('.tinytiger--mobile__share-copy-link');
		if (!this.tt.isMobile) {
			wechat.addEventListener(
				'click',
				function() {
					window.parent.postMessage(['_trackEvent', '明日方舟活动查询页面PC端', '点击事件', '微信分享按钮', '', ''], '*');
				},
				false
			);
			wechatfriend.addEventListener(
				'click',
				function() {
					window.parent.postMessage(['_trackEvent', '明日方舟活动查询页面PC端', '点击事件', '朋友圈分享按钮', '', ''], '*');
				},
				false
			);
			qq.addEventListener(
				'click',
				function() {
					window.parent.postMessage(['_trackEvent', '明日方舟活动查询页面PC端', '点击事件', 'QQ分享按钮', '', ''], '*');
				},
				false
			);
			qzone.addEventListener(
				'click',
				function() {
					window.parent.postMessage(['_trackEvent', '明日方舟活动查询页面PC端', '点击事件', 'QQ空间按钮', '', ''], '*');
				},
				false
			);
			weibo.addEventListener(
				'click',
				function() {
					window.parent.postMessage(['_trackEvent', '明日方舟活动查询页面PC端', '点击事件', '微博分享按钮', '', ''], '*');
				},
				false
			);
			link.addEventListener(
				'click',
				function() {
					window.parent.postMessage(['_trackEvent', '明日方舟活动查询页面PC端', '点击事件', '复制链接按钮', '', ''], '*');
					setTimeout(() => {
						if (document.querySelector('.tinytiger--mobile__share-copy-link').getAttribute('data-clipboard-status') === 'success') {
							window.parent.postMessage('0', '*');
						}
						// 失败
						if (document.querySelector('.tinytiger--mobile__share-copy-link').getAttribute('data-clipboard-status') === 'error') {
							window.parent.postMessage('1', '*');
						}
					}, 500);
				},
				false
			);
		} else {
			var hm = document.createElement('script');
			var hmb = document.createElement('script');
			hm.src = 'https://s9.cnzz.com/z_stat.php?id=1279115113&web_id=1279115113';
			hmb.src = 'https://s9.cnzz.com/z_stat.php?id=1279096768&web_id=1279096768';
			var s = document.getElementsByTagName('script')[0];
			var b = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(hm, s);
			b.parentNode.insertBefore(hmb, b);
			wechat.addEventListener(
				'click',
				function() {
					_czc.push(['_trackEvent', '明日方舟活动查询页面移动端', '点击事件', '微信分享按钮', '', '']);
				},
				false
			);
			wechatfriend.addEventListener(
				'click',
				function() {
					_czc.push(['_trackEvent', '明日方舟活动查询页面移动端', '点击事件', '朋友圈分享按钮', '', '']);
				},
				false
			);
			qq.addEventListener(
				'click',
				function() {
					_czc.push(['_trackEvent', '明日方舟活动查询页面移动端', '点击事件', 'QQ分享按钮', '', '']);
				},
				false
			);
			qzone.addEventListener(
				'click',
				function() {
					_czc.push(['_trackEvent', '明日方舟活动查询页面移动端', '点击事件', 'QQ空间按钮', '', '']);
				},
				false
			);
			weibo.addEventListener(
				'click',
				function() {
					_czc.push(['_trackEvent', '明日方舟活动查询页面移动端', '点击事件', '微博分享按钮', '', '']);
				},
				false
			);
			link.addEventListener(
				'click',
				function() {
					_czc.push(['_trackEvent', '明日方舟活动查询页面移动端', '点击事件', '复制链接按钮', '', '']);
					setTimeout(() => {
						// 成功
						if (document.querySelector('.tinytiger--mobile__share-copy-link').getAttribute('data-clipboard-status') === 'success') {
							// console.log(0)
							_that.istexttips = true;
							setTimeout(() => {
								_that.istexttips = false;
								_that.texttips = '复制成功!';
							}, 1500);
							// _that.$toast('复制成功');
						}
						// 失败
						if (document.querySelector('.tinytiger--mobile__share-copy-link').getAttribute('data-clipboard-status') === 'error') {
							// console.log(1)
							_that.istexttips = true;
							setTimeout(() => {
								_that.istexttips = false;
								_that.texttips = '复制失败!';
							}, 1500);
						}
					}, 1000);
				},
				false
			);
		}

		this.$axios
			.get(this.apiurl + '/arknights.php/Activity/index')
			.then(res => {
				this.loading = false;
				if (res.data.ret == 1) {
					let mapdata = res.data.data.map((res, inx) => {
						return {
							id: res.id,
							name: res.name
						};
					});
					this.maplist = mapdata;
					this.maplistb = mapdata.map((res, inx) => {
						return {
							id: res.id,
							name: res.name
						};
					});
				} else {
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	methods: {
		isQQAPP() {
			var isIosQQ = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && /\sQQ/i.test(navigator.userAgent);
			var isAndroidQQ = /(Android)/i.test(navigator.userAgent) && /MQQBrowser/i.test(navigator.userAgent) && /\sQQ/i.test(navigator.userAgent.split('MQQBrowser'));
			if (isIosQQ || isAndroidQQ) {
				return true;
			}
		},
		/**
		 * 生成路径
		 *
		 * @param {Array} arr - 怪物经过的点
		 * @param {num} index - 点击第几个怪物
		 */
		path(arr, index) {
			var svg = '';
			var patharrow;
			var pathline = anime.path('svg .path');
			anime.remove('svg .path');
			anime.remove('svg .pathb');
			if (this.svgnum == index) {
				this.issvg = false;
				this.svgnum = -1;
			} else {
				this.issvg = false;
				this.svgnum = index;
				let valuea = [];
				for (let i = 0, l = arr.length; i < l; i++) {
					if (i == 0) {
						svg = 'M ' + this.Centralpoint[arr[i]].centerpointer[0] + ' ' + this.Centralpoint[arr[i]].centerpointer[1];
					} else {
						if (arr[i] != 0) {
							svg += ' L' + this.Centralpoint[arr[i]].centerpointer[0] + ' ' + this.Centralpoint[arr[i]].centerpointer[1];
						}
					}
					if (i > 0) {
						if (i == 1) {
							patharrow = this.drawLineArrow(
								this.Centralpoint[arr[i - 1]].centerpointer[0],
								this.Centralpoint[arr[i - 1]].centerpointer[1],
								this.Centralpoint[arr[i]].centerpointer[0],
								this.Centralpoint[arr[i]].centerpointer[1]
							);
						} else {
							if (arr[i] != 0 && arr[i - 1] != 0) {
								patharrow +=
									' ' +
									this.drawLineArrow(
										this.Centralpoint[arr[i - 1]].centerpointer[0],
										this.Centralpoint[arr[i - 1]].centerpointer[1],
										this.Centralpoint[arr[i]].centerpointer[0],
										this.Centralpoint[arr[i]].centerpointer[1]
									);
							}
						}
					} else {
					}
					valuea.push({
						value: [this.Centralpoint[arr[i]].centerpointer[0], this.Centralpoint[arr[i]].centerpointer[1]]
					});
					if (i == arr.length - 1) {
						this.svg = svg;
						this.svgb = patharrow;
						setTimeout(() => {
							this.issvg = true;
							let tl = anime.timeline({
								easing: 'easeInOutSine',
								duration: 1000
							});
							tl.add({
								targets: 'svg .path',
								strokeDashoffset: [anime.setDashoffset, 0],
								loop: 1
							}).add(
								{
									targets: 'svg .pathb',
									strokeDashoffset: [anime.setDashoffset, 0],
									loop: 1
								},
								1000
							);
						}, 500);
					}
				}
			}
		},
		/**
		 * 生成箭头路径
		 *
		 * @param {num} x1,y1 - 传入第一个点坐标
		 * @param {num} x2,y2 -  传入第二个点坐标
		 */
		drawLineArrow(x1, y1, x2, y2) {
			var path;
			var slopy, cosy, siny;
			var Par = 10.0;
			var x3, y3;
			slopy = Math.atan2(y1 - y2, x1 - x2);
			cosy = Math.cos(slopy);
			siny = Math.sin(slopy);
			console.log(cosy);
			console.log(slopy);
			console.log(siny);
			x3 = (Number(x1) + Number(x2)) / 2;
			y3 = (Number(y1) + Number(y2)) / 2;
			console.log(x3, y3);
			console.log(Number(x3) + Number(Par * cosy - (Par / 2.0) * siny), Number(y3) + Number(Par * siny + (Par / 2.0) * cosy));
			path = 'M' + (Number(x3) + Number(Par * cosy - (Par / 2.0) * siny)) + ',' + (Number(y3) + Number(Par * siny + (Par / 2.0) * cosy));
			path += ' L' + x3 + ',' + y3;
			path += ' M' + (Number(x3) + Number(Par * cosy + (Par / 2.0) * siny) + ',' + (Number(y3) - Number((Par / 2.0) * cosy - Par * siny)));
			path += ' L' + x3 + ',' + y3;
			return path;
		},
		/**
		 * 生成每个方块坐标点
		 *
		 * @param {Array} arr - 传入方块数
		 *
		 */
		findpath(arr) {
			var id, el;
			for (var i = 0; i < arr; i++) {
				id = 'mapzb' + i;
				el = document.getElementById(id);
				var centerPointerLeft = el.offsetLeft - el.offsetWidth / 2 + el.offsetWidth / 2;
				var centerPointerTop = el.offsetTop + el.offsetHeight / 2;
				let obj = {
					id: el.dataset.id,
					coordinate: el.dataset.zm,
					centerpointer: [centerPointerLeft, centerPointerTop]
				};
				this.Centralpoint[el.dataset.id] = obj;
			}
		},
		input(value) {
			if (value == '') {
				let inputlist = this.maplistb.map((res, inx) => {
					return res;
				});
				this.maplist = underscore.compact(inputlist);
			} else {
				let inputlist = this.maplistb.map((res, inx) => {
					if (res.name.toUpperCase().indexOf(value.toUpperCase()) != -1) {
						return res;
					}
				});
				this.maplist = underscore.compact(inputlist);
				this.isbegin = true;
				this.showPicker = true;
				this.isdrop = true;
			}
		},
		back() {
			if (this.$route.query.type == 'pc') {
				window.location.href = 'https://tools.tinytiger.cn/mrfz_tools/index.html?from=' + this.fromdata + '&id=0&type=pc';
			} else {
				window.location.href = 'https://tools.tinytiger.cn/mrfz_tools/index.html?from=' + this.fromdata + '&id=0';
			}
		},
		htmldata(data, inx) {
			var len = '';
			var datacache;
			var spanmes = '';
			let spanletter = '';
			switch (inx) {
				case 0:
					len = this.map_data.length - (parseInt(data / this.map_data[0].length) + 1);
					spanletter = this.letter(this.zimu[len]);
					if (data % this.map_data[0].length == 0) {
						data = parseInt(data / this.map_data[0].length) * this.map_data[0].length - data;
					} else {
						data = data - parseInt(data / this.map_data[0].length) * this.map_data[0].length;
					}
					spanmes = spanletter + (data + 1);
					return spanmes;
					break;
				case 1:
					for (var i = 0, m = data.length; i < m; i++) {
						if (i != 0 && i != data.length - 1) {
							datacache = data[i];
							len = this.map_data.length - (parseInt(datacache / this.map_data[0].length) + 1);
							spanletter = this.letter(this.zimu[len]);
							if (datacache % this.map_data[0].length == 0) {
								datacache = parseInt(datacache / this.map_data[0].length) * this.map_data[0].length - datacache;
							} else {
								datacache = datacache - parseInt(datacache / this.map_data[0].length) * this.map_data[0].length;
							}
							if (i == data.length - 2) {
								spanmes += spanletter + (datacache + 1);
								return spanmes;
							} else {
								if (i % 7 == 0) {
									spanmes += spanletter + (datacache + 1) + ', \n ';
								} else {
									spanmes += spanletter + (datacache + 1) + ',';
								}
							}
						}
					}
					break;
				case 2:
					len = this.map_data.length - (parseInt(data / this.map_data[0].length) + 1);
					spanletter = this.letter(this.zimu[len]);
					if (data % this.map_data[0].length == 0) {
						data = parseInt(data / this.map_data[0].length) * this.map_data[0].length - data;
					} else {
						data = data - parseInt(data / this.map_data[0].length) * this.map_data[0].length;
					}
					spanmes = spanletter + (data + 1);
					return spanmes;
					break;
				default:
					break;
			}
		},
		savepush(data) {
			var objString = JSON.stringify(data);
			this.startlist.push(1);
		},
		letter(num) {
			return String.fromCharCode(65 + Math.floor(Number(num) / 10));
		},
		getcloseShare(Boolean) {
			this.isshare = Boolean;
		},
		onDropDown() {
			this.isdrop = !this.isdrop;
			if (this.showPicker) {
				this.showPicker = false;
			} else {
				this.showPicker = true;
			}

			this.isbegin = true;
			if (this.value != '') {
				if (this.isdropb == true) {
					this.isdrop = false;
					this.showPicker = false;
					this.isdropb = false;
				} else {
					this.isdropb = true;
					this.input(this.value);
				}
			} else {
			}
		},
		openShare() {
			// _czc.push(['_trackEvent', '全民鉴玩云游戏活动', '点击事件', '分享按钮', '', '']);
			this.isshare = true;
		},
		clear() {
			this.value = '';
			console.log(1);
			// this.isdrop=true;
		},
		mapdetail(id, name) {
			this.value = name;
			this.$axios({
				method: 'get',
				url: this.apiurl + '/arknights.php/Activity/mapDetail?map_id=' + id
				//  data: {
				// "map_id": id,
				//  }
			})
				.then(res => {
					this.test = false;
					this.issvg = false;
					this.svgnum = -1;
					this.zimu = [];
					if (res.data.ret == 1) {
						this.map_data = res.data.data.map_data ? res.data.data.map_data : [];
						this.tile_forbidden = res.data.data.tile_forbidden ? res.data.data.tile_forbidden : [];
						this.tile_road = res.data.data.tile_road ? res.data.data.tile_road : [];
						this.tile_wall = res.data.data.tile_wall ? res.data.data.tile_wall : [];
						this.tile_floor = res.data.data.tile_floor ? res.data.data.tile_floor : [];
						this.tile_end = res.data.data.tile_end ? res.data.data.tile_end : [];
						this.tile_start = res.data.data.tile_start ? res.data.data.tile_start : [];
						this.tile_special = res.data.data.tile_special ? res.data.data.tile_special : [];
						this.enemylist = res.data.data.enemy_info ? res.data.data.enemy_info : [];
						this.Centralpoint = {};
						this.isdrop = !this.isdrop;
						this.showPicker = false;
						this.map_lastnum = this.map_data[0][this.map_data[0].length - 1];
						console.log(this.map_data[0][this.map_data[0].length - 1]);
						this.$nextTick(() => {
							this.findpath(this.map_data[0][this.map_data[0].length - 1]);
						});

						// this.map_data
						// console.log(len)
						// this.istest=false;
						let cachenum;
						for (var i = 0, l = this.map_data.length; i < l; i++) {
							cachenum = (this.map_data.length - 1) * 10 - i * 10;
							// console.log(cachenum)
							this.zimu.push(cachenum);
						}
						// console.log(this.Centralpoint)
						this.$forceUpdate();
						setTimeout(() => {
							this.istest = true;
						}, 500);
						this.ismapdetail = true;
						// console.log(res.data.data.enemy_info.route)
					} else {
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		isclass(num) {
			// console.log(num)
			let isTile_forbidden = underscore.some(this.tile_forbidden, function(res) {
				return res == num;
			});
			let istile_road = underscore.some(this.tile_road, function(res) {
				return res == num;
			});
			let istile_wall = underscore.some(this.tile_wall, function(res) {
				return res == num;
			});
			let istile_floor = underscore.some(this.tile_floor, function(res) {
				return res == num;
			});
			let istile_start = underscore.some(this.tile_start, function(res) {
				return res == num;
			});
			let istile_end = underscore.some(this.tile_end, function(res) {
				return res == num;
			});
			let istile_special = underscore.some(this.tile_special, function(res) {
				return res == num;
			});
			// console.log(this.tile_special)
			// console.log(num)
			// console.log(istile_special)
			if (isTile_forbidden) {
				return 'smallicona';
			} else if (istile_road) {
				return 'smalliconc';
			} else if (istile_wall) {
				return 'smallicond';
			} else if (istile_floor) {
				return 'smalliconb';
			} else if (istile_start) {
				return 'smallicone';
			} else if (istile_end) {
				return 'smalliconf';
			} else if (istile_special) {
				return 'smallicong';
			} else {
				return '';
			}

			// console.log(num)
		}
	}
};
</script>
