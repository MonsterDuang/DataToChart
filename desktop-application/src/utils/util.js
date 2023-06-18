const util = {
  numberAdd0: (num) => {
    if (num < 10 && num >= 0) {
      return "0" + num;
    } else if (num < 0 && num > -10) {
      return "-0" + Math.abs(num);
    } else {
      return num;
    }
  },
  formatDate: (dt, format) => {
    var fmt = "y-m-d",
      date = new Date();
    if (dt) {
      date = new Date(dt);
    }
    if (format) {
      fmt = format;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    var d = "";
    if (fmt == "y-m-d h:m:s") {
      // 20XX-XX-XX 时:分:秒
      d =
        [year, month, day].map(util.numberAdd0).join("-") +
        " " +
        [hour, minute, second].map(util.numberAdd0).join(":");
    } else if (fmt == "y-m") {
      // 20XX-XX
      d = [year, month].map(util.numberAdd0).join("-");
    } else if (fmt == "y") {
      d = year;
    } else if (fmt == "m") {
      d = month;
    } else if (fmt == "d") {
      d = day;
    } else if (fmt == "n-y-r") {
      // 20XX年XX月XX日
      d =
        year +
        "年" +
        util.numberAdd0(month) +
        "月" +
        util.numberAdd0(day) +
        "日";
    } else if (fmt == "n-y") {
      // 20XX年第X月
      d = year + "年第" + month + "月";
    } else if (fmt == "n-y-r h:m:s") {
      // 20XX年XX月XX日 时:分:秒
      d =
        year +
        "年" +
        util.numberAdd0(month) +
        "月" +
        util.numberAdd0(day) +
        "日" +
        " " +
        [hour, minute, second].map(util.numberAdd0).join(":");
    } else if (fmt == "y-r h:m:s") {
      // XX月XX日 时:分:秒
      d =
        util.numberAdd0(month) +
        "月" +
        util.numberAdd0(day) +
        "日" +
        " " +
        [hour, minute, second].map(util.numberAdd0).join(":");
    } else if (fmt == "h:m:s") {
      // 时:分:秒
      d = [hour, minute, second].map(util.numberAdd0).join(":");
    } else if (fmt == "n-z") {
      // 20XX年第n周
      const yd = new Date(year, 0, 1);
      const wd = Math.round((date.valueOf() - yd.valueOf()) / 86400000);
      const w = Math.ceil((wd + (yd.getDay() + 1 - 1)) / 7);
      d = year + "年第" + w + "周";
    } else if (fmt == "w") {
      // 星期n
      const n = date.getDay();
      d = `星期${n ? n : "天"}`;
    } else {
      // 20XX-XX-XX
      d = [year, month, day].map(util.numberAdd0).join("-");
    }
    return d;
  },
};

export default util;