import { tsConstructorType } from '@babel/types';
import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Fizics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // Project_s: [],
            Fizics_s: [],
            modalTitle: "",
            fizicsid: 0,
            fizicsfamily: "",
            fizicsname: "",
            fizicssurname: "",
            fizicsabout: "",
            //FizicsLogin: "",
            //FizicsPassword: "",
            fizicsudal: 0//,
            // ProjectId: 0,
            // ProjectName: "",
            //DateOfJoining: "",
            //PhotoFileName: "1642395784157023750.jpg",
            //PhotoPath: variables.PHOTO_URL
        }
    }
    refreshList() {
        // fetch(variables.API_URL + 'project')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ Project_s: data });
        //     });

        fetch(variables.API_URL + 'fizics')
            .then(response => response.json())
            .then(data => {
                this.setState({ Fizics_s: data });
            });
    }
    componentDidMount() {
        this.refreshList();
    }

    changeFizicsName = (e) => {
        this.setState({ FizicsName: e.target.value });
    }
    changeFizicsSurname = (e) => {
        this.setState({ FizicsSurname: e.target.value });
    }
    changeFizicsFamily = (e) => {
        this.setState({ FizicsFamily: e.target.value });
    }
    //changeFizicsLogin = (e) => {
        //this.setState({ FizicsLogin: e.target.value });
    //}
    //changeFizicsPassword = (e) => {
        //this.setState({ FizicsPassword: e.target.value });
    //}
    changeFizicsUdal = (e) => {
        this.setState({ FizicsUdal: e.target.value });
    }
    // changeProjectId = (e) => {
    //     this.setState({ ProjectId: e.target.value });
    // }
    //changeDateOfJoining = (e) => {
        //this.setState({ DateOfJoining: e.target.value });
    //}

    addClick() {
        this.setState({
            modalTitle: 'Add Fizics',
            FizicsId: 0,
            FizicsUdal: 0,
            FizicsName: '',
            FizicsSurname: '',
            FizicsAbout: '',
            FizicsFamily: ''//,
            //FizicsLogin: '',
            //FizicsPassword: '',
            // ProjectName: '',
            // ProjectId: 0,
            //DateOfJoining: '',
            //PhotoFileName: '1642395784157023750.jpg'
        });
    }
    editClick(par) {
        this.setState({
            modalTitle: 'Edit Fizics',
            FizicsId: par.FizicsId,
            FizicsUdal: par.FizicsUdal,
            FizicsName: par.FizicsName,
            FizicsSurname: par.FizicsSurname,
            FizicsAbout: par.FizicsAbout,
            FizicsFamily: par.FizicsFamily//,
            //FizicsLogin: par.FizicsLogin,
            //FizicsPassword: par.FizicsPassword,
            // ProjectId: par.ProjectId,
            // ProjectName: par.ProjectName,
            //DateOfJoining: par.DateOfJoining,
            //PhotoFileName: par.PhotoFileName
        });
    }
    createClick() {
        fetch(variables.API_URL + 'fizics', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FizicsName: this.state.FizicsName,
                FizicsSurname: this.state.FizicsSurname,
                FizicsFamily: this.state.FizicsFamily,
                FizicsAbout: this.state.FizicsAbout,
                //FizicsLogin: this.state.FizicsLogin,
                //FizicsPassword: this.state.FizicsPassword,
                FizicsUdal: this.state.FizicsUdal//,
                // ProjectId: this.state.ProjectId,
                // ProjectName: this.state.ProjectName,
                //DateOfJoining: this.state.DateOfJoining,
                //PhotoFileName: this.state.PhotoFileName
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    updateClick() {
        fetch(variables.API_URL + 'fizics', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FizicsId: this.state.FizicsId,
                FizicsName: this.state.FizicsName,
                FizicsSurname: this.state.FizicsSurname,
                FizicsFamily: this.state.FizicsFamily,
                FizicsAbout: this.state.FizicsAbout,
                //FizicsLogin: this.state.FizicsLogin,
                //FizicsPassword: this.state.FizicsPassword,
                FizicsUdal: this.state.FizicsUdal//,
                // ProjectId: this.state.ProjectId,
                // ProjectName: this.state.ProjectName,
                //DateOfJoining: this.state.DateOfJoining,
                //PhotoFileName: this.state.PhotoFileName
            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    deleteClick(id) {
        if (window.confirm('Удалить?')) {
            fetch(variables.API_URL + 'fizics/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    //alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }
    imageUpload = (e) => {
        e.preventDefault();



        const formData = new FormData();
        formData.append('file', e.target.files[0], e.target.files[0].name);
        fetch(variables.API_URL + 'fizics/savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ PhotoFileName: data });
            })
    }





    render() {
        const {
            Fizics_s,
            // Project_s,
            modalTitle,
            FizicsId,
            FizicsFamily,
            FizicsName,
            FizicsSurname,
            FizicsAbout,
            FizicsUdal//,
            //,
            //FizicsLogin,
            //FizicsPassword,
            //FizicsUdal//,
            // ProjectId,
            //DateOfJoining,
            //PhotoFileName,
            //PhotoPath
        } = this.state;
        return (
            <div>
                <button type='button' className='btn btn-primary m-2 float-end'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>Add Fizics
                </button>


                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>
                                FizicsId
                            </th>
                            <th>
                                FizicsFullName
                            </th>
                            <th>
                            FizicsAbout
                            </th>
                            {/* <th>
                                FizicsLogin
                            </th>
                            <th>
                                FizicsUdal
                            </th>
                            <th>
                                Project
                            </th>
                            {<th>
                                DOJ
                            </th>} */}
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Fizics_s.map(par =>
                            <tr key={par.FizicsId}>
                                <td>{par.FizicsId}</td>
                                <td>{par.FizicsName + " " + par.FizicsSurname + " " + par.FizicsFamily}</td>
                                <td>{par.FizicsAbout}</td>
                                {/*<td>{par.FizicsLogin}</td>}
                               <td>{par.FizicsUdal}</td> */}
                                {/* <td>{par.ProjectName}</td>
                                <td>{par.DateOfJoining}</td> */}
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle='modal'
                                        data-bs-target='#exampleModal'
                                        onClick={() => this.editClick(par)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(par.FizicsId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='modal fade' id='exampleModal' tabIndex='-1' aria-hidden='true'>
                    <div className='modal-dialog modal-lg modal-dialog-sentered'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>{modalTitle}</h5>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div className='modal-body'>
                                <div className='d-flex flex-row bd-highlight mb-3'>
                                    <div className='p-2 w-50 bd-highlight'>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>Name</span>
                                            <input type='text' className='form-control'
                                                value={FizicsName}
                                                onChange={this.changeFizicsName} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>Surname</span>
                                            <input type='text' className='form-control'
                                                value={FizicsSurname}
                                                onChange={this.changeFizicsSurname} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>Family</span>
                                            <input type='text' className='form-control'
                                                value={FizicsFamily}
                                                onChange={this.changeFizicsFamily} />
                                        </div>
                                        {/* <div className='input-group mb-3'>
                                            <span className='input-group-text'>Login</span>
                                            <input type='text' className='form-control'
                                                value={FizicsLogin}
                                                onChange={this.changeFizicsLogin} />
                                        </div>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>Password</span>
                                            <input type='password' className='form-control'
                                                value={FizicsPassword}
                                                onChange={this.changeFizicsPassword} />
                                        </div>




                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>Project</span>
                                            <select className='form-select'
                                                onChange={this.changeProjectId}
                                                value={ProjectId}>
                                                {Project_s.map(prj => <option key={prj.ProjectId} value={prj.ProjectId}>
                                                    {prj.ProjectName}
                                                </option>)}
                                            </select>
                                        </div>






                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>DOJ</span>
                                            <input type='date' className='form-control'
                                                value={DateOfJoining}
                                                onChange={this.changeDateOfJoining} />
                                        </div> */}

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" />
                                                </div>
                                            </div>
                                            <h5 >Deleted</h5>
                                        </div>

                                    </div>


                                    {/* <div className='p-2 w-50 bd-highlight'>
                                        <img width='250px' height='250px'
                                            src={PhotoPath + PhotoFileName} />
                                        <input className='m-2' type='file' onChange={this.imageUpload} />



                                    </div> */}
                                </div>

                                {FizicsId == 0 ?
                                    <button type='button' className='btn btn-primary float-start'
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}
                                {FizicsId != 0 ?
                                    <button type='button' className='btn btn-primary float-start'
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}