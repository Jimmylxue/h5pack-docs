# Camera

调用原生平台相机/相册模块的能力。

## 类型定义

```typescript
type CameraType = 'back' | 'front';
type MediaType = 'photo' | 'video' | 'mixed';
type AndroidVideoOptions = 'low' | 'high';
type iOSVideoOptions = 'low' | 'medium' | 'high';
type PhotoQuality = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
type TAsset = {
    base64?: string;
    uri?: string;
    width?: number;
    height?: number;
    originalPath?: string;
    fileSize?: number;
    type?: string;
    fileName?: string;
    duration?: number;
    bitrate?: number;
    timestamp?: string;
    id?: string;
};

interface OptionsCommon {
    mediaType?: MediaType;
    maxWidth?: number;
    maxHeight?: number;
    quality?: PhotoQuality;
    videoQuality?: AndroidVideoOptions | iOSVideoOptions;
    includeBase64?: boolean;
    includeExtra?: boolean;
    formatAsMp4?: boolean;
    presentationStyle?: 'currentContext' | 'fullScreen' | 'pageSheet' | 'formSheet' | 'popover' | 'overFullScreen' | 'overCurrentContext';
    assetRepresentationMode?: 'auto' | 'current' | 'compatible';
}

interface CameraOptions extends OptionsCommon {
    durationLimit?: number;
    saveToPhotos?: boolean;
    cameraType?: CameraType;
}

interface ImageLibraryOptions extends OptionsCommon {
    selectionLimit?: number;
    restrictMimeTypes?: string[];
}
```

---

## 相机

以下 API 需要 `CAMERA` 权限，请确保 `h5pack.json` 中已配置 `"nativePermission": ["CAMERA"]`。

### checkPermission

查看是否拥有相机权限

- 类型

```typescript
checkPermission(): Promise<boolean | void>;
```

- 使用

```typescript
h5packBridge.camera.checkPermission().then(res => {
	console.log('checkPermission', res)
})
```

### requestPermission

申请相机权限。（调用之后 App 会有权限申请的弹窗）

- 类型

```typescript
requestPermission(): Promise<unknown>;
```

- 使用

```typescript
h5packBridge.camera.requestPermission().then(res => {
	console.log('requestPermission', res)
})
```

### open

打开相机拍照

- 类型

```typescript
open(options: CameraOptions): Promise<void | TAsset>;
```

- 使用

```typescript
h5packBridge.camera.open().then(res => {
	console.log('拍照res', res)
})
```

### scan

打开扫码功能

- 类型

```typescript
scan(): Promise<void | TAsset>;
```

- 使用

```typescript
h5packBridge.camera.scan().then(res => {
	console.log('扫码res', res)
})
```

---

## 相册

以下 API 需要 `PHOTO_LIBRARY` 权限，请确保 `h5pack.json` 中已配置 `"nativePermission": ["PHOTO_LIBRARY"]`。

::: tip 注意
`chooseImage` 与相机 API 共用 `h5packBridge.camera` 模块调用，但所需权限不同。相机操作需要 `CAMERA` 权限，相册操作需要 `PHOTO_LIBRARY` 权限。
:::

### checkPhotoLibraryPermission

查看是否拥有相册权限

- 类型

```typescript
checkPhotoLibraryPermission(): Promise<boolean | void>;
```

- 使用

```typescript
h5packBridge.camera.checkPhotoLibraryPermission().then(res => {
	console.log('checkPhotoLibraryPermission', res)
})
```

### requestPhotoLibraryPermission

申请相册权限。（调用之后 App 会有权限申请的弹窗）

- 类型

```typescript
requestPhotoLibraryPermission(): Promise<unknown>;
```

- 使用

```typescript
h5packBridge.camera.requestPhotoLibraryPermission().then(res => {
	console.log('requestPhotoLibraryPermission', res)
})
```

### chooseImage

打开相册选择图片

- 类型

```typescript
chooseImage(options?: ImageLibraryOptions): Promise<void | TAsset[]>;
```

- 使用

```typescript
h5packBridge.camera.chooseImage().then(res => {
	console.log('chooseImage', res)
})
```
