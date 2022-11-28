import { tsConstructorType } from '@babel/types';
import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Loadhours extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadhours_s: [],
            modalTitle: "",
            id009: 0,
            id007: 0,
            id003: 0,
            hours: "",
            time_save: "",
            on_date: "",
            udal_t009: 0,
            about: "",
            name_proj: "",
            about_proj: "",
            udal_proj: 0,
            stage_proj: "",
            nomdogov_proj: "",
            rabnaimen_proj: "",
            contrag_proj: "",
            numb_proj: 0,
            numbsdel_proj: "",
            fam: "",
            nam: "",
            sur: "",
            about_sotr: "",
            udal_sotr: 0,
            loadhoursIdFilter: '',
            loadhoursNameFilter: "",
            loadhoursWithoutFilter: []
        }
    }
    FilterFn() {
        var loadhoursIdFilter = this.state.loadhoursIdFilter;
        var loadhoursNameFilter = this.state.loadhoursNameFilter;
        var filteredData = this.state.loadhoursWithoutFilter.filter(
            function (el) {
                return el.id009.toString().toLowerCase().includes(
                    loadhoursIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.name_proj.toString().toLowerCase().includes(
                        loadhoursNameFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ loadhours_s: filteredData });
    }
    sortResult(prop, asc) {
        var sortedData = this.state.loadhoursWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ loadhours_s: sortedData });
    }
    changeOtdelIdFilter = (e) => {
        this.state.loadhoursIdFilter = e.target.value;
        this.FilterFn();
    }
    changeOtdelNameFilter = (e) => {
        this.state.loadhoursNameFilter = e.target.value;
        this.FilterFn();
    }
    refreshList() {
        fetch(variables.API_URL + 'loadhours')
            .then(response => response.json())
            .then(data => {
                this.setState({ loadhours_s: data});
            });
    }
    componentDidMount() {
        this.refreshList();
    }

    render() {
        const { loadhours_s, 
            modalTitle, 
            id009,
            id007,
            id003,
            hours,
            time_save,
            on_date,
            udal_t009,
            about,
            name_proj,
            about_proj,
            udal_proj,
            stage_proj,
            nomdogov_proj,
            rabnaimen_proj,
            contrag_proj,
            numb_proj,
            numbsdel_proj,
            fam,
            nam,
            sur,
            about_sotr,
            udal_sotr
        } = this.state;
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                            id009
                            </th>
                            <th>
                            id007
                            </th>
                            <th>
                            id003
                            </th>
                            <th>
                            hours
                            </th>
                            <th>
                            time_save
                            </th>
                            <th>
                            on_date
                            </th>
                            <th>
                            udal_t009
                            </th>
                            <th>
                            about
                            </th>
                            <th>
                            name_proj
                            </th>
                            <th>
                            about_proj
                            </th>
                            <th>
                            udal_proj
                            </th>
                            <th>
                            stage_proj
                            </th>
                            <th>
                            nomdogov_proj
                            </th>
                            <th>                            
            rabnaimen_proj
                            </th>
                            <th>
            contrag_proj
                            </th>
                            <th>
            numb_proj
                            </th>
                            <th>
            numbsdel_proj
                            </th>
                            <th>
            ФИО
                            </th>
                            <th>
            about_sotr
                            </th>
                            <th>
            udal_sotr
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadhours_s.map(par =>
                            <tr key={par.id009}>
                                <td>{par.id009}</td>
                                <td>{par.id007}</td>
                                <td>{par.id003}</td>
                                <td>{par.hours}</td>
                                <td>{par.time_save}</td>
                                <td>{par.on_date}</td>
                                <td>{par.udal_t009}</td>
                                <td>{par.about}</td>
                                <td>{par.name_proj}</td>
                                <td>{par.about_proj}</td>
                                <td>{par.udal_proj}</td>
                                <td>{par.stage_proj}</td>
                                <td>{par.nomdogov_proj}</td>
                                <td>{par.rabnaimen_proj}</td>
                                <td>{par.contrag_proj}</td>
                                <td>{par.numb_proj}</td>
                                <td>{par.numbsdel_proj}</td>
                                <td>{par.fam + " " + par.nam + " " + par.sur}</td>
                                <td>{par.about_sotr}</td>
                                <td>{par.udal_sotr}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}