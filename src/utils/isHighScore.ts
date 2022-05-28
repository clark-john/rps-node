import 'dotenv/config'
import { User } from './Schema'
import { connectDB } from './connectDB' 

// mongoose implementation
const fetchInfo = async (userLoggedIn: string) => {
  connectDB()
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

// const main = (s: string) => {
//   isHighScore(2,s)
// }
// main('clark')

export { isHighScore }