import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";

export const FireBaseSetup = () => {

    let store = null;
    let rrfProps = null;
    let isInit= false;

    try {
      firebase.initializeApp(fbConfig);
      isInit = true;
    } catch (err) {
      console.warn("no fb init.");
    }

    if(isInit) {
      store = createStore();
      rrfProps = {
          firebase,
          config: { userProfile: "users" },
          dispatch: store.dispatch
      }; 
    } 
    if( !isLoaded(store) || !isLoaded(rrfProps) ) { 
      return <div>Loading...</div>
    }
    else {
      return (        
          <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
              <div>              
              </div>
            </ReactReduxFirebaseProvider>
          </Provider>      
      )}
  }
            
  render(
      <App />,
      document.getElementById('root')
  ) 