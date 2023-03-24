import { useQuery } from 'react-query';
import { api } from '../../pages/api/axios';
import { IContact } from '../interfaces/global';


async function getContacts(): Promise<IContact[]> {
  const { data } = await api.get('schedule');


  const contacts = data.data.map((contact: IContact) => {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      numbers: contact.numbers,
      cpf: contact.cpf,
      date_born: contact.date_born,
    };
  });

  return contacts;
}


export function useContacts() {
  return useQuery('contacts', getContacts, {
    staleTime: 1000 * 5, // 5 seconds
  });
}
