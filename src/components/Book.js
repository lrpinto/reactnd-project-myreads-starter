import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ShelfSelector from './ShelfSelector'
import { get } from '../services/BooksAPI'

const defaultThumbnail = ''

/**
 * Displays a Book and its ShelfSelector.
 */
const Book = ({ book, shelves, onUpdate }) => {
	const [_book, setBook] = useState(book)

	const makeValidBook = (b) => {
		if (!b.title) {
			b.title = ''
		}
		if (!b.authors) {
			b.authors = ''
		}
		if (!b.imageLinks || !b.imageLinks.thumbnail) {
			b.imageLinks = { thumbnail: defaultThumbnail }
		}
	}

	const setBookShelf = () => {
		let newShelf = 'none'
		Object.entries(shelves).forEach(([shelf, books]) => {
			if (books.indexOf(_book.id) >= 0) {
				newShelf = shelf
				return
			}
		})
		setBook({ ..._book, shelf: newShelf })
	}

	useEffect(() => {
		if (typeof _book === 'string') {
			get(_book).then((b) => {
				makeValidBook(b)
				setBook(b)
			})
		}
	}, [book])

	useEffect(() => {
		if (typeof _book !== 'string') {
			setBookShelf()
		}
	}, [shelves])

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
	book: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	shelves: PropTypes.object.isRequired,
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
