function toggleMenu() {
    if (window.innerWidth <= 850) {
        const menu = document.getElementById("nav-items");
        if (menu.className === "active") {
            menu.className = "";
        } else {
            menu.className = "active";
        }
    }
};