import { PrismaClient } from '@prisma/client'
import { clearHist } from '../hist/History'
import { getConfigData } from './getConfigData'

const prisma = new PrismaClient()
const config = getConfigData()
const maxhistsize = config.database.max_histsize
console.log(maxhistsize)

const gameInit = async () => {
	let histsize = await prisma.history.findMany()
	if (histsize.length == maxhistsize){
		clearHist(false, '')
	}
}

export { gameInit }
