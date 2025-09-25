import { RootState } from "../../types";

export const getOrders = (state: RootState) => state.websocketProfile.orders;
export const getTotal = (state: RootState) => state.websocketProfile.total;
export const getTotalToday = (state: RootState) => state.websocketProfile.totalToday;