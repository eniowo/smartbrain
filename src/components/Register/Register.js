import React from 'react';

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: ''

        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitRegister = () => {
        fetch('https://stormy-brushlands-62490.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
                //this.props.onRouteChange('home');
            }
        })
    }


    render(){
        //const {onRouteChange} = this.props;
    return(
        <div>
            <article className="br3 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw5 center mw6 shadow-5">
                <div>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Register</legend>
                        <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 w-100 measure" 
                        type="text" name="name" 
                         id="name"
                         onChange={this.onNameChange}/>
                        </div>
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
                            onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="mt3">
                        <input onClick={this.onSubmitRegister} className="b ph3 f1 pv2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100grow pointer f6 pointer" 
                        type="submit" value="Register"/>
                    </div>
                </div>
            </article>

        </div>
    );
    }
}
export default Register;