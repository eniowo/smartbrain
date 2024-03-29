import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';



const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
    }
}
const app = new Clarifai.App({
    apiKey: '70f2da2924e24f50b76371c20a9d324f'
});
const particlesOptions = {
  "particles": {
      "number": {
          "value": 200
      },
      "density":{
        enable:true,
        value_area: 800
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }
/*     componentDidMount() {
        fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(console.log)
    } */ 
    
    computeFaceLocation = (data) =>{
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        //console.log(width, height, clarifaiFace);
        return{
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = ()=> {
        //console.log('click');
        this.setState({imageUrl: this.state.input});
        app.models
        .predict(
           Clarifai.FACE_DETECT_MODEL, 
            this.state.input)
            .then(response => {
                if(response) {
                    fetch('https://stormy-brushlands-62490.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, {entries: count}))
                    })
                }
            this.displayFaceBox(this.computeFaceLocation(response))
            })
            //console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
            .catch(err => console.log("something is not right"));
            // there was an error
            
    }

    onRouteChange = (route) => {
        if(route === 'signout'){
            this.setState(initialState)
            route = 'signin';
        }
        else if(route === 'home'){
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }
  render() {
      const {isSignedIn, box, imageUrl, route} = this.state;
    return (
      <div className="App">
          <Particles className='particles'
                params={particlesOptions} />
          <Navigation isSignedIn={isSignedIn} 
          onRouteChange = {this.onRouteChange} 
          />
          {route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name}
                entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} 
            />
            <FaceRecognition box={box}
            imageUrl={imageUrl}/> 
          </div>
          : (
              route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
          
          }
          
      </div>
    );
  }
}

export default App;
