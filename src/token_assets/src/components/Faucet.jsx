import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Faucet() {
  const[isdisabled,setdisabled]=useState(false);
  const [buttontext, setbuttontext] = useState("Claim Now");

  async function handleClick(event) {
    setdisabled(true);
    //triger the function payOut of backend form frontend
    const result=await token.payOut();
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
      <label>Get your free DJ tokens here! Claim 10,000 DJ Tokens to your account.</label>
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
