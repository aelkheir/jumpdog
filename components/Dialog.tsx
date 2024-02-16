import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AriaDialogProps, useDialog } from "react-aria";
import { OverlayStateContext } from "@/page-components/index/ResignButton";

interface DialogProps extends AriaDialogProps {
  title?: string;
  children: React.FC<{ close: () => void }>;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  children: Render,
  ...props
}) => {
  let ref = React.useRef<HTMLDivElement>(null);
  let { dialogProps, titleProps } = useDialog(props, ref);

  const close = useContext(OverlayStateContext);

  const { locale } = useRouter();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div
      {...dialogProps}
      ref={ref}
      className="outline-none drop-shadow bg-surface"
    >
      <div className="w-full h-full flex flex-col" dir={dir}>
        {/* {title && (
          <div className="flex justify-center items-center h-10">
            <TitleMedium
              {...titleProps}
              style={{ marginTop: 0 }}
              color="text-on-surface "
            >
              {title}
            </TitleMedium>
          </div>
        )} */}
        <Render close={close} />
      </div>
    </div>
  );
};
