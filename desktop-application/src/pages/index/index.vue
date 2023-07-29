<template>
  <view :class="isUpload ? 'container' : 'empty'">
    <view class="bt"></view>
    <view class="upload-btn" @tap="chooseFile" v-if="!isUpload">
      <view>＋</view>
      <text>请选择Excel文件</text>
    </view>
    <view class="content" v-else>{{ fileName }}</view>
  </view>
</template>

<script>
const app = getApp();
import * as XLSX from "xlsx";
export default {
  data() {
    return {
      isUpload: false,
      fileName: "",
    };
  },
  onLoad() {},
  methods: {
    chooseFile() {
      uni.chooseFile({
        count: 1,
        type: "all",
        extension: [".xls", "xlsx"],
        success: (res) => {
          this.analyzeFile(res.tempFiles[0]);
        },
        fail: (err) => {
          console.log("失败：", err);
        },
      });
    },
    // 解析文件
    analyzeFile(file) {
      let allSheetsData = {};
      this.fileName = file.name;
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" }); // 存放excel的所有基本信息
        const sheetList = workbook.SheetNames; // excel表格下方的tab
        const sheet2JSONOpts = { defval: "" };
        sheetList.forEach((x) => {
          const worksheet = workbook.Sheets[x];
          const sheetData = XLSX.utils.sheet_to_json(
            worksheet,
            sheet2JSONOpts // sheet2JSONOpts参数是想为空的列表默认传参为""
          ); // 每个sheet以json数组形式输出
          allSheetsData[x] = sheetData;
          this.isUpload = true;
        });
        this.analyzeData(allSheetsData);
      };
    },
    // 解析从文件得到的数据 data={Sheet1: [{姓名: "张三", ...}, ...], Sheet2: [...], Sheet3: [...], ...}
    analyzeData(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="less">
uni-page-body {
  width: 100%;
  height: 100%;
}
.bt {
  position: fixed;
  top: 0;
  width: 100%;
  border-top: 1upx solid #eee;
}
.empty {
  width: 100%;
  height: 100%;
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
      content: " ";
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
  .content {
    padding: 20upx;
  }
}
</style>
