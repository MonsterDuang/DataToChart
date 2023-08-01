<template>
  <CodeEditor v-model="codeContent" :mode="modeOpts[0]" />
</template>

<script setup>
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor";
const modeOpts = ["javascript", "htmlmixed", "css"];
var codeContent = ref("");
console.log(codeContent);
</script>
