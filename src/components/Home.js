import React, { useState, useEffect } from 'react'
import HomeHeader from './HomeHeader'
import Shelf from './Shelf'
import * as BooksAPI from '../services/BooksAPI'

const Home = () => {
	const [shelves, setShelves] = useState({})

	useEffect(() => {
		BooksAPI.update('', 'none').then((shelves) => setShelves(shelves))
	}, [])

	return (
		<div className="list-books">
			<HomeHeader title={`My Reads`} />
			<div className="list-books-content">
				<div>
					{Object.entries(shelves).map(([shelf, books]) => (
						<Shelf
							key={shelf}
							shelf={shelf}
							books={books}
							shelves={Object.keys(shelves)}
							onUpdate={(_book, _shelf) => {
								debugger
								BooksAPI.update({ id: _book }, _shelf).then((_shelves) =>
									setShelves(_shelves)
								)
							}}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Home
