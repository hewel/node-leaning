
// async function getData() {
//     return '这是数据';
// }

// (async () => {
//     let d = await getData();
//     console.log(d);
// })();

function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let uName = 'Mike';
            resolve(uName);
        }, 500);
    });
}
(async () => {
    let data = await getData();
    console.log(data);
})();
