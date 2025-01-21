
const journalDeBase = Object.freeze({
    entrees: [
        Object.freeze({
            date: "2021-09-01",
            text: "Aujourd'hui, j'ai appris à coder en JavaScript. C'était super intéressant !"
        })
    ],
    auteur: "Adam"
});

function ajouterEntree(journal, date, text) {
    return Object.freeze({
        ...journal,
        entrees: [
            ...journal.entrees,
            Object.freeze({ date, text })
        ]
    });
}

const j1 = ajouterEntree(journalDeBase, "2021-09-02", "Aujourd'hui, j'ai appris à coder en JavaScript. C'était super intéressant !");
const j2 = ajouterEntree(j1, "2021-09-03", "Aujourd'hui, j'ai appris à coder en JavaScript. C'était super intéressant !");