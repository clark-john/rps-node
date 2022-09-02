import { PrismaClient } from '@prisma/client';
import { autoIncrement } from '@utils/autoIncrement';
import { isHighScore as isHighScoreReached } from '@utils/isHighScore';
import { historyQuery } from '@utils/interfaces';

const prisma = new PrismaClient();

const storeHist = async (query: historyQuery) => {
  const { 
    user_score, 
    comp_score, 
    tie, 
    total_games, 
    datePlayed,
    userLoggedIn
  } = query;
  let isHighScore = query.isHighScore;
  if (userLoggedIn != "Guest") {
    isHighScore = await isHighScoreReached(user_score, userLoggedIn) as boolean;
  } else {
    isHighScore = false;
  }
  const gamenumber = await autoIncrement();
  await prisma.history.create({
    data: {
      gamenumber: gamenumber,
      wins: user_score,
      loses: comp_score,
      tie,
      total_games,
      dateplayed: datePlayed,
      playedBy: userLoggedIn,
      isHighScore
    }
  });
};

export { storeHist };
