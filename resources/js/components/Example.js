import React, { useState ,useEffect} from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  browserHistory     
} from "react-router-dom";
import Home from './Home';
import Map from './Map';
import Search from './Search';
import 'regenerator-runtime/runtime';

import SpeechRecognition, {
    useSpeechRecognition,
  } from "react-speech-recognition";
function Example() {
    
    const [redirectOldUrl, setRedirectOldUrl] = useState("");
    const [searchBtn, setsearchBtn] = useState(false);

    useEffect(() => {
        setRedirectOldUrl(window.location.pathname);
    }, []);
     
    const commands = [
        {
          command: ["Please search *","Search *","Go to * page", "Go to *", "Open * page", "Open *"],
          callback: (redirectPage) => {
            pageCall(redirectPage)
            
          },
        },
    ];
    
    const pageCall=(redirectPage)=>{
         const siteurl="http://127.0.0.1:8000/search/"+redirectPage;
        window.location.href = siteurl;
    }
    const { transcript } = useSpeechRecognition({ commands });

  
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.log('Not support');
    }
  

    const startListening = () =>{ 
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            alert('Not support');
        }
        else{
            setsearchBtn(true)
            SpeechRecognition.startListening({ continuous: false });
        }
    }

    const searchNow=()=>{
        SpeechRecognition.startListening
    }
    return (
        <Router>
        <br/><br/>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header"><b>Laravel React Product Search Using Voice / Speaking</b></div>

                        <div className="card-body">
                              

        <br/>
        <center>
        <Link to="/">Home</Link>&nbsp;&nbsp;<Link to="/category">Category</Link>&nbsp;&nbsp;<Link to="/search/all">Search all</Link>
        <br/>
        <p id="transcript">Transcripts:{transcript} 
        </p><button onClick={startListening} className='btn btn-primary'>
          {searchBtn== false? ("Speak to search product"):("Please wait,searching product ... ...")} 
        </button>
        <p >Example: <b>Please search oil</b></p>
        </center>
        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <Routes>
          <Route element={<Map/>} path="/category" />
          <Route element={<Home/>} path="/" />
          <Route element={<Search/>} path="/search/:id" />
        </Routes>
        </Router>        
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
