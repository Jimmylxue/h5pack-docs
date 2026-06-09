---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'H5Pack'
  text: '一行命令，网页变 App'
  tagline: 不学 Java，不装 Android Studio，把你现有的 H5 项目直接打包成 Android APK。（目前仅支持 Android）
  image:
    src: https://image.jimmyxuexue.top/img/icon%20(1).png
    alt: logo
  actions:
    - theme: brand
      text: 三分钟上手
      link: /quick-start
    - theme: alt
      text: API 参考
      link: /reference/h5pack-json/base

features:
  - icon: ⚡
    title: 快 — 一条命令搞定
    details: 写好 h5pack.json，执行 npx h5pack，APK 直接产出。不需要 Android Studio，不需要配置 Gradle。
    link: /quick-start
  - icon: 📦
    title: 小 — 包体仅 18MB
    details: 启用 R8 代码混淆、资源收缩和 so 库压缩，产出的 APK 仅约 18MB，远低于同类方案。
    link: /quick-start
  - icon: 🔌
    title: 强 — H5 也能调用原生能力
    details: 通过 Bridge 模块，你的 H5 代码可以直接调用相机、GPS、麦克风、相册等原生能力，和真正的 App 一样。
    link: /reference/h5pack-bridge/base
  - icon: 🛠️
    title: 爽 — 开发体验拉满
    details: 本地 Dev 模式支持热更新，改完代码秒刷新，所见即所得。
    link: /dev/introduce
  - icon: 🖥️
    title: 稳 — 全平台支持
    details: macOS、Windows、Linux 均可使用，也支持 Docker 一键构建，无需本地环境。
    link: /quick-start
---
