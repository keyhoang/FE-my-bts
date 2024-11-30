import {TicketFile} from "./TicketFile";

export interface TicketDetail {
    id: number;
    approvedAt: string | null;
    approvedBy: number | null;
    billExt: string | null;
    billUrl: string | null;
    createdAt: string;
    createdBy: number;
    latitude: string;
    longitude: string;
    noteAmount: string;
    notePrice: string | null;
    pricePerFuel: string | null;
    staffAmount: number;
    staffPrice: number;
    stationCode: string;
    status: string;
    supervisorAmount: number;
    supervisorPrice: string | null;
    ticketFiles: TicketFile[];
}