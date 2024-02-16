import { useRouter } from "next/router";
import cn from "classnames";
import React from "react";
import { IconContext, IconType } from "react-icons";
import { LabelLarge } from "./text/LabelLarge";
import Link from "next/link";

interface NavLinkProps {
  setIsDrawerOpen: (value: React.SetStateAction<boolean>) => void;
  url: string;
  linkText: string;
  fillIcon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  outlineIcon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
}

export const NavLink: React.FC<NavLinkProps> = ({
  setIsDrawerOpen,
  linkText,
  url,
  fillIcon: FillIcon,
  outlineIcon: OutlineIcon,
}) => {
  const { locale, push, pathname } = useRouter();
  const active = url === pathname;

  return (
    <button
      onClick={() => {
        push(url, url, { locale }).then((success) => {
          setIsDrawerOpen(false);
        });
      }}
      className={cn(
        "w-full h-14 flex items-center gap-3 px-4 lg:ltr:pl-4 lg:rtl:pr-4 cursor-pointer",
        active && "bg-secondary-container"
      )}
    >
      {active ? (
        <FillIcon
          className={cn(
            "w-6 h-6",
            active ? "text-on-secondary-container" : "text-on-surface-variant"
          )}
        />
      ) : (
        <OutlineIcon
          className={cn(
            "w-6 h-6",
            active ? "text-on-secondary-container" : "text-on-surface-variant"
          )}
        />
      )}
      <LabelLarge
        color={
          active ? "text-on-secondary-container" : "text-on-surface-variant"
        }
      >
        {linkText}
      </LabelLarge>
    </button>
  );
};
