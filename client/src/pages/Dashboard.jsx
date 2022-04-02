//ES7+ React/Redux/React-Native snippets
//rfce to have the code snipshoot ** starting code **
import React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import BuyTicketForm from '../components/BuyTicketForm'
import BuyTicketItem  from '../components/BuyTicketItem'
import Spinner from '../components/Spinner'
import { getBuyTickets, reset } from '../features/buyTickets/buyTicketSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { buyTickets, isLoading, isError, message } = useSelector(
    (state) => state.buyTickets
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getBuyTickets())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>buyTicket Dashboard</p>
      </section>

      <BuyTicketForm/>

      <section className='content'>
        {buyTickets.length > 0 ? (
          <div className='buyTickets'>
            {buyTickets.map((buyTicket) => (
              <BuyTicketItem key={buyTicket._id} buyTicket={buyTicket} />
            ))}
          </div>
        ) : (
          <h3>You have not set any ticket buying</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard