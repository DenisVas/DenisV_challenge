import { contactsReducer } from 'store/reducers'
import { GET_CONTACTS_LIST } from 'store/actions/action-types'
import { mockUser } from 'components/containers/ContactList/mockUser';

it('contactsreducer should return the initial state', () => {
    expect(contactsReducer(undefined, {})).toEqual({ contacts: [] });
})

it('contactsreducer should handle GET_CONTACTS_LIST action', () => {
    expect( contactsReducer([], {type: GET_CONTACTS_LIST, data: mockUser.data})).toEqual({ contacts: mockUser.data });
});