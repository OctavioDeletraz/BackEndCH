
function getRandom(cant) {
    const numeros = [];
    for (let i = 0; i < cant; i++) {
        numeros.push(Math.floor(Math.random() * 1000) + 1);
    }
    const contador = numeros.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});

    return contador;
}

module.exports = {getRandom}