import { useState } from 'react'
import { Form, Modal, Button} from 'react-bootstrap'
import { Catalog as CatalogModel } from '../models/catalog'
import { getLanguageShortCodes } from '../utils/languageCodes'
import { isOnlyLetters } from '../utils/utils'

interface AddUpdateCatalogFormProps {
    isFormOpen: boolean,
    onClose: ()=> void,
    catalog?: CatalogModel
    addUpdateCatalog: (data: CatalogModel)=> void
}

const AddUpdateCatalogForm = ({isFormOpen, onClose, catalog, addUpdateCatalog}: AddUpdateCatalogFormProps) => {
    const [formData, setFormData] = useState<CatalogModel>({
        _id: catalog?._id || '',
        name: catalog?.name || "",
        primary: catalog?.primary || false,
        vertical: catalog?.vertical || "",
        indexedAt: catalog?.indexedAt || "",
        locales: catalog?.locales || [],
        createdAt: catalog?.createdAt || ""
      })
    const [nameError, setNameError] = useState<boolean>(false)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setNameError(false)
        if(name === "name" && !isOnlyLetters(value)){
            setNameError(true)
        }
        setFormData({ ...formData, [name]: value })
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleLocalesSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        if(formData.locales.includes(value))
            return  
        setFormData({
            ...formData,
        locales: [...formData.locales, value]})
    }

    const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = event.target
        setFormData({ ...formData, [name]: checked })
    }  

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addUpdateCatalog(formData)
        onModalClose()
    }

    const clearLocales = () => {
        setFormData({...formData, locales: []})
    }

    const onModalClose = () => {
        setFormData({
            _id:'',
            name:'',
            primary: false,
            vertical: "",
            locales: [],
            indexedAt:'',
            createdAt:''
        })
        setNameError(false)
        onClose()
    }
    
    return (
        <Modal show={isFormOpen} onHide={onModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {catalog ? `Updating Catalog ${catalog.name}` : "Add Catalog"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="add-update-form" onSubmit={handleSubmit}>
                {!catalog && <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                            isInvalid={!!nameError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Name can contain only letters
                        </Form.Control.Feedback>
                    </Form.Group>}
                    <Form.Group className="mb-3" controlId="formPrimary">
                        <Form.Check
                            label="Primary"
                            type="checkbox"
                            name="primary"
                            checked={formData.primary}
                            onChange={handleCheckedChange}
                        />
                    </Form.Group>
                    {!catalog && <Form.Group className="mb-3" controlId="formVertical">
                        <Form.Label>Vertical</Form.Label>
                        <Form.Select
                            name="vertical"
                            value={formData.vertical}
                            onChange={handleSelectChange}
                            required
                            >
                            <option value="" disabled>
                                -- Select an option --
                            </option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home</option>
                            <option value="general">General</option>
                        </Form.Select>
                    </Form.Group>}
                    <Form.Group className="mb-3" controlId="formLocales">
                        <Form.Label>Locales</Form.Label>
                        <Form.Select
                            name="locales"
                            value={formData.locales.length > 0?
                                formData.locales[(formData.locales.length)-1] : ""}
                            onChange={handleLocalesSelectChange}
                            required
                            htmlSize={3}
                        >
                        
                        <option value="" disabled>
                            -- Select an option --
                        </option>
                        {getLanguageShortCodes().map(code =>
                            <option value={code} key={code}>{code}</option>)}
                        </Form.Select>
                        <div className='mt-3'>
                            {formData.locales.length > 0 ? (
                                <>
                                    <div className='mb-2'>Selected: {formData.locales.join(", ")}</div>
                                    <Button variant="outline-secondary" onClick={clearLocales}>
                                        Clear Locales</Button>
                                </>
                                
                            ) : (
                                <div className='mb-5'>No options selected</div>
                            )}
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="add-update-form"
                >
                    {catalog ? "Update" : "Add"}
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default AddUpdateCatalogForm