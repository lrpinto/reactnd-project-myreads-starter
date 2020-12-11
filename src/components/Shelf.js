import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'
import BookGrid from './BookGrid'

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
					<BookGrid books={books} shelves={shelves} onUpdate={onUpdate} />
				</div>
			)}
		</div>
	)
}

Shelf.propTypes = {
	shelf: PropTypes.string.isRequired,
	shelves: PropTypes.object.isRequired,
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
