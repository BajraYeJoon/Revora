"use client";

import React, { use } from "react";
import Modal from "./Modal";
import useStayApply from "@/app/hooks/useStayApply";

const ApplyStayModal = () => {
  const vacRegPlace = useStayApply();

  return (
    <Modal
      title="Register Your Place"
      isOpen={vacRegPlace.isOpen}
      onClose={vacRegPlace.onClose}
      onSubmit={vacRegPlace.onClose}
      actionLabel="Register"
    />
  );
};

export default ApplyStayModal;
