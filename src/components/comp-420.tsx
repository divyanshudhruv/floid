import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <Badge variant="outline" className="gap-1.5 bg-emerald-50 border-0">
      <span
        className="size-1.5 rounded-full bg-emerald-500 "
        aria-hidden="true"
      ></span>
      <div className="text-emerald-900">Badge</div>
      
    </Badge>
  )
}
