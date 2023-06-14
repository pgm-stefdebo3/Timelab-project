import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App'
import { Dashboard, Home, Login } from './pages';
import './sass/main.scss'
import { AuthProvider } from './context/authContext';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <AuthProvider>
        <BrowserRouter>
        <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<Login/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='*' element={<Home/>} />
            </Route>
        </Routes>
        </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);