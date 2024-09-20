
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
   
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
  
    const validUser = users.find(user => user.username === username && user.password === password);
  
    if (validUser) {
        alert('Login bem-sucedido')
        window.location.href = '../Pages/home.html';
       
    } else {
        alert('Nome de usuário ou senha incorretos.');
    }
  });
  
