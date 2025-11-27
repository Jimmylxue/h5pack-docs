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

## 配置

项目根目录下新建 `h5pack.json` 并做如下配置：

```json
{
	"entry": "./dist", // h5项目打包入口
	"name": "newApp", // app包名
	"splash": "./public/vite.svg", // app splash 启动页logo
	"output": "./", // 打包完成后app 输出位置
	"log": false, // 是否开启完整打包日志
	"registry": "github", // github||gitee  资源镜像下载的地址，如因代理问题可以配置为gitee
	"logo": "./src/assets/splash.svg", // app 在桌面显示的logo
	"nativePermission": ["CAMERA", "LOCATION"] // 原生平台能力
}
```

在`package.json` 中增加如下脚本：

```json
"scripts": {
  "compress": "npx h5pack"
}
```

## 运行

```sh
npm run compress
```

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
