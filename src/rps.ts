import { red, yellow, bold, green } from 'colorette'
import { prompt } from 'inquirer'
import historyQuery, { storeHist } from './utils/storeHistory'
import { confirm } from './utils/prompts'
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

let rock_user: number = 0
let paper_user: number = 0
let scissors_user: number = 0
let rock_c: number = 0
let paper_c: number = 0
let scissors_c: number = 0

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
      console.log("Exiting...")
      process.exit()
    } else if (ans.toLowerCase() == 'random') {
      ans = casual.full_name
    }
    return ans
  }).catch(err=>{ throw err })

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
    }).catch(err => { throw err })

    if (user_action == computer_action){
      console.log('You choose',user_action)
      console.log(compname,"choose",computer_action)
      console.log(yellow("It's a tie"))
      tie += 1
    } 
    else if (user_action == 'rock'){
      console.log('You choose rock')
      if (computer_action == 'scissors'){
        console.log(compname,'choose scissors')
        console.log(win)
        user_score += 1
        scissors_c += 1
      } else {
        console.log(compname,'choose paper')
        console.log(lose)
        comp_score += 1
        paper_c += 1
      }
      rock_user += 1
    } else if (user_action == 'scissors'){
      console.log('You choose scissors')
      if (computer_action == 'rock'){
        console.log(compname,'choose rock')
        console.log(lose)
        comp_score += 1
        rock_c += 1
      } else {
        console.log(compname,'choose paper')
        console.log(win)
        user_score += 1
        paper_c += 1
      }
      scissors_user += 1
    } else if (user_action == 'paper'){
      console.log('You choose paper')
      if (computer_action == 'scissors'){
        console.log(compname,'choose scissors')
        console.log(lose)
        comp_score += 1
        scissors_c += 1
      } else {
        console.log(compname,'choose rock')
        console.log(win)
        user_score += 1
        rock_c += 1
      }
      paper_user += 1
    } else if (user_action == 'end'){
      let conf = await confirm()
      if (conf.confirm){
        let total_games: number = user_score + comp_score + tie
        console.log("the game ends")
        console.log("You:",user_score)
        console.log(compname+":",comp_score)
        console.log("Tie:",tie)
        console.log("Number of games:",total_games)

        const query: historyQuery = {
          user_score,
          comp_score,
          tie,
          total_games,
          rock_user,
          scissors_user,
          paper_user,
          rock_comp: rock_c,
          scissors_comp: scissors_c,
          paper_comp: paper_c,
          comp_name: compname,
          datePlayed,
          userLoggedIn
        } 
        await storeHist(query).finally(() => { mongoose.disconnect() })
        process.exit()
      }
    } else {
      console.log(red("Invalid option"))
    }
  }
}

export { play }
