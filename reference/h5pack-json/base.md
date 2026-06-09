# 介绍

`h5pack.json`是核心打包配置文件。App 各个环节如何打包均取决于该配置文件的配置。

h5pack.json 配置类型如下：

```typescript
export type TNativePermission = 'CAMERA' | 'LOCATION' | 'RECORD_AUDIO' | 'PHOTO_LIBRARY'

export type TPackConfig = {
	entry: string
	name: string
	buildFormat?: 'apk' | 'aab'
	splash?: string
	logo?: string
	output?: string
	log?: boolean
	cache?: boolean
	registry: 'github' | 'gitee'
	nativePermission?: TNativePermission[]
	keystorePath?: string
	storePassword?: string
	keyAlias?: string
	keyPassword?: string
	packageName?: string
	versionName?: string
	versionCode?: string
	scanEnabled?: boolean   // 是否启用扫码能力，默认 false（不引入 MLKit，节省约 2~3MB）
}
```
