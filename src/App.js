import React, { useContext, useEffect, useState} from 'react';
import AccountContext from './store/AccountContext';
import web3 from './config/web3';
import lottery from './contract/lottery';
const App = () => {
  const accountContext = useContext(AccountContext)
  const [manager, setManager] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [amountEther, setAmountEther] = useState();

  useEffect(() => {
    const getManager = async() => {
      setManager(await lottery.methods.manager().call());
    } 
    const getTotalPrice = async() => {
      setTotalPrice( web3.utils.fromWei(await lottery.methods.getBalance().call(), "ether") );
    }
    getManager();
    getTotalPrice();
  }, [])
  
  const enter = async() => {
    if(amountEther === 0){
      return;
    }
    await lottery.methods.enter().send({ from: accountContext.account, value: web3.utils.toWei(amountEther, "ether") });
  }

  const pickWinner = async() => {
    await lottery.methods.pickWinner().send({from: accountContext.account});
  }

  return (
    <div className="container">
      <h2>Lottery Blockchain App</h2>
      <h6>Your Account: {accountContext.account}</h6>
      <p>Address Contract: {lottery.options.address}</p>
      <p>The Manager is: {manager} </p>
      <p>Total Price: {totalPrice} ether</p>
      <div className="row mb-2">
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="amount">Amount of Lottery</label>
            <div className="input-group">
              <input type="number" className="form-control" onChange={(event) => { setAmountEther(event.target.value)}} />
              <div className="input-group-prepend">
                <div className="input-group-text">
                    ether
                </div>
              </div>          
            </div>        
          </div>
        </div>
      </div>      
      <button className="btn btn-primary" onClick={enter}>Enter Lottery</button>
      <button className="btn btn-warning " onClick={pickWinner} >Pick The Winner</button>
    </div>
  );
}

export default App;
