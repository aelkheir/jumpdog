import { TitleLarge } from "@/components/text/TitleLarge";
import { TitleMedium } from "@/components/text/TitleMedium";
import useTranslation from "@/hooks/useTranslation";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  const { translate } = useTranslation();
  return (
    <>
      <div className={`h-full flex-col mt-16 lg:mt-0`}>
        <div className="w-full h-full grow lg:grow-0 flex items-center lg:items-start justify-center lg:justify-start">
          <div className="h-full w-full max-w-[calc(100vh-256px)] lg:w-[calc(100vh-160px)] lg:max-w-none lg:min-w-[350px] flex flex-col px-4 py-4 lg:py-0">
            <div className={`basis-full h-full flex flex-col`}>
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
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <TitleLarge color="text-on-surface">
                  404 | {translate("nothingHere")}
                </TitleLarge>
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
