import {NotionRenderer} from "react-notion-x";
import type {ComponentProps} from "react";

type Props = {} & ComponentProps<typeof NotionRenderer>

export const NotionRender = (props: Props) => {
  return <NotionRenderer  {...props} recordMap={props.recordMap} previewImages/>
}
