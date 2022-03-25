import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect } from 'react';


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

//import './theme/variables.css';


import { AppContextProvider } from './data/AppContext';
import { CartProvider } from "react-use-cart";

import AuthProvider from './components/Authentication/AuthProvider';
import AuthApp from './AuthApp';

setupIonicReact();
const App: React.FC = () => {
  
  return (
    <IonApp>
      <IonReactRouter>
            <AppContextProvider>
                <CartProvider>
                  <AuthProvider>
                    <AuthApp/>
                </AuthProvider>
                </CartProvider>
    </AppContextProvider>
    </IonReactRouter>  
    </IonApp>

  );
};

export default App;