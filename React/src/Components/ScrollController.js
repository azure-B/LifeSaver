import { useEffect } from "react";

const ScrollController = ({
  outerDivRef,
  handleScrollUp,
  handleScrollDown,
}) => {
  useEffect(() => {
    const scrollFunc = (e) => {
      e.preventDefault();
      const { deltaY } = e;

      if (deltaY > 0) {
        handleScrollDown();
      } else {
        handleScrollUp();
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", scrollFunc);

    return () => {
      outerDivRefCurrent.removeEventListener("wheel", scrollFunc);
    };
  }, [handleScrollDown, handleScrollUp, outerDivRef]);

  return null;
};

export default ScrollController;
