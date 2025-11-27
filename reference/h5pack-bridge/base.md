# 介绍

建立 H5 与原生平台之间的双向通信通道

## 安装

### 使用 script 方案

```html
<script src="./h5PackBridge.min.js"></script>
```

### 框架项目

::: code-group

```sh [npm]
npm install --save h5pack-bridge
```

```sh [yarn]
yarn add h5pack-bridge
```

```sh [pnpm]
pnpm add h5pack-bridge
```

:::

## 使用

```typescript
h5packBridge.camera.chooseImage().then(res => {
	console.log('选择中的照片', res)
})
```
