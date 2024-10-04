import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import TopNav from './components/TopNav.jsx'
import HomeView from './views/HomeView.jsx'
import AllProductsView from './views/AllProductsView.jsx';
import { MakeupSearchProvider } from './contexts/useMakeupSearchContext';

function App() {
  return (
    <MakeupSearchProvider>
      <Router>
        <div className="App">
          <TopNav />
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/all_products" element={<AllProductsView />} />
          </Routes>
        </div>
      </Router>
    </MakeupSearchProvider>
  );
}

export default App;
