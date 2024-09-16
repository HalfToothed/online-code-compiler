import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Output(){
    return (
      <div className="w-full mb-6">
      <Label htmlFor="output" className="mb">Output</Label>
      <Textarea className="resize-none h-full" id="output" disabled/>
    </div>
    )
}