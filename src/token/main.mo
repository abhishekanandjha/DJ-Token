import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";



actor Token{


  //Principal identify users and canisters by providing id
  // to get unique id= in cmd type dfx identity get-principal
  //.fromText define string
  let owner:Principal=Principal.fromText("mzwek-w3s7q-6vt3a-rg7li-mxrtk-sygb4-a2y2t-macuk-luqrc-bfmrz-xae");
  let totalSupply:Nat=1000000000;  //1billion
  let symbol:Text="DJ";  //"D"ecentralize Abhishek Anand "J"ha Coin

  //To create a ledger, data store that store id of a particular user or canister
  //or amount of DJ token that they possess
  //use hashmap in motoko/or hashtable similar to dictionary
  //HashMap<key-datatype,value-datatype>(initialize hashmap -3inputs--size,equality of our keys,how to hash those keys)

  //since hashmap is nonstable variable so we create temp stable variable and transfer data of hash into stabe variable as an array of tuples
  //array is serialize data type and its expensive in terms of time and internet computer//take O(n)complexity and hash map is O(1);

  //only be able to modify the hash within the token no other file or class will be able to modify it
  //only be modify by pre and post upgrade
  private stable var balanceEntries : [(Principal,Nat)]=[];//as empty array
  private var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);

  //if for the first time deploy ..take care of initial phase
  if(balances.size() < 1){
      balances.put(owner,totalSupply);
  };

//two comments to be ignored
  // add our owner as a first entry 
  // added owner principal into ledger of balances hashmap and gave all the tokens 1B;
  


  //query to who owns how much
  //check balance method//asunc :return as natural no
  public query func balanceOf(who:Principal) : async Nat {
    let balance:Nat=switch(balances.get(who)){
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  //return the DJ symbol of our token
  public query func getSymbol():async Text{
    return symbol;
  };



  //shared(msg)=> use to extract id of the customer
  public shared(msg) func payOut():async Text{
    if(balances.get(msg.caller)==null){
      // Debug.print(debug_show(msg.caller));
      let amount=10000; //10k Tokens to be given
      //balances.put(msg.caller,amount); //using hash
      let result=await transfer(msg.caller,amount);
      return result;
    }else{
      return "Already Claimed";
    }
  };

  public shared(msg) func transfer(to:Principal,amount:Nat):async Text{ 

    //msg.caller is entire canister ie,entire token is calling //async text return text
    // let result=await payOut();
    //await fix the insincronously fn
    let fromBalance=await balanceOf(msg.caller);
    if(fromBalance > amount){
      //bellow 2 line does the substraction from the account
      let newFromBalance : Nat =fromBalance-amount;
      balances.put(msg.caller,newFromBalance);

      //add the amount to the account thats being trancfer to
      let toBalance=await balanceOf(to);
      let newToBalance=toBalance+amount;
      //put in our hashmap our new updated balance
      balances.put(to,newToBalance);
      return "success";
    }else{
      return "Insufficient Funds";
    }

  };

  //system method for transfer the data from hash to array and back to hash
  system func preupgrade(){
    //to convert hash into array iterater is used
    balanceEntries:=Iter.toArray(balances.entries());
  };
  system func postupgrade(){
    balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);

    //if size is 0  
    if(balances.size() < 1){
      balances.put(owner,totalSupply);
    }
  };



};