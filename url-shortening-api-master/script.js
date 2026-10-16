import { token } from "./secret";

const input = document.getElementById("input-Field");

const url = "https://api-ssl.bitly.com";
const endPoint = "/v4/bitlinks"

async function shortenLink(originalLink) {
    try{
        fetch(`${url} + ${endPoint}`,{
            method:'POST',
            headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
            },
            body:JSON.stringify({"long_url": originalLink})
        })

    }catch(error){
        console.error(`Error: ${error}`)
    }
}

console.log(shortenLink(input.value))