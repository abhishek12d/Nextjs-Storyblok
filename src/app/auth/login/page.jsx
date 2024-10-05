"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import * as Yup from 'yup';
import { Field, FormikProvider, useFormik } from 'formik';

import logo from "@/assets/brandLogo.png";
import CustomInput from '@/components/custom/CustomInput';
import { createCustomerAccessToken } from '@/shopify/customer/createCustomerAccessToken';
import { setCookies } from '@/utils/cookies/cookie';

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Please Enter valid email"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
});

const Login = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const data = await createCustomerAccessToken(values);
            const error = data?.error?.split(':')[0].trim();
            if (error) {
                setError(error);
            } else {
                resetForm();
                setCookies(data?.accessToken, data?.expiresAt);
                router.push("/");
            }
        } catch (error) {
            return error;
        }
    };

    return (
        <div className='w-full sm:py-16 py-5 flex items-center justify-center'>
            <div className='sm:border sm:border-gray-200 border-0 rounded-md p-5 space-y-4 w-96 lg:w-1/3 2xl:w-1/4'>
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
