import { BodyMedium } from "@/components/text/BodyMedium";
import { TitleMedium } from "@/components/text/TitleMedium";
import useTranslation from "@/hooks/useTranslation";
import React from "react";

interface PlayerPanelProps {
  isCPU?: boolean;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({ isCPU = false }) => {
  const { translate } = useTranslation();
  const wrapperStyles = isCPU ? "flex-col" : "flex-col-reverse";
  const strenghtBarWrapperStyles = isCPU ? "flex-row-reverse" : "flex-row ";
  const borderStyles = isCPU ? "" : "";

  const avatarUrl = isCPU ? "bg-[url('/kuku.png')]" : "bg-[url('/guest.png')]";
  return (
    <div
      className={`h-14 flex ${wrapperStyles} bg-surface ${borderStyles} lg:drop-shadow z-10`}
    >
      <div
        className={`h-full px-4 lg:px-2 flex items-center gap-2 bg-surface-tint bg-opacity-5`}
      >
        <div className={`w-10 aspect-square ${avatarUrl} bg-contain`}></div>
        <TitleMedium className="grow" color="text-on-surface">
          {isCPU ? translate("kuku") : translate("guest")}
        </TitleMedium>
        {/* <BodyMedium color="text-on-surface-variant" weight="font-medium">
          10:00
        </BodyMedium> */}
      </div>
      <div
        className={`${strenghtBarWrapperStyles} bg-secondary bg-opacity-30 flex h-[3px] w-full`}
      >
        <div className={`w-1/2 h-full bg-secondary rounded-sm`}></div>
      </div>
    </div>
  );
};
