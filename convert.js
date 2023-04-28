// Reading the file using default
// fs npm package
const fs = require("fs");
csv = fs.readFileSync("team_scores.csv")
 
// Convert the data to String and
// split it in an array
const array = csv.toString().split("\n");

let result = [];

let headers = array[3].split(",");

// Use a for loop to run through the headers array and
// remove any spots that might be blank.
// Since the csv file has a blank spot in between Members and Week 1,
// the headers will make a spot for the blank and we need to remove it
for(let x = 0; x < headers.length; x++){

    if(headers[x] === ''){

        headers.splice(x, x-1, "member2");

    }

    for(let y = 0; y < headers[x].length; y++){

        let temp = headers[x].split("");

        if(temp[y] === ' '){

            temp.splice(y, 1);

            headers[x] = temp.join("");

        }

        if(temp[y] === "\r"){

            temp.splice(y - 1, y);

            headers[x] = temp.join("");

        }

    }
}

//console.log(headers);

for(let i = 5; i < array.length - 1; i++){

    let obj = {};

    let str = array[i];

    let s = '';

    let flag = 0;

    for(let ch of str){

        if(ch === '"' && flag ===0){

            flag = 1;

        }else if(ch === '"' && flag === 1){

            flag = 0;

        }

        if(ch === ', ' && flag === 0){

            ch = '|';

        }

        if(ch !== '"'){

            s += ch;

        }

    }

    let properties = s.split(",");

    //console.log(properties);

    //console.log(properties)

    for(let j in properties){


        if(properties[j].includes(",")){

            obj[headers[j]] = properties[j].split(", ").map(item => item.trim());
            console.log("Trimmed");

        }else{

            obj[headers[j]] = properties[j];


        }

        let temp = properties[j].split("");

        //console.log(temp);

        for(let c in temp){

            if(temp[c] === "\r"){

                temp.splice(c - 1, c);

                properties[j] = temp;

            }

        }

    }

    result.push(obj)

}

// Convert the resultant array to json and
// generate the JSON output file.
let json = JSON.stringify(result);
fs.writeFileSync('test-data.json', json);

