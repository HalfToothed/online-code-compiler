import Editor from "@monaco-editor/react";
import { Label } from "@/components/ui/label";
import { LanguageType, Placeholder } from "@/lib/model";
import { useEffect } from "react";

interface CodeEditorProps {
  selectedLanguage: LanguageType | undefined;
  code: string;
  setCode: (code: string) => void;
}

const placeholders: Placeholder[] = [
  { id: 45, placeholder: "// Online Assembly compiler\nmov eax, 1" },
  { id: 46, placeholder: "// Online Bash compiler\necho 'Hello, World!'" },
  { id: 47, placeholder: "// Online Basic compiler\nPRINT 'Hello, World!'" },
  {
    id: 104,
    placeholder:
      '// Online C compiler to run C program online\n#include <stdio.h>\n\nint main() {\n    // Write C code here\n    printf("hello");\n    return 0;\n}',
  },
  {
    id: 75,
    placeholder:
      '// Online C compiler\n#include <stdio.h>\n\nint main() {\n    printf("Hello from World");\n    return 0;\n}',
  },
  {
    id: 76,
    placeholder:
      '// Online C++ compiler\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}',
  },
  {
    id: 103,
    placeholder:
      '// Online C compiler\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
  },
  {
    id: 105,
    placeholder:
      '// Online C++ compiler\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}',
  },
  {
    id: 48,
    placeholder:
      '// Online C compiler\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
  },
  {
    id: 52,
    placeholder:
      '// Online C++ compiler\n#include <iostream>\n\nint main() {\n    std::cout << "Hello,World!";\n    return 0;\n}',
  },
  {
    id: 49,
    placeholder:
      '// Online C compiler\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
  },
  {
    id: 53,
    placeholder:
      '// Online C++ compiler\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}',
  },
  {
    id: 50,
    placeholder:
      '// Online C compiler\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
  },
  {
    id: 54,
    placeholder:
      '// Online C++ compiler\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}',
  },
  {
    id: 86,
    placeholder: '// Online Clojure compiler\n(println "Hello, World!")',
  },
  {
    id: 51,
    placeholder:
      '// Online C# compiler\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  },
  {
    id: 77,
    placeholder:
      "// Online COBOL compiler\n       IDENTIFICATION DIVISION.\n       PROGRAM-ID. HelloWorld.\n       PROCEDURE DIVISION.\n           DISPLAY 'Hello, World!'\n           STOP RUN.",
  },
  {
    id: 55,
    placeholder: "// Online Common Lisp compiler\n(print 'Hello, World!')",
  },
  {
    id: 90,
    placeholder:
      "// Online Dart compiler\nvoid main() {\n    print('Hello, World!');\n}",
  },
  {
    id: 56,
    placeholder:
      "// Online D compiler\nimport std.stdio;\n\nvoid main() {\n    writeln('Hello, World!');\n}",
  },
  { id: 57, placeholder: "// Online Elixir compiler\nIO.puts 'Hello, World!'" },
  {
    id: 58,
    placeholder: "// Online Erlang compiler\nio:format('Hello, World!~n').",
  },
  { id: 44, placeholder: "// Executable\n./your_executable" },
  { id: 87, placeholder: "// Online F# compiler\nprintfn 'Hello, World!'" },
  {
    id: 59,
    placeholder:
      "// Online Fortran compiler\nprogram hello\n    print *, 'Hello, World!'\nend program hello",
  },
  {
    id: 60,
    placeholder:
      '// Online Go compiler\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  },
  {
    id: 95,
    placeholder:
      '// Online Go compiler\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  },
  { id: 88, placeholder: "// Online Groovy compiler\nprintln 'Hello, World!'" },
  {
    id: 61,
    placeholder: '// Online Haskell compiler\nmain = putStrLn "Hello, World!"',
  },
  {
    id: 96,
    placeholder:
      "// Online JavaFX compiler\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println('Hello, World!');\n    }\n}",
  },
  {
    id: 91,
    placeholder:
      "// Online Java compiler\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println('Hello, World!');\n    }\n}",
  },
  {
    id: 62,
    placeholder:
      "// Online Java compiler\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println('Hello, World!');\n    }\n}",
  },
  {
    id: 63,
    placeholder: "// Online JavaScript compiler\nconsole.log('Hello, World!');",
  },
  {
    id: 93,
    placeholder: "// Online JavaScript compiler\nconsole.log('Hello, World!');",
  },
  {
    id: 97,
    placeholder: "// Online JavaScript compiler\nconsole.log('Hello, World!');",
  },
  {
    id: 102,
    placeholder: "// Online JavaScript compiler\nconsole.log('Hello, World!');",
  },
  {
    id: 78,
    placeholder:
      "// Online Kotlin compiler\nfun main() {\n    println('Hello, World!')\n}",
  },
  { id: 64, placeholder: "// Online Lua compiler\nprint('Hello, World!')" },
  { id: 89, placeholder: "// Multi-file program\n./your_program" },
  {
    id: 79,
    placeholder:
      '// Online Objective-C compiler\n#import <Foundation/Foundation.h>\n\nint main(int argc, const char * argv[]) {\n    @autoreleasepool {\n        NSLog(@"Hello, World!");\n    }\n    return 0;\n}',
  },
  {
    id: 65,
    placeholder: '// Online OCaml compiler\nprint_endline "Hello, World!"',
  },
  { id: 66, placeholder: "// Online Octave compiler\ndisp('Hello, World!')" },
  {
    id: 67,
    placeholder:
      "// Online Pascal compiler\nprogram Hello;\nbegin\n    WriteLn('Hello, World!');\nend.",
  },
  { id: 85, placeholder: "// Online Perl compiler\nprint 'Hello, World!';" },
  { id: 68, placeholder: "// Online PHP compiler\necho 'Hello, World!';" },
  { id: 98, placeholder: "// Online PHP compiler\necho 'Hello, World!';" },
  { id: 43, placeholder: "// Plain Text\nJust plain text" },
  {
    id: 69,
    placeholder: "// Online Prolog compiler\nwrite('Hello, World!'), nl.",
  },
  { id: 70, placeholder: "# Online Python 2 compiler\nprint 'Hello, World!'" },
  { id: 92, placeholder: "# Online Python 3 compiler\nprint('Hello, World!')" },
  {
    id: 100,
    placeholder: "# Online Python 3 compiler\nprint('Hello, World!')",
  },
  {
    id: 71,
    placeholder: "# Online Python 3.8 compiler\nprint('Hello, World!')",
  },
  { id: 80, placeholder: "// Online R compiler\nprint('Hello, World!')" },
  { id: 99, placeholder: "// Online R compiler\nprint('Hello, World!')" },
  { id: 72, placeholder: "// Online Ruby compiler\nputs 'Hello, World!'" },
  {
    id: 73,
    placeholder:
      '// Online Rust compiler\nfn main() {\n    println!("Hello, World!");\n}',
  },
  {
    id: 81,
    placeholder:
      '// Online Scala compiler\nobject HelloWorld {\n    def main(args: Array[String]) {\n        println("Hello, World!")\n    }\n}',
  },
  { id: 82, placeholder: "// Online SQL compiler\nSELECT 'Hello, World!';" },
  { id: 83, placeholder: '// Online Swift compiler\nprint("Hello, World!")' },
  {
    id: 74,
    placeholder: "// Online TypeScript compiler\nconsole.log('Hello, World!');",
  },
  {
    id: 94,
    placeholder: "// Online TypeScript compiler\nconsole.log('Hello, World!');",
  },
  {
    id: 101,
    placeholder: "// Online TypeScript compiler\nconsole.log('Hello, World!');",
  },
  {
    id: 84,
    placeholder:
      '// Online Visual Basic.Net compiler\nModule Hello\n    Sub Main()\n        Console.WriteLine("Hello, World!")\n    End Sub\nEnd Module',
  },
];

const getPlaceholder = (id: number | undefined) => {
  const lang = placeholders.find((lang) => lang.id === id);
  return lang ? lang.placeholder : "";
};

export function CodeEditor({
  selectedLanguage,
  code,
  setCode,
}: CodeEditorProps) {
  useEffect(() => {
    // Set the placeholder when the language changes
    const placeholder = getPlaceholder(selectedLanguage?.id);
    setCode(placeholder);
  }, [selectedLanguage]);

  return (
    <div className="flex flex-col">
      <div className="grid w-full gap-2.5">
        <Label htmlFor="code">Code</Label>
      </div>
      <Editor
        theme="vs-dark"
        height="100vh"
        width="100vh"
        language={selectedLanguage?.name
          .replace(/\s*\(.*?\)/, "")
          .trim()
          .toLowerCase()}
        value={code}
        onChange={(newValue) => setCode(newValue || "")}
      />
    </div>
  );
}
