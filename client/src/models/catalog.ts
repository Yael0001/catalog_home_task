export interface LeanCatalog {
    name: string,
    primary: boolean,
    vertical: vertical | "",
    locales: string[],
    indexedAt: string,
}

export type vertical =  'fashion'|'home'|'general'

export interface Catalog extends LeanCatalog {
    _id: string,
    createdAt: string
}

export interface TableCatalog extends Catalog {
    deleteChecked: boolean
}
