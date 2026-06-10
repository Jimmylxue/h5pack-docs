# bridgeDebugPanel

```typescript
type bridgeDebugPanel = boolean
```

**选填**，默认**false**：表示是否开启 Bridge 调试面板。开启后，应用内会显示一个悬浮按钮（FAB），点击可展开一个深色主题的面板，实时展示 H5 与 Native 之间的 Bridge 调用日志，包括模块名、方法名、请求参数、返回值、错误信息以及调用耗时等，方便开发调试时排查 Bridge 通信问题。

::: warning 注意
调试面板仅用于开发阶段，正式发布时请确保将 `bridgeDebugPanel` 设为 `false`，避免在生产包中暴露调试信息。日志缓冲区上限为 200 条，超出后自动清理最早的记录。
:::

```json
{
  "bridgeDebugPanel": true
}
```
