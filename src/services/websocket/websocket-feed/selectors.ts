import { RootState } from "../../types";

export const getOrders = (state: RootState) => state.websocketFeed.orders;
export const getTotal = (state: RootState) => state.websocketFeed.total;
export const getTotalToday = (state: RootState) => state.websocketFeed.totalToday;