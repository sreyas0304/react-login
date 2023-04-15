import Login from "./Login";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientId = "973282407747-5e4l7ut9st7c6aqace5d1avdjcjp8o3s.apps.googleusercontent.com";

function App() {

  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start)
  });
  return (
    <main className="App">
      <Login />
    </main>
  );
}

export default App;
