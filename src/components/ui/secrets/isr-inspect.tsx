import {Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip} from "@heroui/react";
import {DeleteIcon} from "@heroui/shared-icons";
import type {CacheEntry} from "@/utils/isr/isr.cache.interface.ts";
import {useState} from "react";
import {useDocumentWasVisible} from "@/utils/hooks/use-document-was-visibility.ts";
import {httpClient} from "@/utils/http-client.ts";

type Props = {
  data: Map<string, CacheEntry<Response>>
}

export default function IsrInspect(props: Props) {
  const [caches, setCaches] = useState(props.data)

  useDocumentWasVisible(() => {
    console.log("useDocumentWasVisible")
    httpClient.get("/api/secrets/isr")
      .then(res => {
        setCaches(res.$)
      })
  })

  return <div className={"flex flex-col gap-2 p-2"}>
    <div className={"flex flex-row items-center justify-between"}>
      <Chip color="warning" variant="solid">
        ISR States
      </Chip>
      <Button color="primary">
        Reset
      </Button>
    </div>
    <Table
      aria-label="ISR States Table"
      isStriped
    >
      <TableHeader>
        <TableColumn>Key</TableColumn>
        <TableColumn>Expiration At</TableColumn>
        <TableColumn><span/></TableColumn>
      </TableHeader>
      <TableBody>
        {
          [...props.data].map(([key, item], index) => {
            return <TableRow key={index}>
              <TableCell>{key}</TableCell>
              <TableCell className={"capitalize"}>{item.expiration}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip color="danger" content="Delete">
                    <DeleteIcon className="text-lg text-danger cursor-pointer active:opacity-50"/>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  </div>
}
