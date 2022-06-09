import { PrismaClient, User } from "@prisma/client"
import { green } from 'colorette'

const prisma = new PrismaClient()

// fetch user info
const fetchInfo = async (userLoggedIn: string) => {
  let info = await prisma.user.findFirst({
    where: {
      name: userLoggedIn
    }
  })
  return info
}

const isHighScore = async (user_score: number, userLoggedIn: string) => {
  const info: User | null = await fetchInfo(userLoggedIn)
  if (info) {
    if (user_score > info.highscore) {
      console.log(`New high score: ${green(user_score)}`)
      await prisma.user.update({
        where: {
          name: info.name
        },
        data: {
          highscore: user_score
        }
      })
    } 
  } 
}

export { isHighScore }
