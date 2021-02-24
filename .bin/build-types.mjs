import fs from './fs.mjs'
import { corePackageUrl, reactPackageUrl } from './build-dirs.mjs'
import { bold, dim, underline } from './color.mjs'

async function buildTypes(packageUrl) {
	const packageJsonUrl = new URL(`package.json`, packageUrl)
	const packageName = JSON.parse(await fs.readFile(packageJsonUrl, 'utf8')).name

	const sourceTypesUrl = new URL('types/', packageUrl)
	const targetTypesUrl = new URL('dist/', packageUrl)

	await fs.mkdir(targetTypesUrl, { recursive: true })

	for (const dirent of await fs.readdir(sourceTypesUrl, { withFileTypes: true })) {
		const sourceUrl = new URL(dirent.name, sourceTypesUrl)
		const targetUrl = new URL(dirent.name, targetTypesUrl)

		if (!dirent.isDirectory()) {
			await fs.copyFile(sourceUrl, targetUrl)
		}
	}

	console.log([bold('types'), dim('copied to'), bold(underline(packageName))].join(' '))
}

export default buildTypes

const metaUrl = new URL(import.meta.url)
const argvUrl = new URL(process.argv[1], 'file:')

if (metaUrl.href === argvUrl.href) {
	console.log('')

	buildTypes(corePackageUrl)
	buildTypes(reactPackageUrl)
}
