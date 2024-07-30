// const { type } = require("os");

async function buildTable() {
    let selectedNum = document.getElementById('numOfProductInputBox').value

    try {
        let data = await fetch('http://localhost:8080/api/products/').then(res => {
            // console.log(typeof res);
            return res.json();
        });

        document.getElementById('numOfProductInputBox').setAttribute('max', data.length);

        document.getElementById('products').innerHTML = "";
        for (let i = 0; i < selectedNum; i++) {
            let row = `<tr>
        <td style="color: rgb(233, 233, 233); padding: 2%">${data[i].id}</td>   
        <td style="color: rgba(198,245,248,255); padding-left: 20px;">${data[i].title}</td>
        <td style="color: rgb(233, 233, 233); padding-left: 10px;">${data[i].description}</td>
        <td style="color: rgb(233, 233, 233); padding: 60px">$${data[i].price}</td>
        <td style="color: rgb(233, 233, 233); padding-left: 70px">${data[i].rating.rate} <br> (${data[i].rating.count})</td>
        <td><img src="${data[i].image}" alt="" style="width:60px; height:60px; padding-left: 30px"></td>
        </tr>`

            document.getElementById('products').innerHTML += row;
        }

    } catch (error) {
        console.log(error);
        document.getElementsByClassName('container').innerHTML = "";
        document.getElementById('errorMessage').innerHTML = "Something Unexpected happened";
    }



}

buildTable();

document.getElementById('numOfProductBtn').addEventListener('click', buildTable);