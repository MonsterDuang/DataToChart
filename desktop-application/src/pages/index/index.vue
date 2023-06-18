<template>
  <view :class="isUpload ? 'container' : 'empty'">
    <view class="bt"></view>
    <view class="upload-btn" @tap="chooseFile" v-if="!isUpload">
      <view>＋</view>
      <text>请选择Excel文件</text>
    </view>
    <view class="content" v-else>
      
    </view>
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
    width: 400upx;
    height: 300upx;
    color: #000;
    margin: 10upx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #eee;
    border-radius: 10upx;
    cursor: pointer;
    position: relative;
    top: 0;
    transition: top 0.5s;
    box-shadow: 0 20upx 30upx -10upx rgba(0, 0, 0, 0.10);
    &:hover{
      top: -15upx;
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
