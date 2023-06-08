import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App'
import { Home } from './pages';
import './sass/main.scss'
import { AuthProvider } from './context/authContext';

const client = new ApolloClient({
  uri: import.meta.env.DEV ? 'http://localhost:3000/graphql' : 'https://royalmarkt-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <AuthProvider>
        <BrowserRouter>
        <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Home />} />
            </Route>
        </Routes>
        </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);