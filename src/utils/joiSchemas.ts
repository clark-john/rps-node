import * as joi from 'joi'
import moment from 'moment'

const maximumYear = Number(moment(Date.now()).format('Y'))

const nameSchema = joi.string().min(3)
const passwordSchema = joi.string().min(8)
const birthDateSchema = joi.number().min(1).max(30)
const birthYearSchema = joi.number().min(1950).max(maximumYear)

export {
	nameSchema,
	passwordSchema,
	birthDateSchema,
	birthYearSchema
}