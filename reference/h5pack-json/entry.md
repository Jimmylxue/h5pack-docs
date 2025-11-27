# entry

```typescript
type entry = string
```

**必填**，h5 项目打包的入口路径，这块填相对路径即可。由于是将整个 h5 项目进行打包，常规的 vue 或 react 项目打包之后是一个 dist 文件。所以这块的路径指向的是 dist 的所在路径；如： `./dist`
