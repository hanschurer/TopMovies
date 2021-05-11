import Like from './Like'
import React, { Component } from 'react'
import Table from './Table'

export default class MovieTable extends Component {
    columns=[
        {path:'title',label:'Title'},
        {path:'genre.name',label:'Genre'},
        {path:'numberInStock',label:'Stock'},
        {path:'dailyRentalRate',label:'Rate'},
        {key:'like', content: e=><Like onToggle={() => this.props.onToggle(e)} movie={e} />},
        {key:'delete',content:e=><button onClick={() =>this.props.onDelete(e._id)} type="button" class="btn btn-danger">Delete</button>}
    ]
   

    render() {

        const { newmovies,onSort,sortColumn}=this.props
        
        return (
            <Table columns={this.columns} newmovies={newmovies} onSort={onSort} sortColumn={sortColumn}  />
        )
    }
}

