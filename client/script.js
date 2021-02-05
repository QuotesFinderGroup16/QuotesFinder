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
  // Google Login
  $(".g-signin2").on("click", (event) => {
    event.preventDefault()
    onSignIn(googleUser)
  })
  // Logout
  $('#logoutBtn').click((e) => {
    e.preventDefault()
    logout()
  })

  $('#yourQuotes').click((e) => {
    e.preventDefault()
    $('#quotesTable').hide()
    $('#quotesTableUser').show()
    userQuotesList()
  })
  $('#quotesFinder').click((e) => {
    e.preventDefault()
    if (localStorage.getItem('access_token')) {
      $('#quotesTable').show()
      $('#quotesTableUser').hide()
    }
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
    getQuotes()
    $('#quotesTableUser').hide()
    $('#yourQuotes').show()
    
  }
}
// Google Login
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: baseUrl + "googleLogin",
    method: "POST",
    data: {
      googleToken:id_token
    }
  })
    .done((response) => {
      console.log(response)
      localStorage.setItem("access_token", response.access_token)
      auth()
    })
    .fail(err => {
      console.log(err)
    })
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
// Logout
const logout = () => {
  localStorage.clear()
  auth()
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
  });
}

const getQuotes = () => {
  $.ajax({
    url: baseUrl + "quotesList",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(dataQuotes => {
      $("#quotesTableBody").empty()
      dataQuotes.forEach((value,i) => {
        $("#quotesTableBody").append(`
          <tr>
            <td id="author-${i}">${value.author}</td>
            <td id="quote-${i}">${value.quote}</td>
            <td>
              <a class="btn btn-success" id="addQuotes" onclick="addQuotes(${i})">Add</a>
            </td>
          </tr>
        `)
      })
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
}
// Add Quotes Per User
const addQuotes = (id) => {
  const author = $(`#author-${id}`).text()
  const quote = $(`#quote-${id}`).text()
  $.ajax({
    url: baseUrl + `addQuote`,
    method: 'POST',
    data: {
      author,
      quote
    },
    headers: {
      access_token : localStorage.getItem('access_token')
    }
  })
  .done(res => {
    auth()
  })
  .fail((xhr,txt) => {
    console.log(xhr, txt);
  })
}

const userQuotesList = () => {
  $.ajax({
    url: baseUrl + "userQuotesList",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(dataQuotes => {
    
      $("#quotesTableUserBody").empty()
      dataQuotes.quotes.forEach((value,i) => {
        $("#quotesTableUserBody").append(`
          <tr>
            <td id="author-${value.id}">${value.author}</td>
            <td id="quote-${value.id}">${value.quote}</td>
            <td>
              <a class="btn btn-danger" onclick="deleteQuote(${value.id})">Delete</a>
            </td>
          </tr>
        `)
      })
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
}

const deleteQuote = (id) => {
  $.ajax({
    url: baseUrl + `deleteQuote/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(res => {
    userQuotesList()
  })
  .fail((xhr, status) => {
    console.log(xhr, status)
  })
}