import PropTypes from "prop-types"
import css from '../ContactsList/ContactList.module.css'

export const ContactListItem = ({ user, removeEvt }) => {

    return (
        <li className={css.listItem}>
            {user.name}: {user.number}
            <button className={css.removeBtn} onClick={() => removeEvt(user.name)} type="button">REMOVE</button>
        </li>)
}




ContactListItem.prototype = {
    user: PropTypes.array,
    removeEvt: PropTypes.func
}
