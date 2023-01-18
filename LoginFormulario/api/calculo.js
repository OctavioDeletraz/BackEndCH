const calculo = (cant) => {
    let randoms_list = {};
    for (let i = 0; i < cant; i++) {
        let randomNum = Math.floor(Math.random() * 1000) + 1;
        if (randoms_list[randomNum]) {
            randoms_list[randomNum]++;
        } else {
            randoms_list[randomNum] = 1;
        }
    }
    return randoms_list;
}
process.on('message', (cant) => {
    const suma = calculo(cant);
    process.send(suma);
})