import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import useTranslation from "@/hooks/useTranslation";
import { BodyLarge } from "@/components/text/BodyLarge";
import { TitleLarge } from "@/components/text/TitleLarge";
import { Select } from "@/components/Select";
import { Item } from "react-stately";
import { Switch } from "@/components/Switch";
import { useContext } from "react";
import { SettingsContext, ThemeContext } from "@/store/contexts";
import { BoardColor } from "@/store/types";

export default function Settings() {
  const router = useRouter();
  const { theme, setTheme } = useContext(ThemeContext);
  const settings = useContext(SettingsContext);
  const { translate } = useTranslation();

  const changeLocale = (key: string | number) => {
    document.cookie = `NEXT_LOCALE=${key}; max-age=31536000; path=/`;
    router.push(router.pathname, router.pathname, {
      locale: key as string,
    });
  };

  return (
    <>
      <div className={`h-full flex-col mt-16 lg:mt-0`}>
        <div className="w-full grow lg:grow-0 flex items-center lg:items-start justify-center lg:justify-start">
          <div className="h-full w-full max-w-[calc(100vh-256px)] lg:w-[calc(100vh-160px)] lg:max-w-none lg:min-w-[350px] flex flex-col px-4 py-4 lg:px-0 lg:py-0">
            <div className={`basis-full`}>
              <div className="h-14 hidden lg:flex items-center gap-4">
                <button
                  className="w-10 h-10 flex justify-center items-center ltr:-ml-2 rtl:-mr-2"
                  onClick={() => {
                    if (window?.history?.state?.idx) {
                      router.back();
                    } else {
                      router.push("/", "/", { locale: router.locale });
                    }
                  }}
                >
                  <ArrowSmallLeftIcon className="text-on-surface-variant w-6 h-6 rtl:-scale-x-[100%]" />
                </button>
                <TitleLarge color="text-on-surface">
                  {translate("settings")}
                </TitleLarge>
              </div>
              <div className="flex items-center h-14">
                <Switch
                  name="Hilgh light last move"
                  isSelected={settings.highlightLastMove}
                  onChange={(value) => settings.setHighlightLastMove(value)}
                >
                  {translate("highlightLastMove")}
                </Switch>
              </div>
              <div className="flex items-center h-14">
                <BodyLarge color="text-on-surface grow"></BodyLarge>
                <Switch
                  name="Show Legal Moves"
                  isSelected={settings.showLegalMoves}
                  onChange={(value) => settings.setShowLegalMoves(value)}
                >
                  {translate("showLegalMoves")}
                </Switch>
              </div>
              <div className="flex items-center h-14">
                <BodyLarge color="text-on-surface grow"></BodyLarge>
                <Switch
                  name="Show coordinates"
                  isSelected={settings.showCoordinates}
                  onChange={(value) => settings.setShowCoordinates(value)}
                >
                  {translate("showCoordinates")}
                </Switch>
              </div>
              {/* <div className="flex items-center h-14">
                <BodyLarge color="text-on-surface grow"></BodyLarge>
                <Switch
                  name="Play sounds"
                  isSelected={settings.playSounds}
                  onChange={(value) => settings.setPlaySounds(value)}
                >
                  {translate("playSounds")}
                </Switch>
              </div> */}
              <div className="flex items-center h-14">
                <BodyLarge color="text-on-surface grow"></BodyLarge>
                <Switch
                  name="Theme"
                  isSelected={theme === "dark"}
                  onChange={(isSelected) => {
                    isSelected ? setTheme("dark") : setTheme("light");
                  }}
                >
                  {translate("darkMode")}
                </Switch>
              </div>
              <div className="flex items-center h-14">
                <BodyLarge color="text-on-surface grow">
                  {translate("boardColor")}
                </BodyLarge>
                <Select
                  selectedKey={settings.boardColor}
                  onSelectionChange={(value) =>
                    settings.setBoardColor(value as BoardColor)
                  }
                  aria-label={translate("boardColor")}
                >
                  <Item key="gray">{translate("gray")}</Item>
                  <Item key="blue">{translate("blue")}</Item>
                  <Item key="pink">{translate("pink")}</Item>
                </Select>
              </div>
              <div className="flex items-center h-14">
                <BodyLarge color="text-on-surface grow">
                  {translate("language")}
                </BodyLarge>
                <Select
                  selectedKey={router.locale}
                  aria-label="Select language"
                  onSelectionChange={changeLocale}
                >
                  <Item key="ar">{translate("arabic")}</Item>
                  <Item key="en">{translate("english")}</Item>
                  <Item key="de">{translate("german")}</Item>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`hidden lg:block w-full h-full lg:max-w-xs`}>
        <div className="w-full h-full flex flex-col lg:gap-8">
          <div className="w-full grow lg:grow-0">
            <div className=" flex flex-col"></div>
          </div>
        </div>
      </div>
    </>
  );
}
