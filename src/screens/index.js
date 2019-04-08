import { Navigation } from 'react-native-navigation';

import WelcomeScreen from './auth/WelcomeScreen';
import LoginScreen from './auth/LoginScreen';
import SignUpScreen from './auth/SignUpScreen';
import SideBar from './SideBar/SideBar';
import ManageCustomer from './ManageCustomer/ManageCustomer';
import Dashboard from './Dashboard';
import Contests from './Contests';
import FundWallet from './Wallet/FundWallet';
import Withdraw from './Withdraw';
import TransferFunds from './TransferFunds/TransferFunds';
import Wallet from './Wallet';
import Transaction from './Transaction';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponentWithRedux(
    'multivision.WelcomeScreen',
    () => WelcomeScreen,
    Provider,
    store
  );


  Navigation.registerComponentWithRedux(
    'multivision.ContestsScreen',
    () => Contests,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'multivision.TransactionScreen',
    () => Transaction,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'multivision.WalletScreen',
    () => Wallet,
    Provider,
    store
  );


  Navigation.registerComponentWithRedux(
    'multivision.WithdrawScreen',
    () => Withdraw,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'multivision.DashboardScreen',
    () => Dashboard,
    Provider,
    store
  );


  Navigation.registerComponentWithRedux(
    'multivision.ManageCustomerScreen',
    () => ManageCustomer,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'multivision.SignUpScreen',
    () => SignUpScreen,
    Provider,
    store
  );


  Navigation.registerComponentWithRedux(
    'multivision.LoginScreen',
    () => LoginScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'multivision.TransferFundsScreen',
    () => TransferFunds,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'multivision.SideBar',
    () => SideBar,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'multivision.FundWalletScreen',
    () => FundWallet,
    Provider,
    store
  );
}
