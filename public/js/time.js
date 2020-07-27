let time = new Date();
let displayTime = () => {
    date = `${time.getDay()}, ${time.getUTCMonth()} ${time.getUTCDay()}`;
    console.log(date);
    console.log("date");
    document.getElementById('date').innerText = date; 
}


// displayTime();
