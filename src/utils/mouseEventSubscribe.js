import React from "react";
import { throttle } from "axui-datagrid/commonjs/utils/common";

const MouseEventSubscribe = (callBack, onEnd) => {
  const throttledCallBack = throttle((e) => {
    callBack({
      pageX: e.pageX,
      pageY: e.pageY,
      clientX: e.clientX,
      clientY: e.clientY,
    });
  }, 100);

  const onMousemoveWindow = (e) => {
    throttledCallBack(e);
  };

  window.addEventListener("mousemove", onMousemoveWindow, false);
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", onMousemoveWindow);
    if (onEnd) {
      onEnd();
    }
  });
};

export default MouseEventSubscribe;
