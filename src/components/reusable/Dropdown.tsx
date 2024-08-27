import React, { useState, useRef, useEffect, FC } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface iMenuItem {
  name: string;
  onClick: () => void;
}

const Dropdown: FC<{
  menus: iMenuItem[];
  value: string;
  hint: string;
  alignToStart?: boolean;
  showIcon?: boolean;
  loading?: boolean;
  fitMenu?: boolean;
}> = ({ menus, value, hint, fitMenu, loading, showIcon, alignToStart }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative text-b-1">
      <div
        onClick={() => {
          if (loading && loading) return;
          setOpen(!open);
        }}
        className={`${open && "ring-2 ring-green-600"} ${
          fitMenu && fitMenu
            ? `rounded-[8px] border border-[#DDE2FF] flex items-center ${
                value || hint ? "justify-between" : "justify-end"
              }`
            : "rounded-full flex items-center justify-center"
        } w-full lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 xs:px-2 lg:px-4 xl:px-6 2xl:px-7 3xl:px-8 4xl:px-10 bg-white cursor-pointer text-[#4F4F4F] text-b-1`}
      >
        {loading && loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className={`${
              showIcon &&
              `relative ${
                alignToStart
                  ? "flex items-center justify-start"
                  : "grid place-content-center"
              }`
            } w-full`}
          >
            {value === "" && <p className="text-neutral-3">{hint}</p>}
            <p className="line-clamp-1">{value}</p>
            {showIcon && (
              <IoMdArrowDropdown className="text-black text-l-1 absolute top-1/2 -translate-y-1/2 right-2" />
            )}
          </div>
        )}
      </div>
      {open && (
        <div
          className={`flex justify-start items-center bg-white absolute z-10 xs:p-4 xl:p-3 3xl:p-4 w-full left-0 right-0 rounded-2xl xs:top-12 lg:top-14 xl:top-16 2xl:top-20 3xl:top-24 4xl:top-30 shadow-custom`}
        >
          <div
            className={`w-full flex flex-col lg:max-h-[15rem] xl:max-h-[18rem] 2xl:max-h-[21rem] 3xl:max-h-[24rem] 4xl:max-h-[30rem] xs:max-h-[10rem] 
        overflow-y-scroll text-contrast-100 scrollbar-thin scrollbar-webkit `}
          >
            {menus.map((menu, i) => (
              <div
                key={i}
                className="w-full cursor-pointer hover:bg-[#F1F2F0] 2xl:px-4 3xl:px-5 lg:px-3 xs:px-2 xs:py-2 xl:py-3 3xl:py-4 rounded-md text-[#626262] text-b-2"
                onClick={() => {
                  menu.onClick();
                  setOpen(false);
                }}
              >
                {menu.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
