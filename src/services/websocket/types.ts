import {TOrder} from "../types/data";

export type TWebSocket = {
    orders: TOrder[];
    total: number;
    totalToday: number;
};