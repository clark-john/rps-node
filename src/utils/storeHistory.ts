import { PrismaClient } from '@prisma/client'
import { autoIncrement } from './autoIncrement'

const prisma = new PrismaClient()

const storeHist = async (user_score, comp_score, tie, total_games, datePlayed) => {
  const gamenumber = await autoIncrement()
  await prisma.history.create({
    data: {
      gamenumber: gamenumber,
      wins: user_score,
      loses: comp_score,
      tie: tie,
      total_games: total_games,
      dateplayed: datePlayed
    }
  }).finally(async () => {
    await prisma.$disconnect
  })
}

export { storeHist }
