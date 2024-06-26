import { camelCase, kebabCase } from 'change-case'
import fs from 'fs'

const componentTemplate = (camel, kebab) => `import { html, scss } from 'cuirk'

export const ${camel} = ({ name = 'World' }) => html\`
	<div class="${kebab}">
		<h1>Hello $\{name}</h1>
		<p>This is a static component.</p>
	</div>
\`

${camel}.style = scss\`
	.${kebab} {
		h1 {
			color: dodgerblue;
		}
	}
\`
`

export const component = (path) => {
	const componentDirArr = path.split('/')
	const name = componentDirArr.splice(-1, 1)[0]
	const camel = camelCase(name)
	const kebab = kebabCase(name)
	const componentDir = componentDirArr.join('/')
	const componentRoot = './src/components/'
	if (!fs.existsSync(componentRoot + componentDir)) {
		fs.mkdirSync(componentRoot + componentDir)
	}
	const fileName = `${componentRoot}${componentDir}/${kebab}.js`
	console.log(`Creating ${fileName}...`)
	fs.writeFileSync(fileName, componentTemplate(camel, kebab))
	console.log('Updating index.js...')
	const components = fs
		.readFileSync(`${componentRoot}index.js`, 'utf8')
		.trim()
		.split('\n')
	components.push(`export { ${camel} } from './${kebab}.js'`)
	fs.writeFileSync(
		`${componentRoot}index.js`,
		components.sort((a, b) => a.localeCompare(b)).join('\n')
	)
}
