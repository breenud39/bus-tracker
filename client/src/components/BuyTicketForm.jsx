import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBuyTicket } from '../features/buyTickets/buyTicketSlice'

function BuyTicketForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createBuyTicket({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Buy Ticket</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add buying
          </button>
        </div>
      </form>
    </section>
  )
}

export default BuyTicketForm