import {Button, ButtonGroup, Chip, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {DeleteIcon, LinkIcon} from "@heroui/shared-icons";
import {useState} from "react";
import {useDocumentWasVisible} from "@/utils/hooks/use-document-was-visibility.ts";
import {httpClient} from "@/utils/http-client.ts";
import type {ISRApiTypes} from "@/utils/api/isr.api.types.ts";
import {App} from '@/constants/app.constants.ts'
import {IoFolderOpenOutline} from "react-icons/io5";
import {FcChargeBattery} from "react-icons/fc";
import {GoTrash} from "react-icons/go";
import {LuSunMoon} from "react-icons/lu";

type Props = {
  data: ISRApiTypes.CacheState[]
}

export default function IsrStatesTable(props: Props) {
  const [caches, setCaches] = useState(props.data)

  const getCaches = () => {
    httpClient.get<ISRApiTypes.CacheState[]>("/api/secrets/isr")
      .then(res => {
        setCaches(res.$)
      })
  }

  const handleDelete = (item: ISRApiTypes.CacheState) => {
    httpClient.delete(`/api/secrets/isr`, {data: {key: item.key}})
      .then(() => {
        getCaches();
      })
  }

  const handleOpen = (item: ISRApiTypes.CacheState) => {
    window.open(`${App.BASE_URL}${item.key}`, "_blank")
  }

  const handleRegenerate = () => {
    httpClient.get(`/api/secrets/isr/revalidation`)
      .then(() => {
        getCaches();
      })
  }

  const handleCleanUp = () => {
    httpClient.delete(`/api/secrets/isr`, {data: null})
      .then(() => {
        getCaches();
      })
  }

  const handleInspect = () => {
    httpClient.get(`/api/secrets/isr/inspect`)
      .then(() => {
        getCaches();
      })
  }

  const getHref = (item: ISRApiTypes.CacheState) => {
    return `${App.BASE_URL}${item.key}`
  }

  const isDev = App.DEV

  useDocumentWasVisible(() => {
    getCaches();
  })

  return <div className={"flex flex-col gap-2 p-2"}>
    <div className={"flex flex-row items-center justify-between"}>
      <Chip size={"lg"} color="warning" variant="solid" avatar={<LuSunMoon />}>
        ISR States
      </Chip>
      <ButtonGroup>
        <Button onPress={handleRegenerate} className={"bg-[#66a021] text-white"}>
          <FcChargeBattery/>
          Regenerate
        </Button>
        <Button onPress={handleCleanUp} color="danger">
          <GoTrash/>
          Clear
        </Button>
        {isDev && <Button onPress={handleInspect} color="default">
          <IoFolderOpenOutline/>
          Inspect
        </Button>}
      </ButtonGroup>
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
          caches.map((item) => {
            return <TableRow key={item.key}>
              <TableCell>{item.key}</TableCell>
              <TableCell className={"capitalize"}>{new Date(item.timestamp + item.ttl).toLocaleString()}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <DeleteIcon onClick={() => handleDelete(item)} className="text-lg text-danger cursor-pointer active:opacity-50"/>
                  <Link href={getHref(item)} className="text-lg cursor-pointer active:opacity-50">
                    <LinkIcon/>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  </div>
}
