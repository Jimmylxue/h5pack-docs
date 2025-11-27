# 介绍

`h5pack.json`是核心打包配置文件。App 各个环节如何打包均取决于该配置文件的配置。

h5pack.json 配置类型如下：

```typescript
export type TNativePermission = 'CAMERA' | 'LOCATION'

export type TPackConfig = {
	entry: string
	name: string
	splash?: string
	logo?: string
	output?: string
	log?: boolean
	registry: 'github' | 'gitee'
	nativePermission?: TNativePermission[]
}
```
