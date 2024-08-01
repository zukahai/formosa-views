let CONFIG = {
    "path_api": "https://salary-api-af8k.onrender.com/api/link",
}

let password = "pat";

function promptForData() {
    pass = localStorage.getItem("password-fhs");
    time = localStorage.getItem("time-fhs");
    // 1 phút
    if (pass === password &&  Date.now() - time < 60000) {
        localStorage.setItem("time-fhs", Date.now());
        return;
    }
     
    let input = prompt("Vui lòng nhập dữ liệu:");
    if (input !== password) {
        alert("Dữ liệu không hợp lệ");
        window.location.reload();
    } else {
        localStorage.setItem("password-fhs", input);
        localStorage.setItem("time-fhs", Date.now());
    }
}

window.onload = function() {
    promptForData();
};