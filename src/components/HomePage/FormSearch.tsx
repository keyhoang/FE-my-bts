import React, { useEffect } from 'react';
import Select from 'react-select';
import { OptionSelect, StatusOptinal } from '../../types/homePage';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { handleDateFormSearch } from '../../utils/dateTime';
import {useTranslation} from "react-i18next";

interface Props {
    funcOpenFormSearch: (isOpen: boolean) => void;
    companies: OptionSelect[];
    branches: OptionSelect[];
    townships: OptionSelect[];
}

const FormSearch: React.FC<Props> = ({
    funcOpenFormSearch,
    companies,
    branches,
    townships
}) => {
    const { t} = useTranslation('translation');
    const {
        register,
        control,
        watch,
        setValue
    } = useFormContext();

    console.log("watch", watch());

    const [startDateFormSearch, endDateFormSearch] = handleDateFormSearch();
    const startDate = useWatch({ name: 'startDate', control });
    const endDate = useWatch({ name: 'endDate', control });

    // function to handle select change and set form value
    const handleChangeSelect = (selectedOption: OptionSelect | null, keyForm: string) => {
        if (selectedOption) {
            setValue(keyForm, selectedOption?.value);
        } else {
            setValue(keyForm, "");
        }
    };

    // side effect 
    useEffect(() => {
        if (startDate === "") {
            setValue('startDate', startDateFormSearch);
        }

        if (endDate === "") {
            setValue('endDate', endDateFormSearch);
        }
    }, [startDate, endDate]);

    return (
        <div
            className="blog-search-advanced"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="blog-search-advanced-header">
                <h4>{t('filter')}</h4>
            </div>

            <div className="blog-search-advanced-content">
                <div className="blog-search-advanced-content-item">
                    <div className="blog-search-advanced-content-item-date">
                        <div className="form-group">
                            <label htmlFor="">{t('from')}:</label>
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
                            <label htmlFor="">{t('to')}:</label>
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
                        <label htmlFor="">{t('status')}:</label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    classNamePrefix="select2-react-hook-form"
                                    options={StatusOptinal}
                                    isClearable={true}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: "#FD6D1A",
                                        },
                                    })}
                                    styles={{
                                        // Customize the dropdown options' text color
                                        option: (base, state) => ({
                                            ...base,
                                            color: state.isSelected ? "white" : state.data.color, // White for selected, dynamic for others
                                            cursor: "pointer",
                                        }),
                                    }}
                                    onChange={(selectedOption) => handleChangeSelect(selectedOption, 'status')}
                                    value={StatusOptinal.find(option => option.value === field.value)}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="blog-search-advanced-content-item">
                    <div className="form-group">
                        <label htmlFor="">{t('company')}:</label>
                        <Controller
                            name="company"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    classNamePrefix="select2-react-hook-form"
                                    options={companies}
                                    isClearable={true}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: "#FD6D1A",
                                        },
                                    })}
                                    onChange={(selectedOption) => handleChangeSelect(selectedOption, 'company')}
                                    value={companies.find(option => option.value === field.value)}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="blog-search-advanced-content-item">
                    <div className="form-group">
                        <label htmlFor="">{t('branch')}:</label>
                        <Controller
                            name="branch"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    classNamePrefix="select2-react-hook-form"
                                    options={branches}
                                    isClearable={true}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: "#FD6D1A",
                                        },
                                    })}
                                    onChange={(selectedOption) => handleChangeSelect(selectedOption, 'branch')}
                                    value={branches.find(option => option.value === field.value)}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="blog-search-advanced-content-item">
                    <div className="form-group">
                        <label htmlFor="">{t('township')}:</label>
                        <Controller
                            name="township"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    classNamePrefix="select2-react-hook-form"
                                    options={townships}
                                    isClearable={true}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: "#FD6D1A",
                                        },
                                    })}
                                    onChange={(selectedOption) => handleChangeSelect(selectedOption, 'township')}
                                    value={townships.find(option => option.value === field.value)}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-3 blog-search-advanced-content-item">
                    <button type="button" onClick={() => funcOpenFormSearch(false)}>
                        {t('cancel')}
                    </button>

                    <button type="submit">
                        {t('apply')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormSearch;
