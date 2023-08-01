<template>
  <div class="btn">
    <Button
      v-for="item in tabs"
      :key="item.name"
      :type="item.name == active ? 'primary' : ''"
      style="margin-right: 10px"
      @click="tabsChange(item)"
      >{{ item.name }}</Button
    >
  </div>
  <Excel2Chart v-if="active == 'Excel2Chart'" />
  <Code v-if="active == 'Code'" />
</template>

<script setup>
import { ref } from "vue";
import Excel2Chart from "@/components/Excel2Chart";
import Code from "@/components/Code";
const active = ref("Excel2Chart");
const tabs = [
  {
    name: "Excel2Chart",
  },
  {
    name: "Code",
  },
];
const tabsChange = (item) => {
  active.value = item.name;
};
</script>
<style lang="less">
.btn {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
