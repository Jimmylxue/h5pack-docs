# Location

调用原生平台定位能力

## getCurrentPosition

获取当前定位

- 类型

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

getCurrentPosition(options?: GeolocationOptions): Promise<void | GeolocationResponse>
```

- 使用

```typescript
h5packBridge.location.getCurrentPosition().then(res => {
	console.log('地址res', res)
})
```
