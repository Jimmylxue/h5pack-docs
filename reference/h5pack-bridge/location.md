# Location

调用原生平台定位能力

以下 API 需要 `LOCATION` 权限，请确保 `h5pack.json` 中已配置 `"nativePermission": ["LOCATION"]`。

## 类型定义

```typescript
type GeolocationOptions = {
    timeout?: number;
    maximumAge?: number;
    enableHighAccuracy?: boolean;
    distanceFilter?: number;
    useSignificantChanges?: boolean;
    interval?: number;
    fastestInterval?: number;
};

type GeolocationResponse = {
    coords: {
        latitude: number;
        longitude: number;
        altitude: number | null;
        accuracy: number;
        altitudeAccuracy: number | null;
        heading: number | null;
        speed: number | null;
    };
    timestamp: number;
};

/**
 * 权限申请结果状态
 * - granted: 已授权
 * - denied: 被拒绝（可再次申请）
 * - never_ask_again: 被永久拒绝（需引导用户去设置页）
 */
type PermissionStatus = 'granted' | 'denied' | 'never_ask_again';

type PermissionResult = {
    granted: boolean;
    status: PermissionStatus;
};
```

---

## 权限管理

### checkPermission

检查是否已授予定位权限

- 类型

```typescript
checkPermission(): Promise<boolean | void>;
```

- 使用

```typescript
h5packBridge.location.checkPermission().then(granted => {
    console.log('定位权限', granted)
})
```

### requestPermission

申请定位权限。（调用之后 App 会有权限申请的弹窗）

返回结果包含 `granted` 和 `status` 字段，可区分三种状态：
- `granted`: 已授权
- `denied`: 被拒绝（可再次申请）
- `never_ask_again`: 被永久拒绝（需引导用户去设置页手动开启）

- 类型

```typescript
requestPermission(): Promise<PermissionResult | void>;
```

- 使用

```typescript
h5packBridge.location.requestPermission().then(res => {
    if (res?.granted) {
        console.log('已获得定位权限')
    } else if (res?.status === 'never_ask_again') {
        // 需要引导用户去设置页
        h5packBridge.location.openAppSettings()
    } else {
        console.log('用户拒绝了定位权限')
    }
})
```

---

## 定位服务

### checkLocationEnabled

检查系统定位服务是否开启（GPS 或网络定位任一开启即返回 `true`）

- 类型

```typescript
checkLocationEnabled(): Promise<boolean | void>;
```

- 使用

```typescript
h5packBridge.location.checkLocationEnabled().then(enabled => {
    if (!enabled) {
        h5packBridge.location.openLocationSettings()
    }
})
```

### openLocationSettings

跳转系统定位服务设置页。用于定位服务关闭时引导用户开启。

- 类型

```typescript
openLocationSettings(): Promise<void>;
```

- 使用

```typescript
h5packBridge.location.openLocationSettings()
```

### openAppSettings

跳转应用详情设置页。用于权限被永久拒绝（`never_ask_again`）时引导用户手动开启权限。

- 类型

```typescript
openAppSettings(): Promise<void>;
```

- 使用

```typescript
h5packBridge.location.openAppSettings()
```

---

## 定位

### getCurrentPosition

获取当前定位。内部自动处理权限申请和定位服务检查。

- 类型

```typescript
getCurrentPosition(options?: GeolocationOptions): Promise<void | GeolocationResponse>;
```

- 使用

```typescript
h5packBridge.location.getCurrentPosition().then(res => {
    console.log('地址res', res)
})
```

- 错误处理

```typescript
try {
    const res = await h5packBridge.location.getCurrentPosition()
} catch (error) {
    switch (error.code) {
        case 'LOCATION_PERMISSION_DENIED':
            // 权限被拒绝，可再次申请
            break
        case 'LOCATION_PERMISSION_NEVER_ASK_AGAIN':
            // 权限被永久拒绝，引导用户去设置页
            h5packBridge.location.openAppSettings()
            break
        case 'LOCATION_SERVICES_DISABLED':
            // 定位服务未开启，引导用户去设置页
            h5packBridge.location.openLocationSettings()
            break
        default:
            // 其他错误
            console.error('定位失败:', error.message)
    }
}
```

### 错误码

| 错误码 | 说明 | 建议处理方式 |
|---|---|---|
| `LOCATION_PERMISSION_DENIED` | 定位权限被拒绝（可再次申请） | 可重新调用 `requestPermission()` |
| `LOCATION_PERMISSION_NEVER_ASK_AGAIN` | 定位权限被永久拒绝 | 调用 `openAppSettings()` 引导用户手动开启 |
| `LOCATION_SERVICES_DISABLED` | 系统定位服务未开启 | 调用 `openLocationSettings()` 引导用户开启 |
| `LOCATION_ERROR` | 其他定位错误 | 提示用户稍后重试 |
| `PERMISSION_CHECK_ERROR` | 权限检查失败 | 系统异常，提示用户稍后重试 |
| `PERMISSION_REQUEST_ERROR` | 权限申请失败 | 系统异常，提示用户稍后重试 |
