import React from 'react';
import { useDispatch } from 'react-redux'
import { deleteBuyTicket } from '../features/buyTickets/buyTicketSlice'

function BuyTicketItem({ buyTicket }) {
  const dispatch = useDispatch()

  return (
    <div className='buyTicket'>
      <div>{new Date(buyTicket.createdAt).toLocaleString('en-US')}</div>
      <h2>{buyTicket.text}</h2>
      <button onClick={() => dispatch(deleteBuyTicket(buyTicket._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default BuyTicketItem