﻿/*
 * robotMaze.js
 *
 * The blue key is inside a labyrinth, and extracting
 * it will not be easy.
 *
 * It's a good thing that you're a AI expert, or
 * we would have to leave empty-handed.
 */

function startLevel(map) {
    // Hint: you can press R or 5 to "rest" and not move the
    // player, while the robot moves around.

    map.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    map.placePlayer(map.getWidth() - 1, map.getHeight() - 1);
    var player = map.getPlayer();

    map.defineObject('robot', {
        'type': 'dynamic',
        'symbol': 'R',
        'color': 'gray',
        'onCollision': function (player, me) {
            me.giveItemTo(player, 'blueKey');
        },
        'behavior': function (me) {
            function fillDeadEnds() {
                for (var i = 1; i < (map.getWidth() - 1) ; i++) {
                    for (var j = 1; j < 9; j++) {
                        if ((i != 2 && j != 1) || (i != 1 && j != 2)) {
                            var move = map.getAdjacentEmptyCells(i, j);
                            if (move.length == 1 && map.getObjectTypeAt(i, j) == 'empty') {
                                map.placeObject(i, j, 'block');
                                return false;
                            }
                        }
                    }
                }
                return true;
            }
            var wasHere = "up";
            if (fillDeadEnds() === true) {
                if (me.canMove("right") && !(wasHere == 'right')) {
                    wasHere = "left";
                    me.move("right")
                }
                else if (me.canMove("down") && !(wasHere == 'down')) {
                    wasHere = "up";
                    me.move("down")
                }
                else if (me.canMove("left") && !(wasHere == 'left')) {
                    wasHere = "right";
                    me.move("left")
                }
                else if (me.canMove("up") && !(wasHere == 'up')) {
                    wasHere = "down";
                    me.move("up")
                }
            }
        }
    });

    map.defineObject('barrier', {
        'symbol': '░',
        'color': 'purple',
        'impassable': true,
        'passableFor': ['robot']
    });

    map.placeObject(0, map.getHeight() - 1, 'exit');
    map.placeObject(1, 1, 'robot');
    map.placeObject(map.getWidth() - 2, 8, 'blueKey');
    map.placeObject(map.getWidth() - 2, 9, 'barrier');

    var autoGeneratedMaze = new ROT.Map.DividedMaze(map.getWidth(), 10);
    autoGeneratedMaze.create(function (x, y, mapValue) {
        // don't write maze over robot or barrier
        if ((x == 1 && y == 1) || (x == map.getWidth() - 2 && y >= 8)) {
            return 0;
        } else if (mapValue === 1) { //0 is empty space 1 is wall
            map.placeObject(x, y, 'block');
        } else {
            map.placeObject(x, y, 'empty');
        }
    });
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(1, 'robot');
    map.validateAtMostXObjects(1, 'blueKey');
}

function onExit(map) {
    if (!map.getPlayer().hasItem('blueKey')) {
        map.writeStatus("We need to get that key!");
        return false;
    } else {
        return true;
    }
}
