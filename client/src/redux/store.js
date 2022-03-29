import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import buyTicketReducer from '../features/buyTickets/buyTicketSlice'
export const store = configureStore({
    reducer: {
      auth: authReducer,
      buyTickets: buyTicketReducer,
       
    },
});