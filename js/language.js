let langtxt = [];
let firstRun = true;

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
    let lang;
    if (firstRun){
        lang = localStorage.getItem("Lang");
        if (lang == null){
            lang = "hu";
        }
        document.getElementById("language-select").value = lang;
        firstRun = false;
    }
    else{
        lang = document.getElementById("language-select").value;
    }

    switch (lang){
        case "hu":
            index = 1;
            break;
        case "en":
            index = 2;
            break;
        case "fr":
            index = 3;
            break;
        case "de":
            index = 4;
            break;
        default:
            index = 1;
            break;
    }

    const dom_e_c = {};
    langtxt.forEach((e, i) => {
        switch (e[0]){
            case "nav-item":
                if (e[0] in dom_e_c){
                    document.getElementsByClassName(e[0])[dom_e_c[e[0]]].firstChild.innerText = e[index];
                    dom_e_c[e[0]]++;
                }
                else{
                    document.getElementsByClassName(e[0])[0].firstChild.innerText = e[index];
                    dom_e_c[e[0]] = 1;
                }
                break;
            default:
                const dom_element = document.getElementById(e[0]);
                if (dom_element != null){
                    document.getElementById(e[0]).innerText = e[index];
                }
                break;
        }
    });

    localStorage.setItem("Lang", lang)

    console.log("Language changed to " + lang);
}

document.getElementById("language-select").addEventListener("change", RenderLanguageText);