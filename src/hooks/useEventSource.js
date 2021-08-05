import { useEffect, useRef, useState } from "react";

const port = 3001;

const useEventSource = () => {
  const [data, setData] = useState([]);
  const listnr = useRef(false);

  useEffect(() => {
    /* event source follows html5 spec and is target of event fired */
    const events = new EventSource(`http://localhost:${port}/become-client`);

    events.addEventListener("open", (event) => {
      console.log("open", event);
    });

    events.addEventListener("message", (event) => {
      const parsedData = JSON.parse(event.data);
      setData((data) => data.concat(parsedData));
      console.log(event);
    });

    events.addEventListener("error", (event) => {
      console.log("error", event);
    });

    events.addEventListener("initial-connection", (event) => {
      console.log("initial response", event);
    });

    // EventSource.close().
  }, []);

  return [data, setData];
};

export default useEventSource;
