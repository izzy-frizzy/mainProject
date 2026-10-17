import {token} from "./secret.js"

const form = document.getElementById("form")
const input = document.getElementById("input-Field");
const result = document.getElementById("results");
const errorMsg = document.getElementById("error-msg");


let linksList = [];

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const long_url = input.value.trim();
    if (!long_url){
        input.classList.add("error");
        errorMsg.textContent = "Please add a link";
        return;}
        input.classList.remove("error");
        errorMsg.textContent = "";

    try {
        const data = await shortenLink(long_url);   // wait for Bitly

        linksList.push({                            // save it
            original: long_url,
            short: data.link
        });

        showLink();                                 // then render
        input.value = "";
    } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
    }
})

async function shortenLink(originalLink) {
    const Base_Url = "https://api-ssl.bitly.com";
    const endPoint = "v4/shorten";
    const url = `${Base_Url}/${endPoint}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "long_url": originalLink
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.description || data.message || "Request failed");
    }

    return data;
}

function showLink() {
    result.innerHTML = "";

    for (let i = 0; i < linksList.length; i++) {
        let linkItem = document.createElement("li");
        linkItem.dataset.index = i;
        linkItem.innerText = `${linksList[i].original} ${linksList[i].short} `;

        let copy = document.createElement("button");
        copy.type = "button";
        copy.className = "copy-btn";
        copy.innerText = "copy";

        copy.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(linksList[i].short);
                
                copy.classList.add("copied");
                copy.innerText = "copied!";
            } catch (error) {
                console.error("Copy failed:", error);
                copy.innerText = "failed";
            }
            setTimeout(() => (copy.innerText = "copy"), 1500); 
           setTimeout(()=>(copy.classList.remove("copied")),1500); //this is to remove the class for the copy button

        });

        linkItem.appendChild(copy);   // button into the li
        result.appendChild(linkItem); // li into the page
    }
}
