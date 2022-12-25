import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import { BrowserRouter , Route ,Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      {/* because of the updates all the route have to be wrapped around Routes component */}
      <Routes>
        <Route path='/' element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;