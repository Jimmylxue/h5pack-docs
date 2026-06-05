# 核心模块介绍

h5pack 由四个模块组成，各司其职，协作完成从 H5 到 APK 的完整流程。

## h5pack-core — 核心打包引擎

[GitHub](https://github.com/Jimmylxue/h5pack-core)

你和它打交道最多的就是 `h5pack.json` 配置文件。它负责读懂你的配置，然后调度其他模块依次完成图标生成、资源注入、原生构建，最终产出 APK。

## h5pack-native — 原生应用容器

[GitHub](https://github.com/Jimmylxue/h5pack-native)

打包出来的 APK 里面跑的就是它。本质上是一个基于 React Native 的原生壳，内置 WebView 来加载你的 H5 页面，同时提供相机、定位、文件系统等原生能力模块。

## h5pack-bridge — 通信桥梁

[GitHub](https://github.com/Jimmylxue/h5pack-bridge)

你的 H5 代码想调用相机拍照、获取 GPS 定位？通过 Bridge 就行。它在 H5 和原生之间建了一条双向通道，让 JavaScript 可以直接调用原生 API，就像调普通函数一样。

## h5pack-iconkit — 图标生成工具

[GitHub](https://github.com/Jimmylxue/iconkit)

丢一张原始图标进去，它自动帮你生成 Android 各种 dpi 适配的图标和启动页资源，不用手动切图。

## 协作关系

```text
你执行 npx h5pack
    │
    ▼
h5pack-core（读配置、调度一切）
    │
    ├── h5pack-iconkit（生成图标资源）
    │
    └── h5pack-native（构建 APK，内置 h5pack-bridge）
```
