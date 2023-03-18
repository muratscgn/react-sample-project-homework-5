import { render } from '@testing-library/react';
import { Button, Modal, Table } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const { confirm } = Modal;

function List() {

    let navigate = useNavigate();

    const [categories, setcategories] = useState([]);
    const [loading, setloading] = useState(true);


    const deleteCategory = (id) => {
        confirm({
            title: 'Do you Want to delete these category?',
            icon: <ExclamationCircleFilled />,
            content: 'Category',
            onOk() {
                setloading(true);
                axios.delete(`https://northwind.vercel.app/api/categories/${id}`)
                    .then(res => {
                        loadCategory();
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    useEffect(() => {
        loadCategory();
    }, [])

    const loadCategory = () => {
        axios.get("https://northwind.vercel.app/api/categories")
            .then(res => {
                setcategories(res.data);
                setloading(false);
            })
    }

    const goToDetail = (id) => {
        navigate("/category/detail/" + id)
    }

    const goToUpdate = (id) => {
        navigate("/category/update/" + id)
    }


    let columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'NAME',
            dataIndex: 'name'
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description'
        },
        {
            title: "DETAIL",
            dataIndex: "id",
            render: (id) => <Button onClick={() => goToDetail(id)} type='primary' ghost>Detail</Button >
        },
        {
            title: "UPDATE",
            dataIndex: "id",
            render: (id) => <Button onClick={() => goToUpdate(id)} type='primary' ghost>Update</Button >
        },
        {
            title: "DELETE",
            dataIndex: "id",
            render: (id) => <Button onClick={() => deleteCategory(id)} type='primary' ghost danger> Delete</Button >
        },
    ]

    const goToNewCategory = () => {
        navigate("/category/add")
    }

    return (<>
        <Button style={{ marginBottom: "20px" }} type='primary' onClick={goToNewCategory}>Add New Category</Button>
        <Table
            columns={columns}
            dataSource={categories}
            loading={loading}
        />
    </>
    )
}

export default List