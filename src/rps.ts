import { log, error } from 'console'
import { red, yellow, bold, green } from 'colorette'
import { prompt } from 'inquirer'
import historyQuery, { storeHist } from './utils/storeHistory'
import random from 'random'
import casual from 'casual'
import moment from 'moment'
import mongoose from 'mongoose'

let user_score: number = 0
let comp_score: number = 0
let tie: number = 0

const date: string = moment(Date.now()).format('LL')
const time: string = moment(Date.now()).format('LTS')
const datePlayed: string = `${date} ${time}`

/*let rock_user: number = 0
let paper_user: number = 0
let scissors_user: number = 0
let rock_c: number = 0
let paper_c: number = 0
let scissors_c: number = 0*/

const play = async (userLoggedIn: string) => {
  let compname: string = await prompt(
      [
        {
          'type': 'input',
          'name': 'compname',
          'message': "Enter the name of your player, or type \"none\" to skip.\nType \"random\" to generate.\nType \"cancel\" or \"exit\" to terminate this program.\n"
        }
      ]
    ).then(ans=>{
    ans = ans.compname
    if (ans == '' || ans.toLowerCase() == 'none'){
      ans = "Computer"
    } else if (ans.toLowerCase() == 'exit' || ans.toLowerCase() == 'cancel'){
      log("Exiting...")
      process.exit()
    } else if (ans.toLowerCase() == 'random') {
      ans = casual.full_name
    }
    return ans
  }).catch(err=>{error(err)})

  const lose = bold(red("You lose."))
  const win = bold(green("You won."))

  while (true) {
    let computer_action: number | string = random.int(1,3)
    if (computer_action == 1){ computer_action = 'rock' }
    else if ( computer_action == 2){ computer_action = 'scissors'}
    else { computer_action = 'paper' }

    let user_action = await prompt(
      [
        {
          'type': 'input',
          'name': 'action',
          'message': "Enter a choice: (rock, paper, scissors)\nNote: This is not case sensitive, but don't shortcut any of these words."
        }
      ]
    ).then(ans => {
      let user_act = ans.action 
      return user_act
    }).catch(err => {error(err)})

    if (user_action == computer_action){
      log('You choose',user_action)
      log(compname,"choose",computer_action)
      log(yellow("It's a tie"))
      tie += 1
    } 
    else if (user_action == 'rock'){
      log('You choose rock')
      if (computer_action == 'scissors'){
        log(compname,'choose scissors')
        log(win)
        user_score += 1
      } else {
        log(compname,'choose paper')
        log(lose)
        comp_score += 1
      }
    } else if (user_action == 'scissors'){
      log('You choose scissors')
      if (computer_action == 'rock'){
        log(compname,'choose rock')
        log(lose)
        comp_score += 1
      } else {
        log(compname,'choose paper')
        log(win)
        user_score += 1
      }
    } else if (user_action == 'paper'){
      log('You choose paper')
      if (computer_action == 'scissors'){
        log(compname,'choose scissors')
        log(lose)
        comp_score += 1
      } else {
        log(compname,'choose rock')
        log(win)
        user_score += 1
      }
    } else if (user_action == 'end'){
      let total_games: number = user_score + comp_score + tie
      log("the game ends")
      log("You:",user_score)
      log(compname+":",comp_score)
      log("Tie:",tie)
      log("Number of games:",total_games)

      const query: historyQuery = {
        user_score,
        comp_score,
        tie,
        total_games,
        datePlayed,
        userLoggedIn
      } 
      await storeHist(query).finally(() => {mongoose.disconnect()})
      process.exit()
      
    } else {
      log(red("Invalid option"))
    }
  }
}

export { play }
