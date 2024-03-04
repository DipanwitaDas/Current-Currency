const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const dropdown = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
let msg = document.querySelector(".msg"); 

for(let select of dropdown){
    for(let currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newoption.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchange = async ()  => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    // console.log(amtValue);
    if(amtValue === "" || amtValue < 1)  {
        amtValue = 1;
        amount.value = "1";
    }
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // console.log(fromCurr.value + toCurr.value);
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(data);
    let final = amount.value * rate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${final} ${toCurr.value}`
}

const updateFlag = (element)=>{
    currcode = element.value;
   let countryCode = countryList[currcode];
   let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchange();
})

window.addEventListener("load", ()  => {
    updateExchange();
})