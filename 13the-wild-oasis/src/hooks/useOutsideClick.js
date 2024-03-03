import { useEffect, useRef } from "react";

function useOutsideClick(close, listenCapture = true) {
    const ref = useRef();

  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      },
      listenCapture
    );

    return () => {
      document.addEventListener("click", (e) => {}, listenCapture);
    };
  }, [close]);

  return ref;
}

export {useOutsideClick}
