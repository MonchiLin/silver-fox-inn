import type {NotionApiTypes} from "@/utils/api/notion.api.types.ts";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import type {Selection} from "@react-types/shared/src/selection";

type Props = {
  searchResponse: NotionApiTypes.SearchResponse
  selectedKeys: string[]
  onSelectionChange: (keys: Selection) => void
}

const getTitle = (item: any) => {
  if (item.object === "database") {
    return (item.icon ? item.icon.emoji + " " : "") + item.title.map((i: any) => i.text.content).join(" ")
  } else if (item.object === "page") {
    return item.properties.title.title.map((i: any) => i.text.content).join(" ")
  }
  return "---"
}

export default function SearchResponseTable(props: Props) {

  return (
    <Table
      selectedKeys={props.selectedKeys}
      selectionMode="multiple"
      onSelectionChange={props.onSelectionChange}
      aria-label="Notion Search Result"
      isStriped
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>TYPE</TableColumn>
        <TableColumn>ID</TableColumn>
      </TableHeader>
      <TableBody>
        {
          props.searchResponse.results.map(item => {
            return <TableRow key={item.id}>
              <TableCell>{getTitle(item)}</TableCell>
              <TableCell className={"capitalize"}>{item.object}</TableCell>
              <TableCell>{item.id}</TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  )
}
