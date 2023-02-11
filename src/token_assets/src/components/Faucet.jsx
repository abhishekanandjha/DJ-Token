import React, { useState } from "react";
//canisterid and createActor come form declerations index.js
import {canisterId,createActor } from "../../../declarations/token";
//for authentication to other client for transfer of token
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const[isdisabled,setdisabled]=useState(false);
  const [buttontext, setbuttontext] = useState("Claim Now");

  async function handleClick(event) {
    setdisabled(true);
    //triger the function payOut of backend form frontend

    const authClient=await AuthClient.create();
    const identity= await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity,
      },
    });


    const result=await authenticatedCanister.payOut();
    //set the button if user has clamed or not
    setbuttontext(result);
    //setdisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DJ tokens here! Claim 10,000 DJ Tokens to your account ➡ {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isdisabled}
        >
          {buttontext}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
