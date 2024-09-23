/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface InputProps {
  input: string | undefined;
  setInput: (input: any) => void;
}

export function Input({ input, setInput }: InputProps){
    return (
      <div className="w-full mb-6">
      <Label htmlFor="input">Input</Label>
      <Textarea className="resize-none h-full" placeholder="Type your Input here." id="input"  value={input}
      onChange={(e) => setInput(e.target.value)}/>
    </div>
    )
}