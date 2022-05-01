let fs = require('fs');
let iconv = require('iconv-lite');
const detectCharacterEncoding = require('detect-character-encoding'); //npm install detect-character-encoding

try {
    let path = './reports/';
    let new_path = './final_reports/';
    fs.readdir(path, (err, files) => {
        files.forEach(fileName => {

            let input = fs.readFileSync(path + fileName);
            let originalEncoding = detectCharacterEncoding(input);
            let output = iconv.decode(input, originalEncoding.encoding);
            fs.writeFileSync(new_path + fileName, output, 'UTF-8');


            // // read all csv and save to new
            // if (!file.startsWith('.')) {
            //     let data = fs.readFileSync(path + file);
            //     let newFile = file.replace('.csv', '.txt');
            //     fs.writeFile(new_path + newFile, data, '', () => {
            //         console.log(file, 'done');
            //     });
            // }
        });
    });
} catch(e) {
    console.log('Error:', e.stack);
}