import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ShelfSelector from './ShelfSelector'
import { get } from '../services/BooksAPI'

/**
 * Displays a Book and its ShelfSelector.
 */
const Book = ({ book, shelves, onUpdate }) => {
	const [_book, setBook] = useState(book)

	useEffect(() => {
		if (typeof _book === 'string') {
			get(_book).then((b) => {
				setBook(b)
			})
		}
	}, [])

	return (
		<div className="book">
			{typeof _book === 'object' && (
				<React.Fragment>
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${_book.imageLinks.thumbnail})`,
							}}
						></div>
						<ShelfSelector
							shelf={_book.shelf}
							shelves={shelves}
							onUpdate={(shelf) => {
								onUpdate(_book.id, shelf)
							}}
						/>
					</div>
					<div className="book-title">{`${_book.title}`}</div>
					<div className="book-authors">{`${_book.authors.toString()}`}</div>
				</React.Fragment>
			)}
		</div>
	)
}

Book.propTypes = {
	book: PropTypes.string.isRequired,
	shelves: PropTypes.arrayOf(PropTypes.string).isRequired,
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

export default Book
