import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Smoke test to mount App and ensure it doesn't throw during rendering
it('App renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
})
