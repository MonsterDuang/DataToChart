<script>
import util from "./utils/util.js";
export default {
  data() {
    return {
      u: util,
    }
  },
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="less">
@font-face {
  font-family: "Staatliches";
  src: url("./src/static/font/Staatliches.ttf");
}

#app {
  font-family: "Staatliches";
  letter-spacing: 10upx;
}
</style>
