"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button/Button";

//neccessary props for Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  footer?: React.ReactElement;
  body?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  body,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // TO CLose the modal
  const handleCancel = useCallback(() => {
    //Check if the modal is disabled
    //this is useful when something is hapening and user is not allowed to interact with the modal
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 500);
  }, [disabled, onClose]);

  // TO submit the modal
  const handleConfirm = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  // previus and next button is secondary action
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-blue-800/40 focus:outline-none">
        <div className="relative w-full h-full mx-auto my-6 md:h-auto md:w-4/6 lg:w-3/6 xl:w-2/5">
          {/*content*/}
          <div
            className={`
               translate h-full duration-500 ${
                 showModal ? "translate-y-0" : "translate-y-full"
               }
               ${showModal ? "opacity-100" : "opacity-0"}
             `}
          >
            <div className="relative flex flex-col w-full h-full border-0 rounded-lg shadow-lg outline-none translate bg-neutral focus:outline-none md:h-auto lg:h-auto">
              {/*header*/}

              <div
                className="
                 relative flex flex-col items-center justify-center rounded-t border-b-[1px] p-6
              "
              >
                <button
                  className="absolute p-1 transition border-0 left-10 top-7 hover:opacity-70"
                  onClick={handleCancel}
                >
                  <AiOutlineClose size={18} />
                </button>

                <div className="text-lg font-semibold text-center text-accent">
                  {title}
                </div>

                {/* body */}
                <div className="relative flex-auto p-6">{body}</div>

                {/* footer */}
                <div className="flex flex-col w-full gap-2 p-6">
                  <div className="w-full gap-4 flex-center">
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        outline
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                      />
                    )}

                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleConfirm}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
