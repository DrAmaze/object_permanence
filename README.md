# Object Permance

### Background and Overview

Object Permanence is an interactive game where the user attempts to survive for as long as they can while avoiding obstacles.  This is an itiration of the classic game, Phoenix, with Markov chain state evolutions.

Markov chains are the mathematical construct that govern the instantaneous states of an object based on its previous state and the objects around it.

Users will have the opportunity to change the initial conditions of the user-controlled object and the surrounding obstacles; thus, the Markov matrix that governs the conditions of the game will vary.  The following conditions will be mutable:

* Speed of user
* Speed of obstacles
* Size of screen
* Type of object they control

### Functionality & MVP

In Object Permanence, users will be able to:
- [x] Move their object using the keyboard
- [ ] Modify the following conditions of the game: speed, size, and objects
- [ ] Have the ability to clear their immediate area of enemies upon colliding the user object with a randomly placed object.
- [ ] Objects adhere to laws of momentum
- [ ] Start, pause, and restart the game

In addition, this project will include:
- [ ] An about modal describing the basic functionality

### Wireframe

This app will consist of a single screen with the game canvas, user controls, user settings, user score, and nav links to the GitHub associated with this project, my LinkedIn page, and the About modal.

The game's canvas will include a modal for selecting the user's conditions. Users will be able to click and select their initial conditions.

Gameplay controls will include Start, Pause, Restart, and Reset buttons.

![](https://github.com/DrAmaze/object_permanence/blob/master/object_permanence_wireframe.png)

### Architecture and Technology

This project will be implemented using the following tech:

* Vanilla JavaScript for overall structure and game logic
* `HTML5 Canvas` for DOM manipulation and rendering
* Webpack to bundle and enact the scripts

In addition to the webpack entry file, there will be four scripts involved in this project.

`screen.js`: this will handle the logic for creating and updating the necessary DOM elements

`gameplay.js`: this will contain the gameplay physics logic for the user object and the enemy objects

### Implementation Timeline

**Over the weekend:**
- [x] Study how Markov chain and how to create the application

**Monday:**
- [x] Render the screen with webpack
- [x] Create file to house physics logic.
- [x] Have user-controlled object on blank screen (drawn with canvas)

**Tuesday:**
- [ ] Create enemy objects
- [ ] Define gameflow (i.e. how DOM changes over time)
- [ ] Create physics engine for enemy objects
- [ ] Begin to have user object interact with enemy objects

**Wednesday:**
- [ ] Create details of canvas
- [ ] Add additional gameplay functionality for gameplay special events
- [ ] Add scoring feature
- [ ] Add user-controlled gameplay mutable features
- [ ] User can change the user object

**Thursday:**
- [ ] Create information modal
- [ ] Apply necessary CSS to make the game FABULOUS

### Bonus Features

I hope to be able to add the following functionality in addition to what is described above:
- [ ] Gameplay sound
- [ ] Add high score feature
