# Object Permanence

![](https://dramaze.github.io/object_permanence/)

### Background and Overview

Object Permanence is an interactive game where the user attempts to survive for as long as they can while avoiding obstacles governed by a magnetic AI. The movement of the user is governed by the physical laws of mechanics. This is an iteration of the classic game, Phoenix, with Markov chain state evolutions.

Markov chains are the mathematical construct that govern the instantaneous states of an object based on its previous state and the objects around it.

### Rules

You have one rule: survive. With each passing moment, the enemies will move closer to your object. If there is a moment of collision: the game will end and restart.

If you are able to catch a snitch, the surrounding nearby will clear of all enemies as a quick flash of explosion renders.  Be mindful: their behavior is unpredictable.  While they will always lose momentum upon contact with a wall, they will occasionally disappear from the screen.  Be quick!

### Controls

* Use the arrow keys to maneuver your blue object.
* Avoid red and black objects as you seek yellow objects.

## Design

The design of the game is simple, yet elegant.  It utilizes a canvas of set width and height for gameplay.  The score is boldly set so as to encourage the user to strive for higher scores.

The instructions and controls of the game are available in a modal that renders upon clicking the "instructions" button.

![](https://github.com/DrAmaze/object_permanence/blob/master/assets/Screen%20Shot%202017-12-08%20at%2010.50.16%20AM.png)

### JavaScript

This game is entirely designed using vanilla JavaScript. The code is written to be easily readable.  The draw function in the object_permanence.js file handles the majority of the gameplay.

## Future Endeavors

* Allow user to manipulate physics engine of the program.
* Allow users to choose their own object to play with.
* Create highscores table
* Add shooting functionality
