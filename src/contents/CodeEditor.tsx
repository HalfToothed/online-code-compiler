import Editor from "@monaco-editor/react";
import { Label } from "@/components/ui/label"


  export function CodeEditor() {
    return (
      <div className="flex flex-col">
        <div className="grid w-full gap-2.5">
          <Label htmlFor="code">Code</Label>
        </div>
        <Editor height="100vh" width="100vh" theme="vs-dark" defaultLanguage="javascript" defaultValue="// some comment" />
      </div>
    )
  }
  