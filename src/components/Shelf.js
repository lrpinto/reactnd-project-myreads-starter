import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import * as _ from 'lodash'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'

/**
 * Displays a grid of Book components.
 *
 */
const Shelf = ({ shelf, books, shelves, onUpdate }) => {
	const hash = `#${_.kebabCase(shelf)}`

	const [active, setActive] = useState(false)

	let { url } = useRouteMatch()

	let location = useLocation()

	React.useEffect(() => {
		if (location.hash === hash) {
			setActive(true)
		} else if (location.hash === '') {
			setActive(false)
		}
	}, [location])

	return (
		<div className="bookshelf">
			<Link
				style={{ textDecoration: 'none' }}
				to={{
					pathname: url,
					hash: hash,
				}}
			>
				<h2 className="bookshelf-title">{_.startCase(shelf)}</h2>
			</Link>

			{active && (
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map((b) => (
							<li key={b}>
								<Book book={b} shelves={shelves} onUpdate={onUpdate} />
							</li>
						))}
					</ol>
				</div>
			)}
		</div>
	)
}

Shelf.propTypes = {
	shelf: PropTypes.string.isRequired,
	shelves: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	books: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	onUpdate: function (props, propName, componentName) {
		var fn = props[propName]
		if (
			!fn.prototype ||
			(typeof fn.prototype.constructor !== 'function' &&
				fn.prototype.constructor.length !== 2)
		) {
			return new Error(
				`${componentName}.${propName} must be a function with 2 argument.`
			)
		}
	},
}

export default Shelf
