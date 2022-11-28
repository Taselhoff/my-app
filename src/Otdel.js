import { tsConstructorType } from '@babel/types';
import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Otdel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            otdels: [],
            modalTitle: "",
            place: "",
            name_otdel: "",
            numb: 0,
            udal_t002: 0,
            id002: 0,
            OtdelIdFilter: '',
            OtdelNameFilter: "",
            otdelsWithoutFilter: []
        }
    }
    FilterFn() {
        var OtdelIdFilter = this.state.OtdelIdFilter;
        var OtdelNameFilter = this.state.OtdelNameFilter;
        var filteredData = this.state.otdelsWithoutFilter.filter(
            function (el) {
                return el.OtdelId.toString().toLowerCase().includes(
                    OtdelIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.OtdelName.toString().toLowerCase().includes(
                        OtdelNameFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ otdels: filteredData });
    }
    sortResult(prop, asc) {
        var sortedData = this.state.otdelsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ otdels: sortedData });
    }
    changeOtdelIdFilter = (e) => {
        this.state.OtdelIdFilter = e.target.value;
        this.FilterFn();
    }
    changeOtdelNameFilter = (e) => {
        this.state.OtdelNameFilter = e.target.value;
        this.FilterFn();
    }
    refreshList() {
        fetch(variables.API_URL + 'otdel')
            .then(response => response.json())
            .then(data => {
                this.setState({ otdels: data, otdelsWithoutFilter: data });
            });
    }
    componentDidMount() {
        this.refreshList();
    }
    changeOtdelName = (e) => {
        this.setState({ name_otdel: e.target.value });
    }
    addClick() {
        this.setState({
            modalTitle: 'Add Otdel',
            place: '',
            numb: '',
            udal_t002: 0,
            id002: 0,
            name_otdel: ''
        });
    }
    editClick(otd) {
        this.setState({
            modalTitle: 'Edit Otdel',
            id002: otd.OtdelId,
            place: otd.place,
            numb: otd.numb,
            udal_t002: otd.udal_t002,
            name_otdel: otd.name_otdel
        });
    }
    createClick() {
        fetch(variables.API_URL + 'otdel', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name_otdel: this.state.name_otdel,
                place: this.state.place,
                numb: this.state.numb,
                udal_t002: this.state.udal_t002
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
        fetch(variables.API_URL + 'otdel', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id002: this.state.id002,
                name_otdel: this.state.name_otdel,
                place: this.state.place,
                numb: this.state.numb,
                udal_t002: this.state.udal_t002
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
            fetch(variables.API_URL + 'otdel/' + id, {
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
        const { otdels, modalTitle, id002, name_otdel, place, numb, udal_t002 } = this.state;
        return (
            <div>
                <button type='button' className='btn btn-primary m-2 float-end'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Добавить Отдел
                </button>


                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className='d-flex flex-row'>
                                    <input className='form-control m-2'
                                        onChange={this.changeOtdelIdFilter}
                                        placeholder="Filter" />

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('id002', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('id002', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>

                                </div>

                                id002
                            </th>
                            <th>
                                <div className='d-flex flex-row'>
                                    <input className='form-control m-2'
                                        onChange={this.changeOtdelNameFilter}
                                        placeholder="Filter" />

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('name_otdel', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type='button' className='btn btn-light'
                                        onClick={() => this.sortResult('name_otdel', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                name_otdel
                            </th>

                            <th>
                            place
                            </th>

                            <th>
                            numb
                            </th>

                            <th>
                            udal_t002
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {otdels.map(otd =>
                            <tr key={otd.id002}>
                                <td>{otd.id002}</td>
                                <td>{otd.name_otdel}</td>
                                <td>{otd.place}</td>
                                <td>{otd.numb}</td>
                                <td>{otd.udal_t002}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle='modal'
                                        data-bs-target='#exampleModal'
                                        onClick={() => this.editClick(otd)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(otd.id002)}>
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
                                    <span className='input-group-text'>name_otdel</span>
                                    <input type='text' className='form-control'
                                        value={name_otdel}
                                        onChange={this.changeOtdelName} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>place</span>
                                    <input type='text' className='form-control'
                                        value={place}
                                        onChange={this.changeOtdelName}/>
                                </div>


                                <div className='input-group mb-3'>
                                    <span className='input-group-int'>numb</span>
                                    <input type='text' className='form-control'
                                        value={numb}
                                        onChange={this.changeOtdelName}/>
                                </div>

                                <div className='input-group mb-3'>
                                    <span className='input-group-int'>udal_t002</span>
                                    <input type='text' className='form-control'
                                        value={udal_t002}
                                        onChange={this.changeOtdelName}/>
                                </div>

                                {id002 == 0 ?
                                    <button type='button' className='btn btn-primary float-start'
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}
                                {id002 != 0 ?
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