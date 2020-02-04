import React from 'react';

const LoginPage = ({ signupButton }) => (
  <div>
    <form action="/dbRouter/login" method="POST">
                username:
      {' '}
      <input type="text" name="username" required />
      <br />
                password:
      {' '}
      <input type="password" name="password" required />
      <br />
      <input id="signup" type="submit" value="Login" />
    </form>
    <button type="button" onClick={signupButton}>Sign-Up Here!</button>
  </div>
);

export default LoginPage;
