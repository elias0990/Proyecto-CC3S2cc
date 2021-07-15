import React, { Component } from 'react'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'


import { BrowserRouter as Router, Route } from 'react-router-dom'

import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import panelA from './user_panels/PanelA';

export default class UserPanel3 extends Component {


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
                    <div className="col-auto col-md-3 col-xl-3 px-sm-2 px-0 p-2 ">
                        <div className="card " style={{width: ""}}>
                            <div className="card-header d-flex justify-content-between"><h5>Menu</h5></div>
                            <div className="card-body">
                                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                        <li className="nav-item">
                                            <a href="/userPanel1" className="nav-link align-middle px-0"><span className="ms-1 d-none d-sm-inline">Cuenta</span></a>
                                        </li>
                                        <li>
                                            <a href="/userPanel2" className="nav-link px-0 align-middle">
                                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Agregar Contenido</span> </a>
                                        </li>
                                        <li>
                                            <a href="userPanel3" className="nav-link px-0 align-middle">
                                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Mi Biblioteca</span> </a>
                                        </li>
                                    </ul>
                            </div>
                        </div>     
                    </div>
                    
                    

                    <div className="col py-0">
                        <div className="col-md-4 p-2" >
                            <div className="card " style={{width: "60rem"}}>
                                <div className="card-header d-flex justify-content-between">
                                    <h5>Mi biblioteca</h5>
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
                                                                                    
                                                                                    <Link to={"/edit/" + note._id} className="btn btn-secondary">
                                                                                        <i className="material-icons">
                                                                                            border_color</i>
                                                                                    </Link>
                                                                                    <button className="btn btn-danger mx-2" onClick={() => this.deleteNote(note._id)}>
                                                                                        Delete
                                                                                    </button>
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
        
        
        )};
}