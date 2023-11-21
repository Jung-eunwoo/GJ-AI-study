import React from 'react'
import SearchBox from './SearchBox'
import ContactItem from './ContactItem'
import { useSelector } from 'react-redux'

const ContactList = () => {
  const keyword = useSelector((state) => state.contact.keyword)
  const contacts = useSelector((state) => state.contact.contacts)
  return (
    <div>
      <SearchBox />
      <div className="contact-list">
        <h2>총 연락처: {contacts.length}</h2>
        <hr />
        <ContactItem />
      </div>
    </div>
  )
}

export default ContactList
