import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import Categories from './pages/Categories';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { StoreProvider } from './utils/GlobalState';
import Classifier from './components/Classifier/Classifier';
import Header from './components/Header/Header';
import Cards from './components/Cards/Cardz';
// import { Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap/Button';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './components/Hompage/hompage';



import Collections from './components/Collections/Collections';
import CollectionDetails from './components/CollectionDetail/CollectionDetail';



const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  
  return (
   
      <ApolloProvider client={client}>
      <Router>
        <div className='App d-flex'>
        {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              PhotoClass
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}
        {/* <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
            </Routes>
          </div> */}
        
          
            <Header />
          
          
          <StoreProvider>
            
            <Routes>
              <Route 
                path="/collections" 
                element={<Collections />} 
              />
              <Route 
                path="/collections/:collectionId" 
                element={<CollectionDetails />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/home" 
                element={<HomePage />} 
              />
              <Route 
                path="/classifier" 
                element={<Classifier />} 
              />
              {/* <Route 
                path="/" 
                element={<Cards/>} 
              /> */}
              {/* <Route 
                path="/orderHistory" 
                element={<OrderHistory />} 
              /> */}
              {/* <Route 
                path="/products/:id" 
                element={<Detail />} 
              /> */}
              {/* <Route 
                path="*" 
                element={<NoMatch />} 
              /> */}
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
