import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  // Getting the ref of the modal window for adding click outside handler
  const ref = useRef();

  // Creating an useEffect that adds and removes the click event handler for the document
  useEffect(
    function () {
      // Click handler function
      function handleClick(e) {
        // If ref (modal window exists) and it does not contains clicked target -> Close modal
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      //Adding a click event handler (true argument is for handle the event in the capturing phase)
      document.addEventListener("click", handleClick, listenCapturing);

      // Remove click event handler when component dismounts
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
