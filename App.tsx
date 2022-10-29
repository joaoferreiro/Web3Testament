import React from 'react';

import {AppContextProvider} from './src/contexts/AppContext';

import Routes from './src/routes';

const App = () => {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  );
};

export default App;
