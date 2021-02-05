/**
 *时间工具类
 */
    var owner = {};
    /**
     * 时间戳转换
     * @returns {string}
     */
    owner.getTimes = function (times, type) {
        var date = new Date(times);
        var Y = date.getFullYear();
        var M = date.getMonth()+1;
        var D = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        switch (type) {
            case 0:
                M = M < 10 ? '0'+M : M;
                D = D < 10 ? '0'+D : D;
                h = h < 10 ? '0'+h : h;
                m = m < 10 ? '0'+m : m;
                s = s < 10 ? '0'+s : s;
                return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
            case 1:
                return owner.getLastHour(times);
            case 2:
                return owner.getToday(Y, M, D);
            case 3:
                return owner.getYesterday(Y, M, D);
            case 4:
                var week = date.getDay();
                return owner.getThisWeek(Y, M, D, week);
            case 5:
                var weeks = date.getDay();
                return owner.getLastWeek(Y, M, D, weeks);
            case 6:
                var weekDay = date.getDay();
                return owner.getLastSunday(Y, M, D, weekDay);
            case 7:
                M = M < 10 ? '0'+M : M;
                return Y + '-' + M + '-' + '01 00:00:00';
            case 8:
                return owner.getLastMonthStart(Y, M);
            case 9:
                return owner.getLastMonthEnd(Y, M);
        }
    };

    /**
     * 获取过去1小时的时间
     * @returns {string}
     */
    owner.getLastHour = function (times) {
        var date = new Date(times-3600000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    };

    /**
     * 获取今天的时间
     * @returns {string}
     */
    owner.getToday = function (year, month, day) {
        var M = month < 10 ? '0'+month : month;
        var D = day < 10 ? '0'+day : day;
        return year + '-' + M + '-' + D + ' ' + '00:00:00';
    };

    /**
     * 获取昨天的时间
     * @returns {string}
     */
    owner.getYesterday = function (year, month, day) {
        var today = owner.getToday(year, month, day);
        var date = new Date(today);
        var time = date.getTime();
        var yesterday = new Date(time-86400000).format("yyyy-MM-dd");
        return yesterday;
    };

    /**
     * 获取本周周一的时间
     * @returns {string}
     */
    owner.getThisWeek = function (year, month, day, week) {
        var today = owner.getToday(year, month, day);
        var date = new Date(today);
        var time = date.getTime();
        var thisWeek = '';
        if (week === 0) {
            thisWeek = new Date(time-6*86400000).format("yyyy-MM-dd HH:mm:ss");
        } else {
            thisWeek = new Date(time-((week-1)*86400000)).format("yyyy-MM-dd HH:mm:ss");
        }
        return thisWeek;
    };

    /**
     * 获取上周周一的时间
     * @returns {string}
     */
    owner.getLastWeek = function (year, month, day, week) {
        var today = owner.getToday(year, month, day);
        var date = new Date(today);
        var time = date.getTime();
        var lastWeek = '';
        if (week === 0) {
            lastWeek = new Date(time-13*86400000).format("yyyy-MM-dd HH:mm:ss");
        } else {
            lastWeek = new Date(time-((week+6)*86400000)).format("yyyy-MM-dd HH:mm:ss");
        }
        return lastWeek;
    };

    /**
     * 获取上周周日结尾的时间
     * @returns {string}
     */
    owner.getLastSunday = function (year, month, day, week) {
        var today = owner.getToday(year, month, day);
        var date = new Date(today);
        var time = date.getTime();
        var lastSunday = '';
        if (week === 0) {
            lastSunday = new Date(time-6*86400000-1000).format("yyyy-MM-dd HH:mm:ss");
        } else {
            lastSunday = new Date(time-((week-1)*86400000)-1000).format("yyyy-MM-dd HH:mm:ss");
        }
        return lastSunday;
    };

    /**
     * 获取上月1号的时间
     * @returns {string}
     */
    owner.getLastMonthStart = function (year, month) {
        if (month === 1) {
            return (year-1) + '-12-01 00:00:00';
        } else {
            var M = month - 1;
            M = M < 10 ? '0'+M : M;
            return year + '-' + M + '-01 00:00:00';
        }
    };

    /**
     * 获取上月月末的时间
     * @returns {string}
     */
    owner.getLastMonthEnd = function (year, month) {
        if (month === 1) {
            return (year-1) + '-12-31 00:00:00';
        } else {
            var M = month - 1;
            if (M === 2) {
                if (owner.isLeapYear(year)) {
                    return year + '-02-29 23:59:59';
                } else {
                    return year + '-02-28 23:59:59';
                }
            } else {
                if (owner.isBigMonth(M)) {
                    M = M < 10 ? '0' + M : M;
                    return year + '-' + M + '-31 23:59:59';
                } else {
                    M = M < 10 ? '0' + M : M;
                    return year + '-' + M + '-30 23:59:59';
                }
            }
        }
    };

    /**
     * 判断闰年
     * @returns {boolean}
     */
    owner.isLeapYear = function (year) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 判断大小月
     * @returns {boolean}
     */
    owner.isBigMonth = function (month) {
        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 判断日期时间大小
     * @param startTime
     * @param endTime
     * @returns {boolean}
     */
    owner.compareTime = function (startTime, endTime) {
        var data1 = new Date(startTime);
        var st = data1.getTime();
        var data2 = new Date(endTime);
        var et = data2.getTime();
        var differTime = et - st;
        if (differTime > 0) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 时间戳转换时间格式
     * @returns {string}
     */
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "f+": this.getMilliseconds() //毫秒
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o)
            if (new RegExp("(" + k + ")").test(format)){
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

            }
        return format;
    }

    export default owner

