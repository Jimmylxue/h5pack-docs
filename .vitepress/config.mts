import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'H5Pack',
	description: 'gekk',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{
				text: 'repositories',
				items: [
					{
						text: 'h5pack-core',
						link: 'https://github.com/Jimmylxue/h5pack-core',
					},
					{
						text: 'h5pack-native',
						link: 'https://github.com/Jimmylxue/h5pack-native',
					},
					{
						text: 'h5pack-bridge',
						link: 'https://github.com/Jimmylxue/h5pack-bridge',
					},
					{
						text: 'iconkit',
						link: 'https://github.com/Jimmylxue/iconkit',
					},
					{
						text: 'h5pack-docs',
						link: 'https://github.com/Jimmylxue/h5pack-docs',
					},
				],
			},
			{ text: 'follow', link: 'https://github.com/Jimmylxue' },
		],

		sidebar: {
			'/quick-start': [
				{
					text: '开发者指引',
					items: [
						{ text: '快速开始', link: '/quick-start/' },
						{ text: '核心模块介绍', link: '/quick-start/introduce' },
						{ text: '安装', link: '/quick-start/Installation' },
					],
				},
			],
			'/reference': [
				{
					text: 'h5pack.json配置',
					items: [
						{ text: 'introduce', link: '/reference/h5pack-json/base' },
						{ text: 'entry', link: '/reference/h5pack-json/entry' },
						{ text: 'name', link: '/reference/h5pack-json/name' },
						{ text: 'splash', link: '/reference/h5pack-json/splash' },
						{ text: 'logo', link: '/reference/h5pack-json/logo' },
						{ text: 'output', link: '/reference/h5pack-json/output' },
						{ text: 'log', link: '/reference/h5pack-json/log' },
						{ text: 'registry', link: '/reference/h5pack-json/registry' },
						{
							text: 'nativePermission',
							link: '/reference/h5pack-json/nativePermission',
						},
					],
					collapsed: false,
				},
				{
					text: 'h5pack-bridge',
					items: [
						{ text: 'introduce', link: '/reference/h5pack-bridge/base' },
						{ text: 'camera', link: '/reference/h5pack-bridge/camera' },
						{ text: 'location', link: '/reference/h5pack-bridge/location' },
					],
					collapsed: false,
				},
			],
		},
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/Jimmylxue/h5pack-core' },
		],
	},
})
