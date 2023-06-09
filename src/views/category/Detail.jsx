import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Detail() {

    const [categoryDetail, setcategoryDetail] = useState({});
    const [loading, setloading] = useState(true);
    let { id } = useParams();

    useEffect(() => {
        axios.get("https://northwind.vercel.app/api/categories/" + id)
            .then(res => {
                setcategoryDetail(res.data);
                setloading(false)
            })
    }, [])


    return (<>
        <Spin tip="Loading..." spinning={loading}>
            <h1>ID: {categoryDetail.id} </h1>
            <h1>NAME: {categoryDetail.name} </h1>
            <h1>DESCRIPTION: {categoryDetail.description} </h1>
        </Spin>
    </>)
}

export default Detail