import { RequestHandler } from "express"
import CatalogModel from "../models/catalog"
import { isOnlyLetters } from "../util/utils";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface CatalogBody {
    name?: string,
    vertical?: string,
    primary?: boolean,
    locales?: string[],
}

interface CatalogIdParam {
    id: string,
}

interface CatalogIdsBody {
    ids: string[]
}

const isValideId = (id: string) => {
    if(!mongoose.isValidObjectId(id))
        throw createHttpError(400, "invalid id")
}

export const getCatalogs: RequestHandler = async (req, res, next) => {
    try {
        const catalogs = await CatalogModel.find().exec()
        res.status(200).json(catalogs)
    } catch(err){
        next(err)
    }
}

export const createCatalog: RequestHandler<unknown,unknown,CatalogBody> = 
    async (req, res, next) => {
        const {name, vertical, primary, locales} = req.body
        
        try {
            let updated = false
            if(!name || !isOnlyLetters(name))
                throw createHttpError(400,"name cannot be empty and mast contain only letters")
            if(primary){
                const response = await CatalogModel.updateMany({primary: true, vertical: vertical},{primary: false})
                if(!response.acknowledged){
                    throw createHttpError(500, 'update primary property faild')
                } else {
                    updated = true
                }
            }
            const catalog = await CatalogModel.create({name, vertical, primary, locales})  
            res.status(200).json({catalog, updated})
        } catch(err) {
            next(err)
        }
}

export const updateCatalog: RequestHandler<CatalogIdParam,unknown,CatalogBody> = 
    async (req, res, next) => {
        const { id } = req.params
        const { primary } = req.body
        try {
            let updated = false
            isValideId(id)
            if(primary){
               const response =  await CatalogModel.updateMany({primary: true},{primary: false})
               
               if(!response.acknowledged)
                    throw createHttpError(500, 'update primary propery failed')
                else
                    updated = true
            }
            const catalog = await CatalogModel.findByIdAndUpdate(id, {...req.body}, {new: true})
            res.status(200).json({catalog, updated}) 
        } catch(err) {
            next(err)
        }
}

export const deleteCatalog: RequestHandler<unknown,unknown,CatalogIdsBody> = 
    async (req, res, next) => {
        const ids = req.body.ids
        try {
            if(ids.length === 0){
                res.status(200).json({updated: false})
                return
            }

            ids.forEach(id => {
                isValideId(id)
            })

            const response = await CatalogModel.deleteMany({_id: { $in: ids}})
            if(!response.acknowledged){
                throw createHttpError(500, 'delete catalogs failed')
            } else {
                res.status(200).json({updated: true})
            }
        } catch(err) {
            next(err)
        }
}

export const setIndex: RequestHandler<CatalogIdParam,unknown,unknown> = 
    async (req, res, next) => {
        const currTime = new Date()
        const { id } = req.params
        try {
            isValideId(id)
            const catalog = await CatalogModel.findByIdAndUpdate(id, { indexedAt: currTime },{new: true})
            res.status(200).json(catalog) 
        } catch(err) {
            next(err)
        }
}