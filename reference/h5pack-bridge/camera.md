# Camera

调用原生平台相机/相册模块的能力。

## checkPermission

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

## requestPermission

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

## open

打开相机

- 类型

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

open(options: CameraOptions): Promise<void | TAsset>;
```

- 使用

```typescript
h5packBridge.camera.open().then(res => {
	console.log('拍照res', res)
})
```

## chooseImage

打开相册选择图片

- 类型

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

interface ImageLibraryOptions extends OptionsCommon {
    selectionLimit?: number;
    restrictMimeTypes?: string[];
}
chooseImage(options?: ImageLibraryOptions): Promise<void | TAsset[]>;
```

- 使用

```typescript
h5packBridge.camera.chooseImage().then(res => {
	console.log('chooseImage', res)
})
```
