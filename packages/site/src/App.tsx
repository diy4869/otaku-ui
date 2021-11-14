import React, { Suspense, useEffect } from 'react'
import style from './App.module.scss'
import { hot } from 'react-hot-loader/root'

import { HashRouter as Router, Route, Switch, NavLink, Redirect } from 'react-router-dom'
import routes from './router/index'
import NotFound from './components/notFound/notFound'


function App() {
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <div className={style['otaku-home']}>
          <header className={style['otaku-header']}>
            {/* otaku-ui | OTAKU-UI |  */}
            <div className={style['otaku-title']}>
              <span>OTAKU-UI</span>
            </div>
            
                <div>
                  <a href="https://github.com/diy4869/otaku-ui" target="_blank">GitHub</a>
            </div>
          </header>
          <aside className={style['content']}>
            <aside className={style['sidebar']}>
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
                <Route path="*" component={NotFound}></Route>
                <Redirect from="/" to={{
                  pathname: '/dev/introduce'
                }}></Redirect>
              </Switch>
            {/* <CodeExample></CodeExample> */}
          </main>
        </aside>  
      </div>
    </Router>
    </Suspense>
  )
}

export default hot(App)

