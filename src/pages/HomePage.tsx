import React, { useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout';
import Select from 'react-select';
import { OptionStatus } from '../types/homePage';

const HomePage = () => {
    const [optionsStatus, setOptionsStatus] = useState < Array < OptionStatus >> ([]);

    return (
        <DefaultLayout>
            <div className='wrapper-home-page'>
                <div className='home-page-header'>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-sx-12">
                            <div className='group-btn-export'>
                                <button className="btn-custom-primary">
                                    <i className="fa-solid fa-file-arrow-down"></i>
                                    Export
                                </button>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12 col-sx-12">
                            <div className="group-search">
                                <div className='input-search'>
                                    <input type="text" className="input-form-control" placeholder='Search' />

                                    <div className='input-icon'>
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.4166 24.4999C19.5377 24.4999 24.4999 19.5377 24.4999 13.4166C24.4999 7.29543 19.5377 2.33325 13.4166 2.33325C7.29543 2.33325 2.33325 7.29543 2.33325 13.4166C2.33325 19.5377 7.29543 24.4999 13.4166 24.4999Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M25.6665 25.6666L23.3332 23.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>


                                <div
                                    className="icon-search"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.20001 2.80005H24.8C26.2667 2.80005 27.4667 4.00005 27.4667 5.46672V8.40005C27.4667 9.46672 26.8 10.8 26.1333 11.4667L20.4 16.5334C19.6 17.2 19.0667 18.5334 19.0667 19.6V25.3334C19.0667 26.1334 18.5333 27.2001 17.8667 27.6001L16 28.8C14.2667 29.8667 11.8667 28.6667 11.8667 26.5334V19.4667C11.8667 18.5334 11.3333 17.3334 10.8 16.6667L5.73334 11.3334C5.06667 10.6667 4.53334 9.46672 4.53334 8.66672V5.60005C4.53334 4.00005 5.73334 2.80005 7.20001 2.80005Z" stroke="#2C323F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14.5733 2.80005L8 13.3334" stroke="#2C323F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>

                                <div 
                                    className="blog-search-advanced dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="blog-search-advanced-header">
                                        <h4>Filter</h4>
                                    </div>

                                    <div className="blog-search-advanced-content">
                                        <div className="blog-search-advanced-content-item">

                                        </div>

                                        <div className="blog-search-advanced-content-item">
                                            <div className="form-group">
                                                <label htmlFor="">Status:</label>
                                                <Select options={optionsStatus} />
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center gap-3 blog-search-advanced-content-item">
                                            <button className="">
                                                Cancel
                                            </button>

                                            <button className="">
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='home-page-content'>
                    <div className='row'>
                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-submited'>
                                            Submited
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div className="item-card-content-field">
                                        <span>Fuel</span>
                                        <span>20L</span>
                                    </div>
                                    <div className="item-card-content-field">
                                        <span>Price</span>
                                        <span>2$/L</span>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-approved'>
                                            Submited
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div>
                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-approved-fuel'>
                                            Approved Fuel
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div>
                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-approved-price'>
                                            Approved Price
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div>
                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-submited'>
                                            Submited
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div className="item-card-content-field">
                                        <span>Fuel</span>
                                        <span>20L</span>
                                    </div>
                                    <div className="item-card-content-field">
                                        <span>Price</span>
                                        <span>2$/L</span>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-approved'>
                                            Submited
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div>
                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-approved-fuel'>
                                            Approved Fuel
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div>
                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-approved-price'>
                                            Approved Price
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div>
                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-submited'>
                                            Submited
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div className="item-card-content-field">
                                        <span>Fuel</span>
                                        <span>20L</span>
                                    </div>
                                    <div className="item-card-content-field">
                                        <span>Price</span>
                                        <span>2$/L</span>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-approved'>
                                            Submited
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div>
                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-approved-fuel'>
                                            Approved Fuel
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div>
                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-sx-12">
                            <div className="item-card">
                                <div className="item-card-header">
                                    <div className="item-card-header-left">
                                        <span className='text-header'>
                                            Station code
                                        </span>
                                        <span className='text-note'>
                                            Company
                                        </span>
                                    </div>
                                    <div className="item-card-header-right">
                                        <div className='badge-status badge-status-approved-price'>
                                            Approved Price
                                        </div>
                                    </div>
                                </div>

                                <div className="item-card-content">
                                    <div>
                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-card-content-field-many">
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Fuel</span>
                                                    <span>20L</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Price</span>
                                                    <span>2$/L</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-content-field-date">
                                        1/11/2024
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default HomePage
