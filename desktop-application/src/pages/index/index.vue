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
          console.log("成功：", res);
        },
        fail: (err) => {
          console.log("失败：", err);
        },
      });
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
    color: #000;
    margin: 10upx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #eee;
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
    }
    &::after {
      top: 0upx;
      left: 0upx;
      border-top: 10upx solid black;
      border-left: 10upx solid black;
    }
    &::before {
      bottom: 0upx;
      right: 0upx;
      border-bottom: 10upx solid black;
      border-right: 10upx solid black;
    }
    &:hover {
      color: deepskyblue;
      &::before,
      &::after {
        width: 100%;
        height: 100%;
        border-color: deepskyblue;
      }
    }
    view {
      font-size: 60upx;
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
