
import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ContactList } from "./ContactsList/ContactList"
import { Filter } from "./Filter/Filter";
import { ContactsForm } from "./ContactsForm/ContactsForm"
import css from "./App.module.css"

const initValues = {
  name: '',
  number: '',
}


export class App extends Component {


  state = {
    contacts: [],
    filter: '',
    ...initValues,

  }
  //zadanie 3//
  async componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem("contacts")
    if (contactsFromLocalStorage !== null) {
      try {
        const parseContacts = JSON.parse(contactsFromLocalStorage)
        this.setState({
          contacts: parseContacts,
        })
      }
      catch (error) {
        console.log(error.name)
      }
    }

  }

  componentDidUpdate() {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
  }
  //koniec zadania 3//

  handleSubmit = (e) => {
    e.preventDefault();
    this.addContatcs();
    this.setState(initValues);

  }

  addContatcs = () => {
    const { contacts, name, number } = this.state
    const newName = name.toLowerCase();
    let nameOnList = false

    const newContact = { id: nanoid(), name: name, number: number };

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === newName) {
        alert(`${contact.name} is already in contacts`);
        nameOnList = true
      }
    });
    if (nameOnList === false) {
      return this.setState(prevState => ({
        contacts: prevState.contacts.concat(newContact),
      }))
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  toRemove = (userToRemove) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((user) => user.name !== userToRemove),
    }))
  }

  ToFind = (evt) => {
    this.setState({
      filter: evt.target.value.toLowerCase()
    })
  }

  FilteredContacts() {
    return this.state.contacts.filter(user => user.name.toLowerCase().includes(this.state.filter))
  }

  render() {
    const { filter, name, number } = this.state
    return (
      <div className={css.container}>
        <h1 className={css.header}>Phonebook</h1>
        <ContactsForm onSubmitForm={this.handleSubmit} onChangeForm={this.handleChange} inputName={name} inputNumber={number} />
        <h2 className={css.header}>Contacts</h2>
        <Filter value={filter} search={this.ToFind} />
        <ContactList contacts={this.FilteredContacts()} removeEvt={this.toRemove}></ContactList>
      </div >
    );
  }

}

