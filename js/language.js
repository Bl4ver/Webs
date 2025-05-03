let langtxt = [];

fetch("../data/lang.txt").then(response => {
    if (!response.ok){
        throw new Error("Error: file reading");
    }
    return response.text();
}).then(data => {

    data = data.split("\r\n");
    data.shift();

    data.forEach(element => {
        langtxt.push(element.split(";"));
    });
    

}).catch(error => {
    console.error("Error: ", error)
}).then(RenderLanguageText);


function RenderLanguageText(){
    let index;
    const lang = document.getElementById("lang-select").value;

    switch (lang){
        case "hu":
            index = 1;
            break;
        case "en":
            index = 2;
            break;
        default:
            index = 1;
            break;
    }

    langtxt.forEach(element => {
        document.getElementById(element[0]).innerText = element[index];
    });
}

document.getElementById("lang-select").addEventListener("change", RenderLanguageText);