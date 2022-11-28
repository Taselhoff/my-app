import { tsConstructorType } from '@babel/types';
import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Project extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Project_s: [],
            Fizics_s: [],

            FizicsName: "",
            FizicsSurname: "",
            FizicsFamily: "",

            ProjectGip: 0,
            ProjectGipName: '',

            modalTitle: "",
            ProjectName: "",
            ProjectDateStart: "",
            ProjectDateStop: "",
            ProjectComment: "",
            ProjectId: 0,
            ProjectIdFilter: '',
            ProjectNameFilter: "",
            Project_sWithoutFilter: []
        }
    }

    FilterFn() {
        var ProjectIdFilter = this.state.ProjectIdFilter;
        var ProjectNameFilter = this.state.ProjectNameFilter;
        var ProjectDateStartFilter = this.state.ProjectDateStartFilter;
        var ProjectDateStopFilter = this.state.ProjectDateStopFilter;
        var filteredData = this.state.Project_sWithoutFilter.filter(
            function (el) {
                return el.ProjectId.toString().toLowerCase().includes(
                    ProjectIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.ProjectName.toString().toLowerCase().includes(
                        ProjectNameFilter.toString().trim().toLowerCase()
                    ) &&
                    el.ProjectDateStart.toString().toLowerCase().includes(
                        ProjectDateStartFilter.toString().trim().toLowerCase()
                    ) &&
                    el.ProjectDateStop.toString().toLowerCase().includes(
                        ProjectDateStopFilter.toString().trim().toLowerCase()
                    )

            }
        );
        this.setState({ Project_s: filteredData });
    }

    sortResult(prop, asc) {
        var sortedData = this.state.Project_sWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ Project_s: sortedData });
    }





    changeProjectIdFilter = (e) => {
        this.state.ProjectIdFilter = e.target.value;
        this.FilterFn();
    }
    changeProjectNameFilter = (e) => {
        this.state.ProjectNameFilter = e.target.value;
        this.FilterFn();
    }
    changeProjectDateStartFilter = (e) => {
        this.state.ProjectDateStartFilter = e.target.value;
        this.FilterFn();
    }
    changeProjectDateStopFilter = (e) => {
        this.state.ProjectDateStopFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch(variables.API_URL + 'project')
            .then(response => response.json())
            .then(data => {
                this.setState({ Project_s: data, Project_sWithoutFilter: data });
            });

        fetch(variables.API_URL + 'fizics')
            .then(response => response.json())
            .then(data => {
                this.setState({ Fizics_s: data });
            });
    }
    componentDidMount() {
        this.refreshList();
    }

    changeProjectName = (e) => {
        this.setState({ ProjectName: e.target.value });
    }
    changeProjectDateStart = (e) => {
        this.setState({ ProjectDateStart: e.target.value });
    }
    changeProjectDateStop = (e) => {
        this.setState({ ProjectDateStop: e.target.value });
    }
    changeProjectComment = (e) => {
        this.setState({ ProjectComment: e.target.value });
    }
    changeProjectGip = (e) => {
        this.setState({ ProjectGip: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: 'Add Project',
            ProjectId: 0,
            ProjectGip: 0,
            ProjectGipName: '',
            ProjectName: '',
            ProjectDateStart: '',
            ProjectDateStop: '',
            ProjectComment: ''
        });
    }
    editClick(par) {
        this.setState({
            modalTitle: 'Edit Project',
            ProjectId: par.ProjectId,
            ProjectGip: par.ProjectGip,
            ProjectGipName: par.FizicsFamily + ' ' + par.FizicsName + ' ' + par.FizicsSurname,
            ProjectName: par.ProjectName,
            ProjectDateStart: par.ProjectDateStart,
            ProjectDateStop: par.ProjectDateStop,
            ProjectComment: par.ProjectComment
        });
    }
    createClick() {
        alert(this.state.ProjectName + "\n" +
        this.state.ProjectGip + "\n" +
        this.state.ProjectDateStart + "\n" +
        this.state.ProjectDateStop + "\n" +
        this.state.ProjectComment        
        )
        fetch(variables.API_URL + 'project', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: 
            JSON.stringify({
                ProjectName: this.state.ProjectName,
                ProjectGip: this.state.ProjectGip,
                ProjectDateStart: this.state.ProjectDateStart,
                ProjectDateStop: this.state.ProjectDateStop,
                ProjectComment: this.state.ProjectComment
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, 
            (error) => {
                //console.log(res.json());
                alert('Failed' + "\n" + error);
            })
    }

    updateClick() {
        fetch(variables.API_URL + 'project', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProjectId: this.state.ProjectId,
                ProjectName: this.state.ProjectName,
                ProjectGip: this.state.ProjectGip,
                ProjectDateStart: this.state.ProjectDateStart,
                ProjectDateStop: this.state.ProjectDateStop,
                ProjectComment: this.state.ProjectComment
            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed' + error.body.toString());
            })
    }
    deleteClick(id) {
        if (window.confirm('Удалить?')) {
            fetch(variables.API_URL + 'project/' + id, {
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

    render() {
        const {
            Project_s,
            Fizics_s,
            modalTitle,
            ProjectId,
            ProjectName,
            ProjectDateStart,
            ProjectDateStop,
            ProjectComment,
            ProjectGip
        } = this.state;
        return (
            <div>
                <button type='button' className='btn btn-primary m-2 float-end'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Добавить Проект
                </button>


                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>
                                <div>
                                    <div className='d-flex flex-row'>
                                        <input className='form-control m-2'
                                            onChange={this.changeProjectIdFilter}
                                            placeholder="Filter" />

                                    </div>
                                    <div>
                                        <button type='button' className='btn btn-light'
                                            onClick={() => this.sortResult('ProjectId', true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>

                                        <button type='button' className='btn btn-light'
                                            onClick={() => this.sortResult('ProjectId', false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                ProjectId
                            </th>
                            <th>
                                <div>
                                    <div className='d-flex flex-row'>
                                        <input className='form-control m-2'
                                            onChange={this.changeProjectNameFilter}
                                            placeholder="Filter" />
                                    </div>

                                    <div>
                                        <button type='button' className='btn btn-light'
                                            onClick={() => this.sortResult('ProjectName', true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>

                                        <button type='button' className='btn btn-light'
                                            onClick={() => this.sortResult('ProjectName', false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                Наименование проекта
                            </th>
                            <th>
                                <div className='d-flex flex-row'>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('ProjectGip', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('ProjectGip', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                ГИП проекта
                            </th>
                            <th>
                                <div className='d-flex flex-row'>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('ProjectDateStart', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('ProjectDateStart', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Старт проекта
                            </th>
                            <th>
                                <div className='d-flex flex-row'>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('ProjectDateStop', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('ProjectDateStop', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Стоп проекта
                            </th>
                            <th>
                                <div className='d-flex flex-row'>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('ProjectComment', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('ProjectComment', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Комментарий
                            </th>
                            <th>
                                Опции
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Project_s.map(par =>
                            <tr key={par.ProjectId}>
                                <td>{par.ProjectId}</td>
                                <td>{par.ProjectName}</td>
                                <td>{par.FizicsName + " " + par.FizicsSurname + " " + par.FizicsFamily}</td>
                                <td>{par.ProjectDateStart}</td>
                                <td>{par.ProjectDateStop}</td>
                                <td>{par.ProjectComment}</td>
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
                                        onClick={() => this.deleteClick(par.ProjectId)}>
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


                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>ProjectName</span>
                                    <input type='text' className='form-control'
                                        value={ProjectName}
                                        onChange={this.changeProjectName} />
                                </div>


                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>ProjectGip</span>
                                    <select className='form-select'
                                        onChange={this.changeProjectGip}
                                        value={ProjectGip}>
                                        {Fizics_s.map(par => <option key={par.FizicsId} value={par.FizicsId}>
                                            {par.FizicsName + " " + par.FizicsSurname + " " + par.FizicsFamily}
                                        </option>)}
                                    </select>
                                </div>





                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>ProjectDateStart</span>
                                    <input type='date' className='form-control'
                                        value={ProjectDateStart}
                                        onChange={this.changeProjectDateStart} />
                                </div>


                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>ProjectDateStop</span>
                                    <input type='date' className='form-control'
                                        value={ProjectDateStop}
                                        onChange={this.changeProjectDateStop} />
                                </div>


                                <div className="input-group">
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text'>ProjectComment</span>
                                    </div>
                                    <textarea className="form-control" aria-label="With textarea"
                                        value={ProjectComment}
                                        onChange={this.changeProjectComment} />
                                </div>


                                {ProjectId == 0 ?
                                    <button type='button' className='btn btn-primary float-start'
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}


                                {ProjectId != 0 ?
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