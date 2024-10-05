"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import * as Yup from 'yup';
import { Field, FormikProvider, useFormik } from 'formik';

import logo from "@/assets/brandLogo.png";
import CustomInput from '@/components/custom/CustomInput';
import { createCustomer } from '@/shopify/customer/createCustomer';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required").min(2, "First name should be at least 2 characters").max(10, "First name should not be more than 10 characters"),
    lastName: Yup.string().required("Last Name is required").min(2, "Last name should be at least 2 characters").max(10, "Last name should not be more than 10 characters"),
    phone: Yup.string().required("Phone Number is required").matches(/^\+?\d{1,15}$/, "Invalid phone number"),
    email: Yup.string().required("Email is required").email("Please Enter valid email"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
});

const Register = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const data = await createCustomer(values);
            const error = data?.error?.split(':')[0].trim();
            if (error) {
                setError(error);
            } else {
                resetForm();
                router.push("/auth/login");
            }
        } catch (error) {
            return error;
        }
    };

    return (
        <div className='w-full sm:py-16 py-5 flex items-center justify-center'>
            <div className='sm:border sm:border-gray-200 border-0 rounded-md p-5 space-y-4 w-96 lg:w-1/3 2xl:w-1/4'>
                <Image src={logo} alt="Logo" width={200} height={200} className='m-auto' />
                <p className='text-gray-500 tracking-wide text-center'>Sign up to explore exclusive fashion at Parallel Wear</p>
                <FormikProvider value={formik}>
                    <form className="space-y-4" onSubmit={
                        (e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }
                    }>
                        <Field
                            name="firstName"
                            type="text"
                            label="First Name"
                            component={CustomInput}
                            onFocus={() => setError("")}
                        />
                        <Field
                            name="lastName"
                            type="text"
                            label="Last Name"
                            component={CustomInput}
                            onFocus={() => setError("")}
                        />
                        <Field
                            name="phone"
                            type="tel"
                            label="Phone"
                            component={CustomInput}
                            onFocus={() => setError("")}
                        />
                        <Field
                            name="email"
                            type="email"
                            label="Email"
                            component={CustomInput}
                            onFocus={() => setError("")}
                        />
                        <Field
                            name="password"
                            type="password"
                            label="Password"
                            component={CustomInput}
                            onFocus={() => setError("")}
                        />
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className='btn'
                            >
                                Register
                            </button>
                        </div>
                        <div className='flex gap-2 text-gray-500 items-center justify-center'>
                            <span>Already have an account?</span>
                            <Link href="/auth/login" className='font-semibold text-black hover:underline'>Login</Link>
                        </div>
                    </form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default Register;
