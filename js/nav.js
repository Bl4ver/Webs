function toggleMenu() {
    if (window.innerWidth <= 1024) {
        const menu = document.getElementById("nav-items");
        if (menu.className === "active") {
            menu.className = "";
        } else {
            menu.className = "active";
        }
    }
};

function changeNavIconOnWindowResize() {
    if (window.innerWidth <= 1024) {
        document.getElementById("menu").src = "../img/hamburger_icon.png";
    } else {
        document.getElementById("menu").src = "../img/becsi_logo.png";
    }
}

window.addEventListener("resize", changeNavIconOnWindowResize);
changeNavIconOnWindowResize();