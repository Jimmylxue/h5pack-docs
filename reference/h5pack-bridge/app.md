# App

调用原生 APP 基础能力

## exit

退出 APP

- 类型

```typescript
type TBaseParams = {
	confirm?: boolean
	title?: string
	message?: string
	okText?: string
	cancelText?: string
}

exit(options?: TBaseParams): Promise<void>;
```

- 使用

```typescript
h5packBridge.app
	.exit({
		confirm: true,
		title: '退出APP',
	})
	.then()
```

## relaunch

重新打开 APP

- 类型

```typescript
type TBaseParams = {
	confirm?: boolean
	title?: string
	message?: string
	okText?: string
	cancelText?: string
}

relaunch(options?: TBaseParams): Promise<void>;
```

- 使用

```typescript
h5packBridge.app
	.relaunch({
		confirm: true,
	})
	.then()
```

## refresh

刷新 APP

- 类型

```typescript
type TBaseParams = {
	confirm?: boolean
	title?: string
	message?: string
	okText?: string
	cancelText?: string
}

refresh(options?: TBaseParams): Promise<void>;
```

- 使用

```typescript
h5packBridge.app
	.refresh({
		confirm: true,
		title: '刷新APP',
		okText: '确定',
		cancelText: '取消',
		message: '确定刷新APP吗？',
	})
	.then()
```
