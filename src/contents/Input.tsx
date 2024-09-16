import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Input(){
    return (
      <div className="w-full mb-6">
      <Label htmlFor="input">Input</Label>
      <Textarea className="resize-none h-full" placeholder="Type your Input here." id="input" />
    </div>
    )
}