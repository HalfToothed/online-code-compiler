import { Disclosure } from "@headlessui/react";
import { Language } from "./Language";
import { useState } from "react";
import { LanguageType } from "@/lib/model";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeEditor } from "./CodeEditor";
import { Input } from "./Input";
import { Output } from "./Output";


export default function Layout() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | undefined>();
  const [code, setCode] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleLanguageChange = (language: LanguageType | undefined) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {

    let output: string = "";

    const url = "https://judge0-ce.p.rapidapi.com/submissions";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "API-KEY",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language_id: selectedLanguage?.id, // Ensure this is serialized as JSON
        source_code: code, // Code from the editor
      })
    };


    try {
       const response = await fetch(url, options);
       const result = await response.text();
       
       const parsedResult = JSON.parse(result);

        const token = parsedResult.token;
        console.log(token);


      const url1 =`https://judge0-ce.p.rapidapi.com/submissions/${token}`;
      const options1 = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'API-KEY',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
      };
      
      try {
        const response = await fetch(url1, options1);
        const result = await response.text();
        const parsedResult = JSON.parse(result);
        if(parsedResult.status.id != 3){
          output = parsedResult.compile_output;
        }
        else{
          if(parsedResult.compile_output == "null"){
            output = parsedResult.stdout;
          }
          else{
            output = parsedResult.stdout + `\n \n` + parsedResult.compile_output;
          }
        }
        
        setOutput(output);
      } catch (error) {
        console.error(error);
      }
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between"></div>
          </div>
        </Disclosure>

        <header className="bg-black shadow">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Language onLanguageSelect={handleLanguageChange} />
            <button onClick={handleRun} className="bg-green-500 text-white py-2 px-4 rounded">
            Run
          </button>
          </div>
        </header>
        <main className="flex-1 p-4">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <ResizablePanelGroup
              direction="horizontal"
              className="rounded-lg border md:min-w-[450px]"
            >
              <ResizablePanel defaultSize={60} className="h-screen">
                <div className="flex p-6">
                  <CodeEditor selectedLanguage={selectedLanguage} code={code} setCode={setCode}/>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={25}>
                    <div className="flex h-full p-6">
                      <Input input={input} setInput={setInput} />
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={75}>
                    <div className="flex h-full p-6">
                      <Output output={output} />
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </main>
      </div>
    </>
  );
}
