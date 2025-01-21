# Zombie19

## Instructions

To use the project, you may look at the `src/main.mjs` file.
There, you should be able to declare your own graph of people to test on, or use the default structure.
Just so you know, the structure may look *fancy* with its `Person` constructor, but it's just a dumb JSON.
```json
{
    "name": "god",
    "age": 999,
    "status": {
        "infected": [],
        "immunised": [],
        "isAlive": true
    },
    "relations": [
        {
            "name": "Jean",
            "age": 25,
            "status": "...",
            "relations": [
                {
                    "name": "Mary",
                    "age": 25,
                    "status": "...",
                    "root": "ref to 'Jean'",
                },
            ],
            "root": "ref to 'god'",
        },
        {
            "name": "David",
            "age": 25,
            "status": "...",
            "relations": "...",
            "root": "ref to 'god'",
        }
    ]
}
```

Note that thre `root` properties are added by the `setRoots` function automatically, so you don't have to worry about it.

After setting the structure, you can go a few lines bellow and add the logic to test the code, for example:
```js
let test1 = spreadVirus32(spreadVirusA(dataTree.relations[1]).relations[1]);
console.log(test1);
let test2 = vaccinateA1(vaccinateB1(test1));
console.log(test2);
```

After modifying the code, you shall build the app (because I was too lazy to worry about dependencies and what not) by running `pnpm run build`. This, of course, requires the package manager `pnpm` which is installed by default with `node`, you can enable it with `corepack enable` so its enabled globally on your machine.

Finally, you can open the `index.html` file in your browser and look in the console, where it should have logged your tests.
