import { PrismaClient } from '@prisma/client'
import { clearHist } from '../cmds/History'
import { getIniData } from './getIniData'

const prisma = new PrismaClient()
const config = getIniData()
const maxhistsize = config.Database.max_histsize

const gameInit = async () => {
	let histsize = await prisma.history.findMany()
	if (histsize.length == maxhistsize){
		clearHist(false)
	}
	// console.log() 
}

export { gameInit }
