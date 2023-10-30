<template>
	<Modal
		:title="`${props.edata.sheetName}-生成图表`"
		draggable
		sticky
		scrollable
		:loading="loading"
		:value="props.value"
		@on-ok="handleSuccess"
		@on-cancel="handleCancel"
		@on-visible-change="handleVisibleChange"
	>
		<Form ref="formRef" :model="formData" :rules="formRules">
			<FormItem prop="etype" label="类型" required>
				<Select v-model="formData.etype">
					<Option v-for="item in etypeOpts" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="xdatakey" label="横轴数据字段" required>
				<Select v-model="formData.xdatakey">
					<Option v-for="item in props.edata.columns" :value="item.key" :key="item.value">{{ item.title }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="ydatakey" label="纵轴数据字段" required>
				<Select v-model="formData.ydatakey">
					<Option v-for="item in props.edata.columns" :value="item.key" :key="item.key">{{ item.title }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="width" label="显示宽度" required>
				<Input v-model="formData.width">
					<template #append> px </template>
				</Input>
			</FormItem>
			<FormItem prop="height" label="显示高度" required>
				<Input v-model="formData.height">
					<template #append> px </template>
				</Input>
			</FormItem>
		</Form>
	</Modal>
</template>
<script setup>
import { ref, reactive, nextTick } from 'vue';
import { getColorList } from './getColorList';
import Pinyin from 'js-pinyin';
Pinyin.setOptions({ checkPolyphone: false, charCase: 1 });
const props = defineProps({
	value: {
		type: Boolean,
		default: false,
	},
	edata: {
		type: Object,
		default: () => {},
	},
});
const etypeOpts = [
	{ value: 'line', label: '折线图' },
	{ value: 'bar', label: '柱状图' },
	{ value: 'pie', label: '饼图' },
];
const loading = ref(true);
const formRef = ref(null);
const formData = reactive({
	etype: '',
	xdatakey: '',
	ydatakey: '',
	width: '500',
	height: '500',
});
const formRules = {
	etype: [{ required: true, message: '请选择图表类型' }],
	xdatakey: [{ required: true, message: '请选择横轴数据字段' }],
	ydatakey: [{ required: true, message: '请选择纵轴数据字段' }],
	width: [{ required: true, message: '请输入显示宽度' }],
	height: [{ required: true, message: '请输入显示高度' }],
};
const handleSuccess = () => {
	formRef.value.validate((valid) => {
		if (valid) {
			loading.value = false;
			setOptions();
		} else {
			loading.value = false;
			nextTick(() => (loading.value = true));
		}
	});
};
const emit = defineEmits(['getOptions', 'cancleSet']);
const setOptions = () => {
	const { etype, xdatakey, ydatakey, width, height } = formData;
	const { data, columns, sheetName, idx } = props.edata;
	let options = {};
	if (etype == 'line' || etype == 'bar') {
		const colorList = getColorList(1, 'rgb');
		options = {
			toolbox: {
				feature: {
					saveAsImage: {},
				},
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
				},
				padding: [14, 10],
				borderWidth: 0,
				textStyle: {
					color: '#000',
				},
			},
			grid: {
				top: 60,
				left: 60,
				right: 60,
				bottom: 60,
			},
			xAxis: {
				type: 'category',
				axisLabel: {
					color: '#000',
					fontSize: 12,
				},
				axisPointer: {
					type: etype == 'bar' ? 'shadow' : '',
				},
				data: data.map((x) => x[xdatakey]),
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					interval: 0,
					color: '#000',
					fontSize: 14,
					lineHeight: 21,
				},
			},
			series: {
				data: data.map((x) => x[ydatakey]),
				name: columns[xdatakey],
				type: etype,
				showSymbol: false,
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: `rgba(${colorList[0]},0.80)`,
							},
							{
								offset: 1,
								color: `rgba(${colorList[0]},0.00)`,
							},
						],
						global: false,
					},
				},
				smooth: true,
			},
		};
	} else {
		options = {
			toolbox: {
				feature: {
					saveAsImage: {},
				},
			},
			tooltip: {
				trigger: 'item',
				axisPointer: {
					type: 'shadow',
				},
			},
			color: getColorList(data.length),
			legend: {
				orient: 'vertical',
				align: 'left',
				type: 'scroll',
				x: 'right',
				y: 'center',
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 15,
				borderRadius: 0,
				data: data.map((x) => x[xdatakey]),
				textStyle: {
					color: '#aab6bc',
				},
				pageTextStyle: {
					color: '#aab6bc',
				},
				padding: 10,
			},
			series: [
				{
					type: 'pie',
					label: {
						show: false,
					},
					data: data.map((x) => {
						return {
							name: x[xdatakey],
							value: x[ydatakey],
						};
					}),
					radius: ['0%', '45%'],
					center: ['25%', '50%'],
				},
			],
		};
	}
	emit('getOptions', { is: 1, idx: idx, id: Pinyin.getFullChars(sheetName), options, style: { width: width + 'px', height: height + 'px' } });
};
const handleCancel = () => {
	formData.etype = '';
	formData.xdatakey = '';
	formData.ydatakey = '';
	formData.width = '500';
	formData.height = '500';
	emit('cancleSet');
};
const handleVisibleChange = () => {};
</script>

<style lang="less"></style>
