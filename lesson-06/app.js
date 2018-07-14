const fs = require('fs');

fs.readdir('example', (err, files) => {
    if (err) {
        console.log(err);
    }
    // console.log(files);
    for (let i = 0; i < files.length; i++) {
        const element = files[i];
        // console.log(element);
        fs.stat('example/' + element, (error, stats) => {
            if (error) {
                // console.log(error);
            }
            if (stats.isDirectory()) {
                // console.log('目录：' + element);
            }
        });
    }
});
(function add(i) {
    if (i === 100) {
        return false;
    }
    setTimeout(() => {
        add(i +1);
        console.log(i);
    }, 200);
})(0);
for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        // console.log(i);
    }, 2000);    
}

