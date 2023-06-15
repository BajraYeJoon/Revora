"use client";

import { FunctionComponent } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { useCallback, useState } from "react";

import { Formik, Field, Form } from "formik";
import useRegisterProvider from "@/app/hooks/useRegisterProvider";

interface RegisterModalProps {}

const RegisterModal: FunctionComponent<RegisterModalProps> = () => {
  const registerModal = useRegisterProvider();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="Jane" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterModal;
