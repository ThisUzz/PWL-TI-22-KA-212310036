import React from 'react';

function SignIn() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Sign In</h2>
      <p>Enter using your IBIK Account</p>
      <form>
        <input type="text" placeholder="Username" style={{ marginBottom: '10px', width: '200px', height: '30px' }} /><br />
        <input type="password" placeholder="Password" style={{ marginBottom: '10px', width: '200px', height: '30px' }} /><br />
        <button type="submit" style={{ width: '210px', height: '35px' }}>Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
