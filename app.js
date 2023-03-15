"use strict";

// This is a simple slot machine game that allows the player to place a deposit, select the number of lines to bet on, and place a bet.
// The game then spins the reels and calculates the winnings based on the symbols that appear on the lines.
// The player can continue playing until they run out of money or choose to exit the game.
// The game is built using Node.js and prompts the user for input using the "prompt-sync" library.

// 1. Deposit some money
// 2. Determine the Number of lines
// 3. Collect a bet amount
// 4. Spin the Slot Machine
// 5. Check if the user won
// 6. Give the user their Winnings
// 7. Play again

// Import the prompt-sync module
const prompt = require("prompt-sync")();

// Constants for the number of rows and columns in the game grid, as well as the count and values of the symbols used in the game.
const ROWS = 3;
const COLS = 3;

// Define the number of symbols of each type and their corresponding values
const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// Function to prompt the player for a deposit amount.
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a Deposit Amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid Deposit amount, try again! ");
    } else {
      return numberDepositAmount;
    }
  }
};

// Function to prompt the player for the number of lines they wish to bet on.
const getNumberofLines = () => {
  while (true) {
    const lines = prompt("Enter The number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again! ");
    } else {
      return numberOfLines;
    }
  }
};

// Function to prompt the player for the amount they wish to bet on each line.
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter bet per line: ");
    const numberOfBet = parseFloat(bet);

    if (
      isNaN(numberOfBet) ||
      numberOfBet <= 0 ||
      numberOfBet > balance / lines
    ) {
      console.log("Invalid number of Bet, Try Again! ");
    } else {
      return numberOfBet;
    }
  }
};

// Function to spin the reels and generate a random set of symbols.
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];

  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

// Function to transpose the reels matrix, so that the rows become columns and vice versa.
const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

// Function to print the rows of symbols to the console
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// Function to calculate the user's winnings based on the symbols in the rows
const getWinning = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

// Define a function called game that takes no arguments
const game = () => {
  // Call a function called deposit that returns the initial balance
  // and assign it to a variable called balance
  let balance = deposit();

  // Start a loop that runs forever (until the player runs out of money or chooses to quit)
  while (true) {
    // Display the player's current balance
    console.log("You have a balance of $" + balance);

    // Call a function called getNumberofLines to get the number of lines the player wants to bet on
    const numberOfLines = getNumberofLines();

    // Call a function called getBet to get the amount the player wants to bet per line
    // and assign it to a variable called bet
    const bet = getBet(balance, numberOfLines);

    // Subtract the amount the player bet from their balance
    balance -= bet * numberOfLines;

    // Call a function called spin to simulate spinning the reels and get the result
    const reels = spin();

    // Transpose the result to get the rows and assign them to a variable called rows
    const rows = transpose(reels);

    // Call a function called printRows to display the rows to the player
    printRows(rows);

    // Call a function called getWinning to calculate the player's winnings
    // based on the rows, bet, and number of lines
    const winnings = getWinning(rows, bet, numberOfLines);

    // Add the player's winnings to their balance
    balance += winnings;

    // Display the amount the player won
    console.log("You Won, $" + winnings.toString());

    // If the player has no money left, display a message and break out of the loop
    if (balance <= 0) {
      console.log("You ran out of a money");
      break;
    }

    // Ask the player if they want to play again and store their answer in a variable called playAgain
    const playAgain = prompt("Do you want to play again (y/n)?");

    // If the player does not want to play again, break out of the loop
    if (playAgain != "y") break;
  }
};

// Call the game function to start the game
game();
