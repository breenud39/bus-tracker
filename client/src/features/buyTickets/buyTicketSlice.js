import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import buyTicketService from './buyTicketService'

const initialState = {
  buyTickets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new ticket
export const createBuyTicket = createAsyncThunk(
  'buyTickets/create',
  async (buyTicketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await buyTicketService.createBuyTicket(buyTicketData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user tickets
export const getBuyTickets = createAsyncThunk(
  'buyTickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await buyTicketService.getBuyTickets(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user ticket
export const deleteBuyTicket = createAsyncThunk(
  'buyTickets/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await buyTicketService.deleteBuyTicket(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const buyTicketSlice = createSlice({
  name: 'buyTicket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBuyTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBuyTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.buyTickets.push(action.payload)
      })
      .addCase(createBuyTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBuyTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBuyTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.buyTickets = action.payload
      })
      .addCase(getBuyTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteBuyTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBuyTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.buyTickets = state.buyTickets.filter(
          (buyTicket) => buyTicket._id !== action.payload.id
        )
      })
      .addCase(deleteBuyTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = buyTicketSlice.actions
export default buyTicketSlice.reducer