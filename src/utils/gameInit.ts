import { clearHist } from '../hist/History'
import { getConfigData } from './getConfigData'
import { History } from './Schema'

const config = getConfigData()
const maxhistsize = config.database.max_histsize

const gameInit = async () => {
	let histsize = await History.find()
	if (histsize.length == maxhistsize){
		clearHist(false, '')
	}
}

export { gameInit }
