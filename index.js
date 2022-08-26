import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

init();

let accountName = "lucas";

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "Choose one option >>",
        choices: [
          "Create account",
          "Login",
          "Balance",
          "Deposit",
          "Withdraw money",
          "Quit",
        ],
      },
    ])
    .then((res) => {
      const response = res.options;
      if ("Create account" === response) {
        createAccount();
      } else if (response === "Login") {
        loginAccount()
      } else if (response === "Balance") {
      } else if (response === "Deposit") {
        deposit();
      } else if (response === "Withdraw money") {
      } else if (response === "Quit") {
        quit();
      }
    })
    .catch((err) => console.log(err));
}

const createAccount = () => {
  inquirer
    .prompt([
      {
        message: "Write the name of your account >>",
        type: "input",
        name: "accountName",
      },
    ])
    .then((res) => {
      accountName = res.accountName;

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.red.bold("this account has been created. Choose another.")
        );
        createAccount();
        return;
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance" : 0}',
        (err) => {
          console.log(err);
        }
      );
      console.log(chalk.greenBright("sua conta foi criada com sucesso"));
      init();
    })
    .catch((err) => {
      console.log(err);
    });
};

const deposit = () => {
  inquirer
    .prompt([
      {
        message: "Deposit any value",
        type: "number",
        name: "deposit",
      },
    ])
    .then((res) => {
      const accontValue = res.deposit;
      if(verifyIfFileExit === true) {
        fs.writeFileSync(`accounts/${accountName}.json`, accontValue, (err) => {
          console.log(err);
        });
      }
      
    })
    .catch();
};

const quit = () => {
  console.log(chalk.blue.bold("Thank you to use Account!"));
  process.exit();
};

const loginAccount = () => {
    if(verifyFileExist()) {
      

    }
}


const verifyFileExist = () => {
  if (fs.existsSync(`accounts/${accountName}.json`)) {
    return true;
  }
}
