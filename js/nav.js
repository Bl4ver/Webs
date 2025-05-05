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