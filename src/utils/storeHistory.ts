import { PrismaClient } from '@prisma/client'
import { autoIncrement } from './autoIncrement'
import { isHighScore } from './isHighScore'

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
  if (query.userLoggedIn != "Guest") {
    isHighScore(query.user_score, query.userLoggedIn)
  }
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