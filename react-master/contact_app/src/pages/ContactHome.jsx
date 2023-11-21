import React from 'react'
import ContactForm from '../components/ContactForm'
import ContactList from '../components/ContactList'

const ContactHome = () => {
  return (
    <div className='contact-home-container'>
      <h1>연락처 APP</h1>
      <div className='display-flex'>
        <ContactForm/>
        <ContactList/>
      </div>
    </div>
  )
}

export default ContactHome
