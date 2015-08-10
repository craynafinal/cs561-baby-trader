#Baby Trader
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License. Please see the file COPYING in the source distribution of this software for license terms.

#About
Baby Trader is a web based game developed with Phaserjs framework.

#How to play
The amount of money you need to make by selling babies and time given will show up on the screen before you get to the play screen. Click the red button to start the game. The game will show you many information in one screen. On the left, customer will be shown where the customer will tell you what kind of baby he or she wants to buy. Then take a look at a baby information is shown on the right. The information involves properties of a baby shown currently, and you need to match the properties that a baby has to the customer's needs. It will be hard to find the baby matching properties exactly, so there is a way you can cheat using the baby talent cheater. Clicking the charge button or waiting will charge up the gauge and will be able to use it by pressing the talent button when the gauge is full. When you do it, it will change a baby's attribute that your customer does not want into one that he/she wants. If you have all properties match, then propose it to the customer by pressing the business button at the bottom. Your customer will accept it and you made sales!

#Later Plan
Buy / Refund functionalities and animated sprites

#Languages / Sources
Typescript

Phaserjs: phaser.io

Rengoku Teien (Background Music): rengoku-teien.com

#License
Full MIT license details available within COPYING.

#Notes for developers
1) Attributes
This is a class where defines attributes for babies and customers. This randomly picks properties from data and assign to an instance.

2) Baby
A class defines babies. It randomly gets name, age, sprite, and attributes when initializing. No major functionalities other than get methods.

3) Boot
An initial game state, it is going to load a loading sprite for the next state.

4) Const
Constant values used for the development. Usually defines color code. Each methods are self descriptive.

5) Customer
Defines a customer. Like baby class, it will create an instance with randomly generated values. These will be a customer's sprite and needs.

	- greet(): A greeting dialogue string will be returned.  
	
	- reject(): A reject dialogue string will be returned.
	
	- accept(): An accept dialogue string will be returned.
	
	- checkElementAvailability(babyAttribute): Check if given attribute exists in an instance.
	
	- checkElementsAvailability(babyAttributes): Same as checkElementAvailability, but the parameter is an array of attributes.
	
	- getMissingAttribute(babyAttributes): Compare attributes between a baby's and a customer's and return first element that the baby is missing.
	
6) Dialog
Dialogue class where it prints an array of strings. Does not display a string instantly. It prints one character at a time.
	- startDialog(game, dialogLocation, dialogContent): Specify the location by dialogLocation argument and dialogContent is an array of strings.
	
7) Global
Collection of functions globally used.
	- setupButtonSoundEffect(game, sound: string): Sound effect setup for buttons
	- playButtonSoundEffect(): Play button sound effect
	- playBackgroundSound(game, music: string): Play background music
	- stopBackgroundSound(): Stops background music
	- insertAttributeToArrayAsSet(array, maxNumberToAdd: number): Add an element to an array like set data structure, no duplicates.
	- setupKeyboardHotkeys(gameVariable, keyVariable, keyboardKey, keyMethod, keyThis): Set up keyboard shortcut
	- displayBitmapTextOnScreen(game, textObject, text: string, bitMapFont: string, fontSize: number, x: number, y: number, anchorX: number = .5, anchorY: number = .5): Displays bitmap text on screen
	- displayTextOnScreen(game, textObject, text: string, fontStyle, x: number, y: number, anchorX: number = .5, anchorY: number = .5): Displays text on screen
	- displayTextButtonOnScreen(currentObject, textObject, text: string, fontStyle, upMethod, x: number, y: number, anchorX?: number, anchorY?: number): Displays text button on screen, should pass function for up event.
	- displaySpriteOnScreen(game, spriteObject, spriteName: string, x: number, y: number, anchorX: number = .5, anchorY: number = .5): Displays a sprite on screen
	- displaySpriteButtonOnScreen(currentObject, spriteObject, spriteName: string, spriteInvName: string, upMethod, x: number, y: number, anchorX?: number, anchorY?: number): Displays a sprite button on screen, should pass function for up event.
	- addTweenToGame(game, sprite, opacity: number, time: number): Add tween for fade in / out effect to game
	- addFadeTweenToSprite(game, sprite, startOpacity: number, endOpacity: number, time: number): Set up tween for a sprite
	- displaySolidBackground(game, graphicObject, color, opacity: number): Displays a solid color background graphic.
	- displaySolidRectangular(game, graphicObject, color, opacity: number, width: number, height: number, x: number, y: number): Displays a solid color rectangular shape graphic element.
	- getRandomNumber(bound: number): Random number generator. Range is 0 ~ (bound - 1).
	
8) Play
Actual game play state.
	- businessButtonAction(currentObject): Determines action when clicking the business button that proposes the current baby to a customer.
	- displayNextBaby(currentObject): Show the next baby.
	- displayPreviousBaby(currentObject): Show the prev baby.
	- printDialog(currentObject, dialogs): Prints a customer's dialogue.
	- initializeCustomers()
	- displayCustomers(currentObject, index): Displays a customer's sprite.
	- initializeBabies()
	- displayBabies(currentObject, index): Displays a baby's sprite.
	- releaseTalentCheat(currentObject): Gets called when the talent button is pressed. It will change one of the current baby's attributes.
	- resetCheatGauge(): Sets the gauge of talent cheater to 0.
	- increaseCheatGauge(): Increment cheat gauge. 
	- removePlayScreen(currentObject): Remove money and time text from the play screen.
	- displayResultScreen(currentObject): Show the result screen. It determines if it is success or fail screen.
	- removePanelDisplayScreen(currentObject): Removes result or goal screen.
	- setupTimeAndMoney(): Initialize time and money before any stage begins.
	- pauseOrResumeGame(currentObject)
	- setButtonInputs(currentObject, trueOrFalse: boolean): Enables or disables button inputs except the pause button.
	- startGame(): Start game after the goal screen.
	- goBackToTitle(currentObject): Abort the game and go back to the title state.
	- displayGoalScreen(): Displays the goal screen that shows time given and amount of money need to be made.
	- updateText(): Updates the money and time text.
	- getTimeInFormat(timeInSecond): Converts the seconds to (minute : seconds) format.

9) Preload
It is where loads all sprites and resources for this game. On complete, goes to the title state.

10) Prologue
Prologue state between title and play states.

11) Title
Title state.
	- displayHowToPlayScreen(currentObject): Show how to play menu.
	- displayCreditScreen(currentObject): Show credits menu.
	- getCreditScreenTextStyle(size: number): Get common text styling for credits menu, text size becomes a variable.
	- removeSubMenu(currentObject): If credits or how to play menu is up, removes it.