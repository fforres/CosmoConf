import css from '../css/main.css';
import Auth0Lock from 'auth0-lock';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

var lock = new Auth0Lock('tqhw2IpXKyjWpj6YtCze0jxGukTlaM3w', 'fforres.auth0.com');

lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getProfile() and save it to localStorage
  console.log('authResult', authResult);
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    console.log('profile', profile);
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});

document.addEventListener("DOMContentLoaded", function(event) {
  const login = document.getElementById('btn-login');
  if (login) {
    login.addEventListener('click', function() {
      lock.show();
    });
  }
});
