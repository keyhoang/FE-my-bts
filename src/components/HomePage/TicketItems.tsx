import React from 'react';
import {StatusClassBinding, TicketItemList} from '../../types/homePage';
import {StatusEnums} from '../../enums/statusEnums';
import {useNavigate} from 'react-router-dom';

interface Props {
    ticketDetail: TicketItemList
}

const TicketItems: React.FC<Props> = ({ticketDetail}) => {
    const navigate = useNavigate();

    const bindingClassStatus = (status: keyof typeof StatusEnums): string => {
        return StatusClassBinding[status];
    };

    const handleClickDetailTicket = (ticketId: number) => {
        navigate(`/ticket-detail/${ticketId}`);
    }

    const getCurrentUser = () => {
        const user = localStorage.getItem('current_user');
        return user ? JSON.parse(user) : null;
    };

    return (
        <>
            <div className="col-xl-3 col-sm-6 col-sx-12">
                <div className="item-card">
                    <div className="item-card-header">
                        <div className="item-card-header-left" onClick={() => handleClickDetailTicket(ticketDetail.id)}>
                            <span className='text-header'>
                                {ticketDetail?.stationCode}
                            </span>
                            <span className='text-note'>
                                {ticketDetail?.company}
                            </span>
                        </div>
                        <div className="item-card-header-right">
                            <div className={`badge-status ${bindingClassStatus(ticketDetail?.status || "SUBMITTED")}`}>
                                {ticketDetail?.status}
                            </div>
                        </div>
                    </div>

                    <div className="item-card-content">
                        {
                            ticketDetail?.status === StatusEnums.SUBMITTED ? (
                                <>
                                    <div className="item-card-content-field">
                                        <span>Fuel</span>
                                        <span>{ticketDetail?.staffAmount}L</span>
                                    </div>
                                    <div className="item-card-content-field">
                                        <span>Price</span>
                                        <span>{ticketDetail?.staffPrice}MMK/L</span>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <div className="item-card-content-field-many">
                                        <div>
                                            <div className="item-card-content-field">
                                                <span>Fuel</span>
                                                <span>{ticketDetail?.staffAmount}L</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="item-card-content-field">
                                                <span>Approve fuel</span>
                                                <span>{ticketDetail?.supervisorAmount}/L</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item-card-content-field-many">
                                        <div>
                                            <div className="item-card-content-field">
                                                <span>Price</span>
                                                <span>{ticketDetail?.staffPrice}MMK/L</span>
                                            </div>
                                        </div>
                                        {
                                            <div>
                                                <div className="item-card-content-field">
                                                    <span>Approve price</span>
                                                    {
                                                        ['SUPERVISOR_LEVEL_1', 'HO_LEVEL_1'].includes(getCurrentUser()?.role) ? null : (
                                                            (
                                                                <span>{ticketDetail?.supervisorPrice}MMK/L </span>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </div>

                                        }

                                    </div>
                                </div>
                            )
                        }

                        <div className="item-card-content-field-date">
                            {ticketDetail?.createdAt}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TicketItems
