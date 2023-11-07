import PropTypes from "prop-types"
import css from "./ContactList.module.css"
import { ContactListItem } from '../ContactListItem/ContactListItem'

export const ContactList = ({ contacts, removeEvt }) => (
    <ul className={css.list}>
        {contacts.map((user) => (

            <ContactListItem key={user.id} user={user} removeEvt={removeEvt}></ContactListItem>

        ))}
    </ul>)


ContactList.prototype = {
    contacts: PropTypes.array,
    removeEvt: PropTypes.func
}
