import React, { Fragment, Suspense, useEffect } from 'react'
import style from './App.module.scss'

import {
  HashRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom'
import routes from './router/index'
import NotFound from './components/notFound/notFound'
import { MDXProvider } from '@mdx-js/react'
import { HighlightCode } from 'otaku-ui'

interface Props {
  [key: string]: any
}

function App() {
  const components = {
    code(props: Props) {
      const {
        className,
        children,
        live
      } = props

      console.log(live)
      const language = className.replace(/language-/, '')

      return <HighlightCode lang={language} code={children}></HighlightCode>
    }
  }

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
              <a href='https://github.com/diy4869/otaku-ui' target='_blank'>
                GitHub
              </a>
            </div>
          </header>
          <section className="container">
            <aside>
              {routes.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <h3 className={style['title']}>{item.title}</h3>
                    <div className={style['otaku-menu']}>
                      {item.children.map(children => {
                        return (
                          <NavLink
                            activeClassName={style['active']}
                            className={`${style['otaku-menu-item']}`}
                            to={children.path}
                            key={children.path}
                          >
                            {children.title}
                          </NavLink>
                        )
                      })}
                    </div>
                  </Fragment>
                )
              })}
            </aside>
            <main>
              <MDXProvider components={components}>
                <Switch>
                  {routes.map(router => {
                    return router.children.map(children => {
                      return (
                        <Route
                          path={children.path}
                          component={children.component}
                          key={children.path}
                        />
                      )
                    })
                  })}
                  <Route path='*' component={NotFound}></Route>
                  <Redirect
                    from='/'
                    to={{
                      pathname: '/dev/introduce'
                    }}
                  ></Redirect>
                </Switch>
              </MDXProvider>
            </main>
          </section>
          
        </div>
      </Router>
    </Suspense>
  )
}

export default App

