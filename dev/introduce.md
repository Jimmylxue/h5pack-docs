# 开发指南 (Dev)

`h5pack dev` 是用于本地开发和调试的指令。它可以帮助你在开发 H5 应用时，快速在 Android 模拟器或真机上预览效果。

## 功能特性

- **实时同步**：监听 H5 产物目录变化，自动同步到 Native 工程。
- **一键启动**：自动拉起 Android 模拟器并安装运行 App。
- **Server 模式**：支持直接加载本地开发服务（如 Vite/Webpack Dev Server），享受 HMR 热更新体验。
- **端口映射**：内置 `adb reverse` 支持，轻松解决 Android 设备访问宿主机本地服务的问题。

## 基础用法

```bash
h5pack dev [options]
```

## 选项参数 (Options)

| 参数               | 说明                                                                                             | 示例                        |
| :----------------- | :----------------------------------------------------------------------------------------------- | :-------------------------- |
| `--watch`          | 开启文件监听模式。当 `packConfig.entry` 目录下的文件发生变化时，自动同步更新到 App 中。          | `h5pack dev --watch`        |
| `--start`          | 自动启动 Android 模拟器或连接已连接的真机运行 App。                                              | `h5pack dev --start`        |
| `--server=<PORT>`  | 开启 Server 模式。App 将加载指定的本地服务地址，而不是本地 HTML 文件。                           | `h5pack dev --server=8080`  |
| `--reverse=<PORT>` | 执行 `adb reverse` 端口映射，将 Android 设备的端口请求转发到宿主机。通常与 `--server` 配合使用。 | `h5pack dev --reverse=8080` |

## 常见使用场景

### 1. 静态构建产物调试

如果你已经打包好了 H5 产物（例如 `dist` 目录），希望在 App 中预览，并支持修改后自动同步：

```bash
# 假设 h5pack.config.json 中 entry 指向了 ./dist
h5pack dev --watch --start
```

- **流程**：
  1.  h5pack 会将 `dist` 目录下的文件复制到 Native 工程中。
  2.  `--watch`：保持监听，一旦你重新构建了 H5（修改了 `dist`），App 内容会自动更新（需重启 App 或刷新）。
  3.  `--start`：自动编译并安装 App 到模拟器。

### 2. 连接本地 Dev Server (推荐)

在开发阶段，我们通常希望使用 HMR (热更新) 来提高效率。此时可以使用 Server 模式。

假设你的本地开发服务运行在 `http://localhost:5173` (Vite 默认端口)。

```bash
h5pack dev --server=5173 --reverse=5173 --start
```

- **流程**：
  1.  `--server=5173`：App 启动后会直接加载 `http://localhost:5173`。
  2.  `--reverse=5173`：自动执行 `adb reverse tcp:5173 tcp:5173`。这使得 Android 设备访问 `localhost:5173` 时，流量会被转发到你电脑的 `5173` 端口。
  3.  `--start`：启动 App。

> **提示**：
>
> - 使用 Server 模式时，请确保你的手机/模拟器与电脑通过 USB 连接（真机需开启 USB 调试）。
> - `--reverse` 功能要求 Android 设备系统版本 >= 5.0。
> - 如果遇到白屏，请检查你的 Dev Server 是否允许局域网/外部访问，或者端口映射是否成功。

## 注意事项

1.  **环境要求**：运行 `dev` 指令前，请确保已正确配置 Android 开发环境（Java, Android SDK, ADB）。
2.  **首次运行**：首次运行会自动拉取 `h5pack-native` 模版代码并安装依赖（yarn），这可能需要一些时间。
3.  **配置文件**：`dev` 模式下，依然会读取 `h5pack.config.json` 中的 `splash` (启动页) 和 `logo` (图标) 配置并应用。
