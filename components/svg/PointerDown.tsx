import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PointerDownProps {}

export const PointerDown: React.FC<PointerDownProps> = ({}) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    gsap
      .fromTo(
        svg,
        {
          scale: 1,
        },
        {
          scale: 0.7,
        }
      )
      .repeat(-1)
      .yoyo(true);
  }, []);
  return (
    <svg
      ref={ref}
      width="32"
      height="42"
      viewBox="0 0 32 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.4951 23.1537C26.4364 22.8757 25.3937 20.3731 25.0461 19.1914L24.9071 18.6352C24.9071 18.6352 24.5595 18.2182 24.1424 17.5925H24.0034C24.0034 17.5925 23.6558 23.0147 23.9338 24.7526C24.2119 26.699 24.2119 35.3189 24.2814 37.4739C24.4204 39.9764 23.9338 41.7838 21.1532 41.7838C18.3031 41.7838 17.4689 39.5593 17.6079 37.4739C17.8165 34.5542 18.025 24.7526 18.025 24.7526C17.747 26.0039 17.1909 27.1856 15.1054 26.9771C12.7419 26.699 12.2553 25.7953 12.1858 24.3355C11.004 26.3514 9.40514 26.2124 8.43193 25.9343C6.76356 25.5173 6.27696 22.5281 6.27696 22.5281C5.65132 24.7526 4.60859 24.3355 3.14877 24.1269C2.10604 23.9879 1.13283 23.0842 0.715733 21.5549C0.368157 20.0255 -0.813603 18.9133 0.924279 6.95668C1.34137 3.82849 4.12198 2.29915 8.22338 1.53448C11.004 1.04788 14.8273 0.283209 17.6775 0.074663H18.4421C20.041 0.00514771 21.5703 0.630785 22.613 2.02109L28.8694 10.4324C29.2865 10.8495 29.5646 11.4057 29.7036 12.1008C29.9122 14.2558 30.4683 16.8974 31.8586 20.0255C32.3452 21.2073 31.5805 23.3623 29.4951 23.1537Z"
        fill="#FFDD67"
      />
      <path
        d="M3.98291 24.1965C6.62449 24.6136 6.41594 20.5122 5.85982 22.2501C5.3037 24.0575 3.98291 24.1965 3.98291 24.1965ZM9.05753 26.0039C12.6723 26.3515 12.3247 22.3196 11.6296 23.988C10.9344 25.6564 9.05753 26.0039 9.05753 26.0039ZM15.0358 26.9076C18.6506 27.2552 18.3031 22.9453 17.6079 24.6136C16.9128 26.3515 15.0358 26.9076 15.0358 26.9076ZM23.8643 17.5231C23.8643 17.5231 24.907 26.282 24.3509 37.4044C24.2814 39.0033 24.2814 41.5058 21.3617 41.6449C24.6985 40.6717 23.1691 29.6187 23.8643 17.5231Z"
        fill="#EBA352"
      />
      <path
        d="M31.3026 22.5282C31.4416 22.0416 31.3721 21.4854 31.2331 21.1379C29.7732 18.0097 29.2866 15.3681 29.0781 13.2131C29.0086 12.518 28.7305 11.9618 28.2439 11.5447L21.9875 3.06388C21.0143 1.74309 19.4155 1.04793 17.8166 1.11745H17.0519C14.2713 1.326 10.448 2.09066 7.66738 2.57727C4.74774 3.06388 2.45373 4.03709 1.27197 5.63594C2.17567 3.27242 4.74774 2.09066 8.29302 1.46503C11.0736 0.978419 14.897 0.213751 17.7471 0.00520499H18.5118C20.1106 -0.0643103 21.6399 0.561327 22.6827 1.95163L28.8695 10.4325C29.2866 10.8496 29.5647 11.4057 29.7037 12.1009C29.9123 14.2558 30.4684 16.8974 31.8587 20.0256C32.1368 20.7208 31.9977 21.833 31.3026 22.5282Z"
        fill="#EBA352"
      />
      <path
        d="M24.6983 14.6034C24.6983 14.6034 25.602 17.5925 25.9496 18.9829C26.2277 20.1646 27.3399 22.3196 29.1473 23.1538C26.2277 22.7367 25.2544 20.3732 24.9069 19.1914L24.7678 18.6353C24.7678 18.6353 24.2812 18.2877 23.7946 17.5925C23.8641 17.523 24.8373 16.2022 24.6983 14.6034ZM17.5382 23.9184C17.3992 23.5013 17.1907 23.2233 16.9821 22.8757C16.7736 22.5281 16.565 22.2501 16.3565 21.833C16.1479 21.4854 16.0089 20.9988 16.0089 20.5817C16.0089 20.1646 16.1479 19.678 16.3565 19.3304C16.3565 19.7475 16.426 20.1646 16.565 20.5122C16.6345 20.8598 16.8431 21.2073 16.9821 21.5549C17.1211 21.9025 17.3297 22.2501 17.4687 22.6672C17.6078 23.0843 17.6773 23.5013 17.5382 23.9184ZM12.0465 22.8062C11.9075 22.3891 11.699 22.111 11.4904 21.7635C11.2819 21.4159 11.0733 21.1378 10.8648 20.7207C10.6562 20.3732 10.5172 19.8866 10.5172 19.4695C10.5172 19.0524 10.6562 18.5658 10.8648 18.2182C10.8648 18.6353 10.9343 19.0524 11.0733 19.3999C11.1428 19.7475 11.3514 20.0951 11.4904 20.4427C11.6294 20.7903 11.838 21.1378 11.977 21.5549C12.116 21.9025 12.1856 22.3891 12.0465 22.8062ZM6.13773 21.1378C5.9987 20.7207 5.79016 20.4427 5.58161 20.0951C5.37307 19.7475 5.16452 19.4695 4.95597 19.0524C4.74743 18.7048 4.6084 18.2182 4.6084 17.8011C4.6084 17.384 4.74743 16.8974 4.95597 16.5498C4.95597 16.9669 5.02549 17.384 5.16452 17.7316C5.23404 18.0792 5.44258 18.4267 5.58161 18.7743C5.72064 19.1219 5.92919 19.4695 6.06822 19.8866C6.20725 20.2341 6.27676 20.7207 6.13773 21.1378Z"
        fill="#EBA352"
      />
    </svg>
  );
};