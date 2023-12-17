"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useStayApply from "@/app/hooks/useStayApply";
import Heading from "../Heading/Heading";
import { categories } from "@/app/sections/CategoryBar/CategoryBar";
import CategoryInput from "../CustomInput/CategoryInput";
import { useForm, FieldValues } from "react-hook-form";
import CountrySelect from "../CustomInput/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../CustomInput/Counter";

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

  const [formStep, setFormStep] = useState(FORMSTEPS.CATEGORY);

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
        <Counter />
      </div>
    );
  }

  return (
    <Modal
      title="Register Your Place"
      isOpen={vacRegPlace?.isOpen}
      onClose={vacRegPlace?.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={formStep === FORMSTEPS?.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default ApplyStayModal;
