import Editor from "@monaco-editor/react";
import { Label } from "@/components/ui/label"
import { LanguageType, Placeholder } from "@/lib/model";
import { useEffect, useState } from "react";

interface CodeEditorProps {
  language: LanguageType | undefined;
}

const placeholders : Placeholder[] = [
  {id:45,placeholder:"Assembly (NASM 2.14.02)"},
  {id:46,placeholder:"Bash (5.0.0)"},
  {id:47,placeholder:"Basic (FBC 1.07.1)"},
  {id:104,placeholder:"C (Clang 18.1.8)"},
  {id:75,placeholder:"C (Clang 7.0.1)"},
  {id:76,placeholder:"C++ (Clang 7.0.1)"},
  {id:103,placeholder:"C (GCC 14.1.0)"},
  {id:105,placeholder:"C++ (GCC 14.1.0)"},
  {id:48,placeholder:"C (GCC 7.4.0)"},
  {id:52,placeholder:"C++ (GCC 7.4.0)"},
  {id:49,placeholder:"C (GCC 8.3.0)"},
  {id:53,placeholder:"C++ (GCC 8.3.0)"},
  {id:50,placeholder:"C (GCC 9.2.0)"},
  {id:54,placeholder:"C++ (GCC 9.2.0)"},
  {id:86,placeholder:"Clojure (1.10.1)"},
  {id:51,placeholder:"C# (Mono 6.6.0.161)"},
  {id:77,placeholder:"COBOL (GnuCOBOL 2.2)"},
  {id:55,placeholder:"Common Lisp (SBCL 2.0.0)"},
  {id:90,placeholder:"Dart (2.19.2)"},
  {id:56,placeholder:"D (DMD 2.089.1)"},
  {id:57,placeholder:"Elixir (1.9.4)"},
  {id:58,placeholder:"Erlang (OTP 22.2)"},
  {id:44,placeholder:"Executable"},
  {id:87,placeholder:"F# (.NET Core SDK 3.1.202)"},
  {id:59,placeholder:"Fortran (GFortran 9.2.0)"},
  {id:60,placeholder:"Go (1.13.5)"},
  {id:95,placeholder:"Go (1.18.5)"},
  {id:88,placeholder:"Groovy (3.0.3)"},
  {id:61,placeholder:"Haskell (GHC 8.8.1)"},
  {id:96,placeholder:"JavaFX (JDK 17.0.6, OpenJFX 22.0.2)"},
  {id:91,placeholder:"Java (JDK 17.0.6)"},
  {id:62,placeholder:"Java (OpenJDK 13.0.1)"},
  {id:63,placeholder:"JavaScript (Node.js 12.14.0)"},
  {id:93,placeholder:"JavaScript (Node.js 18.15.0)"},
  {id:97,placeholder:"JavaScript (Node.js 20.17.0)"},
  {id:102,placeholder:"JavaScript (Node.js 22.08.0)"},
  {id:78,placeholder:"Kotlin (1.3.70)"},
  {id:64,placeholder:"Lua (5.3.5)"},
  {id:89,placeholder:"Multi-file program"},
  {id:79,placeholder:"Objective-C (Clang 7.0.1)"},
  {id:65,placeholder:"OCaml (4.09.0)"},
  {id:66,placeholder:"Octave (5.1.0)"},
  {id:67,placeholder:"Pascal (FPC 3.0.4)"},
  {id:85,placeholder:"Perl (5.28.1)"},
  {id:68,placeholder:"PHP (7.4.1)"},
  {id:98,placeholder:"PHP (8.3.11)"},
  {id:43,placeholder:"Plain Text"},
  {id:69,placeholder:"Prolog (GNU Prolog 1.4.5)"},
  {id:70,placeholder:"Python (2.7.17)"},
  {id:92,placeholder:"Python (3.11.2)"},
  {id:100,placeholder:"Python (3.12.5)"},
  {id:71,placeholder:"Python (3.8.1)"},
  {id:80,placeholder:"R (4.0.0)"},
  {id:99,placeholder:"R (4.4.1)"},
  {id:72,placeholder:"Ruby (2.7.0)"},
  {id:73,placeholder:"Rust (1.40.0)"},
  {id:81,placeholder:"Scala (2.13.2)"},
  {id:82,placeholder:"SQL (SQLite 3.27.2)"},
  {id:83,placeholder:"Swift (5.2.3)"},
  {id:74,placeholder:"TypeScript (3.7.4)"},
  {id:94,placeholder:"TypeScript (5.0.3)"},
  {id:101,placeholder:"TypeScript (5.6.2)"},
  {id:84,placeholder:"Visual Basic.Net (vbnc 0.0.0.5943)"}]


const getPlaceholder = (id: number | undefined) => {
  const lang = placeholders.find((lang) => lang.id === id);
  return lang ? lang.placeholder : "";
};


  export function CodeEditor({ language }: CodeEditorProps) {

    const [code, setCode] = useState("");

    useEffect(() => {
      // Set the placeholder when the language changes
      const placeholder = getPlaceholder(language?.id);
      setCode(placeholder);
    }, [language]);
    
    return (
      <div className="flex flex-col">
        <div className="grid w-full gap-2.5">
          <Label htmlFor="code">Code</Label>
        </div>
        <Editor height="100vh" width="100vh" theme="vs-dark" language={language?.name} value={code} />
      </div>
    )
  }
  