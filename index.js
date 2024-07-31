// const { type } = require("os");

// async function buildPaginationLinks() {
//     let dataSize = await fetch('http://localhost:8080/api/products/length').then(res => res.json());
//     console.log(dataSize);
//     // console.log(dataSize)
// }

// buildPaginationLinks();

async function buildTable() {
    let selectedNum = document.getElementById('numOfProductInputBox').value;
    try {
        let baseURL = 'http://localhost:8080/api/products/';
        let params = {
            page: document.getElementsByClassName("active")[0].getAttribute("data_page"),
            records: selectedNum
        }

        let url = new URL(baseURL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        let data = await fetch(url.toString()).then(res => {
            // console.log(typeof res);
            // console.log(res.json());
            return res.json();
        });

        // document.getElementById('numOfProductInputBox').setAttribute('max', data.length);

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

document.addEventListener('DOMContentLoaded', () => {
    const paginationLinks = document.querySelectorAll('.page-number');
    const prevLink = document.getElementById('prev');
    const nextLink = document.getElementById('next');

    let currentPage = 1;  // Assume page 1 is active initially



    // Function to update the active class
    function updateActivePage(newPage) {
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.getAttribute('data_page')) === newPage) {
                link.classList.add('active');
            }
        });
        currentPage = newPage;
        buildTable();
    }

    // Add event listeners to page links
    paginationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = parseInt(link.getAttribute('data_page'));
            if (page !== currentPage) {
                updateActivePage(page);
            }
        });
    });

    // Add event listeners for Previous and Next links
    prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            updateActivePage(currentPage - 1);
        }
    });

    nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < paginationLinks.length) {
            updateActivePage(currentPage + 1);
        }
    });
});

buildTable();

document.getElementById('numOfProductBtn').addEventListener('click', buildTable);