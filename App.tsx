import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StatusBar} from "react-native";
import store from "./src/stotre";
import {Provider} from "mobx-react";
import Index from "./src"; 

function App () {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <Index />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;

