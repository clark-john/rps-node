export interface historyQuery {
  user_score: number,
  comp_score: number,
  tie: number,
  total_games: number,
  datePlayed: string,
  userLoggedIn: string
}

export interface Details {
  name: string,
  password: string,
  bdate: number,
  bmonth: string, 
  byear: number
}