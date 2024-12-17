function transformTime(timestamp) {
    var date = new Date(Number(timestamp))
    var y = date.getFullYear();
    var M = (date.getMonth() + 1).toString().padStart(2, '0');
    var d = date.getDate().toString().padStart(2, '0');
    var h = date.getHours().toString().padStart(2, '0');
    var m = date.getMinutes().toString().padStart(2, '0');
    var s = date.getSeconds().toString().padStart(2, '0');
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
}

function getEndTime() {
    let a = window.$vm.$vnode.context.cardactivity.actStageList[0].stageEndTime
    return a ? Number(a) : null
}

function getStartTime() {
    let a = window.$vm.$vnode.context.cardactivity.actStageList[0].stageStartTime
    return a ? Number(a) : null
}

function currentTime() {
    var date = new Date()
    var y = date.getFullYear();
    var M = (date.getMonth() + 1).toString().padStart(2, '0');
    var d = date.getDate().toString().padStart(2, '0');
    var h = date.getHours().toString().padStart(2, '0');
    var m = date.getMinutes().toString().padStart(2, '0');
    var s = date.getSeconds().toString().padStart(2, '0');
    var ss = date.getMilliseconds().toString().padStart(3, '0');
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s + '.' + ss;

}

function startBuy() {
    window.$vm.$vnode.context.clickBtn()
}

function showWindow() {
    var dom = document.createElement("div");
    let h = "<div>插件已加载！</div><div id=\"ID_StartTime\">活动开始时间：" + transformTime(getStartTime()) +
        "</div><div id=\"ID_StartTime\">活动结束时间：" + transformTime(getEndTime()) +
        "</div><div id=\"ID_NowTime\"></div>"
    dom.innerHTML = h
    dom.setAttribute("id", "pluginMsgWindow");
    dom.setAttribute("style",
        "font-size: 12px;padding: 5px;;position:fixed;top:0;right:0;z-index:999;background-color:#0e0e0e75;color:#fff"
    );
    document.getElementById("app").appendChild(dom);
    setInterval(() => {
        let ID_NowTime = document.getElementById("ID_NowTime");
        ID_NowTime.innerHTML = '当前时间：' + currentTime()
        let current = new Date().getTime()
        if (current >= getStartTime() - 200) {
            setInterval(() => {
                startBuy()
            }, 100)
        }
    }, 100)
}

function plugin_init() {
    let timer = setInterval(() => {
        let app = document.getElementById("app");
        // 等待vue加载完成
        if (app && app.__vue__ && app.__vue__.$vnode && app.__vue__.$vnode.context && app.__vue__.$vnode.context
            .clickBtn) {
            clearInterval(timer);
            if (window.$vm) {
                return
            }
            window.$vm = app.__vue__
            showWindow()
        }
    }, 200)
}
plugin_init()


window.onload = function () {
    plugin_init()
}