import React, { Suspense, useState } from 'react'
import { NavLink, Routes, Link, Route } from 'react-router-dom'
import { Space } from 'otaku-ui'
import GitHubStart from '../components/GithubStart'
import style from '../App.module.scss'
import routes from '../router/index'

export default function Home () {
  const [data, setData] = useState<{
    stargazers_count?: number
  }>({})

  const processRouter = routes
    .filter(item => item.children)
    .reduce((router, current) => {
      const result = current.children?.map(children => {
        return (
          <Route
            path={children.path}
            key={children.path}
            index={children.path === '/dev/introduce'}
            element={
              <React.Suspense fallback={<>...</>}>
                <children.component></children.component>
              </React.Suspense>
            }
          />
        )
      })

      return router.concat(result)
    }, [])

    console.log(processRouter)

  return (
    <div>
      <div className={style['otaku-home']}>
        <header className={style['otaku-header']}>
          <div className={style['otaku-title']}>
            <span>OTAKU-UI</span>
          </div>

          <Space>
            <Link to='/playground'>Playground</Link>
            <GitHubStart/>
          </Space>
        </header>
        <aside className={style['content']}>
          <aside className={style['sidebar']}>
            {routes.map(item => {
              return (
                <>
                  <h3 className={style['title']}>{item.title}</h3>
                  <div className={style['otaku-menu']}>
                    {item.children?.map(children => {
                      return (
                        <NavLink
                          className={({ isActive }) => {
                            const className = [style['otaku-menu-item']]

                            return isActive
                              ? className.concat(style['active']).join(' ')
                              : className.join(' ')
                          }}
                          to={children.path}
                        >
                          {children.title}
                        </NavLink>
                      )
                    })}
                  </div>
                </>
              )
            })}
          </aside>
          <Suspense fallback={<div></div>}>
            <aside className='main'>
              <Routes>
                {processRouter}
              </Routes>
              {/* <Outlet></Outlet> */}
            </aside>
            <aside className='anchor-container'></aside>
          </Suspense>
        </aside>
      </div>
    </div>
  )
}
