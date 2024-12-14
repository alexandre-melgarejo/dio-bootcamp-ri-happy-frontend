const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Função para classificar o herói
function classificarHeroi() {
    rl.question('Digite o nome do herói (deixe vazio para sair): ', (nome) => {
        if (!nome) {
            console.log('-'.repeat(50));
            console.log('Programa encerrado...');
            rl.close();
            return;
        }

        rl.question('Digite a quantidade de experiência (XP): ', (xp) => {
            xp = parseInt(xp, 10);

            let nivel;
            if (xp < 1000) {
                nivel = 'Ferro';
            } else if (xp <= 2000) {
                nivel = 'Bronze';
            } else if (xp <= 5000) {
                nivel = 'Prata';
            } else if (xp <= 7000) {
                nivel = 'Ouro';
            } else if (xp <= 8000) {
                nivel = 'Platina';
            } else if (xp <= 9000) {
                nivel = 'Ascendente';
            } else if (xp <= 10000) {
                nivel = 'Imortal';
            } else {
                nivel = 'Radiante';
            }

            console.log('-'.repeat(50));
            console.log(`O Herói de nome ${nome} está no nível de ${nivel}`);
            console.log('-'.repeat(50));
            classificarHeroi();
        });
    });
}

// Inicia o programa
classificarHeroi();
