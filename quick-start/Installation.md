# 安装与配置

## 环境与要求

在开始之前，请确保您的系统满足以下要求：

### 系统环境

Node.js: 版本 20 或更高

包管理器: npm、yarn 或 pnpm

### Android 构建环境（二选一）

- 选项一：本地环境 **（更灵活）**

  Java JDK 17

  Android SDK Platform 34

  推荐使用 Android Studio 进行环境配置

  [环境配置传送门](https://reactnative.dev/docs/0.73/environment-setup?platform=android)

- 选项二：Docker 环境 **（推荐新手）**

  Docker 20.10 或更高版本

  无需安装 Android SDK 和 Java JDK

## 安装

可通过以下方式安装：

::: code-group

```sh [npm]
npm install --save h5pack
```

```sh [yarn]
yarn add h5pack
```

```sh [pnpm]
pnpm add h5ack
```

:::

## 生成配置文件

执行 `npx h5pack init` 会生成如下配置文件 `h5pack.json`：

```json
{
	"entry": "./dist", // h5项目打包入口
	"name": "H5PackApp", // app应用名
	"splash": "./public/vite.svg", // app splash 启动页logo
	"output": "./", // 打包完成后app 输出位置
	"log": false, // 是否开启完整打包日志
	"registry": "github", // github||gitee  资源镜像下载的地址，如因代理问题可以配置为gitee
	"logo": "./src/assets/splash.svg", // app 在桌面显示的logo
	"nativePermission": ["CAMERA", "LOCATION", "RECORD_AUDIO"], // 原生平台能力配置
	"buildFormat": "apk", // 打包格式 apk||aab
	"packageName": "com.h5pack.native", // 应用包名
	"versionName": "1.0.0", // 应用版本名
	"versionCode": "1", // 应用版本号
	"keystorePath": "", // 应用签名文件路径
	"storePassword": "", // 应用签名文件密码
	"keyAlias": "", // 应用签名文件别名
	"keyPassword": "" // 应用签名文件别名密码
}
```

在`package.json` 中增加如下脚本：

```json
"scripts": {
  "build": "npx h5pack",
  "doctor": "npx h5pack doctor",
  "dev": "npx h5pack dev"
}
```

## 打包

```sh
npm run build
```

## 开发

支持本地开发，实时预览，支持热更新。（需要本地环境配置好 Android 环境，推荐使用 Android Studio 进行环境配置，[环境配置传送门](https://reactnative.dev/docs/0.73/environment-setup?platform=android)）

```sh
npm run dev
```

## 一键检查环境（打包异常时执行这个指令）

```sh
npm run doctor
```

该指令会检查您的环境是否符合要求，包括 Node.js、包管理器、Java JDK、Android SDK Platform 等。

## 相关依赖

App 的打包依赖于另外一个仓库 [h5pack-native](https://github.com/Jimmylxue/h5pack-native) 使用的同学需要安装最基础的安卓环境

- `node20`、`yarn`
- `javaJDK17`
- `Android SDK Platform 34`

具体环境可以看[参考文档](https://reactnative.dev/docs/0.73/environment-setup?platform=android)

## 案例

安卓环境过于复杂？不用担心，有 docker 版本，大家只需要有 docker 环境，即可通过 docker 指令一键构建。

- 本地环境

  如果您已经配置好 Android 环境

  ```sh
  # 克隆示例项目
  git clone https://github.com/Jimmylxue/h5pack-core
  cd h5pack-core/example/simple

  # 本地构建
  pnpm compress
  ```

- 使用 Docker

  如果您没有配置 Android 环境，可以使用 Docker 版本：

  ```sh
  # 克隆示例项目
  git clone https://github.com/Jimmylxue/h5pack-core
  cd h5pack-core/example/docker

  # 执行打包
  sh start.sh
  ```
