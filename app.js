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
  // Start a loop that runs forever (until a valid deposit amount is entered)
  while (true) {
    // Ask the user to enter a deposit amount and store it in a variable called depositAmount
    const depositAmount = prompt("Enter a Deposit Amount: ");

    // Convert the deposit amount to a number using parseFloat and store it in a variable called numberDepositAmount
    const numberDepositAmount = parseFloat(depositAmount);

    // If the number is not a valid number or is less than or equal to zero, display an error message and continue the loop
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid Deposit amount, try again! ");

      // If the number is valid, return it
    } else {
      return numberDepositAmount;
    }
  }
};

// Define a function called getNumberofLines that takes no arguments
const getNumberofLines = () => {
  // Start a loop that runs forever until a valid number of lines is entered
  while (true) {
    // Prompt the user to enter the number of lines they want to bet on and assign it to a variable called lines
    const lines = prompt("Enter The number of lines to bet on (1-3): ");

    // Convert the input to a number and assign it to a variable called numberOfLines
    const numberOfLines = parseFloat(lines);

    // Check if the input is not a number, is less than or equal to zero, or is greater than 3
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again! ");

      // If the input is valid, return the number of lines and exit the loop
    } else {
      return numberOfLines;
    }
  }
};

// Define a function called getBet that takes two arguments: balance and lines
const getBet = (balance, lines) => {
  // Start a loop that runs until a valid bet is entered
  while (true) {
    // Prompt the player to enter their bet amount per line and store it in a variable called bet
    const bet = prompt("Enter bet per line: ");

    // Convert the bet to a number and store it in a variable called numberOfBet
    const numberOfBet = parseFloat(bet);

    // Check if the bet is not a valid number, less than or equal to zero, or greater than the available balance divided by the number of lines
    if (
      isNaN(numberOfBet) ||
      numberOfBet <= 0 ||
      numberOfBet > balance / lines
    ) {
      // If the bet is not valid, display an error message and prompt the player to try again
      console.log("Invalid number of Bet, Try Again! ");
    } else {
      // If the bet is valid, return the bet amount
      return numberOfBet;
    }
  }
};

// Define a function called spin that generates a set of random symbols for a slot machine
const spin = () => {
  // Create an empty array called symbols
  const symbols = [];

  // Loop through each key-value pair in an object called SYMBOL_COUNT
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    // Push the corresponding symbol to symbols count number of times
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  // Create an empty array called reels
  const reels = [];

  // Loop through a range of COLS (presumably the number of columns in the slot machine)
  for (let i = 0; i < COLS; i++) {
    // Add an empty array to reels
    reels.push([]);
    // Create a copy of the symbols array called reelSymbols
    const reelSymbols = [...symbols];
    // For each j in a range of ROWS (presumably the number of rows in the slot machine)
    for (let j = 0; j < ROWS; j++) {
      // Randomly select an index in reelSymbols
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      // Store the corresponding symbol in selectedSymbol
      const selectedSymbol = reelSymbols[randomIndex];
      // Push selectedSymbol to the ith reel in reels
      reels[i].push(selectedSymbol);
      // Remove selectedSymbol from reelSymbols
      reelSymbols.splice(randomIndex, 1);
    }
  }
  // Return the reels array
  return reels;
};

// This function takes in a 2D array of symbols called `reels` and transposes it such that the rows become columns and vice versa.
const transpose = (reels) => {
  // Create an empty array called `rows` to store the transposed 2D array.
  const rows = [];

  // Loop through a range of `ROWS` (presumably the number of rows in the original 2D array).
  for (let i = 0; i < ROWS; i++) {
    // Add an empty array to `rows`.
    rows.push([]);
    // Loop through a range of `COLS` (presumably the number of columns in the original 2D array).
    for (let j = 0; j < COLS; j++) {
      // Push the symbol at index `[j][i]` in `reels` to the `i`th row of `rows`.
      rows[i].push(reels[j][i]);
    }
  }

  // Return the transposed 2D array.
  return rows;
};

/**
 * Prints an array of rows to the console in a formatted way
 *
 * @param {Array} rows - An array of rows, where each row is an array of symbols
 */
const printRows = (rows) => {
  // Iterate through each row in the rows array
  for (const row of rows) {
    // Create an empty string to store the formatted row
    let rowString = "";

    // Loop through each symbol in the current row
    for (const [i, symbol] of row.entries()) {
      // Add the current symbol to the rowString
      rowString += symbol;

      // If the current symbol is not the last symbol in the row, add a separator
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }

    // Print the formatted row to the console
    console.log(rowString);
  }
};

/**
 * Calculates the total winnings for a given set of rows, bet amount, and number of lines
 *
 * @param {Array} rows - An array of rows, where each row is an array of symbols
 * @param {number} bet - The amount of the bet
 * @param {number} lines - The number of lines in play
 * @returns {number} The total winnings for the given combination of rows, bet amount, and lines
 */
const getWinning = (rows, bet, lines) => {
  let winnings = 0;

  // Iterate through each line
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    // Check if all symbols in the current line are the same
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    // If all symbols are the same, calculate the winnings
    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  // Return the total winnings
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
