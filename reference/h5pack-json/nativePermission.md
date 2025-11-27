# nativePermission

```typescript
type nativePermission = ('CAMERA' | 'LOCATION')[]
```

**选填**，表示要要使用原生平台的能力，当设置 LOCATION 之后，出的包则可通过 bridge 模块调用原生平台定位能力。
