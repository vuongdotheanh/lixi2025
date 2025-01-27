let noClickCount = 0; // Đếm số lần nhấn nút "Không"

// Sự kiện khi nhấn nút "Có"
document.getElementById("coButton").addEventListener("click", function () {
    // Hiển thị thông báo "Đúng rồi đấy"
    const popup = document.getElementById("popupCorrect");
    if (!popup) {
        // Tạo popup nếu chưa có
        const popupElement = document.createElement('div');
        popupElement.id = "popupCorrect";
        popupElement.style.position = "fixed";
        popupElement.style.top = "50%";
        popupElement.style.left = "50%";
        popupElement.style.transform = "translate(-50%, -50%)";
        popupElement.style.padding = "20px";
        popupElement.style.backgroundColor = "#4CAF50";
        popupElement.style.color = "#fff";
        popupElement.style.fontSize = "20px";
        popupElement.innerHTML = "Đúng rồi đấy, đợi xíu gửi mã cho liền!";
        document.body.appendChild(popupElement);

        // Tự động chuyển hướng sau 3 giây
        setTimeout(function () {
            window.location.href = "qr_page.html"; // Chuyển đến trang thứ hai
        }, 2000);
    }
});

// Sự kiện khi nhấn nút "Không"
document.getElementById("khongButton").addEventListener("click", function () {
    noClickCount++; // Tăng số lần nhấn nút "Không"

    if (noClickCount > 3) {
        // Hiển thị thông báo nếu nhấn "Không" hơn 3 lần
        const popup = document.getElementById("popupWarning");
        popup.style.display = "block"; // Hiển thị popup

        // Ẩn thông báo sau 3 giây
        setTimeout(function () {
            popup.style.display = "none";
        }, 3000);
        return; // Không xử lý thêm
    }

    const khongButton = document.getElementById("khongButton");
    const coButton = document.getElementById("coButton");

    // Giảm kích thước nút "Không"
    const khongCurrentSize = parseFloat(window.getComputedStyle(khongButton).fontSize);
    const khongNewSize = Math.max(khongCurrentSize - 5, 10); // Tối thiểu 10px
    khongButton.style.fontSize = `${khongNewSize}px`;

    // Tăng kích thước nút "Có"
    const coCurrentSize = parseFloat(window.getComputedStyle(coButton).fontSize);
    const coNewSize = coCurrentSize + 5; // Tăng kích thước mỗi lần nhấn
    coButton.style.fontSize = `${coNewSize}px`;

    // Di chuyển nút "Không" đến vị trí ngẫu nhiên
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const newTop = Math.random() * (screenHeight - khongButton.offsetHeight);
    const newLeft = Math.random() * (screenWidth - khongButton.offsetWidth);

    khongButton.style.position = "absolute";
    khongButton.style.top = `${newTop}px`;
    khongButton.style.left = `${newLeft}px`;
});
// Đảm bảo nhạc phát ngay khi trang được mở
window.addEventListener('load', function () {
    var audio = document.getElementById('backgroundMusic');
    audio.play().catch(function (error) {
        console.log('Không thể phát nhạc tự động: ', error);
    });
});
