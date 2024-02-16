import { dictionary } from "@/localization";
import { useRouter } from "next/router";

export default function useTranslation() {
  const { locale = "en" } = useRouter();
  return {
    translate: (term: string) => {
      const translate = dictionary[locale][term];

      return Boolean(translate) ? translate : term;
    },
  };
}
