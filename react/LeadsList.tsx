import React from 'react';

import { useState, useEffect } from 'react';

import api from './api';

import './styles/basicstyles'

import 'vtex-tachyons'

import { useCssHandles } from 'vtex.css-handles'


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

  const CSS_HANDLES = ['container', 'tableBackground', 'tableTitle', 'tableContainer', 'tableHead', 'tableHeadRow','tableHeadDiv' ,'tableBody' ,'tableBodyRow', 'tableBodyDiv' ,'tableText', 'tableItem'] as const
  
  const handles = useCssHandles(CSS_HANDLES)  

  const [leads, setLeads] = useState<Leads[]>([]);

  async function getLeads(){
    const response = await api.get('/leads')

    setLeads(response.data.prospectos)
    
  }

  useEffect( () => {
    getLeads();   
  }, []);


  return (
      <div>
        <div className={`${handles.container} w-80 center pt4`}>
        <div className={handles.tableBackground}>
          <div className="">
          <div>
            <h1 className={`${handles.tableTitle} f1`}>Lista de Leads</h1>
          </div>

          <div className="">
            <table className={`${handles.tableContainer} f6 mb5 w-100 center`}>
              <thead className={handles.tableHead}>
                <tr className={`${handles.tableHeadRow} stripe-dark`}>
                <th className={`${handles.tableHeadDiv} fw6 tl bb b--black-20 pt2 bg-white`}>Nome</th>
                <th className={`${handles.tableHeadDiv} fw6 tl bb b--black-20 pt2 bg-white`}>E-mail</th>
                <th className={`${handles.tableHeadDiv} fw6 tl bb b--black-20 pt2 bg-white`}>Telefone</th>
                <th className={`${handles.tableHeadDiv} fw6 tl bb b--black-20 pt2 bg-white`}>Data de Cadastro</th>
                <th className={`${handles.tableHeadDiv} fw6 tl bb b--black-20 pt2 bg-white`}>Primeira Compra</th>
                </tr>
              </thead>

              <tbody className={`${handles.tableBody} lh-copy`}>
              {leads.length > 0 ?
                leads.map(lead => (
                  <tr className={`${handles.tableBodyRow}`}  key={lead.email}>
                    <td className={`${handles.tableBodyDiv} tl bb b--black-20 pt2`}>{lead.name}</td>
                    <td className={`${handles.tableBodyDiv} tl bb b--black-20 pt2`}>{lead.email}</td>
                    <td className={`${handles.tableBodyDiv} tl bb b--black-20 pt2`}>{lead.telephone}</td>
                    <td className={`${handles.tableBodyDiv} tl bb b--black-20 pt2`}>{lead.prospect_date === '' ? '-': lead.prospect_date?.split('/').reverse().join('/')}</td>
                    <td className={`${handles.tableBodyDiv} tl bb b--black-20 pt2`}>{lead.customer_date === '' ? '-': lead.customer_date?.split('/').reverse().join('/')}</td>
                  </tr>
                )) : ''}
              </tbody>
            </table>
          </div>
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
