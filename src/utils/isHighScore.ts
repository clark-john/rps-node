import 'dotenv/config'
import mongoose from 'mongoose'
import { User } from './Schema'

// mongoose implementation
const fetchInfo = async (userLoggedIn: string) => {
  let info = await User.findOne({ name: userLoggedIn })
  return info
}

const isHighScore = async (user_score: number, userLoggedIn: string) => {
  const info = await fetchInfo(userLoggedIn)
  if (info) {
    if (user_score > info.highscore) {
      console.log(`New high score: ${user_score}`)
      await User.update(
        { name: info.name },
        { highscore: user_score }
      )
    } 
  } 
}

/*const fetchInfo = async (userLoggedIn: string) => {
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
      console.log(`New high score: ${user_score}`)
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
}*/





// const main = (s: string) => {
//   isHighScore(2,s)
// }
// main('clark')

export { isHighScore }