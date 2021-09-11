import React, { Suspense, useEffect } from 'react'
import style from './App.module.scss'
import { hot } from 'react-hot-loader/root'
import './components/mdReact/mdReact'
import { HashRouter as Router, Route, Switch, useHistory, NavLink, Redirect, useLocation } from 'react-router-dom'
import routes from './router/index'
import NotFound from './components/notFound/notFound'

function App() {
  return (
    <Suspense fallback={<div></div>}>
      <Router basename="otaku-ui-docs">
        <div className={style['otaku-home']}>
          <header className={style['otaku-header']}>
            {/* otaku-ui | OTAKU-UI |  */}
            <div className={style['otaku-title']}>
              <span>OTAKU-UI</span>
            </div>
            
                <div>
                  <a href="https://github.com/last4869/vite" target="_blank">GitHub</a>
            </div>
          </header>
          <aside>
            {
              routes.map(item => {
                return (
                  <>
                    <h3 className={style['title']}>{item.title}</h3>
                    <div className={style['otaku-menu']}>
                      {
                        item.children.map(children => {
                          return (
                            <NavLink
                              activeClassName={style['active']}
                              className={`${style['otaku-menu-item']}`}
                              to={children.path}
                            >{children.title}</NavLink>
                          )
                        })
                      }
                    </div>
                  </>
                )
              })
            }
          </aside>
          <main>
            <Switch>
              <Redirect exact from="/" to={{
                pathname: '/dev/introduce'
              }}></Redirect>

              {
                routes.map((router) => {
                  return router.children.map(children => {
                    return (
                      <Route
                          exact
                          path={children.path}
                          component={children.component}
                          key={children.path}
                        />
                      )
                  })  
                })
              }
            </Switch>
          {/* <CodeExample></CodeExample> */}
        </main>
      </div>
    </Router>
    </Suspense>
  )
}

export default hot(App)

