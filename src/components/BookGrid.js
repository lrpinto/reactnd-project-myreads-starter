import React from 'react'
import Book from './Book'

const BookGrid = ({ books, shelves, onUpdate }) => {

	return books ? (
		<ol className="books-grid">
			{books.map((b, i) => {
				return (
					<li key={i}>
						<Book book={b} shelves={shelves} onUpdate={onUpdate} />
					</li>
				)
			})}
		</ol>
	) : (
		<h1>No Books</h1>
	)
}

export default BookGrid
