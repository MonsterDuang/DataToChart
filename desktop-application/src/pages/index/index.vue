<template>
  <view :class="isUpload ? 'container' : 'empty'">
    <view class="bt"></view>
    <view class="upload-btn" @tap="chooseFile" v-if="!isUpload">
      <view>＋</view>
      <text>请选择Excel文件</text>
    </view>
    <view class="content" v-else> </view>
  </view>
</template>

<script>
const app = getApp();
export default {
  data() {
    return {
      isUpload: false,
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
          this.analyzeData(res.tempFiles[0]);
        },
        fail: (err) => {
          console.log("失败：", err);
        },
      });
    },
    analyzeData(file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        console.log(workbook);
      };
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
    padding: 30upx;
  }
}
</style>
