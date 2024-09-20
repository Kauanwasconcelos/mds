document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newUser = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;

  // Carregar usuários existentes do localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Verificar se o usuário já existe
  const userExists = users.some(user => user.username === newUser);

  if (!userExists) {
      // Registrar novo usuário
      users.push({ username: newUser, password: newPassword });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Usuário registrado com sucesso!');
      location.href = 'login.html'; // Redirecionar para a página de login
  } else {
      // Mensagem de erro mais detalhada
      alert(`O usuário "${newUser}" já está registrado. Tente outro nome de usuário.`);
  }
});
