(() => {
    let i = 0;
    const clock = setInterval(() => {
        i++;
        console.log(i);
    }, 1000);
    setInterval(() => {
        if (i == 10) {
            clearInterval(clock);
        }
    }, 100);
})();
