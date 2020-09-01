<template>
	<div class="sharecom">
			<!-- 分享弹窗 -->
	<div class="mask share" v-show="shareMask" @click="colseshare()">
		<div class="share-tc">
			<p>点击右上角</p>
			<p>分享给好友吧~</p>
		</div>
	</div>
	<!--  -->
	<van-action-sheet v-model="sheetShow" cancel-text="取消" @closed='colseshareb()' close-on-click-action title="">
		<div class="shareContent">
			<div class="li" @click="callShare(0, 'wechatShare', '微信')" id="wechatShare">
				<div class="img" style="background: url(//cdn.tinytiger.cn/lolmjccompress/share-icon1.png)  no-repeat center top / 100% 100%;"></div>
				<!-- <img src="../assets/img/share-icon1.png" alt="" /> -->
				<p>微信</p>
			</div>
			<div class="li" @click="callShare(1, 'friendShare', '朋友圈')" id="friendShare">
				<div class="img" style="background: url(//cdn.tinytiger.cn/lolmjccompress/share-icon2.png)  no-repeat center top / 100% 100%;"></div>
				<!-- <img src="../assets/img/share-icon2.png" alt="" /> -->
				<p>朋友圈</p>
			</div>
			<div class="li" @click="callShare(2, 'QQShare', 'QQ')" id="QQShare">
				<div class="img" style="background: url(//cdn.tinytiger.cn/lolmjccompress/share-icon3.png)  no-repeat center top / 100% 100%;"></div>
				<!-- <img src="../assets/img/share-icon3.png" alt="" /> -->
				<p>QQ</p>
			</div>
			<div class="li" @click="callShare(3, 'QQzoneShare', 'QQ空间')" id="QQzoneShare">
				<div class="img" style="background: url(//cdn.tinytiger.cn/lolmjccompress/share-icon4.png)  no-repeat center top / 100% 100%;"></div>
				<!-- <img src="../assets/img/share-icon4.png" alt="" /> -->
				<p>QQ空间</p>
			</div>
			<div class="li copyLink" id="copyLink" @click="copyLink" :data-clipboard-text="urllink" data-clipboard-action="copy">
				<div class="img" style="background: url(//cdn.tinytiger.cn/lolmjccompress/share-icon5.png)  no-repeat center top / 100% 100%;"></div>
				<!-- <img src="../assets/img/share-icon5.png" alt="" /> -->
				<p>复制链接</p>
			</div>
		</div>
	</van-action-sheet>
	</div>

</template>

<script>
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
	name: 'sharecom',
	props: {
		sheetshow: Boolean
	},
	watch:{
		sheetshow(val){
			this.sheetShow=val;
		}
	},
	data() {
		return {
			sheetShow: this.sheetshow,
			shareMask: false,
			urllink: '',
		};
	},
	mounted() {
		this.urllink=window.location.href.toString().split("?")[0];
		// console.log( location.search)
		// window.location.href=''
	},
	methods:{
		callShare(type, id, name) {
			// _czc.push(['_trackEvent', '全民鉴玩云游戏活动', '点击事件', '分享 ' + name, '', id]);
			// {"type":分享类型 0:微信 1:朋友圈 2:QQ 3:QQ空间,"share_url":分享链接,"share_title":分享标题,"share_desc":分享说明,"share_image":分享图片}
			// let shareconfig={
			// 	name:this.name,
			// 	choosea:this.chooseAnswer,
			// 	chooseb:this.chooseAnswer2,
			// 	mark:this.chooseList.mark
			// }
			// shareconfig=JSON.stringify(shareconfig);
			var get = {
				type: type,
				share_url: window.location.href.toString().split("?")[0]+'?from='+id,
				share_title: '',
				share_desc: '',
				share_image: 'http://cdn.tinytiger.cn/zjzcwqwz/logo.jpg'
			};
			
			if (browser.versions.android) {
				if (window.titi_js) {
					window.titi_js.callShare(JSON.stringify(get));
					this.sheetShow = false
					this.$emit('getcloseShare',this.sheetShow);
				} else {
					console.log('titi_js_not_callShare');
					this.sheetShow = false;
					this.shareMask = true;
				}
			} else if (browser.versions.iPhone || browser.versions.iPad) {
				if(window.webkit != undefined){
					if (typeof window.webkit.messageHandlers.callLogin === 'object') {
						window.webkit.messageHandlers.callShare.postMessage(JSON.stringify(get));
						this.sheetShow = false
						this.$emit('getcloseShare',this.sheetShow);
					} else {
						console.log('titi_js_not_callShare');
						this.sheetShow = false;
						this.shareMask = true;
					}
				}else {
					console.log('titi_js_not_callShare');
					this.sheetShow = false;
					this.shareMask = true;
				}
			}
		},
		colseshare(){
			this.shareMask=false;
			this.$emit('getcloseShare',this.shareMask);
		},
		colseshareb(){
			if (this.shareMask==false) {
				this.sheetShow=false;
				this.$emit('getcloseShare',this.sheetShow);	
			} 
		},
		copyLink() {
			// let shareconfig={
			// 	name:this.name,
			// 	choosea:this.chooseAnswer,
			// 	chooseb:this.chooseAnswer2,
			// 	mark:this.chooseList.mark
			// }
			// shareconfig=JSON.stringify(shareconfig);
			this.urllink=window.location.href.toString().split("?")[0]+'?from=copylink';
			// _czc.push(['_trackEvent', '全民鉴玩云游戏活动', '点击事件', '分享 复制链接', '', 'copyLink']);
			let clipboard = new this.clipboard('.copyLink');
			clipboard.on('success', () => {
				this.sheetShow = false
				this.$toast('复制成功');
			});
			clipboard.on('error', () => {
				this.sheetShow = false
				this.$toast('复制失败');
			});
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.popup {
			font-size: 24px;
			color: #fff;
			background: #000;
			padding: 15px 20px;
			border-radius: 10px;
		}

		&.share {
			align-items: flex-end;
			justify-content: flex-start;
			background: rgba(0, 0, 0, 0.8);
			padding:20px 0 0 0;
			.share-tc {
				width: 276px;
				height: 192px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				background: url(../assets/img/share-tc.png) no-repeat center top / 100% 100%;
				margin-right 20px
				p {
					font-size: 25px;
					color: #fff;
				}
			}
		}
	}
.shareContent {
	display: flex;
	padding: 20px 0;
	.li {
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		div {
			width: 50px;
			height: 50px;
		}
		p {
			font-size: 16px;
			color: #333;
		}
	}
}
.van-action-sheet__cancel {
	height: 60px;
	font-size: 24px;
}
.van-toast{
	font-size 18px;
	
}
</style>
