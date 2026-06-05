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

| 错误码 | 说明 |
|--------|------|
| `CAMERA_ERROR` | 相机操作失败（拍照、扫码等） |
| `PERMISSION_CHECK_ERROR` | 相机权限检查失败 |
| `PERMISSION_REQUEST_ERROR` | 相机权限申请失败 |

### Location 模块

| 错误码 | 说明 |
|--------|------|
| `LOCATION_ERROR` | 定位操作失败 |

### RecordAudio 模块

| 错误码 | 说明 |
|--------|------|
| `RECORD_AUDIO_ERROR` | 录音操作失败 |
| `PERMISSION_CHECK_ERROR` | 录音权限检查失败 |
| `PERMISSION_REQUEST_ERROR` | 录音权限申请失败 |

## 错误传递流程

```
原生模块 throw wrapError(error, 'CAMERA_ERROR')
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
