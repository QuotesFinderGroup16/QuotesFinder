const baseUrl = 'http://localhost:3000/'

$(document).ready(() => {
  auth()
  $('#registerBtn').click(() => {
    $('#registerContainer').show()
    $('#loginContainer').hide()
  })
  $('#loginBtn').click(() => {
    $('#registerContainer').hide()
    $('#loginContainer').show()
  })
  $('#registerForm').submit((e) => {
    e.preventDefault()
    register()
  })
  $('#loginForm').submit((e) => {
    e.preventDefault()
    login()
  })
})

const auth = () => {
  if (!localStorage.getItem('access_token')) {
    $('#logoutBtn').hide()
    $('#loginBtn').show()
    $('#registerBtn').show()
    $('#registerContainer').hide()
    $('#loginContainer').show()
    $('#quotesTable').hide()
    $('#quotesTableUser').hide()
    $('#yourQuotes').hide()
  } else {
    $('#logoutBtn').show()
    $('#loginBtn').hide()
    $('#registerBtn').hide()
    $('#registerContainer').hide()
    $('#loginContainer').hide()
    $('#quotesTable').show()
    $('#quotesTableUser').hide()
    $('#yourQuotes').show()

  }
}

const register = () => {
  const email = $('#emailRegister').val()
  const password = $('#passwordRegister').val()
  console.log(email, password, '>>>');
  $.ajax({
    url: baseUrl + 'register',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(res => {
    auth()
  })
  .fail((xhr,txt) => {
    console.log(xhr, txt);
  })
  .always(_ => {
    $('#registerForm').trigger('reset')
  })
}

const login = () => {
  const email = $('#emailLogin').val()
  const password = $('#passwordLogin').val()

  $.ajax({
    url: baseUrl + 'login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(res => {
    localStorage.setItem('access_token', res.access_token)
    auth()
  })
  .fail((xhr,txt) => {
    console.log(xhr, txt);
  })
  .always(_ => {
    $('#loginForm').trigger('reset')
  })
}