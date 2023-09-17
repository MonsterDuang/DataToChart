<template>
	<view :class="isUpload ? 'container' : 'empty'" class="d2c">
		<view class="upload-btn" @tap="chooseFile" v-if="!isUpload">
			<view>＋</view>
			<text>请选择Excel文件</text>
		</view>
		<view class="content" v-else>
			<h1 @click="isUpload = false">{{ fileName }}</h1>
			<template v-for="item in tableData" :key="item">
				<Card v-if="item.has" style="margin-top: 20px" :title="item.sheetName">
					<Table :columns="item.columns" :data="item.data"></Table>
				</Card>
			</template>
		</view>
	</view>
</template>

<script setup>
const app = getApp();
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import Pinyin from 'js-pinyin';
Pinyin.setOptions({ checkPolyphone: false, charCase: 1 });
const isUpload = ref(false);
const fileName = ref('');
const tableData = ref([]);
const chooseFile = () => {
	uni.showLoading({ title: '上传中...' });
	uni.chooseFile({
		count: 1,
		type: 'all',
		extension: ['.xls', 'xlsx'],
		success: (res) => {
			analyzeFile(res.tempFiles[0]);
		},
		fail: (err) => {
			console.log('失败：', err);
		},
	});
};
// 解析文件
const analyzeFile = (file) => {
	let allSheetsData = {};
	fileName.value = file.name;
	const reader = new FileReader();
	reader.readAsBinaryString(file);
	reader.onload = (e) => {
		const workbook = XLSX.read(e.target.result, { type: 'binary' }); // 存放excel的所有基本信息
		const sheetList = workbook.SheetNames; // excel表格下方的tab
		const sheet2JSONOpts = { defval: '' };
		sheetList.forEach((x) => {
			const worksheet = workbook.Sheets[x];
			const sheetData = XLSX.utils.sheet_to_json(
				worksheet,
				sheet2JSONOpts // sheet2JSONOpts参数是想为空的列表默认传参为""
			); // 每个sheet以json数组形式输出
			allSheetsData[x] = sheetData;
			isUpload.value = true;
			uni.hideLoading();
		});
		analyzeData(allSheetsData);
	};
};
// 解析从文件得到的数据 data={Sheet1: [{姓名: "张三", ...}, ...], Sheet2: [...], Sheet3: [...], ...}
const analyzeData = (data) => {
	let td = [];
	const keys = Object.keys(data);
	keys.map((k) => {
		td.push({
			sheetName: k,
			...formatData(data[k]),
		});
	});
	console.log(td);
	tableData.value = td;
};
// 处理每个sheet的数据，返回table的columns、data
const formatData = (data) => {
	let res = {
		has: 0,
		columns: [],
		data: [],
	};
	if (data.length) {
		data.map((d) => {
			const keys = Object.keys(d);
			let keyCnt = {};
			let row = {};
			let columns = [];
			keys.map((k) => {
				let key = Pinyin.getFullChars(k);
				if (keyCnt[key] >= 0) {
					keyCnt[key]++;
					key += keyCnt[key];
				}
				keyCnt[key] = 0;
				columns.push({
					key,
					title: k,
					align: 'center',
				});
				row[key] = d[k];
			});
			res.data.push(row);
			res.columns = columns;
		});
		res.has = 1;
	}
	return res;
};
</script>

<style lang="less">
.empty {
	width: 100%;
	height: calc(~'100% - 100px');
	display: flex;
	justify-content: center;
	align-items: center;
	.upload-btn {
		width: 500upx;
		height: 200upx;
		color: deepskyblue;
		margin: 10upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #000;
		border-radius: 20upx;
		cursor: pointer;
		position: relative;
		transition: all 1s;
		box-shadow: 0 20upx 30upx -10upx rgba(0, 0, 0, 0.1);
		&::after,
		&::before {
			content: ' ';
			width: 30upx;
			height: 30upx;
			position: absolute;
			transition: all 1s;
			border: 0 solid deepskyblue;
		}
		&::after {
			top: 0;
			left: 0;
			border-top-width: 10upx;
			border-left-width: 10upx;
		}
		&::before {
			bottom: 0;
			right: 0;
			border-bottom-width: 10upx;
			border-right-width: 10upx;
		}
		&:hover {
			color: red;
			background-color: yellow;
			&::before,
			&::after {
				width: 100%;
				height: 100%;
				border-color: red;
			}
		}
		view {
			font-size: 60upx;
			line-height: 50upx;
			margin-bottom: 10upx;
		}
		text {
			line-height: 40upx;
			font-size: 32upx;
		}
	}
}
.container {
	height: calc(~'100% - 100px');
	overflow-y: auto;
	.content {
		padding: 20upx;
	}
}
</style>
