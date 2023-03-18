import { Button, Col, Input, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {

    const [updateCategory, setupdateCategory] = useState([]);
    const [loading, setloading] = useState(true);
    let { id } = useParams();

    const [neme, setNeme] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get("https://northwind.vercel.app/api/categories/" + id)
            .then(res => {
                console.log('res', res.data)
                setupdateCategory(res.data);
                setloading(false)
                reset({
                    name: res.data.name,
                    description: res.data.description
                })
            })
    }, [])

    let navigate = useNavigate();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            description: ''
        }
    });

    const updateCategories = (values) => {
        axios.put("https://northwind.vercel.app/api/categories/" + id, values)
            .then(res => {
                setNeme(res.name)
                setDescription(res.description)
                navigate("/categories");
            })
    }

    return (<>
        <form onSubmit={handleSubmit(updateCategories)}>

            <Row>
                <Col span={12}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
                <Col span={12}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </Col>
            </Row>

            <Button style={{ marginTop: 20, width: "100px" }} type="primary" htmlType="submit">
                Update
            </Button>
            <Button style={{ marginTop: 20, marginLeft: 10, width: "100px" }} type="primary" onClick={() => {
                reset(
                    {
                        name: '',
                        description: ''
                    }
                )
            }}>
                Reset
            </Button>
        </form>
    </>)
}

export default Update