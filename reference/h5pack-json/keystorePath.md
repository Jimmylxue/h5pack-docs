# keystorePath

```typescript
type keystorePath = string
```

**选填**，App 出包之后的 keystore 路径。这块提供一个 keystore 的相对路径如：`./public/keystore.jks` **发布市场时需要填写。**

**keystorePath、keyAlias、keyPassword、storePassword 四者必须同时填写，否则不会进行签名。**
