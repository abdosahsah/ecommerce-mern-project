import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createProductAction } from '../../reducers/actions/productActions';
import axios from 'axios';

const CreateProductScreen = ({ history }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploadingImage, setUploadingImage] = useState(false)

    const createProduct = useSelector(state => state.createProduct)
    const { loading, error, success } = createProduct

    const dispatch = useDispatch()

    const uploadingHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploadingImage(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploadingImage(false)

        } catch (err) {
            console.log(err)
            setUploadingImage(false)
        }
    }

    const createProductHandler = (e) => {
        e.preventDefault()
        dispatch(createProductAction({
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
        
        if (success) {
            history.push('/admin/productslist')
        }
    }

    return (
        <Row className="justify-content-center">
            <Col xs={12} md={5}>
                <h2 className="mt-2">Create new product</h2>

                {loading && <p>loading...</p>}
                {error && <p>{error}</p>}
                <form onSubmit={createProductHandler}>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Product name</label>
                        <input onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" id="name" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input onChange={(e) => { setDescription(e.target.value) }} type="text" className="form-control" id="description" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="images" className="form-label">Chose your image</label>
                        <input onChange={uploadingHandler} className="form-control" type="file" id="images" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="brand" className="form-label">Brand</label>
                        <input onChange={(e) => { setBrand(e.target.value) }} type="text" className="form-control" id="brand" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input onChange={(e) => { setCategory(e.target.value) }} type="text" className="form-control" id="category" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input onChange={(e) => { setPrice(e.target.value) }} type="text" className="form-control" id="price" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="count-in-stock" className="form-label">Count in stock</label>
                        <input onChange={(e) => { setCountInStock(e.target.value) }} type="text" className="form-control" id="count-in-stock" />
                    </div>


                    <button type="submit" className="btn btn-dark add-to-cart mb-3">Create</button>

                </form>

            </Col>
        </Row>
    )
}

export default CreateProductScreen
