"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useStayApply from "@/app/hooks/useStayApply";
import Heading from "../Heading/Heading";
import { categories } from "@/app/sections/CategoryBar/CategoryBar";
import CategoryInput from "../CustomInput/CategoryInput";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import CountrySelect from "../CustomInput/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../CustomInput/Counter";
import UploadImage from "../UploadImage/UploadImage";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { CREATE_LISTING_MUTATION } from "@/GQL/mutation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

enum FORMSTEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const ApplyStayModal = () => {
  const vacRegPlace = useStayApply();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formStep, setFormStep] = useState(FORMSTEPS.CATEGORY);
  const [createListing, { loading }] = useMutation(CREATE_LISTING_MUTATION);

  //validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      maxGuests: 1,
      roomCount: 1,
      bathroomCount: 1,
      listingImage: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const category = watch("category");
  const maxGuests = watch("maxGuests");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const listingImage = watch("listingImage");

  const CountryMap = useMemo(
    () =>
      dynamic(() => import("../CountryMap/CountryMap"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setFormStep((prev) => prev - 1);
  };

  const onNext = () => {
    setFormStep((prev) => prev + 1);
  };

  //onSubmit
  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (formStep !== FORMSTEPS?.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    const { location, ...otherFields } = data;
    const locationValue = location.value;

    createListing({
      variables: {
        input: {
          ...otherFields,
          location: locationValue,
          maxGuests: parseInt(data?.maxGuests),
          roomCount: parseInt(data?.roomCount),
          bathroomCount: parseInt(data?.bathroomCount),
          price: parseInt(data?.price),
        },
      },
    })
      .then((res) => {
        toast.success("Listing created successfully");
        router.refresh();
        vacRegPlace.onClose();
        setFormStep(FORMSTEPS.CATEGORY);
        reset();
      })
      .catch((err) => {
        toast.error(err?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // action labels
  const actionLabel = useMemo(() => {
    if (formStep === FORMSTEPS?.PRICE) {
      return "Create";
    }

    return "Next";
  }, [formStep]);

  const secondaryActionLabel = useMemo(() => {
    if (formStep === FORMSTEPS?.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [formStep]);

  //    Body Content
  let bodyContent = (
    <div className="flex flex-col gap-6">
      <Heading
        title="What type of place are you listing?"
        subtitle="Select the type of place you're listing"
      />

      <div className="grid max-h-[40vh] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-3">
        {categories?.map((item) => (
          <div key={item?.label}>
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item?.label}
              label={item?.label}
              icon={item?.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (formStep === FORMSTEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Where's your place located?"
          subtitle="Enter the address !"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <CountryMap center={location?.latlng} />
      </div>
    );
  }

  if (formStep === FORMSTEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-7">
        <Heading
          title="Share some details about your place"
          subtitle="Tell guests about the space, amenities, and the neighborhood."
        />
        <Counter
          title="Number of Guests"
          subtitle="How many guests can your place accommodate?"
          value={maxGuests}
          onChange={(value) => setCustomValue("maxGuests", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms can guests use?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms can guests use?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (formStep === FORMSTEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Upload your listing image"
          subtitle="Upload a photo that clearly shows the space and entrance to your place."
        />

        <UploadImage
          image={listingImage}
          onChange={(value) => setCustomValue("listingImage", value)}
        />
      </div>
    );
  }

  if (formStep === FORMSTEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Describe your place to guests"
          subtitle="Write a detailed description to help guests know what to expect."
        />

        <CustomInput
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <CustomInput
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (formStep === FORMSTEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="How much do you want to charge?"
          subtitle="Set a price that reflects your space's value."
        />

        <CustomInput
          id="price"
          label="Price"
          type="number"
          formatPrice
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Register Your Place"
      isOpen={vacRegPlace?.isOpen}
      onClose={vacRegPlace?.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={formStep === FORMSTEPS?.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default ApplyStayModal;
