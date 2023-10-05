import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LayoutDefault from './hocs/LayoutDefault';
import styles from './sass/_main.scss'
import { publicRouter } from './routers';
import { Fragment } from 'react';
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <Routes>
          {
            publicRouter.map((route, index)=>{
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
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
