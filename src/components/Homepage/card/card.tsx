import React from "react";
import {SearchTicket} from "../../../model/searchTicket";
import classes from "../Homepage.module.css";
import {Status_Property1Submited} from "../Status_Property1Submited/Status_Property1Submited";
import {Status_Property1ApprovedFuel} from "../Status_Property1ApprovedFuel/Status_Property1ApprovedFuel";
import {Status_Property1ApprovePrice} from "../Status_Property1ApprovePrice/Status_Property1ApprovePrice";

interface CardProps {
    item: SearchTicket;
}

function renderButton(status : string) {
    switch (status) {
        case "APPROVED_FUEL" : return <Status_Property1ApprovedFuel/>;
        case "APPROVED_PRICE" : return <Status_Property1ApprovePrice/>;
        default : return <Status_Property1Submited/>;
    }
}

const Card: React.FC<CardProps> = ({ item }) => {
    return (
        <div className={classes.stack}>
            <div className={classes.frame1000001798}>
                <div className={classes.frame1000001797}>
                    <div className={classes.stationCode}>
                        <div className={classes.stationCode2}>{item.stationCode}</div>
                    </div>
                    <div className={classes.date}>
                        <div className={classes.company}>{item.company}</div>
                    </div>
                </div>
                {
                    renderButton(item.status)
                }

            </div>
            <div className={classes.fuel}>
                <div className={classes.fuel2}>Fuel</div>
                <div className={classes._20L}>{item.staffAmount}</div>
            </div>
            <div className={classes.price}>
                <div className={classes.price2}>Price</div>
                <div className={classes._2L}>{item.staffPrice}/L</div>
            </div>
            <div className={classes.date2}>
                <div className={classes._1112024}>{item.date}</div>
            </div>
        </div>
    );
};

export default Card;
