import React from "react";
import INSTA from "/instagram.png";
import { motion } from "framer-motion";
import type { CardInter } from "../../types";
import { useBreakpoints } from "../hamburger/hooks/useBreakpoints";

const Card: React.FC<CardInter> = ({ name, role, img, instaId }) => {
  const { isLg, isMd } = useBreakpoints();
  return (
    <motion.div
      animate={{
        rotate: [1.2, -1.2],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="relative flex flex-col items-center"
    >
      <motion.div
        animate={{
          rotate: [1, -1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className={`${isLg? "w-[14rem] h-40": isMd? "w-40 h-40" : "w-48 h-20"} left-5 right-5 rounded-xl top-0 bg-[#1E1E1E]`}
      />

      <div className={`${isLg? "w-[15rem] h-[22rem]": isMd? "w-42 h-60" : "w-[13rem] h-[19rem]"} absolute top-2  rounded-xl overflow-hidden shadow-xl/30 bg-black`}>
        {img && <img src={img} alt={name} className="w-full h-full object-cover shadow-xl" />}
        <div className="absolute left-2 right-2 bottom-4 p-4 bg-white backdrop-blur-sm rounded-xl shadow-md flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img src={img} alt={name} className={`${isLg? "w-10 h-10":"w-5 h-5"} rounded-full object-cover bg-gray-400`} />
            <div className="line-">
              <h3 className={`${isLg? "text-lg" : "text-sm"} font-bold text-black`}>{name}</h3>
              <p className={`${isLg? "text-sm": isMd? "text-xs" : "text-[10px]" } text-gray-600 font-semibold`}>{role}</p>
            </div>
          </div>
          <a href={`https://www.instagram.com/${instaId}/`} target="_blank">
            <img src={INSTA} alt="instagram logo" className={`${isLg? "w-8 h-8": isMd? "w-6 h-6" :"w-4 h-4"} rounded-full`} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
export default Card;
