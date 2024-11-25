import React, { useState } from 'react'
import { Catalog, TableCatalog } from '../models/catalog'
import { convertLocaleTimeString } from '../utils/utils'
import AddUpdateCatalogForm from './AddUpdateCatalogForm'

interface CatalogRowProps {
  catalog: TableCatalog,
  onUpdateCatalog: (data: Catalog) => void
  handleRowSelect: (id: string) => void
  setCatalogeIndex:(id: string) => void 
}

const CatalogRow = (
    { catalog, handleRowSelect, onUpdateCatalog, setCatalogeIndex } : CatalogRowProps ) => {
  const [formOpen, setFormOpen]  = useState<boolean>(false)

  const isMultiLocal = ()=>{
    return catalog.locales.length > 1
  }

  const handleUpdate = (data: Catalog) => {
    onUpdateCatalog(data)
    setFormOpen(false)
  }

  return (
    <>
      <AddUpdateCatalogForm
      isFormOpen={formOpen}
      catalog={catalog} 
      onClose={()=>{setFormOpen(false)}}
      addUpdateCatalog={handleUpdate}/>
      <tr className={catalog.primary?' primary' : "" }>
        <td className='select-catalog'>
          <input
            type="checkbox"
            checked={catalog.deleteChecked}
            onChange={() => handleRowSelect(catalog._id)}
          />  
        </td> 
        <td id='table-cat-name'>{catalog.name}</td>
        <td>{catalog.vertical}</td>
        <td>{isMultiLocal() ? "Yes" : "No"}</td>
        <td>{catalog.indexedAt ? convertLocaleTimeString(catalog.indexedAt): "Not indexed"}</td>
        <td>
          <div className='row-actions'>
            <div className='update-catalog' onClick={()=>setFormOpen(true)}>Update</div>
            <div className='index-catalog' 
              onClick={()=>setCatalogeIndex(catalog._id)}>set index</div>
          </div>
        </td>
      </tr>
    </>
  )
}

export default CatalogRow