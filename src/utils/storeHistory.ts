import { autoIncrement } from './autoIncrement'
import { isHighScore } from './isHighScore'
import { History } from './Schema'
import { connectDB } from './connectDB' 

interface historyQuery {
  user_score: number,
  comp_score: number,
  tie: number,
  total_games: number,
  rock_user: number,
  scissors_user: number,
  paper_user: number,
  rock_comp: number,
  scissors_comp: number,
  paper_comp: number,
  comp_name: string,
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
    rock_user: query.rock_user,
    scissors_user: query.scissors_user,
    paper_user: query.paper_user,
    rock_comp: query.rock_comp,
    scissors_comp: query.scissors_comp,
    paper_comp: query.paper_comp,
    comp_name: query.comp_name,
    dateplayed: query.datePlayed,
    playedBy: query.userLoggedIn
  })
}

export { storeHist }
export default historyQuery