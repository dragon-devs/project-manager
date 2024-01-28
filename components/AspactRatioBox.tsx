import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioDemo() {
  return (
    <AspectRatio ratio={4 / 2} className="rounded-md flex flex-col bg-muted">

    </AspectRatio>
  )
}
