import React from 'react';
import './Signin.css';

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://stormy-brushlands-62490.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
            else{
                alert('Invalid Login Details');
            }
        })
    }

    render() {
        const {onRouteChange} = this.props;
        return(
        <div>
            <article className="br3 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw5 center mw6 shadow-5">
                <div>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 w-100 measure" 
                        type="email" name="email-address"  
                        id="email-address" 
                        onChange={this.onEmailChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  
                            id="password"
                            onChange={this.onPasswordChange} />
                        </div>
                        </fieldset>
                        <div className="mt3">
                        <input onClick={this.onSubmitSignIn} className="b ph3 f1 pv2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100grow pointer f6" 
                        type="submit" value="Sign In"/>
                        <div className='1h-copy mt3'>
                        <p className="f6 link dim black db pointer" onClick={() => onRouteChange('register')}>Register</p>
                        </div>
                    </div>
                </div>
            </article>

        </div>
    );
    }
}
export default Signin;