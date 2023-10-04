import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { ApolloError, useMutation } from "@apollo/client";

import {
  LoginValues,
  SetSubmitting,
  loginValidationSchema,
} from "@/utils/types";

import AlertMessage from "@/components/AlertMessage";
import Link from "next/link";
import { SIGNIN_USER } from "@/graphql/queries";

const emptyValues = { email: "", password: "" };

export default function SignIn() {
  const [signinUser] = useMutation(SIGNIN_USER);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const initialValues = { ...emptyValues };

  async function onSubmit(
    values: LoginValues,
    { setSubmitting }: { setSubmitting: SetSubmitting }
  ) {
    try {
      const { data } = await signinUser({ variables: values });

      console.log(data);

      router.push("/user/dashboard");
    } catch (error) {
      if (error instanceof ApolloError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          `An error occured while attempting to sign in: ${error}`
        );
      }
    }

    setSubmitting(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
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
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              {errorMessage && (
                <AlertMessage type="error" message={errorMessage} />
              )}
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
                Login
              </button>
            </form>
          )}
        </Formik>

        <div className="mt-5">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-blue-800">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
