import { PrismaClient } from '@prisma/client'
import { autoIncrement } from '@utils/autoIncrement'
import { isHighScore } from '@utils/isHighScore'
import { historyQuery } from '@utils/interfaces'

const prisma = new PrismaClient()

const storeHist = async (query: historyQuery) => {
  if (query.userLoggedIn != "Guest") {
    query.isHighScore = await isHighScore(query.user_score, query.userLoggedIn) as boolean
  } else {
    query.isHighScore = false
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
      playedBy: query.userLoggedIn,
      isHighScore: query.isHighScore
    }
  })
}

export { storeHist }
