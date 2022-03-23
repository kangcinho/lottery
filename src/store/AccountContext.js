import React, {useState, useEffect} from "react"
import web3 from '../config/web3'
const AccountContext = React.createContext({
  account: ''
})

export const AccountProvider = (props) => {
  const [account, setAccount] = useState();
  useEffect(() => {
      const load = async() => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }

      load();
  }, [])

  return (
    <AccountContext.Provider value={{account: account}}>
      {props.children}
    </AccountContext.Provider>
  )
}

export default AccountContext;