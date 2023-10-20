<script>
import util from './utils/util.js';
export default {
	data() {
		return {
			u: util,
		};
	},
	onLaunch: function () {
		console.log('App Launch');
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	},
};
</script>

<style lang="less">
@font-face {
	font-family: 'count';
	src: url('./src/static/font/Staatliches.ttf');
}
@font-face {
	font-family: 'en';
	src: url('./src/static/font/en-word.woff2');
}
@font-face {
	font-family: 'JetBrains';
	src: url('./src/static/font/JetBrains-Mono.woff2');
}
.count {
	font-family: 'count';
}
.en {
	font-family: 'en';
}
.JetBrains {
	font-family: 'JetBrains';
}
uni-page-body {
	width: 100%;
	height: 100%;
}
.ivu-card-body {
	padding: 0 !important;
}
</style>
