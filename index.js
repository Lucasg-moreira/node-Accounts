import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

let accountName = "";
let accountValue = 0;

init();

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: `Choose one option ${chalk.blue(accountName)} >>`,
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
        loginAccount();
      } else if (response === "Balance") {
        balance();
      } else if (response === "Deposit") {
        deposit();
      } else if (response === "Withdraw money") {
        withdraw();
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
        message: "Deposit any value >>",
        type: "number",
        name: "deposit",
      },
    ])
    .then((res) => {
      accountValue = res.deposit;

      if (verifyFileExist(accountName) === true) {
        fs.writeFileSync(
          `accounts/${accountName}.json`,
          `{"balance": ${accountValue}}`,
          (err) => {
            console.log(err);
          }
        );
        console.log(chalk.green.bold("Deposito feito"));
        init();
      } else {
        console.log(chalk.bgRed.black.bold("You need to login."));
        init();
      }
    })
    .catch((err) => console.log(err));
};

const quit = () => {
  console.log(chalk.blue.bold("Thank you to use Account!"));
  process.exit();
};

const loginAccount = () => {
  inquirer
    .prompt([
      {
        name: "login",
        message: "Login >>",
        type: "input",
      },
    ])
    .then((res) => {
      const response = res.login;
      if (verifyFileExist(response) === true) {
        accountName = response;
        console.log(chalk.green.bold("Login efetuado com sucesso!"));
        init();
      } else {
        console.log(chalk.red.bold("Essa conta não existe."));
        loginAccount();
      }
    })
    .catch((err) => console.log(err));
};

const balance = () => {
  fs.readFile(`accounts/${accountName}.json`, "utf-8", (err, data) => {
    if (err) throw err;

    const balance = JSON.parse(data);
    accountValue = balance.balance;
    console.log(
      chalk.blue.bold(
        `\nThe amount deposited in your account is: ${accountValue}`
      )
    );
    init();
  });
};

const welcome = () => {
  if (accountName != "" || undefined) {
    console.log(chalk.red.bold(`Welcome to Accounts ${accountName}`));
  }
};

const withdraw = () => {
  inquirer
    .prompt([
      {
        type: "number",
        message: "Type a value to take >>",
        name: "money",
      },
    ])
    .then((res) => {
      let money = accountValue - res.money;
      if (accountName !== undefined) {
        if (res.money > accountValue) {
          console.log(
            chalk.red.bold(
              `You don't have this money. Your balance is >> ${accountValue}.`
            )
          );
          init();
        } else {
          fs.writeFileSync(
            `accounts/${accountName}.json`,
            `{"balance": ${money}}`,
            (err) => {
              console.log(err);
            }
          );
          console.log(
            chalk.green.bold(`Congratulations! You take out ${res.money}`)
          );
          init();
        }
      } else {
        console.log("You need to login.")
        init();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const verifyFileExist = (name) => {
  if (fs.existsSync(`accounts/${name}.json`)) {
    return true;
  }
};

const clearConsole = () => {
  console.clear();
};
