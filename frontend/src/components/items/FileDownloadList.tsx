import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ItemFile } from "@/services/types"
import { formatFileSize } from "@/utils/formatFileSize"

export function FileDownloadList({ files }: { files: ItemFile[] }) {
  if (files.length === 0) {
    return <p className="text-sm text-muted-foreground">No files attached.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file) => (
        <Button
          key={file.id}
          variant="outline"
          nativeButton={false}
          render={<a href={file.url} download={file.name} />}
        >
          <DownloadIcon data-icon="inline-start" />
          {file.name}
          <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
        </Button>
      ))}
    </div>
  )
}
