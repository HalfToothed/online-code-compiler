/* eslint-disable @typescript-eslint/no-explicit-any */
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
import toast, { Toaster } from "react-hot-toast";

/*
    Compile Time Error -> Yellow
    Runtime Time Error -> Red
    No Error -> Green
*/

export default function Layout() {
  const [selectedLanguage, setSelectedLanguage] = useState<
    LanguageType | undefined
  >();
  const [code, setCode] = useState<string>("");
  const [input, setInput] = useState<string | undefined>("");
  const [output, setOutput] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

  const handleLanguageChange = (language: LanguageType | undefined) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    let output: string = "";

    if (input == "") {
      setInput(undefined);
    }

    if (code == "") {
      toast.error("no code to run");
      return null;
    }

    console.log("input", input);

    const postUrl = "https://judge0-ce.p.rapidapi.com/submissions";
    const postOptions = {
      method: "POST",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language_id: selectedLanguage?.id, // Ensure this is serialized as JSON
        source_code: code, // Code from the editor
        stdin: input,
      }),
    };

    try {
      toast.loading("code submitted, waiting for response from server", {
        id: "running",
      });
      const response = await fetch(postUrl, postOptions);
      // console.log(response);
      if (response.status === 429) {
        toast.dismiss("running");
        throw new Error("request limit exceed ");
      }
      const result = await response.text();
      // console.log("res -> ", result)

      const token = JSON.parse(result).token;

      const getUrl = `https://judge0-ce.p.rapidapi.com/submissions/${token}`;
      const getOptions = {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost,
        },
      };

      let parsedResult = await fetchSubmissionResult(getUrl, getOptions);
      while (parsedResult.status.id === 1 || parsedResult.status.id === 2) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        parsedResult = await fetchSubmissionResult(getUrl, getOptions);
        console.log(parsedResult);
      }

      if (parsedResult.status.id === 11) {
        output = "Runtime Error" + `\n \n` + parsedResult.stderr;
        setColor("text-red-600");
        toast.error("runtime error occured", { id: "running" });
      } else if (parsedResult.status.id != 3) {
        output = parsedResult.compile_output;
        setColor("text-yellow-400");
        toast.error("failed code", { id: "running" });
      } else {
        if (parsedResult.compile_output == null) {
          output = parsedResult.stdout;
          //   setColor("text-red-600");
          toast.error("runtime error occured", { id: "running" });
        } else {
            output = parsedResult.stdout + `\n \n` + parsedResult.compile_output;
        }
        setColor("text-green-400")
        toast.success("code ran successfully", { id: "running" });
      }

      setOutput(output);
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof Error) {
        toast.error(error.message); // Now it's safe to access error.message
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const fetchSubmissionResult = async (url: string, options: any) => {
    try {
      const submission = await fetch(url, options);
      const submissionResult = await submission.text();
      const parsedResult = JSON.parse(submissionResult);
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast.error("error occured while fetching result");
      return null;
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
            <button
              onClick={handleRun}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
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
                  <CodeEditor
                    selectedLanguage={selectedLanguage}
                    code={code}
                    setCode={setCode}
                  />
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
                      <Output output={output} color={color} />
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </main>
        <Toaster />
      </div>
    </>
  );
}
