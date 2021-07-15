import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class NotesList extends Component {

    state = {
        notes: []
    }

    async componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({
            notes: res.data
        });
    }

    deleteNote = async (noteId) => {
        await axios.delete('http://localhost:4000/api/notes/' + noteId);
        this.getNotes();
    }

    render() {
        return (
            <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-md-12 p-2 mx-auto" >
                        
                        <div className="card " style={{width: "70rem"}}>
                                 
                            
                        


























                            <div class="container">
                            <div class="row">
                                <div class="col-lg-12 card-margin">
                                    <div class="card search-form">
                                        <div class="card-body p-0">
                                            <form id="search-form">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="row no-gutters">
                                                            <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                                                <select class="form-control" id="exampleFormControlSelect1">
                                                                    <option>Categoria</option>
                                                                    <option>Foografias</option>
                                                                    <option>Imagenes vectoriales</option>
                                                                    <option>Paginas web</option>
                                                                    
                                                                </select>
                                                            </div>
                                                            <div class="col-lg-8 col-md-6 col-sm-12 p-0">
                                                                <input type="text" placeholder="Search..." class="form-control" id="search" name="search"/>
                                                            </div>
                                                            <div class="col-lg-1 col-md-3 col-sm-12 p-0">
                                                                <button type="submit" class="btn btn-base">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                    <div class="col-12">
                                        <div class="card card-margin">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>






















                    
                    </div>
                </div>
                <div className="row flex-nowrap">
                    
                    
                    <div className="">
                        <div className="col-md-12 p-2 mx-auto" >
                            <div className="card " style={{width: "70rem"}}>
                                <div className="card-header d-flex justify-content-between">
                                    <h5></h5>
                                </div>
                                                        <div class="container">
                                                            
                                                            <div class="row">
                                                            {
                                                                this.state.notes.map(note => (
                                                                    <div class="col-4">
                                                                        <div class="card my-4" style={{width: "18rem"}} key={note._id}>
                                                                                <div class="card-body">
                                                                                    
                                                                                    <Link to={"/elemento/" + note._id}>
                                                                                        <h5 class="card-title">Titulo: {note.title}</h5>
                                                                                            
                                                                                    </Link>
                                                                                    <h6 class="card-subtitle mb-2 text-muted">Autor: {note.author}</h6>
                                                                                    <h6 class="card-subtitle mb-2 text-muted">Comentarios: {note.content}</h6>
                                                                                    <p class="card-text">Image not found</p>
                                                                                    <p>{format(note.createdAt)}</p>
                                                                                    <p>Categoria: {note.img}</p>
                                                                                    
                                                                                    
                                                                                    
                                                                                </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                            ))}
                                                                    
                                                                    
                                                            </div>
                                                        </div>
                                        
                                        
                                <div className="card-footer">
                                    
                                </div>
                            </div>
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
