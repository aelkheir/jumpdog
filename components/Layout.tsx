import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import useTranslation from "@/hooks/useTranslation";
import { NavLink } from "./NavLink";
import { Header } from "./Header";
import {
  Cog6ToothIcon as FillCog6Tooth,
  PuzzlePieceIcon as FillPuzzlePieceIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import {
  Cog6ToothIcon as OutlineCog6Tooth,
  PuzzlePieceIcon as OutlinePuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { LabelLarge } from "./text/LabelLarge";
import { ThemeContext } from "@/store/contexts";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { locale } = useRouter();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { translate } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className="h-full w-full bg-gradient-radial from-primary via-background to-background"
      dir={dir}
    >
      <div className="h-full w-full bg-background bg-opacity-80">
        <div className="h-full w-full flex flex-col lg:flex-row lg:justify-center lg:p-4 lg:gap-4">
          {/* Navigation Drawer */}
          <div className="lg:w-full lg:max-w-xs lg:flex fixed lg:static top-0 left-0 right-0  z-50">
            <div
              className={`w-full h-full flex flex-col ${
                isDrawerOpen ? "h-screen" : ""
              }`}
            >
              <Header
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
              />
              <nav
                className={`${
                  isDrawerOpen ? "flex" : "hidden lg:flex"
                } overflow-y-auto grow flex-col gap-2 lg:pt-2`}
              >
                <NavLink
                  linkText={translate("play")}
                  url="/"
                  setIsDrawerOpen={setIsDrawerOpen}
                  fillIcon={FillPuzzlePieceIcon}
                  outlineIcon={OutlinePuzzlePieceIcon}
                />
                <NavLink
                  linkText={translate("settings")}
                  url="/settings"
                  setIsDrawerOpen={setIsDrawerOpen}
                  fillIcon={FillCog6Tooth}
                  outlineIcon={OutlineCog6Tooth}
                />
              </nav>
              <div
                className={`${
                  isDrawerOpen ? "flex" : "hidden lg:flex"
                } w-full h-[53px] justify-center items-center border-t border-outline-variant`}
              >
                <button
                  className="w-full h-full flex justify-center items-center gap-2 text-on-surface"
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                >
                  {theme === "dark" ? (
                    <SunIcon className="w-6 h-6 text-on-surface" />
                  ) : (
                    <MoonIcon className="w-6 h-6 text-on-surface" />
                  )}
                  <LabelLarge>{translate("switchTheme")}</LabelLarge>
                </button>
              </div>
            </div>
          </div>

          {/* Page */}
          {children}
        </div>
      </div>
    </div>
  );
};
