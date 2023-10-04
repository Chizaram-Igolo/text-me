"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Formik } from "formik";
import { ApolloError, ApolloProvider, useMutation } from "@apollo/client";

import client from "@/graphql/apolloClient";
import { REGISTER_USER } from "@/graphql/queries";

import {
  RegisterValues,
  SetSubmitting,
  regValidationSchema,
} from "@/utils/types";
import AlertMessage from "@/components/AlertMessage";

const emptyValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [registerUser] = useMutation(REGISTER_USER);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = { ...emptyValues };

  async function onSubmit(
    values: RegisterValues,
    { setSubmitting }: { setSubmitting: SetSubmitting }
  ) {
    const { confirmPassword, ...formData } = values;
    const { firstname, lastname, username, email } = formData;

    try {
      const { data } = await registerUser({
        variables: formData,
      });
      console.log(data);
      router.push(
        `/auth/signup-success?firstname=${firstname}&lastname=${lastname}&username=${username}&email=${email}`
      );
    } catch (error) {
      if (error instanceof ApolloError) {
        if (error.message.includes("duplicate"))
          setErrorMessage(`An account with that email address already exists.`);
        else setErrorMessage(error.message);
      } else {
        setErrorMessage(
          `An error occured while attempting to sign up: ${error}`
        );
      }
    }

    setSubmitting(false);
  }

  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={regValidationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              dirty,
              isValid,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {errorMessage && (
                  <AlertMessage type="error" message={errorMessage} />
                )}
                <div className="mb-4">
                  <label htmlFor="firstname" className="block font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    className="w-full border rounded p-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                  {errors.firstname && touched.firstname && (
                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                      {errors.firstname}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="lastname" className="block font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    className="w-full border rounded p-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                  {errors.lastname && touched.lastname && (
                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                      {errors.lastname}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="username" className="block font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="w-full border rounded p-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  {errors.username && touched.username && (
                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                      {errors.username}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border rounded p-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full border rounded p-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="w-full border rounded p-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full ${
                    !isValid || !dirty || isSubmitting
                      ? "bg-gray-500"
                      : "bg-blue-500"
                  } text-white py-2 rounded ${
                    !isValid || !dirty || isSubmitting
                      ? "hover:bg-gray-600"
                      : "hover:bg-blue-600"
                  } `}
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  Sign Up
                </button>
              </form>
            )}
          </Formik>

          <div className="mt-5">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-800">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default Register;
