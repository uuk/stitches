import content from './content/index.mjs'
import logicalProperties from './logical-properties/index.mjs'
import prefix from './prefix/index.mjs'

const utils = {
	...content,
	...logicalProperties,
	...prefix,
}

export default utils
