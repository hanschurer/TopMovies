import React from 'react'
import TableHearder from './TableHeader'
import TableBody from './TableBody'

const Table = ({ newmovies, onSort, sortColumn, columns }) => {

    return (
        <table className="table table-striped">
            <TableHearder columns={columns} sortColumn={sortColumn} onSort={onSort} />
            <TableBody data={newmovies} columns={columns} />
        </table>
    )
}

export default Table
