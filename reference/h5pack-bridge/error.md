# Bridge 错误处理

## 错误对象结构

H5 侧通过 Bridge 调用原生能力失败时，会抛出 `BridgeError` 实例，包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `message` | `string` | 可读的错误描述信息 |
| `code` | `string` | 错误码，用于程序化判断错误类型 |
| `details` | `Record<string, any> \| undefined` | 可选的上下文信息（如权限状态、原始参数等） |

```typescript
import { BridgeError } from 'h5pack-bridge'

try {
  await h5packBridge.camera.open()
} catch (error) {
  if (error instanceof BridgeError) {
    console.log(error.message)  // "Camera permission denied"
    console.log(error.code)     // "PERMISSION_REQUEST_ERROR"
    console.log(error.details)  // undefined 或上下文对象
  }
}
```

## 错误码定义

### 通用错误码

| 错误码 | 说明 |
|--------|------|
| `UNKNOWN_ERROR` | 未知错误（默认值） |
| `PARSE_ERROR` | 原生层消息解析失败 |
| `MODULE_ERROR` | H5 侧模块调用异常 |

### Camera 模块

| 错误码 | 说明 | 建议处理方式 |
|--------|------|-------------|
| `CAMERA_PERMISSION_DENIED` | 相机权限被拒绝（可再次申请） | 可重新调用 `requestPermission()` |
| `CAMERA_PERMISSION_NEVER_ASK_AGAIN` | 相机权限被永久拒绝 | 调用 `openAppSettings()` 引导用户手动开启 |
| `PHOTO_LIBRARY_PERMISSION_DENIED` | 相册权限被拒绝（可再次申请） | 可重新调用 `requestPhotoLibraryPermission()` |
| `PHOTO_LIBRARY_PERMISSION_NEVER_ASK_AGAIN` | 相册权限被永久拒绝 | 调用 `openAppSettings()` 引导用户手动开启 |
| `CAMERA_ERROR` | 相机操作失败（拍照、扫码等） | 提示用户稍后重试 |
| `PERMISSION_CHECK_ERROR` | 权限检查失败 | 系统异常，提示用户稍后重试 |
| `PERMISSION_REQUEST_ERROR` | 权限申请失败 | 系统异常，提示用户稍后重试 |

### Location 模块

| 错误码 | 说明 | 建议处理方式 |
|--------|------|-------------|
| `LOCATION_PERMISSION_DENIED` | 定位权限被拒绝（可再次申请） | 可重新调用 `requestPermission()` |
| `LOCATION_PERMISSION_NEVER_ASK_AGAIN` | 定位权限被永久拒绝 | 调用 `openAppSettings()` 引导用户手动开启 |
| `LOCATION_SERVICES_DISABLED` | 系统定位服务未开启 | 调用 `openLocationSettings()` 引导用户开启 |
| `LOCATION_ERROR` | 其他定位错误 | 提示用户稍后重试 |
| `PERMISSION_CHECK_ERROR` | 权限检查失败 | 系统异常，提示用户稍后重试 |
| `PERMISSION_REQUEST_ERROR` | 权限申请失败 | 系统异常，提示用户稍后重试 |

### RecordAudio 模块

| 错误码 | 说明 | 建议处理方式 |
|--------|------|-------------|
| `RECORD_AUDIO_PERMISSION_DENIED` | 麦克风权限被拒绝（可再次申请） | 可重新调用 `requestPermission()` |
| `RECORD_AUDIO_PERMISSION_NEVER_ASK_AGAIN` | 麦克风权限被永久拒绝 | 调用 `openAppSettings()` 引导用户手动开启 |
| `RECORD_AUDIO_ERROR` | 录音操作失败 | 提示用户稍后重试 |
| `PERMISSION_CHECK_ERROR` | 权限检查失败 | 系统异常，提示用户稍后重试 |
| `PERMISSION_REQUEST_ERROR` | 权限申请失败 | 系统异常，提示用户稍后重试 |

## 错误传递流程

```
原生模块 throw wrapError(error, 'CAMERA_PERMISSION_NEVER_ASK_AGAIN')
       ↓
Bridge.sendError 提取 message / code / details
       ↓
JSON.stringify → postMessage → H5 WebView
       ↓
handleNativeMessage 解析为 BridgeError
       ↓
BaseModule.handleError 保留结构抛出
       ↓
H5 业务层 catch (error) 拿到 message / code / details
```

## 永久拒绝权限的统一处理模式

三个模块（Camera、Location、RecordAudio）都遵循相同的永久拒绝处理模式：

```typescript
// 1. 申请权限
const res = await h5packBridge.camera.requestPermission()

if (res.granted) {
  // 已授权，继续业务逻辑
} else if (res.status === 'never_ask_again') {
  // 永久拒绝，引导用户去设置页
  if (confirm('权限被永久拒绝，是否打开设置页？')) {
    h5packBridge.camera.openAppSettings()
  }
} else {
  // 普通拒绝，可再次申请
  console.log('用户拒绝了权限')
}
```

::: tip 注意
`openAppSettings()` 会跳转到系统的应用详情设置页，用户需要手动开启权限后返回应用。三个模块共用同一个设置页入口。
:::
