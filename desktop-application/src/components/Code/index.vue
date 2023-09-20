<template>
	<view class="codemirror">
		<Split v-model="horizontalSplit">
			<template #left>
				<Split v-model="leftVerticalSplit" mode="vertical">
					<template #top>
						<Card dis-hover :bordered="false">
							<template #title>HTML</template>
							<template #extra>
								<Select v-model="state.htmlFs" size="small" style="width: 80px">
									<Option v-for="item in fontSizeOpts" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</template>
							<CodeEditor :code="state.html" :fs="state.htmlFs" mode="htmlmixed" @handleInput="(code) => handleInput('html', code)" />
						</Card>
					</template>
					<template #bottom>
						<Card dis-hover :bordered="false">
							<template #title>CSS</template>
							<template #extra>
								<Select v-model="state.cssFs" size="small" style="width: 80px">
									<Option v-for="item in fontSizeOpts" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</template>
							<CodeEditor :code="state.css" :fs="state.cssFs" mode="css" @handleInput="(code) => handleInput('css', code)" />
						</Card>
					</template>
				</Split>
			</template>
			<template #right>
				<Split v-model="rightVerticalSplit" mode="vertical">
					<template #top>
						<Card dis-hover :bordered="false">
							<template #title>JavaScript</template>
							<template #extra>
								<Select v-model="state.jsFs" size="small" style="width: 80px">
									<Option v-for="item in fontSizeOpts" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</template>
							<CodeEditor :code="state.js" :fs="state.jsFs" mode="javascript" @handleInput="(code) => handleInput('js', code)" />
						</Card>
					</template>
					<template #bottom>
						<Card dis-hover :bordered="false">
							<template #title>{{ pageTitle }}</template>
							<template #extra>
								<Button type="default" size="small" style="margin-right: 10px" @click="exportFile">导出</Button>
								<Button type="primary" size="small" @click="runDemo">运行</Button>
							</template>
							<div ref="codeRef" v-html="code"></div>
						</Card>
					</template>
				</Split>
			</template>
		</Split>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import CodeEditor from '@/components/CodeEditor';
const horizontalSplit = ref(0.5);
const leftVerticalSplit = ref(0.5);
const rightVerticalSplit = ref(0.5);
const state = reactive({
	html: '',
	css: '',
	js: '',
	htmlFs: 'fs14',
	cssFs: 'fs14',
	jsFs: 'fs14',
});
const fontSizeOpts = [
	{
		value: 'fs12',
		label: '12px',
	},
	{
		value: 'fs14',
		label: '14px',
	},
	{
		value: 'fs16',
		label: '16px',
	},
	{
		value: 'fs18',
		label: '18px',
	},
	{
		value: 'fs20',
		label: '20px',
	},
	{
		value: 'fs24',
		label: '24px',
	},
];
setTimeout(() => {
	state.html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">{css}</style>
  </head>
  <body>
    <script type="text/javascript">{js}<\/script>
  </body>
</html>`;
	state.css = `body {}`;
}, 100);

const handleInput = (key, code) => {
	state[key] = code;
};

const pageTitle = ref('Document');
const code = ref('');
const codeRef = ref();

const mixinCode = () => {
	const { html, js, css } = state;
	code.value = html.replace('{js}', js).replace('{css}', css);
	pageTitle.value = html.match(/<title>(\S*)<\/title>/)[1];
};

const exportFile = () => {
	mixinCode();
};

const runDemo = () => {
	mixinCode();
	const script = document.createElement('script');
	script.innerHTML = state.js;
	codeRef.value.append(script);
};
</script>
<style lang="less" scoped>
.codemirror {
	height: calc(~'100% - 100px');
	/deep/.bottom-pane {
		padding-top: 6px;
	}
	/deep/.right-pane {
		padding-left: 6px;
	}
	/deep/.ivu-card {
		height: 100%;
		.ivu-card-extra {
			top: 10px;
		}
		.ivu-card-body {
			height: calc(~'100% - 43px');
		}
	}
}
</style>
