"use client";

import { signIn } from "next-auth/react";
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
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = (props: LoginModalProps) => {
  const router = useRouter();
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
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((cb) => {
      setIsLoading(false);

      if (cb?.ok) {
        toast.success("Login Success");
        router.refresh();
        loginModal.onClose();
      }

      if (cb?.error) {
        toast.error("Login Failed");
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />

      <CustomInput
        id="email"
        label="Email"
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
        <div>Don&apos;t have an account?</div>
        <div
          className="text-neutral-800 cursor-pointer hover:underline"
          onClick={() => {
            loginModal.onClose();
            registerModal.onOpen();
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
