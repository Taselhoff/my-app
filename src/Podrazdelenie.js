import { tsConstructorType } from '@babel/types';
import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Podrazdelenie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            podrazdelenies: [],
            modalTitle: "",
            PodrazdelenieName: "",
            PodrazdelenieComment: "",
            PodrazdelenieId: 0,
            PodrazdelenieIdFilter: '',
            PodrazdelenieNameFilter: "",
            podrazdeleniesWithoutFilter: []
        }
    }

    FilterFn() {
        var PodrazdelenieIdFilter = this.state.PodrazdelenieIdFilter;
        var PodrazdelenieNameFilter = this.state.PodrazdelenieNameFilter;
        var filteredData = this.state.podrazdeleniesWithoutFilter.filter(
            function (el) {
                return el.PodrazdelenieId.toString().toLowerCase().includes(
                    PodrazdelenieIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.PodrazdelenieName.toString().toLowerCase().includes(
                        PodrazdelenieNameFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ podrazdelenies: filteredData });
    }

    sortResult(prop, asc) {
        var sortedData = this.state.podrazdeleniesWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ podrazdelenies: sortedData });
    }

    changePodrazdelenieIdFilter = (e) => {
        this.state.PodrazdelenieIdFilter = e.target.value;
        this.FilterFn();
    }
    changePodrazdelenieNameFilter = (e) => {
        this.state.PodrazdelenieNameFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch(variables.API_URL + 'podrazdelenie')
            .then(response => response.json())
            .then(data => {
                this.setState({ podrazdelenies: data, podrazdeleniesWithoutFilter: data });
            });
    }
    componentDidMount() {
        this.refreshList();
    }

    changePodrazdelenieName = (e) => {
        this.setState({ PodrazdelenieName: e.target.value });
    }
    changePodrazdelenieComment = (e) => {
        this.setState({ PodrazdelenieComment: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: 'Add Podrazdelenie',
            PodrazdelenieId: 0,
            PodrazdelenieName: '',
            PodrazdelenieComment: ''
        });
    }
    editClick(par) {
        this.setState({
            modalTitle: 'Edit Podrazdelenie',
            PodrazdelenieId: par.PodrazdelenieId,
            PodrazdelenieName: par.PodrazdelenieName,
            PodrazdelenieComment: par.PodrazdelenieComment
        });
    }
    createClick() {
        fetch(variables.API_URL + 'podrazdelenie', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PodrazdelenieName: this.state.PodrazdelenieName,
                PodrazdelenieComment: this.state.PodrazdelenieComment
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

    updateClick() {
        fetch(variables.API_URL + 'podrazdelenie', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PodrazdelenieId: this.state.PodrazdelenieId,
                PodrazdelenieName: this.state.PodrazdelenieName,
                PodrazdelenieComment: this.state.PodrazdelenieComment
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
            fetch(variables.API_URL + 'podrazdelenie/' + id, {
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
        const { podrazdelenies, modalTitle, PodrazdelenieId, PodrazdelenieName, PodrazdelenieComment } = this.state;
        return (
            <div>
                <button type='button' className='btn btn-primary m-2 float-end'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Добавить Подразделение
                </button>


                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>
                                <div className='d-flex flex-row'>
                                    <input className='form-control m-2'
                                        onChange={this.changePodrazdelenieIdFilter}
                                        placeholder="Filter" />

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('PodrazdelenieId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('PodrazdelenieId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>

                                </div>

                                PodrazdelenieId
                            </th>
                            <th>
                                <div className='d-flex flex-row'>
                                    <input className='form-control m-2'
                                        onChange={this.changePodrazdelenieNameFilter}
                                        placeholder="Filter" />

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('PodrazdelenieName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('PodrazdelenieName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>


                                PodrazdelenieName
                            </th>
                            <th>
                                <div className='d-flex flex-row'>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('PodrazdelenieComment', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>


                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('PodrazdelenieComment', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                PodrazdelenieComment
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {podrazdelenies.map(par =>
                            <tr key={par.PodrazdelenieId}>
                                <td>{par.PodrazdelenieId}</td>
                                <td>{par.PodrazdelenieName}</td>
                                <td>{par.PodrazdelenieComment}</td>
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
                                        onClick={() => this.deleteClick(par.DepartmentId)}>
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
                                    <span className='input-group-text'>PodrazdelenieName</span>
                                    <input type='text' className='form-control'
                                        value={PodrazdelenieName}
                                        onChange={this.changePodrazdelenieName} />
                                </div>

                                <div className="input-group">
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text'>PodrazdelenieComment</span>
                                    </div>
                                    <textarea className="form-control" aria-label="With textarea"
                                        value={PodrazdelenieComment}
                                        onChange={this.changePodrazdelenieComment} />
                                </div>

                                {PodrazdelenieId == 0 ?
                                    <button type='button' className='btn btn-primary float-start'
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {PodrazdelenieId != 0 ?
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