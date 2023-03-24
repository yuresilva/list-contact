import router, { useRouter } from 'next/router';

import Head from 'next/head'
import { useEffect, useState } from "react";

import { IContact } from '../src/interfaces/global';
import Link, { LinkProps } from 'next/link';
import { Trash, PencilSimple, ArrowDown, CloudArrowDown, Plus } from '@phosphor-icons/react';
import { Loading } from '../src/components/Loading';
import { useContacts } from '../src/hooks/useContact';
import { Header } from '../src/components/Header';
import { api } from './api/axios';






function formatContact(contact: IContact) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const formattedName = contact.name.replace(/[0-9]/g, '');
  const formattedNumbers = contact.numbers.map((numb) => {
    const formattedDDD = `(${numb.number.toString().substring(0, 2)})`;
    const formattedNumber = `${numb.number.toString().substring(2, 3)}${numb.number.toString().substring(3, 7)}-${numb.number.toString().substring(7, 11)}`;
    return {
      ...numb,
      number: `${formattedDDD} ${formattedNumber}`,
    };
  });
  const formattedCpf = contact.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  const formattedDate = new Date(contact.date_born).toLocaleDateString('pt-BR');

  return {
    ...contact,
    name: formattedName,
    numbers: formattedNumbers,
    cpf: formattedCpf,
    date_born: formattedDate,
  };
}

export default function Home() {
  const { data, isLoading, error, isFetching, refetch } = useContacts();

  function handleDeleteContact(contactId: number) {

    api.delete(`/schedule/${contactId}`).then(response => {
      console.log(response);
      refetch();
    }
    ).catch(error => {
      console.log(error);
    })


  }


  function handleEditContact(contactId: number) {

    router.push(`/editar-contato/${contactId}`);
  }




  return (
    <main className="">

      <Head>
        <title>Agenda de telefone</title>
      </Head>
      <Header />

      {isLoading ? (
        <h2>Carregando...</h2>
      ) : error ? (
        <h1>Erro ao carregar</h1>
      ) : (
        <div className=" border rounded-lg shadow-lg flex max-w-6xl bg-slate-50 m-auto flex-col h-[600px] p-5 mt-[-50px]">
          <div className="flex flex-wrap justify-between items-center  pb-10">
            <div className="  ">
              <h1 className="text-3xl font-bold text-primary">Agenda {!isLoading && isFetching && < Loading color="secondary" size="small" />}</h1>
              <p className='font-bold pt-1 text-md'>Econtre  <span className='text-secondary'>todos</span> os seus contatos aqui:</p>
            </div>

            <div>
              <div className="mt-1 flex items-center">


                <Link href="/cadastrar-contato"
                  className="bg-secondary border-secondary border-2 m-5 flex flex-row w-full max-w-[240px] sm:w-fit self-center items-center justify-center rounded-md text-white px-4 py-2 cursor-pointer
                            "
                >
                  <Plus className="mr-3" size={20} />
                  Adicionar
                </Link>

              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-full overflow-y-auto">
            <table className="table  mx-auto max-w-[768px]">

              <thead className="">
                <tr className=''>
                  <th> Nome</th>
                  <th>E-mail </th>
                  <th>Telefone</th>
                  <th>Cpf</th>
                  <th>Data de nascimento</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((contact: IContact, index: number) => {
                  const formattedContact = formatContact(contact);
                  return (
                    <tr
                      key={contact.id}
                      className={" odd:bg-gray-100"}
                    >
                      <td className={` `}>
                        {formattedContact.name}
                      </td>
                      <td className=" text-neutral-400">
                        {formattedContact.email}
                      </td>
                      <td className="  text-neutral-400">
                        {formattedContact.numbers.map(numb => numb.number)}
                      </td>
                      <td className="  text-neutral-400">
                        {formattedContact.cpf}
                      </td>
                      <td className="text-neutral-400 ">
                        {formattedContact.date_born}
                      </td>

                      <td>
                        <div className="flex gap-5 cursor-pointer ">
                          <Trash
                            size={24}
                            className="hover:text-primary_accent"
                            onClick={() => handleDeleteContact(contact.id)}
                          />
                          <PencilSimple
                            size={24}
                            className="hover:text-primary_accent"
                            onClick={() => handleEditContact(contact.id)} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <div className="flex justify-center">
                </div>
              </tfoot>
            </table>
          </div>
        </div>

      )
      }

    </main >

  )
}
