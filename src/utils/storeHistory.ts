import { PrismaClient } from '@prisma/client'
import { autoIncrement } from './autoIncrement'

const prisma = new PrismaClient()

interface historyQuery {
  user_score: number,
  comp_score: number,
  tie: number,
  total_games: number,
  datePlayed: string,
  userLoggedIn: string
}

const storeHist = async (query: historyQuery) => {

  const gamenumber = await autoIncrement()
  await prisma.history.create({
    data: {
      gamenumber: gamenumber,
      wins: query.user_score,
      loses: query.comp_score,
      tie: query.tie,
      total_games: query.total_games,
      dateplayed: query.datePlayed,
      playedBy: query.userLoggedIn
    }
  })
}

export { storeHist }
export default historyQuery