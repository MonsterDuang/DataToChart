<template>
	<div class="btn">
		<Button
			v-for="item in tabs"
			:key="item.name"
			:type="item.name == active ? 'primary' : 'default'"
			style="margin-right: 10px"
			@click="tabsChange(item)"
			>{{ item.name }}</Button
		>
	</div>
	<Excel2Chart v-if="active == 'Excel2Chart'" />
	<Code v-if="active == 'Code'" />
	<GlobalFooter :copyright="copyright" />
</template>

<script setup>
import { ref } from 'vue';
import Excel2Chart from '@/components/Excel2Chart';
import Code from '@/components/Code';
const active = ref('Excel2Chart');
const tabs = [
	{
		name: 'Excel2Chart',
	},
	{
		name: 'Code',
	},
];
const tabsChange = (item) => {
	active.value = item.name;
};
const copyright = `Copyright © ${new Date().getFullYear()} Power By Monster`;
</script>
<style lang="less" scoped>
.btn {
	height: 59px;
	padding: 10px;
	border-bottom: 1px solid #e8eaec;
	/deep/.ivu-btn {
		height: 100%;
	}
}
/deep/.ivu-global-footer {
	margin: 0;
	height: 40px;
	line-height: 40px;
	border-top: 1px solid #e8eaec;
}
</style>
