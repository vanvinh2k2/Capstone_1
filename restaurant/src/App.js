import { Fragment } from 'react';
import styles from './sass/_main.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { publicRouter } from "./routers";
import LayoutDefault from "./hocs/LayoutDefault";
function App() {
  return (
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
    
  );
}

export default App;
