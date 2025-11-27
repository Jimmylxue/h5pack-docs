# 核心模块介绍

## h5pack-core - 核心打包引擎

[传送门](https://github.com/Jimmylxue/h5pack-core)

职责：整个系统的指挥中心，负责协调各模块协同工作

```yaml
功能特性：
- 配置文件解析：读取并验证 h5pack.json 配置
- 工作流调度：按顺序调用各子模块执行任务
- 资源管理：协调图标生成、H5资源注入等操作
- 构建控制：控制整个打包流程的生命周期

执行流程：
读取配置 → 调用iconkit生成图标 → 注入H5资源到native → 触发原生构建
```

## h5pack-native - 原生应用容器

[传送门](https://github.com/Jimmylxue/h5pack-native)

职责：提供 Android 原生运行环境

```yaml
核心组件：
- WebView容器：承载H5应用的运行环境
- 原生功能模块：相机、定位、文件系统等Android原生能力
- 资源管理：内置H5静态资源的存储和访问
- 应用配置：应用名称、权限、版本等元数据

技术栈：React Native + Android Native Modules
```

## h5pack-bridge - 通信桥梁模块

[传送门](https://github.com/Jimmylxue/h5pack-bridge)

职责：建立 H5 与原生平台之间的双向通信通道

```yaml
架构设计：
H5层 ←→ JavaScript Interface ←→ Native Bridge ←→ Android原生API

功能特性：
- 安全的跨域通信机制
- 异步消息传递
- 方法调用代理
- 事件监听与触发

支持的原生能力：
- 设备功能：相机、相册、GPS、传感器
- 系统交互：通知、震动、状态栏
- 数据存储：本地文件、偏好设置
- 网络通信：HTTP请求、WebSocket
```

## h5pack-iconkit - 资源生成工具

[传送门](https://github.com/Jimmylxue/iconkit)

职责：自动化生成应用图标和启动页资源

```yaml
处理流程：
原始图标 → 多尺寸适配 → 平台规范转换 → 资源文件输出

生成内容：
- Android应用图标（多种dpi适配）
- iOS应用图标（如支持iOS打包）
- 启动页图片资源
- 自适应图标资源
```

## h5pack-docs - 项目文档

[传送门](https://github.com/Jimmylxue/h5pack-docs)

职责：提供完整的开发文档和使用指南

```yaml
内容体系：
- 快速开始指南
- API接口文档
- 配置参数详解
- 最佳实践案例
- 故障排除手册

访问方式：项目官网在线文档
```

# 模块间依赖关系

```text
h5pack-core (核心调度)
    │
    ├── h5pack-iconkit (图标资源生成)
    │
    ├── h5pack-native (应用容器)
    │   │
    │   └── h5pack-bridge (内置通信模块)
    │
    └── h5pack-docs (独立文档系统)
```

# 技术优势

- 模块化设计：各司其职，易于维护和扩展

- 自动化流程：一键完成从 H5 到 APK 的完整转换

- 原生体验：通过 bridge 获得完整的原生能力

- 跨平台支持：统一的开发体验，支持多操作系统

- 文档完善：详细的开发文档和最佳实践指南
