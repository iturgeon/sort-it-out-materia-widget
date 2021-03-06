const path = require('path')
const widgetWebpack = require('materia-widget-development-kit/webpack-widget')
const outputPath = path.join(__dirname, 'build')
const rules = widgetWebpack.getDefaultRules()
const copy = widgetWebpack.getDefaultCopyList()

const entries = {
	'creator.js': [
		'./src/creator.js'
	],
	'player.js': [
		'./src/player.js'
	],
	'scoreScreen.js': [
		'./src/scoreScreen.js'
	],
	'creator.css': ['./src/creator.scss', './src/creator.html'],
	'player.css': ['./src/player.scss', './src/player.html'],
	'scoreScreen.css': ['./src/scoreScreen.scss', './src/scoreScreen.html'],
	'guides/player.temp.html': [ './src/_guides/player.md'],
	'guides/creator.temp.html': [ './src/_guides/creator.md']
}

const customCopy = copy.concat([
	{
		from: path.join(__dirname, 'node_modules', 'angular-hammer', 'angular.hammer.min.js'),
		to: path.join(outputPath, 'vendor'),
	},
	{
		from: path.join(__dirname,'node_modules', 'hammerjs', 'hammer.min.js'),
		to: path.join(outputPath, 'vendor')
	},
	{
		from: path.join(__dirname, 'src', '_guides', 'assets'),
		to: path.join(outputPath, 'guides', 'assets')
	}
])

// uses options from babel.config.js
// placed there so that jest and webpack find it
const babelLoaderWithPolyfillRule = {
	test: /\.js$/,
	use: {
		loader: 'babel-loader'
	}
}

const customRules = [
	babelLoaderWithPolyfillRule,
	rules.loadAndPrefixCSS,
	rules.loadAndPrefixSASS,
	rules.loadHTMLAndReplaceMateriaScripts,
	rules.copyImages,
	rules.loadAndCompileMarkdown
]

const options = {
	moduleRules: customRules,
	copyList: customCopy,
	entries: entries
}

module.exports = widgetWebpack.getLegacyWidgetBuildConfig(options)
