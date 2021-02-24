const content = require('./content/index.cjs')
const logicalProperties = require('./logical-properties/index.cjs')
const prefix = require('./prefix/index.cjs')

const utils = {
	...content,
	...logicalProperties,
	...prefix,
}

export default utils
