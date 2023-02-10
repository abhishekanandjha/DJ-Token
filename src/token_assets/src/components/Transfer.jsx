import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Transfer() {
  const [recipientId,setId]=useState("");
  const [amount,setamount]=useState("");
  const [isdisabled,setdisabled]=useState(false);
  const [feedback,setFeedback]=useState("");
  const [isHidden,setHidden]=useState("true");
  
  async function handleClick() {
    setHidden(true);
    setdisabled(true);
    const recipient=Principal.fromText(recipientId);
    const amountToTransfer=Number(amount);
    //result capture the return from the 
    const result=await token.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setdisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e)=>setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>setamount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick}
          disabled={isdisabled}
           >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
