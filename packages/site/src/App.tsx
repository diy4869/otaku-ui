import React, { Suspense } from 'react'
import './App.scss'
import { hot } from 'react-hot-loader/root'
import './components/mdReact/mdReact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routes from './router/index'
import NotFound from './components/notFound/notFound'


function App() {
  // const history = useHistory()

  // if (location.pathname === '/') {
  //   location.pathname = '/button'
  //   // history.push('/button')
  // }

  return (
    <Suspense fallback={<div></div>}>
      <Router>
      <div className="b-home">
      <header className="b-header">
        {/* BANGUMI-UI | OTAKU-UI |  */}
        <div className="b-title">
          <span>OTAKU-UI</span>
        </div>
        
            <div>
              <a href="https://github.com/last4869/vite" target="_blank">GitHub</a>
        </div>
      </header>
      <aside>{
        routes.map(item => {
          return (
            <>
              <h3 className="title">{item.title}</h3>
              <div className="b-menu">
                {
                  item.children.map(children => {
                    return (
                      <div
                        className={`b-menu-item ${location.pathname === children.path ? 'active' : ''}`}
                        onClick={() => {
                          // history.push(children.path)
                          location.pathname = children.path
                        }}
                      >{children.title}</div>
                    )
                  })
                }
              </div>
            </>
          )
        })
      }</aside>
          <main>
         
            <Switch>
               
              {
                routes.map((router) => {
                  return router.children.map(children => {
                    return (
                        <Route
                          path={children.path}
                          component={children.component}
                          key={children.path}
                        />
                      )
                  })  
                })
              }
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          {/* <CodeExample></CodeExample> */}
        </main>
      </div>
    </Router>
    </Suspense>
    
    
  )
}

export default hot(App)

