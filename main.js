const prompt = require('prompt-sync')({sigint: true});

const hat = ' 🌎 ';
const hole = ' 👽 ' ;
const fieldCharacter = ' ✨ ';
const pathCharacter = ' 🚀 ';

class Field {
  constructor (field) {
  this.field = field;
  [this.playerY, this.playerX] = [0, 0];
  this.field[0][0] = pathCharacter;
  this.currentlyPlaying = true;
  }
  //game function for the flow of events when the game is started
  game() {
        this.greet();
      while (this.currentlyPlaying) {
        this.print();
        this.movePrompt();
        this.checkWin();
      }
     console.log('Game Over!');
    }
  //Greets Player
    greet(){
        console.log(`Navigate through space, dodge evil aliens, and make it back home safely to Earth. Good luck!`)
    }
    //prints the field into a 2D grid with the pathCarachter position;
  print() {
    const grid = this.field.map(row => {
        return row.join('');
      }).join('\n');
    console.log(grid);
  }

  //Prompts user's input and move the current player's direction;
  movePrompt() {
    let direction = prompt('Which direction do you want to move to? (i ⬆️  k ⬇️  j ⬅️  l for ➡️ )').toUpperCase();
      switch (direction) {
        case "I":
          this.playerY -= 1;
          break;
        case "K": 
          this.playerY += 1;
          break;   
        case "L":
          this.playerX += 1;  
          break;
        case "J": 
          this.playerX -= 1;
          break;
        default:
        console.log('Which way?');
        break;
      } 
} 
  //Check the new position of the player and determine wheter they won,   they lost, or they can keep on going
  checkWin() {
    if (this.field[this.playerY] === undefined) {
      console.log('You lose - Out of the field!');
      return this.currentlyPlaying = false;
    }
    switch (this.field[this.playerY][this.playerX]) {
      case hole:
        console.log('You lose - Aliens got you!');
        return this.currentlyPlaying = false;
      case undefined:  
        console.log('You lose - Out of the field!');
        return this.currentlyPlaying = false;
      case fieldCharacter:
        //updates the player's path into the field's grid
        this.field[this.playerY][this.playerX] = pathCharacter; 
        console.log('Keep looking!');
        return this.currentlyPlaying = true;
      case hat:
        console.log('You are safe back to earth, you win!');
        return this.currentlyPlaying = false;
    }
  }  
  //generating field grid
  static generateField(heigth, width, level) {
    //determines the density of the field according to the selected level
    let probability = 0
    switch (level) {
      case 'easy':
        probability = 0.9;
        break;
      case 'medium':
        probability = 0.8;
        break;
      case 'hard':
        probability = 0.7;
        break;
      default:
        probability = 0.5;
        break;
    }
    let newField = [];
    //width
    for (let i = 0; i < width; i++) {
       let rows = [];
      //height and characters
      for (let j=0 ; j< heigth; j++) {
        const char = Math.random() < probability ? fieldCharacter : hole;
        //populating the arrays with the characters
        rows.push(char);
      }
        newField.push(rows);
        }
      //adding the hat character randomly
      let hatIndexX = Math.floor(Math.random() * width);
      let hatIndexY = Math.floor(Math.random() * heigth);
      //mking sure is not in the starting position
      while ( hatIndexY === 0 && hatIndexX === 0  ) {
              hatIndexX = Math.floor(Math.random() * width);
              hatIndexY = Math.floor(Math.random() * heigth);
      }
      newField[hatIndexY][hatIndexX] = hat;
      return newField;
  }
}
//Initialize Game
const myField = new Field(Field.generateField(10, 10, 'medium'));

myField.game();