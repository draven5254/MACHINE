# MACHINE

This code is a simple slot machine game that allows a player to deposit money, bet on multiple lines, and spin the slot machine reels. The game then checks if the player has won any money based on the symbols that appear on the reels and gives them their winnings accordingly.

The code uses the "prompt-sync" library to get input from the user, and defines some constants for the number of rows and columns in the slot machine, as well as the count and values of the symbols on the reels.

The program is divided into several functions:

1. The "deposit" function prompts the user to enter a deposit amount, verifies that it is a valid number, and returns it.

2. The "getNumberofLines" function prompts the user to enter the number of lines they want to bet on, verifies that it is a valid number between 1 and 3, and returns it.

3. The "getBet" function takes the user's balance and number of lines as arguments, prompts the user to enter a bet amount per line, verifies that it is a valid number and that the total bet is not more than their balance, and returns it.

4. The "spin" function creates an array of symbols based on the counts defined earlier, and randomly selects symbols to populate the slot machine reels, which are represented as a two-dimensional array.

5. The "transpose" function takes the reels array and transposes it so that the symbols in each row are grouped together.

6. The "printRows" function takes the rows array and prints out the symbols in each row in a user-friendly format.

7. The "getWinning" function takes the rows array, bet amount, and number of lines as arguments, checks if any of the lines have matching symbols, and calculates the player's winnings based on the symbol values defined earlier.

8. The "game" function is the main game loop, which calls the other functions in order and keeps track of the player's balance. If the player runs out of money or chooses to quit, the game loop ends.

Finally, the "game" function is called at the end of the code to start the game.
