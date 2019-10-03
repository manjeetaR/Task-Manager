import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='loginContainer'>
        <h4 className='loginTitle'>Welcome!</h4>
        <form className='loginForm' onSubmit={this.handleSubmit}>
          <input
            name='email'
            className='loginInputStyle'
            type='email'
            placeholder='email'
            onChange={this.handleChange}
            value={email}
          />
          <input
            name='password'
            className='loginInputStyle'
            type='password'
            placeholder='password'
            onChange={this.handleChange}
            value={password}
          />
          <input className='loginSubmitButton' type='submit' value='Sign In' />
        </form>
      </div>
    );
  }
}

export default Login;
