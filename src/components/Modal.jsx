import { createPortal } from "react-dom";
import { IoIosCloseCircle } from "react-icons/io";

export const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 z-40 grid h-screen w-screen backdrop-blur">
          <div className=" m-auto relative z-50 min-h-[250px] min-w-[80%] bg-white p-4">
            <div className="flex justify-end">
              <IoIosCloseCircle
                className="text-4xl cursor-pointer"
                onClick={onClose}
              />
            </div>
            {children}
          </div>

          <div />
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};
