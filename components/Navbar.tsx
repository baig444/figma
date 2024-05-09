"use client";

import Image from "next/image";
import { memo } from "react";

import { navElements } from "@/constants";
import { ActiveElement, NavbarProps } from "@/types/type";

import { Button } from "./ui/button";
import ShapesMenu from "./ShapesMenu";
import ActiveUsers from "./users/ActiveUsers";
import { NewThread } from "./comments/NewThread";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import Logo from "./Logo";


const Navbar = ({activeElement, imageInputRef, handleImageUpload, handleActiveElement,addwork }: NavbarProps) => {
   
  const {user} = useUser();

  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) && value.some((val) => val?.value === activeElement?.value));

    const saveWork = () => {
      localStorage.setItem('work', JSON.stringify(work));
    };

  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-gray-400 px-5 text-white">
    <Logo/>
      <ul className="flex flex-row">
        {navElements.map((item: ActiveElement | any) => (
          <li
            key={item.name}
            onClick={() => {
              if (Array.isArray(item.value)) return;
              handleActiveElement(item);
            }}
            className={`group px-2.5 py-5 flex justify-center items-center
            ${isActive(item.value) ? "bg-primary-green" : "hover:bg-primary-grey-200"}
            `}
          >
            {/* If value is an array means it's a nav element with sub options i.e., dropdown */}
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
              />
            ) : item?.value === "comments" ? (
              // If value is comments, trigger the NewThread component
              <NewThread>
                <Button className="relative w-5 h-5 object-contain">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className={isActive(item.value) ? "invert" : ""}
                  />
                </Button>
              </NewThread>
            ) : (
              <Button className="relative w-5 h-5 object-contain">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className={isActive(item.value) ? "invert" : ""}
                />
              </Button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={addwork}>Save</button>
      <Link href="/dashboard" className="text-white bg-violet-600 p-1 px-2 rounded-sm">Projects</Link>
      {!user ? <Link href="/sign-in"><button
  className="overflow-hidden relative p-1 px-5 bg-green-400 text-black border-none rounded-sm text-lg  cursor-pointer z-10 group"
>
  Sign in
  <span
    className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
  ></span>
  <span
    className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
  ></span>
  <span
    className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"
  ></span>
  <span
    className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute text-white top-1 left-6 z-10"
    >Sign in</span>
</button>
</Link> : <UserButton/>}
    </nav>
  );
};

export default memo(Navbar, (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement);
