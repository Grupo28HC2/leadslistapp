import React from 'react';

import { useState, useEffect } from 'react';

import api from './api';

import 'vtex-tachyons'


interface LeadsList {}

interface Leads{
  customer_date?: string
  email: string
  id: string
  name: string
  telephone: string
  prospect_date?: string
}


const LeadsList: StorefrontFunctionComponent<LeadsList> = ({}) => {


  const [leads, setLeads] = useState<Leads[]>([]);

  async function getLeads(){
    const response = await api.get('/leads')

    setLeads(response.data.prospectos)
    
    console.log(response.data.prospectos)
  }

  useEffect( () => {
    getLeads();   
  });


  return (
      <div className="w-80 center pt4">
        <div className="">
          <div className="">
          <div>
            <h1 className="f1">Lista de Leads</h1>
          </div>

          <div className="">
            <table className="f6 mb5 w-100 center">
              <thead className="">
                <tr className="stripe-dark">
                <th className="fw6 tl bb b--black-20 pt2 bg-white">id</th>
                <th className="fw6 tl bb b--black-20 pt2 bg-white">Nome</th>
                <th className="fw6 tl bb b--black-20 pt2 bg-white">E-mail</th>
                <th className="fw6 tl bb b--black-20 pt2 bg-white">Telefone</th>
                <th className="fw6 tl bb b--black-20 pt2 bg-white">Data de Cadastro</th>
                <th className="fw6 tl bb b--black-20 pt2 bg-white">Primeira Compra</th>
                </tr>
              </thead>

              <tbody className="lh-copy">
              {leads.length > 0 ?
                leads.map(lead => (
                  <tr className="stripe-dark bb b--black-20"  key={lead.email}>
                    <td className="tl bb b--black-20 pt2">{lead.id}</td>
                    <td className="tl bb b--black-20 pt2">{lead.name}</td>
                    <td className="tl bb b--black-20 pt2">{lead.email}</td>
                    <td className="tl bb b--black-20 pt2">{lead.telephone}</td>
                    <td className="tl bb b--black-20 pt2">{lead.prospect_date === '' ? '-': lead.prospect_date}</td>
                    <td className="tl bb b--black-20 pt2">{lead.customer_date === '' ? '-': lead.customer_date}</td>
                  </tr>
                )) : ''}
              </tbody>
            </table>
          </div>
          </div>
        </div>

    </div>
  )}


LeadsList.schema = {
  title: 'editor.leadslist.title',
  description: 'editor.leadslist.description',
  type: 'object',
  properties: {},
}

export default LeadsList