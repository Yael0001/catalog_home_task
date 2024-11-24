import { useEffect, useState } from 'react'
import { TableCatalog, Catalog } from '../models/catalog'
import { getCatalogs } from '../api/catalogApi'
import CatalogRow from './CatalogRow'
import AddUpdateCatalogForm from './AddUpdateCatalogForm'
import { addCatalog as addCatalogApi, 
        deleteCatalog as deleteCatalogApi,
        updateCatalog as updateCatalogApi,
        setIndex as setIndexApi } from '../api/catalogApi'

const Table = () => {
    const [catalogs, setCatalogs] = useState<TableCatalog[]>([])
    const  tableColHearders  = ["", "name", "vertical", "muti locale",
         "last indexed", "actions"]

    const [openForm, setOpenForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=>{
        const fetchData = async ()=> {
            const catalogs = await getCatalogs()
            setCatalogs(catalogs)
            setLoading(false)
        }
        setLoading(true)
        fetchData()
    },[])

    const handleRowSelect = (id: string) => {
        setCatalogs(prev =>
            prev.map(cat =>
              cat._id === id ? { ...cat, deleteChecked: !cat.deleteChecked } : cat
            )
        )
    }

    const addCatalog = async (data: Catalog) => {
        try {
            const addCatalogData = await addCatalogApi(data)
            setCatalogs(prev => {
                let { catalog } = addCatalogData
                if(addCatalogData.updated) {
                 prev = prev.map(cat =>
                        cat.vertical === catalog.vertical ? 
                            { ...cat, primary: false } : cat
                    )
                }
                return [...prev, catalog]
            })
            setOpenForm(false)
        } catch(err){
            console.log(err);
        }
    }

    const onUpdateCatalog = async (data: Catalog) => {
        try {
            const updateCatalogData = await updateCatalogApi(data)
            setCatalogs(prev => {
                let { catalog } = updateCatalogData
                let prevCat = prev
                if(updateCatalogData.updated) {
                    prevCat = prev.map(cat =>
                        cat.vertical === catalog.vertical ? 
                            { ...cat, primary: false } : cat
                    )
                }
                return prevCat.map(cat => cat._id === catalog._id ? catalog : cat)
            })
        } catch(err){
            console.log(err);
        }
    }

    
    const onDeleteCatalogs = async ()=>{
        const catalogsToDelete = catalogs.filter(cat => cat.deleteChecked).map(cat => cat._id)
        if(catalogsToDelete.length === 0){
            alert("Please choose cataloges to delete")
            return
        }
        try {
            const deleteRes = await deleteCatalogApi({ids: catalogsToDelete})
            if(deleteRes.updated) {
                setCatalogs(prev => [...prev.filter(cat => !catalogsToDelete.includes(cat._id))])
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    const setCatalogeIndex = async (id: string)=>{
        try {
            const catalog = await setIndexApi(id)
            setCatalogs(prev => prev.map(cat => cat._id === catalog._id ? catalog : cat))
        } catch (err){
            console.log(err);
        }
    }

    return (
        <div className='table'>
            <div className='table-title'>Catalog Table</div>
            { loading ? <div className='loading'>Loading Table...</div>:
            <>
                <div className='table-actions'>
                    <button onClick={() => setOpenForm(true)}>add catalog</button>
                    <button onClick={onDeleteCatalogs}>delete catalogs</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            {tableColHearders.map((header,i) => 
                                <th key={i}>{header}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {catalogs.map(cat => (
                            <CatalogRow catalog={cat} 
                            handleRowSelect={handleRowSelect}
                            onUpdateCatalog ={onUpdateCatalog}
                            setCatalogeIndex={setCatalogeIndex}
                            key={cat._id}/>
                        ))}
                    </tbody>
                </table>
            </>}
            <AddUpdateCatalogForm 
                isFormOpen={openForm}
                catalog={undefined} 
                onClose={()=>{setOpenForm(false)}}
                addUpdateCatalog={addCatalog}/>
        </div>
    )
}

export default Table