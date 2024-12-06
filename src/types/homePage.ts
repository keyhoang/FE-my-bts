import { StatusEnums } from "../enums/statusEnums";

export interface OptionSelect {
    label: string
    value: string
}

export interface FormValues {
    search: string,
    startDate: string,
    endDate: string,
    page: number,
    size: number,
    branch: string,
    company: string,
    township: string,
    status: string
}

export const StatusOptinal = [
    {
        label: "Approve fuel",
        value: StatusEnums.APPROVED_FUEL,
        color: '#007AFF'
    },
    {
        label: "Approve price",
        value: StatusEnums.APPROVED_PRICE,
        color: '#00C7BE'
    },
    {
        label: "Submitted",
        value: StatusEnums.SUBMITTED,
        color: '#34C759'
    }
];

export const StatusClassBinding = {
    [StatusEnums.SUBMITTED]: "badge-status-submited",
    [StatusEnums.APPROVED_FUEL]: "badge-status-approved-fuel",
    [StatusEnums.APPROVED_PRICE]: "badge-status-approved-price",
}

export interface TicketItemList {
    id: number;
    stationCode?: string,
    staffAmount?: number,
    staffPrice?: number,
    supervisorAmount?: number,
    supervisorPrice?: number,
    status: keyof typeof StatusEnums,
    latitude?: number,
    longitude?: number,
    createdBy?: string,
    createdAt?: string,
    branch?: string,
    company?: string,
    township?: string
}


