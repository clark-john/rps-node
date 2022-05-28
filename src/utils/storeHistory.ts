import { autoIncrement } from './autoIncrement'
import { isHighScore } from './isHighScore'
import { History } from './Schema'
import { connectDB } from './connectDB' 

interface historyQuery {
  user_score: number,
  comp_score: number,
  tie: number,
  total_games: number,
  datePlayed: string,
  userLoggedIn: string
}

const storeHist = async (query: historyQuery) => {
  await connectDB()
  if (query.userLoggedIn != "Guest") {
    isHighScore(query.user_score, query.userLoggedIn)
  }
  const gamenumber = await autoIncrement()
  new History() 
  await History.create({
    gamenumber: gamenumber,
    wins: query.user_score,
    loses: query.comp_score,
    tie: query.tie,
    total_games: query.total_games,
    dateplayed: query.datePlayed,
    playedBy: query.userLoggedIn
  })
}

export { storeHist }
export default historyQuery