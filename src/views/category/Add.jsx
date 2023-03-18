import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Col, Input, Row } from 'antd';
import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
}).required();


function Add() {

    let navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            description: ""
        },
        resolver: yupResolver(schema)
    });

    const addCategory = (values) => {
        axios.post("https://northwind.vercel.app/api/categories", values)
            .then(res => {
                navigate("/categories");
            })
    }

    return (<>
        <form onSubmit={handleSubmit(addCategory)}>

            <Row>
                <Col span={12}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <Input placeholder='Name' {...field} />}
                    />
                    <p style={{ color: "orange" }}>{errors.name?.message}</p>
                </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
                <Col span={12}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <Input placeholder='Description' {...field} />}
                    />
                    <p style={{ color: "orange" }}>{errors.description?.message}</p>
                </Col>
            </Row>

            <Button style={{ marginTop: 20, width: "100px" }} type="primary" htmlType="submit">
                To Add
            </Button>
        </form>
    </>
    )
}

export default Add