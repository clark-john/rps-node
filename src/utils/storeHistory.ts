import { PrismaClient } from '@prisma/client'
import { log } from 'console'

const storeHist = async (user_score, comp_score, tie, total_games, datePlayed) => {
  const prisma = new PrismaClient()
  await prisma.history.create({
    data: {
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
