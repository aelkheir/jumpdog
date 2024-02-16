import { useRouter } from "next/router";
import React from "react";
import useTranslation from "@/hooks/useTranslation";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import cn from "classnames";
import { TitleLarge } from "./text/TitleLarge";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

interface HeaderProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  let HeaderIcon;
  if (isHome) {
    HeaderIcon = Cog6ToothIcon;
  } else {
    HeaderIcon = ChevronLeftIcon;
  }

  const { translate } = useTranslation();
  let headerTitle!: string;
  switch (router.pathname) {
    case "/settings":
      headerTitle = translate("settings");
      break;
    case "/":
      headerTitle = translate("jumpdog");
      break;
  }

  return (
    <div className="h-16 lg:h-14 border-outline-variant border-b lg:border-b-0">
      <div className="w-full h-full flex justify-between items-center p-4 lg:ltr:pl-7 lg:rtl:pr-7">
        <button
          className="w-10 h-10 flex justify-center items-center ltr:-ml-2 rtl:-mr-2 lg:hidden"
          onClick={() => {
            if (isHome) {
              router.push("/settings", "/settings", { locale: router.locale });

              // hack from stackoverflow to check
              // if it's safe to navigate back
            } else if (window?.history?.state?.idx) {
              router.back();
            } else {
              router.push("/", "/", { locale: router.locale });
            }
          }}
        >
          <HeaderIcon className="text-on-surface-variant w-6 h-6 rtl:-scale-x-[100%]" />
        </button>
        <TitleLarge
          data-title={headerTitle}
          data-jumpdog={translate("jumpdog")}
          color="text-on-surface"
          className={cn(
            `after:content-[attr(data-title)] lg:after:content-[attr(data-jumpdog)] lg:text-sm lg:font-medium lg:tracking-[0.1px]`
          )}
        />
        <div className="w-6 aspect-square shrink-0"></div>
      </div>
    </div>
  );
};
