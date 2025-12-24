# nativePermission

```typescript
type nativePermission = ('CAMERA' | 'LOCATION' | 'RECORD_AUDIO')[]

CAMERA: 调用原生平台相机模块的能力。
LOCATION: 调用原生平台定位模块的能力。
RECORD_AUDIO: 调用原生平台麦克风/录音模块的能力。

/**
 * h5pack-json 示例
 * 表示要要使用原生平台的能力，当设置 LOCATION 之后，出的包则可通过 bridge 模块调用原生平台定位能力。
 */
{
  nativePermission: ['CAMERA', 'LOCATION', 'RECORD_AUDIO']
}
```

**选填**，表示要要使用原生平台的能力。
