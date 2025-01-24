import {type NotionApiTypes} from "@/utils/api/notion.api.types.ts";
import SearchResponseTable from "@/components/ui/notion/search-response-table.tsx";
import {Link, Snippet} from "@heroui/react";
import {getEnvFileBlobURL} from "@/utils/setup.ts";
import {useMemo, useState} from "react";
import type {Selection} from "@react-types/shared/src/selection";

type Props = {
  searchResponse: NotionApiTypes.SearchResponse
  accessToken: string
  handleSave: () => void;
}

type NotionTableResult = {
  databases: string[],
  pages: string[],
}

export default function OAuthSuccessful(props: Props) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onSelectionChange = (selection: Selection) => {
    if (selection === "all") {
      setSelectedKeys(props.searchResponse.results.map(item => item.id));
    } else {
      setSelectedKeys(Array.from(selection.values()) as string[]);
    }
  }

  const href = useMemo(() => {
    const data = props
      .searchResponse
      .results
      .reduce((previousValue: NotionTableResult, currentValue) => {
        if (selectedKeys.includes(currentValue.id)) {
          if (currentValue.object === "database") {
            previousValue.databases.push(currentValue.id);
          } else if (currentValue.object === "page") {
            previousValue.pages.push(currentValue.id);
          }
        }
        return previousValue
      }, {databases: [], pages: []} as NotionTableResult);

    return getEnvFileBlobURL({
      notionPages: data.pages,
      notionDatabases: data.databases,
      notionAccessToken: props.accessToken,
    })
  }, [selectedKeys])

  return <div>
    <Link download={"env"} href={href}>Save</Link>
    <span>Your access token is: </span>
    <Snippet color="primary" variant="solid">{props.accessToken}</Snippet>
    <SearchResponseTable selectedKeys={selectedKeys} onSelectionChange={onSelectionChange} searchResponse={props.searchResponse}/>
  </div>
}
