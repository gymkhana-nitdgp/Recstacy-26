import { GiTireIronCross } from "react-icons/gi";
import type { ModalFace } from "../types";
import { useBreakpoints } from "../hooks/useBreakpoints";
import RenderableModel from "./RenderableModel";

const Modal = ({ modalRef, setIsOpen, handleNavClick }: ModalFace) => {
  const { isMd, isLg } = useBreakpoints();
  const sz: number = isLg ? 6 : isMd ? 4 : 3;
  return (
    <div
      ref={modalRef}
      className="fixed top-0 left-0 w-full h-full bg-black z-200 hidden flex-col items-center justify-center"
    >
      <button
        onClick={() => setIsOpen(false)}
        className={`${isMd? "hover:rotate-90 transition-transform duration-300": ""} absolute top-8 right-8 text-white z-10`}
      >
        <GiTireIronCross size={isMd? 35 : 28} />
      </button>

      <RenderableModel setIsOpen={setIsOpen} size={sz} handleNavClick={handleNavClick} />
    </div>
  );
};

export default Modal;
