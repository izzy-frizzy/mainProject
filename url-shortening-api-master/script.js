import {token} from "./secret.js"

const form = document.getElementById("form")
const input = document.getElementById("input-Field");
const result = document.getElementById("results");

let linksList = [];

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const long_url = input.value;
    shortenLink(long_url)
})

async function shortenLink(originalLink) {

    const Base_Url = "https://api-ssl.bitly.com";
    const endPoint = "v4/shorten";

const url = `${Base_Url}/${endPoint}`;
    try{
        const response = await fetch(url,{
            method: "POST",
            headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "long_url": originalLink
            })
        });
        const data = await response.json();
        console.log(data);
        return data;

    }catch(error){
        return error
    }
}

async function showLink() {
    const link = await shortenLink();
    console.log(link)
}
showLink();