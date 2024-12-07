import React, {useEffect, useState} from "react";
import DefaultLayout from '../../layouts/DefaultLayout'
import iconBack from '../../assets/detail/images/icon-back.svg';
import iconFile from '../../assets/detail/images/icon-file.svg';
import Swal from "sweetalert2";
import {
    approvedTicketFuel,
    approvedTicketPrice,
    getTicketDetail,
    updateApprovedTicketFuel,
    updateApprovedTicketPrice, warningApproveFuel, warningApprovePrice
} from "../../services/api";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Detail: React.FC = () => {
    const { t} = useTranslation('translation');
    const [ticketDetail, setTicketDetail] = useState<any>(null);
    const { id } = useParams<{ id?: string }>();
    const [inputFuel, setInputFuel] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    const [inputPriceRefuel, setInputPriceRefuel] = useState('');
    const [inputNote, setInputNote] = useState('');
    const [errorInputFuel, setErrorInputFuel] = useState<string | null>(null);
    const [errorInputPrice, setErrorInputPrice] = useState<string | null>(null);
    const [errorInputPriceRefuel, setErrorInputPriceRefuel] = useState<string | null>(null);
    const [isApproved, setIsApproved] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const ticketId = id ? parseInt(id) : 0;
        getTicketDetail(ticketId).then((response) => {
            const data = response.data;
            setTicketDetail(data);
            if (data.supervisorAmount) {
                setInputFuel(String(data.supervisorAmount));
            }

            if (data.supervisorPrice) {
                setInputPrice(String(data.supervisorPrice));
            }

            if (data.pricePerFuel) {
                setInputPriceRefuel(String(data.pricePerFuel));
            }

            if (data.noteAmount || data.notePrice) {
                const currentUser = getCurrentUser();
                ['SUPERVISOR_LEVEL_2', 'HO_LEVEL_2'].includes(currentUser?.role) ? setInputNote(String(data.notePrice)) : setInputNote(String(data.noteAmount));
            }

            return;
        }).catch(() => {
            Swal.fire({
                icon: "error",
                title: "Failed to fetch ticket details",
                showConfirmButton: false,
                timer: 2000
            }).then().finally(() => {
                navigate(`/`);
            });
        });
    }, [isApproved]);

    const checkStatusSubmit = () => {
        return ticketDetail && ticketDetail.status === 'SUBMITTED';
    };

    const checkStatusApproveFuel = () => {
        return ticketDetail && ticketDetail.status === 'APPROVED_FUEL';
    };

    const checkStatusApprovePrice = () => {
        return ticketDetail && ticketDetail.status === 'APPROVED_PRICE';
    };

    const checkRoleFuel = () => {
        const currentUser = getCurrentUser();
        return ['SUPERVISOR_LEVEL_1', 'HO_LEVEL_1'].includes(currentUser?.role);
    }

    const checkRolePrice = () => {
        const currentUser = getCurrentUser();
        return ['SUPERVISOR_LEVEL_2', 'HO_LEVEL_2'].includes(currentUser?.role);
    }

    const getCurrentUser = () => {
        const user = localStorage.getItem('current_user');
        return user ? JSON.parse(user) : null;
    };

    const checkDisableApproveFuel = () => {
        return !checkRoleFuel() || (checkRoleFuel() && checkStatusApprovePrice());
    };

    const checkDisableApprovePrice = () => {
        return !checkRolePrice();
    };

    const checkDisableNote = () => {
        return ((checkStatusSubmit() && checkRolePrice()) || (checkStatusApproveFuel() && checkRoleFuel()) || (checkStatusApprovePrice() && checkRolePrice()));
    }

    const getButtonLabel = () => {
        if (checkStatusSubmit() || (checkStatusApproveFuel() && checkRolePrice())) {
            return 'Approve'
        }

        return 'Update'
    }

    const getStatusLabel = () => {
        const statusLabels: Record<string, string> = {
            APPROVED_FUEL: "Approved Fuel",
            APPROVED_PRICE: "Approved Price",
            SUBMITTED: "Submit",
        };
        return statusLabels[ticketDetail?.status];
    };

    const validateInputPrice = () => {
        if (!inputPrice.trim()) {
            setErrorInputPrice("Approve price is required.");
            return;
        }
        if (!inputPriceRefuel.trim()) {
            setErrorInputPriceRefuel("Price at the time of refueling is required.");
            return;
        }

        if (inputPrice === '0') {
            setErrorInputPrice("Please enter a valid number.");
            return;
        }

        if (inputPriceRefuel === '0') {
            setErrorInputPriceRefuel("Please enter a valid number.");
            return;
        }
    }

    const approve = async () => {
        try {
            const ticketId = id ? parseInt(id) : 0;

            if (checkStatusSubmit() && checkRoleFuel()) {
                if (!inputFuel.trim() && !checkDisableApproveFuel()) {
                    setErrorInputFuel("Approve fuel is required.");
                    return;
                }

                if (inputFuel === '0') {
                    setErrorInputFuel("Please enter a valid number.");
                    return;
                }

                const warningResponseFuel = await warningApproveFuel(ticketId);

                let confirmApprovalFuel = true;

                if (warningResponseFuel.status === true) {
                    const resultWarningFuel = await Swal.fire({
                        icon: "warning",
                        title: "Continue",
                        html: `Account ${warningResponseFuel.userFullName} approved this station on ${warningResponseFuel.date}.<br>Are you sure you want to approve?`,
                        showCancelButton: true,
                        confirmButtonText: "Continue",
                        cancelButtonText: "Cancel",
                        customClass: {
                            popup: "popup-warning",
                            confirmButton: "btn-approve-warning",
                            cancelButton: "btn-cancel-waring",
                            title: "title-warning",
                            icon: "icon-warning",
                            htmlContainer: "html-warning"
                        },
                        reverseButtons: true
                    });

                    if (!resultWarningFuel.isConfirmed) {
                        confirmApprovalFuel = false;
                    }
                }

                if (confirmApprovalFuel) {
                    await approvedTicketFuel(ticketId, parseFloat(inputFuel)).then(() => {
                        setIsApproved(true);
                        Swal.fire({
                            icon: "success",
                            title: "Approved success",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }).catch((res) => {
                        Swal.fire({
                            icon: "error",
                            title: res.message,
                            confirmButtonText: "OK",
                        });
                    });
                }
            }

            if ((checkStatusSubmit() || checkStatusApproveFuel()) && checkRolePrice()) {
                if (!checkDisableApprovePrice()) {
                    if (!inputPrice.trim()) {
                        setErrorInputPrice("Approve price is required.");
                        return;
                    }
                    if (!inputPriceRefuel.trim()) {
                        setErrorInputPriceRefuel("Price at the time of refueling is required.");
                        return;
                    }

                    validateInputPrice();
                }

                const warningResponsePrice = await warningApprovePrice();

                let confirmApprovalPrice = true;

                if (warningResponsePrice.status === true) {
                    const resultWarningPrice = await Swal.fire({
                        icon: "warning",
                        title: "Continue",
                        html: `Account ${warningResponsePrice.userFullName} approved this station on ${warningResponsePrice.date}.<br>Are you sure you want to approve?`,
                        showCancelButton: true,
                        confirmButtonText: "Continue",
                        cancelButtonText: "Cancel",
                        customClass: {
                            popup: "popup-warning",
                            confirmButton: "btn-approve-warning",
                            cancelButton: "btn-cancel-waring",
                            title: "title-warning",
                            icon: "icon-warning",
                            htmlContainer: "html-warning"
                        },
                        reverseButtons: true
                    });

                    if (!resultWarningPrice.isConfirmed) {
                        confirmApprovalPrice = false;
                    }
                }

                if (confirmApprovalPrice) {
                    await approvedTicketPrice(ticketId, parseFloat(inputPriceRefuel), parseFloat(inputPrice)).then(() => {
                        setIsApproved(true);
                        Swal.fire({
                            icon: "success",
                            title: "Approved success",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }).catch((res) => {
                        Swal.fire({
                            icon: "error",
                            title: res.message,
                            confirmButtonText: "OK",
                        });
                    });
                }
            }
        } catch (error) {
            console.error("Error approve ticket:", error);
        }
    };

    const update = async () => {
        try {
            const ticketId = id ? parseInt(id) : 0;

            if (checkStatusApproveFuel() && checkRoleFuel()) {
                if (!inputFuel.trim() && !checkDisableApproveFuel()) {
                    setErrorInputFuel("Approve fuel is required.");
                    return;
                }

                if (inputFuel === '0') {
                    setErrorInputFuel("Please enter a valid number.");
                    return;
                }

                await updateApprovedTicketFuel(ticketId, parseFloat(inputFuel), inputNote).then(() => {
                    setIsApproved(true);
                    Swal.fire({
                        icon: "success",
                        title: "Updated success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }).catch((res) => {
                    Swal.fire({
                        icon: "error",
                        title: res.message,
                        confirmButtonText: "OK",
                    });
                });
            }

            if (checkStatusApprovePrice() && checkRolePrice()) {
                if (!checkDisableApprovePrice()) {
                    validateInputPrice();
                }
                await updateApprovedTicketPrice(ticketId, parseFloat(inputPriceRefuel), parseFloat(inputPrice), inputNote).then(() => {
                    setIsApproved(true);
                    Swal.fire({
                        icon: "success",
                        title: "Updated success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }).catch((res) => {
                    Swal.fire({
                        icon: "error",
                        title: res.message,
                        confirmButtonText: "OK",
                    });
                });
            }
        } catch (error) {
            console.error("Error update approve ticket:", error);
        }
    };

    const submit = () => {
        if (getButtonLabel() === 'Approve') {
            return approve();
        }

        return update();
    }

    const handleInputFuel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^[0-9]*\.?[0-9]*$/.test(value)) {
            setInputFuel(value);
            setErrorInputFuel(null)
        }
    };

    const handleInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setInputPrice(value);
            setErrorInputPrice(null)
        }
    };

    const handleInputPriceRefuel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setInputPriceRefuel(value);
            setErrorInputPriceRefuel(null)
        }
    };

    const handleInputNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputNote(e.target.value);
    };

    const handleBackClick = () => {
        window.history.back();
    };

    const checkShowButtonSubmit = () => {
        const currentUser = getCurrentUser();
        return !(checkRoleFuel() && checkStatusApprovePrice()) && !(currentUser?.role === 'SUPERVISOR_LEVEL_2' && getButtonLabel() === 'Approve');
    }

    const handleDownload = async (fileUrl:string, customName: string) => {
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            // @ts-ignore
            const fileExtension = fileUrl.split('.').pop().toLowerCase();
            link.download = customName ? `${customName}.${fileExtension}` : `download.${fileExtension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file', error);
        }
    };

    return (
        <DefaultLayout>
            <div className={'wrapper-home-page'}>
                <div className={'detail-container'}>
                    <div className={'detail-content'}>
                        <div className={'detail-header'}>
                            <div>
                                <img className={'icon-back pb-3 pe-2'} src={iconBack} onClick={handleBackClick} style={{ cursor: "pointer" }}/>
                                <span className={'detail-title fw-bold'}>{t('detail')}</span>
                            </div>
                            { checkShowButtonSubmit() && (<button className={'btn-approve'} onClick={submit}>{ getButtonLabel() }</button>) }
                        </div>
                        <div className={'detail-main'}>
                            <div className={'detail-status'}>{ getStatusLabel() }</div>
                            <div className={'pt-4 d-flex justify-content-between input-list'}>
                                <div className={'d-flex flex-column w-100'}>
                                    <span className={'input-title'}>{t('approve-fuel')}</span>
                                    <div className="input-wrapper">
                                        <input className="input-approved"
                                               type="text"
                                               value={inputFuel}
                                               onChange={handleInputFuel}
                                               disabled={ checkDisableApproveFuel() }
                                        />
                                        <span className="input-suffix">
                                            <span className="separator">|</span>
                                            <span className="text">Liter</span>
                                        </span>
                                    </div>
                                    {errorInputFuel && <p style={{ color: "red", fontSize: "14px" }}>{errorInputFuel}</p>}
                                    {ticketDetail?.approveFuelAt && (
                                        <span>Approve fuel at: {ticketDetail.approveFuelAt}</span>
                                    )}
                                </div>
                            </div>
                            {!checkDisableApprovePrice() && (
                                <div className={'pt-4 d-flex justify-content-between input-list'}>
                                    <div className={'d-flex flex-column'}>
                                        <span className={'input-title'}>{t('approve-price')}</span>
                                        <div className="input-wrapper">
                                            <input className="input-approved"
                                                   type="text"
                                                   value={inputPrice}
                                                   onChange={handleInputPrice}
                                                   disabled={ checkDisableApprovePrice() }
                                            />
                                            <span className="input-suffix">
                                            <span className="separator">|</span>
                                            <span className="text">MMK/L</span>
                                        </span>
                                        </div>
                                        {errorInputPrice && <p style={{ color: "red", fontSize: "14px" }}>{errorInputPrice}</p>}
                                        {ticketDetail?.approvePriceAt && (
                                            <span>Approve price at: {ticketDetail.approvePriceAt}</span>
                                        )}
                                    </div>
                                    <div className={'d-flex flex-column'}>
                                        <span className={'input-title'}>{t('price-of')}</span>
                                        <div className="input-wrapper">
                                            <input className="input-approved"
                                                   type="text"
                                                   value={inputPriceRefuel}
                                                   onChange={handleInputPriceRefuel}
                                                   disabled={ checkDisableApprovePrice() }
                                            />
                                            <span className="input-suffix">
                                            <span className="separator">|</span>
                                            <span className="text">MMK/L</span>
                                        </span>
                                        </div>
                                        {errorInputPriceRefuel && <p style={{ color: "red", fontSize: "14px" }}>{errorInputPriceRefuel}</p>}
                                        {ticketDetail?.approvePriceAt && (
                                            <span>Approve price at: {ticketDetail.approvePriceAt}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className={'detail-info'}>
                                <div className={'d-flex justify-content-between'}>
                                    <span>{t('station-code')}</span>
                                    <span className={'fw-bold'}>{ ticketDetail?.stationCode }</span>
                                </div>
                                <hr/>
                                <div className={'d-flex justify-content-between'}>
                                    <span>{t('fuel')}</span>
                                    <span className={'fw-bold'}>{ ticketDetail?.staffAmount + "/L" }</span>
                                </div>
                                <hr/>
                                <div className={'d-flex justify-content-between'}>
                                    <span>{t('price')}</span>
                                    <span className={'fw-bold'}>{ ticketDetail?.staffPrice }MMK/L</span>
                                </div>
                                <hr/>
                                <div className={'d-flex justify-content-between'}>
                                    <span>{t('location')}</span>
                                    <span className={'fw-bold'}>Lat: { ticketDetail?.latitude }, Lng: { ticketDetail?.longitude }</span>
                                </div>
                                <hr/>
                                <div className={'d-flex justify-content-between'}>
                                    <span>Create at</span>
                                    <span className={'fw-bold'}>{ ticketDetail?.createdAt }</span>
                                </div>
                                <hr/>
                                <div className={'d-flex flex-column'}>
                                    <span className={'pb-4'}>{t('bill')}</span>
                                    {ticketDetail?.billUrl && (
                                        <img
                                            className="icon-back pb-3 pe-2"
                                            src={ticketDetail?.billUrl}
                                            alt="bill"
                                        />
                                    )}
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="pb-4">{t('file')}</span>
                                    {ticketDetail?.ticketFiles.length > 0 ? (
                                        ticketDetail.ticketFiles.map((file: any) => (
                                            <div key={file.id}
                                                 onClick={() => handleDownload(file.url, file.customName || `File-${file.id}`)}
                                                 className="input-file d-flex align-items-center mb-2"
                                                 style={{ cursor: "pointer" }}
                                            >
                                                {
                                                    file.extension === "html" || file.extension === "txt" ? (
                                                    <img
                                                        style={{marginRight: "8px", maxWidth: "50px", height: "auto"}}
                                                        src={file.url}
                                                        alt={`file-${file.id}`}
                                                    />
                                                ) : (
                                                    <span style={{marginRight: "8px"}}>
                                                        {file.extension.toUpperCase()}
                                                    </span>
                                                )}
                                                <span>{file.message || `File ${file.id}`}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="input-file">
                                            <img style={{ marginRight: "8px" }} src={iconFile} alt={"file"}/>
                                            <span>File' name</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        style={{display: "none"}}
                                    />
                                </div>
                            </div>
                            <div>
                                {getButtonLabel() === 'Update' && (
                                    <div className={'note d-flex flex-column'}>
                                        <span className={'pb-4'}>Note</span>
                                        <input
                                            className={'input-note'}
                                            type={'text'}
                                            value={inputNote}
                                            disabled={!checkDisableNote()}
                                            onChange={handleInputNote}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Detail;
