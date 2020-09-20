import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Search from './components/Search'

/**
 * The starting point of this App.
 */
class BooksApp extends React.Component {
	render() {
		return (
			<div className="app">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/search">
						<Search />
					</Route>
				</Switch>
			</div>
		)
	}
}

export default BooksApp
