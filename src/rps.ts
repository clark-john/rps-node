import { log } from 'console';
import { red, yellow, bold, green } from 'colorette';
import { storeHist } from './hist/storeHistory';
import { historyQuery } from './utils/interfaces';
import prompts from 'prompts';
import random from 'random';
import casual from 'casual';
import moment from 'moment';
import { onCancel } from './utils/onCancel';

let user_score: number = 0;
let comp_score: number = 0;
let tie: number = 0;

const date: string = moment(Date.now()).format('LL');
const time: string = moment(Date.now()).format('LTS');
const datePlayed: string = `${date} ${time}`;

const play = async (userLoggedIn: string) => {
  let computer_name = await prompts({
    type: 'text',
    name: 'compname',
    message: "Enter the name of your player, or type \"none\" to skip.\nType \"random\" to generate.\nType \"cancel\" or \"exit\" to terminate this program.\n"
  }, { onCancel });
  let compname = computer_name.compname;
  if (compname == '' || compname.toLowerCase() == 'none'){
    compname = "Computer";
  } else if (compname.toLowerCase() == 'exit' || compname.toLowerCase() == 'cancel'){
    log("Exiting...");
    process.exit();
  } else if (compname.toLowerCase() == 'random') {
    compname = casual.full_name;
  }

  const lose = bold(red("You lose."));
  const win = bold(green("You won."));

  while (true) {
    let computer_action: number | string = random.int(1,3);
    if (computer_action == 1){ computer_action = 'rock'; }
    else if ( computer_action == 2){ computer_action = 'scissors';}
    else { computer_action = 'paper'; }

    let user_act = await prompts({
      type: 'text',
      name: 'action',
      message: "Enter a choice: (rock, paper, scissors)\nNote: This is not case sensitive, but don't shortcut any of these words."
    }, { onCancel });
    let user_action = user_act.action; 

    if (user_action == computer_action){
      log('You choose',user_action);
      log(compname,"choose",computer_action);
      log(yellow("It's a tie"));
      tie += 1;
    } 
    else if (user_action == 'rock'){
      log('You choose rock');
      if (computer_action == 'scissors'){
        log(compname,'choose scissors');
        log(win);
        user_score += 1;
      } else {
        log(compname,'choose paper');
        log(lose);
        comp_score += 1;
      }
    } else if (user_action == 'scissors'){
      log('You choose scissors');
      if (computer_action == 'rock'){
        log(compname,'choose rock');
        log(lose);
        comp_score += 1;
      } else {
        log(compname,'choose paper');
        log(win);
        user_score += 1;
      }
    } else if (user_action == 'paper'){
      log('You choose paper');
      if (computer_action == 'scissors'){
        log(compname,'choose scissors');
        log(lose);
        comp_score += 1;
      } else {
        log(compname,'choose rock');
        log(win);
        user_score += 1;
      }
    } else if (user_action == 'end'){
      let confirm = await prompts({
        type: 'confirm',
        name: 'end',
        message: 'Are you sure?'  
      });
      if (confirm.end) {
        let total_games: number = user_score + comp_score + tie;
        log("the game ends");
        log("You:",user_score);
        log(compname+":",comp_score);
        log("Tie:",tie);
        log("Number of games:",total_games);

        const isHighScore = (userLoggedIn == "Guest") ? false : true;

        const query: historyQuery = {
          user_score,
          comp_score,
          tie,
          total_games,
          datePlayed,
          userLoggedIn,
          isHighScore
        }; 
        await storeHist(query);
        process.exit();
      }
    } else {
      log(red("Invalid option"));
    }
  }
};

export { play };
