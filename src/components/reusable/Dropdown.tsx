import React, { useState, useRef, useEffect, FC } from "react";

interface iMenuItem {
  name: string;
  onClick: () => void;
}

const Dropdown: FC<{ menus: iMenuItem[]; value: string }> = ({
  menus,
  value,
}) => {
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
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => setOpen(!open)}
        className={`${
          open && "ring-2 ring-green-600"
        } rounded-full w-full h-[48px] grid place-items-start place-content-center px-3 bg-white cursor-pointer text-[#4F4F4F] text-body`}
      >
        {value === "" && <p className="text-neutral-3">Select plan</p>}
        <p className="line-clamp-1">{value}</p>
      </div>
      {open && (
        <div className="grid place-content-center bg-white absolute z-10 p-2 -right-[13.5rem] top-[60px] rounded-[16px] shadow-custom">
          <div
            className="w-[40rem] flex flex-col max-h-[250px] 
        overflow-y-scroll text-contrast-100 scrollbar-thin scrollbar-webkit p-2"
          >
            {menus.map((menu, i) => (
              <div
                key={i}
                className="w-full cursor-pointer hover:bg-[#F1F2F0] px-3 py-2 rounded-md text-[#626262]"
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
