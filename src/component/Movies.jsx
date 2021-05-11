import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import React, { Component } from 'react'
import MoviesTable from './MovieTable'
import Pagination from './Pagination'
import paginate from '../utils/paginate'
import ListGroup from './ListGroup'
import _ from 'lodash'

export default class Movies extends Component {
    state = {
        movies: [],
        pagesize: 4,
        currentPage: 1,
        genres: [],
        currentGenres: {},
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }

    onDelete = (id) => {
        const movies = this.state.movies.filter(e => e._id !== id)
        this.setState({ movies })
    }

    onToggle = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)

        movies[index] = { ...movies[index] }
        movies[index].like = !movies[index].like

        this.setState({ movies })
    }

    onPageChange = (page) => {

        this.setState({ currentPage: page })
    }

    onItemSelected = (genre) => {
        this.setState({ currentGenres: genre, currentPage: 1 })

    }

    onSort = (sortColumn) => {
        this.setState({ sortColumn });
    }

    getPagedDate = () => {
        const { movies, currentGenres, sortColumn } = this.state;
        const filtered = currentGenres && currentGenres._id ? movies.filter(m => m.genre._id === currentGenres._id) : movies
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const newmovies = paginate(sorted, this.state.currentPage, this.state.pagesize)
        return { totalCount: filtered.length, newmovies }
    }

    render() {

        if (this.state.movies.length === 0) {
            return 'Tere is zero movies in the database'
        }

        const { totalCount, newmovies } = this.getPagedDate();

        return (
            <div className="row">
                <div className="clo-3">
                    <ListGroup items={this.state.genres} onItemSelected={this.onItemSelected} currentGenres={this.state.currentGenres} />
                </div>
                <div className="col">
                    <h4>There are {totalCount} movies in the database.</h4>
                    <MoviesTable newmovies={newmovies} onToggle={this.onToggle} onDelete={this.onDelete} onSort={this.onSort} sortColumn={this.state.sortColumn} />
                    
                    <Pagination itemsCount={totalCount} pageSize={this.state.pagesize} currentPage={this.state.currentPage} onPageChange={this.onPageChange} />
                </div>
            </div >
        )
    }
}
