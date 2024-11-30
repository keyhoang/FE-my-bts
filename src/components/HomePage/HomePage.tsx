import React, { useState, useEffect } from 'react'
import FormSearch from '../../components/HomePage/FormSearch';
import DefaultLayout from '../../layouts/DefaultLayout';
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { FormValues, OptionSelect, TicketItemList } from '../../types/homePage';
import { getAllBranches, getAllCompany, getAllTownships, getTicketDetail, search } from '../../services/api';
import TicketItems from './TicketItems';
import { formatDate } from '../../utils/dateTime';
import { error } from 'console';

const HomePage: React.FC = () => {
    const [openFormSearch, setOpenFormSearch] = useState(false);
    const [companies, setCompanies] = useState<OptionSelect[]>([]);
    const [branches, setBranches] = useState<OptionSelect[]>([]);
    const [townships, setTownships] = useState<OptionSelect[]>([]);
    const [tickets, setTickets] = useState<TicketItemList[]>([]);

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const methods = useForm<FormValues>({
        shouldFocusError: false,
        defaultValues: {
            page: 1,
            size: 100,
            startDate: formatDate(sevenDaysAgo),
            endDate: formatDate(today)
        }
    });
    const formValues = methods.watch();

    // function 
    const handleOpenFormSearch = (isOpen: boolean) => {
        setOpenFormSearch(isOpen);
    };

    const onSubmit: SubmitHandler<FormValues> = data => {
        search(data)
            .then((res) => {
                setTickets(res)
            })
    }

    // side effect 
    useEffect(() => {
        Promise.all([
            getAllCompany(),
            getAllBranches(),
            getAllTownships()
        ])
            .then(([companiesRes, branchesRes, townshipsRes]) => {
                setCompanies(companiesRes);
                setBranches(branchesRes);
                setTownships(townshipsRes);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        search(formValues)
            .then((res) => {
                setTickets(res)
            })
    }, []);

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
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onSubmit)}>
                                    <div className="group-search">
                                        <div className='input-search'>
                                            <input
                                                type="text"
                                                className="input-form-control"
                                                placeholder='Search'
                                                {...methods.register("search")}
                                            />

                                            <button className="input-icon" type='submit'>
                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.4166 24.4999C19.5377 24.4999 24.4999 19.5377 24.4999 13.4166C24.4999 7.29543 19.5377 2.33325 13.4166 2.33325C7.29543 2.33325 2.33325 7.29543 2.33325 13.4166C2.33325 19.5377 7.29543 24.4999 13.4166 24.4999Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M25.6665 25.6666L23.3332 23.3333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>


                                        <div
                                            className={openFormSearch ? 'icon-search icon-search-active' : 'icon-search'}
                                            onClick={() => handleOpenFormSearch(!openFormSearch)}
                                        >
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.20001 2.80005H24.8C26.2667 2.80005 27.4667 4.00005 27.4667 5.46672V8.40005C27.4667 9.46672 26.8 10.8 26.1333 11.4667L20.4 16.5334C19.6 17.2 19.0667 18.5334 19.0667 19.6V25.3334C19.0667 26.1334 18.5333 27.2001 17.8667 27.6001L16 28.8C14.2667 29.8667 11.8667 28.6667 11.8667 26.5334V19.4667C11.8667 18.5334 11.3333 17.3334 10.8 16.6667L5.73334 11.3334C5.06667 10.6667 4.53334 9.46672 4.53334 8.66672V5.60005C4.53334 4.00005 5.73334 2.80005 7.20001 2.80005Z" stroke="#2C323F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14.5733 2.80005L8 13.3334" stroke="#2C323F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>


                                            {
                                                openFormSearch && (
                                                    <FormSearch
                                                        funcOpenFormSearch={handleOpenFormSearch}
                                                        companies={companies}
                                                        branches={branches}
                                                        townships={townships}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                </div>

                <div className='home-page-content'>
                    <div className='row'>
                        {
                            tickets.map(ticket => {
                                return (
                                    <TicketItems
                                        key={ticket.id}
                                        ticketDetail={ticket}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default HomePage
