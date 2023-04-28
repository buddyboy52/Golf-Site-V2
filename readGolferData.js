fetch('test-data.json')
.then(function(response){

    return response.json();

})

.then(function(golfers){

    let placeHolder = document.querySelector("#data-output");

    let out = "";

    

    for(let golfer of golfers){

        let handicap = (golfer.score - golfer.par);

        let handicapNine = handicap / 2;

        let teamMembers = golfer.Members + ", " + golfer.member2;

        let weeks = [golfer.Week1, golfer.Week2, golfer.Week3, golfer.Week4, golfer.Week6, golfer.Week7, golfer.Week8, golfer.Week9, golfer.Week10, golfer.Week11, golfer.Week12, golfer.Week13, golfer.Week14]

        let total = 0;

        for(d in weeks){

            if(weeks[d] === "bye" || weeks[d] === "Won Playoff" || weeks[d] === ""){

                total = total;

            }
            else{

                total += parseFloat(weeks[d]);

            }

        }

        out += `
           <tr>
              <td>${golfer.Place}</td>
              <td>${teamMembers}</td>
              <td>${golfer.Week1}</td>
              <td>${golfer.Week2}</td>
              <td>${golfer.Week3}</td>
              <td>${golfer.Week4}</td>
              <td>${'Bye'}</td>
              <td>${golfer.Week6}</td>
              <td>${golfer.Week7}</td>
              <td>${golfer.Week8}</td>
              <td>${golfer.Week9}</td>
              <td>${golfer.Week10}</td>
              <td>${golfer.Week11}</td>
              <td>${golfer.Week12}</td>
              <td>${golfer.Week13}</td>
              <td>${golfer.Week14}</td>
              <td>${total}</td>
                                  
           </tr>
        `;
     }

    placeHolder.innerHTML = out;

})