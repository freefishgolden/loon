/**
 * @file kk_voice.js
 * @description KK键盘解锁无限变声功能，拦截并修改服务端返回的配额数据
 */

let url = $request.url;
let body = $response.body;

try {
    // 将响应体字符串解析为JSON对象
    let obj = JSON.parse(body);

    // 匹配查询次数或消耗次数的接口
    if (url.includes("/checkCount") || url.includes("/consumeCount")) {
        if (obj.data) {
            // 解锁总次数和当前次数为999
            obj.data.totalCount = 999;
            obj.data.currCount = 999;
        }
    } 
    // 匹配创建语音的接口
    else if (url.includes("/createTtsAudio")) {
        if (obj.data) {
            // 解锁免费生成次数为999
            obj.data.freeCount = 999;
        }
    }
    
    // 将修改后的JSON对象重新转为字符串并赋值回响应体
    body = JSON.stringify(obj);
} catch (e) {
    // 捕获异常，防止因服务端数据结构变动导致脚本报错崩溃
    console.log("KK键盘无限变声脚本解析JSON失败: " + e);
}

// 返回修改后的完整响应体
$done({ body });