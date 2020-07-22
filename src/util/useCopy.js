import { useState } from "react";

export const useCopy = (text) => {
  const [status, setStatus] = useState("copy");

  const doCopy = () => {
    const txtArea = document.createElement("textarea");
    txtArea.innerHTML = text;
    document.body.appendChild(txtArea);
    txtArea.select();
    document.execCommand("copy");
    document.body.removeChild(txtArea);

    setStatus("copied");

    setTimeout(() => setStatus("copy"), 1200);
  };

  return [status, doCopy];
};
