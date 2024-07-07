import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgGreen("Hello there"));

let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To Be A JavaScript Millionaire? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY?")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("KILLED")}
    `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name? ",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days then released on \n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17th, 1996",
    ],
  });

  return handleAnswer(answers.question_1 == "Dec 4th, 1995");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work, ${playerName}. That's a legit answer`,
    });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function winner() {
  console.clear();
  const message = `Congrats ${playerName} ! \n $1,000,000`;

  figlet(message, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await winner();
