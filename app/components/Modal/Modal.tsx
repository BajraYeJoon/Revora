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

const Modal = ({
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
}: ModalProps) => {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-blue-800/40 outline-none focus:outline-none">
        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:w-3/6 xl:w-2/5">
          {/*content*/}
          <div
            className={`
               translate h-full duration-500 ${
                 showModal ? "translate-y-0" : "translate-y-full"
               }
               ${showModal ? "opacity-100" : "opacity-0"}
             `}
          >
            <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-neutral shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              {/*header*/}

              <div
                className="
                 relative flex flex-col rounded-t border-b-[1px] p-6
              "
              >
                <button
                  className="absolute left-10 top-7 border-0 p-1 transition hover:opacity-70"
                  onClick={handleCancel}
                >
                  <AiOutlineClose size={18} />
                </button>

                <div className="text-center text-lg font-semibold text-accent">
                  {title}
                </div>

                {/* body */}
                <div className="relative flex-auto p-6">{body}</div>

                {/* footer */}
                <div className="flex w-full flex-col gap-2 p-6">
                  <div className="flex-center w-full gap-4">
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
                  {footer}
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
