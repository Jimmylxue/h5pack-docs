# cache

```typescript
type cache = boolean
```

**选填**，默认**false**：表示是否开启构建缓存。开启后，打包时会跳过原生项目（h5pack-native）的重新下载，直接复用上一次已下载的项目，从而加快构建速度。

::: warning 注意
开启缓存后，如遇到构建异常，建议将 `cache` 设为 `false` 后重新打包，以排除原生项目版本不一致等问题。
:::

```json
{
  "cache": true
}
```
