"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { AiFillGithub } from "react-icons/ai";
import useRegisterProvider from "@/app/hooks/useRegisterProvider";
import Modal from "./Modal";
import Heading from "../Heading/Heading";
import CustomInput from "../CustomInput/CustomInput";
import Button from "../Button/Button";
import { REGISTER_MUTATION } from "@/GQL/mutation";
import useLoginProvider from "@/app/hooks/useLoginProvider";
import { signIn } from "next-auth/react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = (props: RegisterModalProps) => {
  const registerModal = useRegisterProvider();
  const loginModal = useLoginProvider();
  const [registerQuery, { loading, error }] = useMutation(REGISTER_MUTATION);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    registerQuery({
      variables: {
        input: data,
      },
    })
      .then((res) => {
        registerModal.onClose();
        toast.success("noted");
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Revora" subtitle="Sign up to continue" />

      <CustomInput
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomInput
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomInput
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-5 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />

      <div className="flex flex-row items-center justify-center gap-3">
        <div>Already have an account?</div>
        <div
          className="text-neutral-800 cursor-pointer hover:underline"
          onClick={() => {
            loginModal.onOpen();
            registerModal.onClose();
          }}
        >
          Log in
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
