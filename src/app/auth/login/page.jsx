"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import * as Yup from 'yup';
import { Field, FormikProvider, useFormik } from 'formik';

import CustomInput from '@/components/custom/CustomInput';
import logo from "@/assets/brandLogo.png";

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Please Enter valid email"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
});

const Login = () => {
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers),
    });

    return (
        <div className='w-full sm:py-16 py-5 flex items-center justify-center'>
            <div className='sm:border sm:border-gray-200 border-0 rounded-md p-5 space-y-4 w-96 xl:w-1/3'>
                <Image src={logo} alt="Logo" width={200} height={200} className='m-auto' />
                <p className='text-gray-500 tracking-wide text-center'>Login with your email & password</p>
                <FormikProvider value={formik}>
                    <form className="space-y-4" onSubmit={
                        (e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }
                    }>
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
                        <div className='w-full flex justify-end'>
                            <Link href="/auth/forget-password" className='hover:underline font-semibold'>Forget password?</Link>
                        </div>
                        {error && (
                            <div className="text-red-700 text-sm sm:text-base mt-1 font-normal">
                                {error}
                            </div>
                        )}
                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className='w-full px-7 py-2 rounded-md text-center bg-black text-white p-4 font-semibold'
                            >
                                Login
                            </button>
                        </div>
                        <div className='flex gap-2 text-gray-500 items-center justify-center'>
                            <span>Don't have an account?</span>
                            <Link href="/auth/register" className='font-semibold text-black hover:underline'>Register</Link>
                        </div>
                    </form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default Login;
