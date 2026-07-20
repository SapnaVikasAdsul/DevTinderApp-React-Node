import { useState } from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Body'
import Login from './Login'
import Profile from './Profile'
import { appStore } from './utils/appStore'
import {Provider} from "react-redux"

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />}>

              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />

            </Route>

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
