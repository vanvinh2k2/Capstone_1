import { Fragment } from 'react';
import styles from './sass/_main.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { publicRouter, privateRouter } from "./routers";
import LayoutDefault from "./hocs/LayoutDefault";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from './hocs/PrivateRouter';

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <div className="App">
          <Routes>
            {publicRouter.map((route, index)=>{
                let Layout = LayoutDefault;
                if(route.layout){
                  Layout = route.layout;
                }else if(route.layout === null){
                  Layout = Fragment;
                }
                return <Route path={route.path} element={
                  <Layout>
                    < route.component/>
                  </Layout>
                } key={index}/>
              })
            }
            {privateRouter.map((route, index)=>{
                let Layout = LayoutDefault;
                if(route.layout){
                  Layout = route.layout;
                }else if(route.layout === null){
                  Layout = Fragment;
                }
                return <Route path={route.path} element={
                  <PrivateRoute element={
                    <Layout>
                    < route.component/>
                  </Layout>
                  }>
                  </PrivateRoute>
                } key={index}/>
              })}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
