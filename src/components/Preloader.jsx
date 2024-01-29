import gsap from "gsap/gsap-core";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
export default function Preloader() {
  const preload = useRef();
  const preloadText = useRef();
  const extra = useRef();
  const stag = useRef();

  useGSAP(
    () => {
      gsap.to(
        stag.current.children,
        {
          scaleY: 0,
          delay: 3,
          duration: 1.2,
          y: "100%",
          ease: "power4.out",
          stagger: 3,
        },
        3
      );
      gsap.to(preloadText.current, {
        delay: 4,
        duration: 2,
        opacity: 0,
      });

      gsap.to(extra.current, {
        scaleY: 0,
        delay: 4,
        duration: 2,
        y: "100%",
        ease: "power4.out",
      });

      gsap.to(preload.current, {
        scaleY: 0,
        delay: 3.8,
        duration: 2,
        y: "100%",
        ease: "power4.out",
      });
    },
    { scope: stag, preload }
  );

  return (
    <>
      <div ref={stag}>
        <div ref={extra} className="h-full absolute w-full bg-pink-400"></div>
        <div
          ref={preload}
          className="h-full absolute  w-full z-[1000] bg-black text-white flex justify-center items-center "
        >
          <h1
            ref={preloadText}
            className=" font-black  text-2xl md:text-6xl animate-pulse overflow-hidden z-[1000] whitespace-nowrap "
          >
            REXA - Studio
          </h1>
        </div>
      </div>
    </>
  );
}
