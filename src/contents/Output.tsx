import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
interface OutputProps {
  output: string;
  color?: string;
}

export function Output({ output, color }: OutputProps){
    return (
      <div className="w-full mb-6">
      <Label htmlFor="output" className="mb">Output</Label>
      <Textarea className={`resize-none h-full ${color}`} id="output" disabled value={output}/>
    </div>
    )
}