import { createHash } from 'crypto'

const hash = createHash('sha256')

export const shaEncode = password => {
	hash.update(password)
	return hash.digest('hex')
}
