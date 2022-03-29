import axios from 'axios'

const API_URL = '/api/buyTickets/'

// Create new ticket
const createBuyTicket = async (buyTicketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, buyTicketData, config)

  return response.data
}

// Get user ticket
const getBuyTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user ticket
const deleteBuyTicket = async (buyTicketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + buyTicketId, config)

  return response.data
}

const buyTicketService = {
    createBuyTicket,
    getBuyTickets,
    deleteBuyTicket,
}

export default buyTicketService 