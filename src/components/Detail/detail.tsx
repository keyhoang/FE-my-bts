import "./detail.css";
import React, {useEffect, useState} from "react";
import DefaultLayout from '../../layouts/DefaultLayout'
import iconBack from '../../assets/detail/images/icon-back.svg';
import iconFile from '../../assets/detail/images/icon-file.svg';
import {getTicketDetail} from "../../services/api";
import {useParams} from "react-router-dom";

const Detail: React.FC = () => {
    const [ticketDetail, setTicketDetail] = useState<any>(null);
    const { id } = useParams<{ id?: string }>();

    useEffect(() => {
        const fetchTicketDetail = async () => {
            try {
                const ticketId = id ? parseInt(id) : 0;
                const response = await getTicketDetail(ticketId);
                setTicketDetail(response);
            } catch (error) {
                console.error("Error fetching ticket details:", error);
            }
        };

        fetchTicketDetail();
    }, []);

    const checkStatusApproveFuel = () => {
        return !!(ticketDetail && ticketDetail.status === 'APPROVED_FUEL');
    };

    const checkStatusApprovePrice = () => {
        return !!(ticketDetail && ticketDetail.status === 'APPROVED_PRICE');
    };

    const formatToDMS = (value: number, type: 'latitude' | 'longitude') => {
        const isNegative = value < 0;
        const absoluteValue = Math.abs(value);
        const degrees = Math.floor(absoluteValue);
        const minutesFloat = (absoluteValue - degrees) * 60;
        const minutes = Math.floor(minutesFloat);
        const seconds = ((minutesFloat - minutes) * 60).toFixed(1);

        const direction =
            type === 'latitude'
                ? isNegative
                    ? 'S'
                    : 'N'
                : isNegative
                    ? 'W'
                    : 'E';

        return `${degrees}°${minutes}'${seconds}"${direction}`;
    };

    return (
        <DefaultLayout>
            <div className={'wrapper-home-page'}>
                <div className={'detail-container'}>
                    <div className={'detail-content'}>
                        <div className={'detail-header'}>
                            <div>
                                <img className={'icon-back pb-3 pe-2'} src={iconBack}/>
                                <span className={'detail-title fw-bold'}>Detail</span>
                            </div>
                            <button className={'btn-approve'}>Approve</button>
                        </div>
                        <div className={'detail-main'}>
                            <button className={'btn-submit'}>Submited</button>
                            <div className={'pt-4 d-flex justify-content-between'}>
                                <div className={'d-flex flex-column'}>
                                    <span className={'input-title'}>Approve Fuel</span>
                                    <div className="input-wrapper">
                                        <input className="input-approved" type="text" disabled={ checkStatusApproveFuel() }/>
                                        <span className="input-suffix">
                                            <span className="separator">|</span>
                                            <span className="text">Liter</span>
                                        </span>
                                    </div>
                                </div>
                                <div className={'d-flex flex-column'}>
                                    <span className={'input-title'}>Approve Price</span>
                                    <div className="input-wrapper">
                                        <input className="input-approved" type="text" disabled={ checkStatusApprovePrice() }/>
                                        <span className="input-suffix">
                                            <span className="separator">|</span>
                                            <span className="text">$/L</span>
                                        </span>
                                    </div>
                                </div>
                                <div className={'d-flex flex-column'}>
                                    <span className={'input-title'}>Price at the time of refueling</span>
                                    <div className="input-wrapper">
                                        <input className="input-approved" type="text" disabled={ checkStatusApprovePrice() }/>
                                        <span className="input-suffix">
                                            <span className="separator">|</span>
                                            <span className="text">$/L</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={'detail-info'}>
                                <div className={'d-flex justify-content-between'}>
                                    <span>Station code</span>
                                    <span className={'fw-bold'}>{ ticketDetail?.stationCode }</span>
                                </div>
                                <hr/>
                                <div className={'d-flex justify-content-between'}>
                                    <span>Fuel</span>
                                    <span className={'fw-bold'}>{ ticketDetail?.staffAmount }</span>
                                </div>
                                <hr/>
                                <div className={'d-flex justify-content-between'}>
                                    <span>Price</span>
                                    <span className={'fw-bold'}>{ ticketDetail?.staffPrice }$/L</span>
                                </div>
                                <hr/>
                                <div className={'d-flex justify-content-between'}>
                                    <span>Location</span>
                                    <span className={'fw-bold'}>{ formatToDMS(ticketDetail?.latitude, 'latitude') } { formatToDMS(ticketDetail?.latitude, 'longitude') }</span>
                                </div>
                                <hr/>
                                <div className={'d-flex flex-column'}>
                                    <span className={'pb-4'}>Bill</span>
                                    <img className={'icon-back pb-3 pe-2'} src={ticketDetail?.billUrl} alt="bill"/>
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="pb-4">File</span>
                                    {ticketDetail?.ticketFiles.length > 0 ? (
                                        ticketDetail.ticketFiles.map((file: any) => (
                                            <div key={file.id} className="input-file d-flex align-items-center mb-2">
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
                                {(checkStatusApproveFuel() || checkStatusApprovePrice()) && (
                                    <div className={'note d-flex flex-column'}>
                                        <span className={'pb-4'}>Note</span>
                                        <input className={'input-note'} type={'text'} />
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
