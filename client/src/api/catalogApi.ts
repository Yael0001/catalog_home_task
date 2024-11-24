import { 
    TableCatalog as TableCatalogModel,
    Catalog as CatalogModel, 
} from "../models/catalog";

const fetchData = async (input: RequestInfo, init: RequestInit) => {
    const res = await fetch(input, init)
    if(res.ok)
        return res
    else {
        const errorBody = await res.json()
        throw Error(errorBody.message)
    }
}

export async function getCatalogs():Promise<TableCatalogModel[]> {
    const res = await fetchData('/api/catalog', {method: 'GET'})
    const catalogs = await res.json()
    return catalogs
}

export interface AddUpdateCatalogModel {
    catalog: TableCatalogModel,
    updated: boolean
}

export async function addCatalog(catalogData: CatalogModel):Promise<AddUpdateCatalogModel> {
    const init = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(catalogData) 
    }
    const res = await fetchData('/api/catalog', init)
    const response = await res.json()
    return response 
}

export async function updateCatalog(catalogData: CatalogModel):Promise<AddUpdateCatalogModel> {
    const init = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(catalogData) 
    }
    const res = await fetchData(`/api/catalog/${catalogData._id}`, init)
    const response = await res.json()
    return response 
}

interface DeleteCatalogIds {
    ids: string[]
}

export async function deleteCatalog(catalogIds: DeleteCatalogIds):Promise<any> {
    const init = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(catalogIds) 
    }
    const res = await fetchData('/api/catalog', init)
    const response = await res.json()
    return response 
}

export async function setIndex(id: string):Promise<TableCatalogModel> {
    const init = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({}) 
    }
    const res = await fetchData(`/api/catalog/index/${id}`, init)
    const response = await res.json()
    return response 
}