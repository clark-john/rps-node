import { Schema, model } from 'mongoose'

const historySchema = new Schema({
	gamenumber: Number,
	wins: Number,
	loses: Number,
	tie: Number,
	total_games: Number,
	datePlayed: String,
	playedBy: String
})

const userSchema = new Schema({
	name: String,
	password: String,
	birthdate: { type: Number, min: 1, max: 31 },
	birthmonth: String,
	birthyear: { type: Number, min: 1930, max: 2100 },
	gender: String,
	highscore: Number
})

export const History = model('History', historySchema)
export const User = model('User', userSchema)