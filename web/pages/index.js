import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { register, resetRegistered, login } from "../redux/features/user";
import { useState } from "react";
import { useRouter } from "next/router";
import { getUser } from "../fetches/allFetches";
import { useQuery } from "react-query";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    "getUserData", // could probably add cookie to differentiate
    getUser
  );

  const [shouldShowLogin, setShouldShowLogin] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <p className="mt-20 mb-20 text-7xl mx-auto font-bold border-4 border-rosa text-rosa rounded-full py-24 px-12 hover:text-white hover:bg-rosa hover:cursor-pointer">
        kooki
      </p>

      <div className="bg-stone-100 p-4 rounded-xl flex flex-col ">
        {isSuccess && !isLoading && !isError && data?.user ? (
          <button>
            <p>Welcome, {data?.user?.email}</p>
            <p
              className="mt-1 text-rosa"
              onClick={() => {
                router.push("/profile");
              }}
            >
              Go to Kooki dashboard
            </p>
          </button>
        ) : isLoading ? (
          <div className="btn loading"></div>
        ) : shouldShowLogin ? (
          <div className="p-2">
            <p className="text-2xl flex flex-col items-center">Login</p>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string()
                  .required("No password provided.")
                  .min(8, "Password is too short - should be 8 chars minimum."),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                // register user here

                dispatch(
                  login({ email: values.email, password: values.password })
                );
                setSubmitting(false);
              }}
            >
              <Form>
                <div className="rounded-lg bg-stone-100 px-8 my-4 flex flex-col ">
                  <label htmlFor="email" className="bg-stone-100">
                    Email Address
                  </label>
                  <Field name="email" type="email" className="p-2 my-1" />
                  <ErrorMessage name="email">
                    {(msg) => <p className="text-red-600">{msg}</p>}
                  </ErrorMessage>

                  <label htmlFor="password" className="mt-1">
                    Password
                  </label>
                  <Field name="password" type="password" className="p-2 my-1" />
                  <ErrorMessage name="password">
                    {(msg) => <p className="text-red-600">{msg}</p>}
                  </ErrorMessage>

                  <button
                    type="submit"
                    className="rounded py-2 px-8 mt-2 bg-pink-600 text-white "
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            </Formik>
            <div className="mt-2 flex  items-center ">
              Haven't Signed Up? &nbsp;
              <button
                className="underline"
                onClick={() => {
                  setShouldShowLogin((shouldShowLogin) => !shouldShowLogin);
                  router.push("/dashboard");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2">
            <p className="text-2xl flex flex-col items-center">
              Sign Up Below!
            </p>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string()
                  .required("No password provided.")
                  .min(8, "Password is too short - should be 8 chars minimum.")
                  .matches(
                    /[a-zA-Z]/,
                    "Password can only contain Latin letters."
                  ),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                // register user here

                const result = await dispatch(
                  register({ email: values.email, password: values.password })
                );

                if (result) {
                  const result2 = await dispatch(
                    login({ email: values.email, password: values.password })
                  );

                  if (result2.status == 200) {
                    dispatch(resetRegistered());
                  }

                  router.push("/dashboard");
                }
                setSubmitting(false);
              }}
            >
              <Form>
                <div className="rounded-lg bg-stone-100 px-8 my-4 flex flex-col ">
                  <label htmlFor="email" className="bg-stone-100">
                    Email Address
                  </label>
                  <Field name="email" type="email" className="p-2 my-1" />
                  <ErrorMessage name="email">
                    {(msg) => <p className="text-red-600">{msg}</p>}
                  </ErrorMessage>

                  <label htmlFor="password" className="mt-1">
                    Password
                  </label>
                  <Field name="password" type="password" className="p-2 my-1" />
                  <ErrorMessage name="password">
                    {(msg) => <p className="text-red-600">{msg}</p>}
                  </ErrorMessage>

                  <button
                    type="submit"
                    className="rounded py-2 px-8 mt-2 bg-pink-600 text-white "
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            </Formik>

            <div className="mt-2 flex  items-center ">
              Already eating? &nbsp;
              <button
                className="underline"
                onClick={() =>
                  setShouldShowLogin((shouldShowLogin) => !shouldShowLogin)
                }
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* <div className="mt-2 flex  items-center ">
              Haven't Signed Up? &nbsp;
              <button
                className="underline"
                onClick={() =>
                  setShouldShowLogin((shouldShowLogin) => !shouldShowLogin)
                }
              >
                Sign Up
              </button> */
}
