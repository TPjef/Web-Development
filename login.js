document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // ป้องกันการส่งฟอร์มแบบเดิม

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // ในระบบจริง คุณจะต้องส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อตรวจสอบการเข้าสู่ระบบ
        // ตัวอย่างการจำลองการสำเร็จ:
        if (username === 'testuser' && password === 'password123') {
            loginMessage.textContent = 'เข้าสู่ระบบสำเร็จ!';
            loginMessage.className = 'message success';
            setTimeout(() => {
                window.location.href = 'index.html'; // พาไปยังหน้าหลัก
            }, 2000);
        } else {
            loginMessage.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
            loginMessage.className = 'message error';
        }
    });
});