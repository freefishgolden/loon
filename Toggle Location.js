const location_state = location.toggleLocationServices();
notification.send(
  '系统定位开关切换',
  location_state.enabled ? '🟢 已开启' : '🔴 已关闭',
);

let longitude, latitude;
let LL = '';
// LL = '30.776238, 106.084967'; // 默认坐标，可选

const clipboardText = clipboard.getText();

if (clipboardText && /\d+\.\d+,\s*\d+\.\d+/.test(clipboardText))
  LL = clipboardText;

if (LL) {
  const [_latitude, _longitude] = LL.split(',').map((coord) =>
    parseFloat(coord.trim()),
  );
  if (!isNaN(_longitude) && !isNaN(_latitude)) {
    longitude = _longitude;
    latitude = _latitude;
    console.log(
      `已将剪贴板中的经纬度保存到偏好设置: 经度=${longitude}, 纬度=${latitude}`,
    );
    http.post('https://boxjs.my/write', {
      body: JSON.stringify({
        id77_wloc_longitude: longitude,
        id77_wloc_latitude: latitude,
      }),
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TrollScript-SMS-Webhook/1.0',
      },
      timeout: 10000, // 10秒超时
    });
  } else {
    console.log('⚠️ 剪贴板中的经纬度格式不正确');
  }
} else {
  console.log('⚠️ 剪贴板中没有有效的经纬度信息');
}
