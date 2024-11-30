import React from 'react';
import Select from 'react-select';
import { OptionSelect, StatusOptinal } from '../../types/homePage';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
    funcOpenFormSearch: (isOpen: boolean) => void;
    companies: OptionSelect[]
    branches: OptionSelect[]
    townships: OptionSelect[]
}

const FormSearch: React.FC<Props> = ({
    funcOpenFormSearch,
    companies,
    branches,
    townships
}) => {

    const {
        register,
        watch,
        setValue
    } = useFormContext();

    console.log("watch", watch())

    // funciton 
    const handleChangeSelect = (selectedOption: OptionSelect | null, keyForm: string) => {
        if (selectedOption) {
            setValue(keyForm, selectedOption?.value);
        }
    };
    
    return (
        <div
            className="blog-search-advanced"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="blog-search-advanced-header">
                <h4>Filter</h4>
            </div>

            <div className="blog-search-advanced-content">
                <div className="blog-search-advanced-content-item">
                    <div className="blog-search-advanced-content-item-date">
                        <div className="form-group">
                            <label htmlFor="">From:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateInput"
                                {...register("startDate")}
                            />
                        </div>
                    </div>
                    <div className="blog-search-advanced-content-item-date">
                        <div className="form-group">
                            <label htmlFor="">To:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateInput"
                                {...register("endDate")}
                            />
                        </div>
                    </div>
                </div>

                <div className="blog-search-advanced-content-item">
                    <div className="form-group">
                        <label htmlFor="">Status:</label>
                        <Select
                            classNamePrefix="select2-react-hook-form"
                            options={StatusOptinal}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: "#FD6D1A",
                                },
                            })}
                            {...register("status")}
                            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'status')}
                        />
                    </div>
                </div>

                <div className="blog-search-advanced-content-item">
                    <div className="form-group">
                        <label htmlFor="">Company:</label>
                        <Select
                            classNamePrefix="select2-react-hook-form"
                            options={companies}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: "#FD6D1A",
                                },
                            })}
                            {...register("company")}
                            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'company')}
                        />
                    </div>
                </div>

                <div className="blog-search-advanced-content-item">
                    <div className="form-group">
                        <label htmlFor="">Branch:</label>
                        <Select
                            classNamePrefix="select2-react-hook-form"
                            options={branches}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: "#FD6D1A",
                                },
                            })}
                            {...register("branch")}
                            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'branch')}
                        />
                    </div>
                </div>

                <div className="blog-search-advanced-content-item">
                    <div className="form-group">
                        <label htmlFor="">Township:</label>
                        <Select
                            classNamePrefix="select2-react-hook-form"
                            options={townships}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: "#FD6D1A",
                                },
                            })}
                            {...register("township")}
                            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'township')}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-3 blog-search-advanced-content-item">
                    <button onClick={() => funcOpenFormSearch(false)}>
                        Cancel
                    </button>

                    <button type='submit'>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormSearch
