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

---

## 分区存储与路径语义

Android 10（API 29）起引入了**分区存储**（Scoped Storage），对相机和相册的文件访问方式产生了重要影响。h5pack 已完成适配，以下是开发者需要了解的要点。

### 返回值 `uri` 字段说明

`open` 和 `chooseImage` 返回的 `TAsset.uri` 在不同场景下的格式：

| 来源 | URI 格式 | 说明 |
|------|----------|------|
| 拍照（`open`） | `file:///data/.../cache/...` | image-picker 将拍照结果存入 app 缓存目录 |
| 相册选择（`chooseImage`） | `file:///data/.../cache/...` | image-picker 将 content URI 复制到缓存后返回 |

> h5pack 内部使用 `react-native-fs` 读取文件，其原生端通过 `ContentResolver` 同时支持 `file://` 和 `content://` URI。即使未来 image-picker 行为变更直接返回 `content://` URI，读取也不会中断。

### 权限策略

h5pack 构建工具会根据目标 API 级别自动注入正确的权限声明：

| API 级别 | 系统版本 | 所需权限 |
|----------|----------|----------|
| ≤ 28 | Android 9 及以下 | `CAMERA` + `WRITE_EXTERNAL_STORAGE` + `READ_EXTERNAL_STORAGE` |
| 29–32 | Android 10–12L | `CAMERA` + `READ_EXTERNAL_STORAGE` |
| ≥ 33 | Android 13+ | `CAMERA` + `READ_MEDIA_IMAGES` |

以上权限由 `h5pack.json` 中的 `nativePermission` 配置项控制，构建时自动处理 `maxSdkVersion` 标记，无需手动管理。

### `saveToPhotos` 选项

`CameraOptions.saveToPhotos` 默认为 `false`。当设为 `true` 时，拍照结果会同时保存到系统相册。此功能需要通过 `MediaStore` API 写入公共存储，当前版本暂不支持，将在后续版本中适配。
