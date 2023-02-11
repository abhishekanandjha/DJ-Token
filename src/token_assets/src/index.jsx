import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";

//Authclient use to login the user as internet computer without id and password
import { AuthClient } from '@dfinity/auth-client';

const init = async () => {

  const authClient= await AuthClient.create();
  //check if device have a chashed login info about user 
  if(await authClient.isAuthenticated()){
    handleAuthentication(authClient);
  }else{
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthentication(authClient);
      }
    });
  }
}

async function handleAuthentication(authClient){
  //it will through an error while checking balance and transfering amount bec it is not hosted on icp blockchain
  const identity=await authClient.getIdentity();
  const userPricipal=identity._principal.toString();
  console.log(userPricipal);
  ReactDOM.render(<App loggedInPrincipal={userPricipal}/>, document.getElementById("root"));
};

init();


