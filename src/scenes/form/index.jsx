import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from "yup";
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../../components/Header';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
}

const phoneRegExp = /(7|8|9)\d{9}/;

const Form = () => {
    const isNonMobile = useMediaQuery("min-width:600px");

    const handleFormSubmit = (values) => {
        console.log(values)
    }

    const userSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        contact: yup
            .string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("required"),
        address1: yup.string().required("required"),
        address2: yup.string().required("required"),
    })

    return (
        <Box m="20px">
            <Header title="CREATE USER" subtitle="Create a New User Profile" />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validate={userSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    hadleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display='flex'
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"

                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile ? undefined : "span 4"
                                },

                            }}
                        >
                            <TextField
                                fullWidth
                                varaiant="filled"
                                type='text'
                                label='First Name'
                                onBlur={handleBlur}
                                onChange={hadleChange}
                                value={values.firstName}
                                name='firstname'
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{
                                    gridColumn: "span 2"
                                }}
                            />
                        </Box>
                    </form>
                )
                }

            </Formik>
        </Box>
    )
}

export default Form