import {Tooltip} from "@heroui/react";
import {MdWorkspacesFilled} from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import {httpClient} from "@/utils/http-client.ts";
import {useDocumentWasVisible} from "@/utils/hooks/use-document-was-visibility.ts";

export const BuildingId = () => {
  const [states, setStates] = useState({
    isSSG: false,
    isISR: false,
  })

  const signal = useRef(new AbortController())

  const getData = () => {
    signal.current.abort()
    signal.current = new AbortController()
    httpClient
      .get("/api/states", {
        signal: signal.current.signal
      })
      .then(res => {
        setStates(res.$)
        if (res.$.isSSG || res.$.isISR) {
          setTimeout(() => {
            getData()
          }, 10000)
        }
      })
  }

  useEffect(() => {
    getData()
  }, [])

  useDocumentWasVisible(getData)

  if (!states.isSSG && !states.isISR) {
    return
  }

  return <div className={"right-4 top-4 fixed z-[9999]"}>
    <Tooltip placement={"top"} content="Website is generate">
      <MdWorkspacesFilled className={"animate-spin"}/>
    </Tooltip>
  </div>
}
