import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './styles/Index.css';
import Index from './pages/Index';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { BrowserRouter } from 'react-router-dom';
// import Indexv2 from './pages/Indexv2';
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Index />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
