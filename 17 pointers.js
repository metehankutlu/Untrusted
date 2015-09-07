﻿/***************
 * pointers.js *
 ***************
 *
 * You! How are you still alive?
 *
 * Well, no matter. Good luck getting through this
 * maze of rooms - you'll never see me or the Algorithm again!
 */

function startLevel(map) {
    function shuffle(o) { //v1.0 [http://bit.ly/1l6LGQT]
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    map.createFromGrid(
        ['+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+* @ o++*   o++*   o++*   o++*   o++*   o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '++++o   *++o   *++o   *++o   *++o   *++o   *+',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+*   o++*   o++*   o++*   o++*   o++*   o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '++++o   *++o   *++o   *++o   *++o   *++o   *+',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+*   o++*   o++*   o++*   o++*   o++* E o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++'],
        {
            '@': 'player',
            'E': 'exit',
            '+': 'block',
            'o': 'teleporter',
            '*': 'trap',
        }, 2, 2);

    var canvas = map.getCanvasContext();

    var teleportersAndTraps = map.getDynamicObjects();
    teleportersAndTraps = shuffle(teleportersAndTraps);

    for (i = 0; i < teleportersAndTraps.length; i += 2) {
        var t1 = teleportersAndTraps[i];
        var t2 = teleportersAndTraps[i + 1];

        // Point each teleporter to either another teleporter
        // or a trap
        if (t1.getType() == 'teleporter') {
            t1.setTarget(t2);
        }
        if (t2.getType() == 'teleporter') {
            t2.setTarget(t1);
        }

        // TODO find a way to remove the API docs
        // wouldn't want the 'good doctor' to find
        // out about map.getCanvasCoords()...
        var giris, cikis;
        if (t1.getType() == 'teleporter' && map.getCanvasCoords(t1).x == 5
        && map.getCanvasCoords(t1).y == 4) {
            giris = t1;
            for (var j = 0; j < teleportersAndTraps.length; j++) {
                var t3 = teleportersAndTraps[j];
                if (t3.getType() == 'teleporter' &&
    				map.getCanvasCoords(t3).x == map.getWidth() - 8
    				&& map.getCanvasCoors(t3).y == map.getHeight() - 6) {
                    cikis = t3;
                }
            }
            giris.setTarget(cikis);
        }
        if (t2.getType() == 'teleporter' && map.getCanvasCoords(t2).x == 5
          && map.getCanvasCoords(t2).y == 4) {
            giris = t1;
            for (var j = 0; j < teleportersAndTraps.length; j++) {
                var t3 = teleportersAndTraps[j];
                if (t3.getType() == 'teleporter' &&
    				map.getCanvasCoords(t3).x == map.getWidth() - 8
    				&& map.getCanvasCoors(t3).y == map.getHeight() - 6) {
                    cikis = t3;
                }
            }
            giris.setTarget(cikis);
        }





    }
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}
