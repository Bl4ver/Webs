if (sessionStorage.getItem("HeaderDeploy") == null){
    const header = document.getElementById("header-logo").style.animationPlayState = "running";
    sessionStorage.setItem("HeaderDeploy","1");
}