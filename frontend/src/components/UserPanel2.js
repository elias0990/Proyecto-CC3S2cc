import React, { Component } from 'react'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'


import { BrowserRouter as Router, Route } from 'react-router-dom'

import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import panelA from './user_panels/PanelA';

export default class UserPanel2 extends Component {
    state = {
        title: '',
        content: '',
        date: new Date(),
        img: '',
        userSelected: '',
        users: [],
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        if (res.data.length > 0) {
            this.setState({
                users: res.data.map(user => user.username),
                userSelected: res.data[0].username
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                img: res.data.img,
                userSelected: res.data.author,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date,
                img: this.state.img,
            };
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
        } else {
            const newNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date,
                img: this.state.img,
            };
            axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href = '/userPanel3';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        //console.log(this.state.img)
        //console.log(e.target.value)
    }

    onChangeDate = date => {
        this.setState({ date });
    }

    
    
    onChangeOtro = img => {
        this.setState({ img });
    }
    onInputChange2 = (e) => {
        this.setState({
            [this.state.img]: e.target.value
        })
        console.log(this.state.img)
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
                    <form onSubmit={this.onSubmit}>
                        <div className="col-md-4 p-2" >
                            <div className="card " style={{width: "60rem"}}>
                                <div className="card-header d-flex justify-content-between">
                                    <h5>Agregar contenido</h5>
                                </div>
                                
                                <div className="card-body">
                                                <div>
                                                            {/* SELECT THE USER */}
                                                            Usuario : {this.state.userSelected = "usuario1"}

                                                </div>
                                                <div class="input-group mb-3">
                                                        
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Titulo:</span>
                                                        </div>
                                                        
                                                        {/* Title */}
                                                        {/*<input type = "text" class="form-control" placeholder="Titulo" ></input>*/}
                                                        
                                                            <input class="form-control"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Titulo"
                                                                onChange={this.onInputChange}
                                                                name="title"
                                                                value={this.state.title}
                                                                required />

                                                </div>
                                                
                                                {/*<div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                            <label class="input-group-text" for="inputGroupSelect01">Tipo de contenido</label>
                                                        </div>
                                                        <select class="custom-select" id="inputGroupSelect01">
                                                            <option selected>Escoger...</option>
                                                            <option value="1">Fotografia</option>
                                                            <option value="2">Pagina Web</option>
                                                            <option value="3">Imagen Vectorial</option>
                                                        </select>
                                                    </div>
                                                */}
                                                {/* Tippo de contenido*/}
                                                <div className="form-group input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label className="input-group-text " htmlFor="inputGroupSelect01"   value={this.state.img}>Categoria</label>
                                                        </div>
                                                        
                                                        <select className="custom-select" id="inputGroupSelect01" name="img" onChange={this.onInputChange} value={this.state.img} >
                                                            <option defaultValue>Escoger...</option>
                                                            <option value="Fotografia">Fotografia</option>
                                                            <option value="pagina Web">pagina Web</option>
                                                            <option value="Imagen Vectorial">Imagen Vectorial</option>
                                                        </select>
                                                </div>




                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend"><label class="input-group-text" for="ejemplo_archivo_1">Archivo: </label>
                                                    </div>
                                                </div>
                                                <input   class=" mx-4 mb-4" type="file" id="ejemplo_archivo_1"/>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend"><label class="input-group-text" for="ejemplo_archivo_1">Captura: </label>
                                                    </div>
                                                </div>
                                                <input   class=" mx-4 mb-4" type="file" id="ejemplo_archivo_1"/>
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Comentarios:</span>
                                                        </div>

                                                        {/*<input type = "text"class="form-control" placeholder="Comentarios" ></input>*/}
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Comentario"
                                                                name="content"
                                                                onChange={this.onInputChange}
                                                                value={this.state.content}
                                                                required/>
                                                            
                                                        
                                                </div>
                                                
                                </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger">
                                                Guardar
                                            </button>
                                        </div>
                            </div>
                            
                            
                            
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        
        
        )};
}
