import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import {LanguageType} from "@/lib/model"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"


interface LanguageProps {
  onLanguageSelect: (language: LanguageType) => void;
}

export function Language({ onLanguageSelect }: LanguageProps) {
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<number>();

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

  // useEffect(() => {

  //   fetch("https://judge0-ce.p.rapidapi.com/languages",
  //   {
  //     method : "GET",
  //     headers : {
  //       "x-rapidapi-key" : apiKey,
  //       "x-rapidapi-host" : apiHost
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then((data) => setLanguages(data))
  //   .catch((err) => {
  //     console.log(err.message);
  //  });
   
  // }, [])

  const handleLanguageSelect = (language :LanguageType ) => {
    setId(language.id);
    setOpen(false);
    onLanguageSelect(language); // Only call when a language is selected
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {id
            ? languages.find((language) => language.id === id)?.name
            : "Select Language..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.id}
                  value={language.name}
                  onSelect={() => {
                    handleLanguageSelect(language)
                    setOpen(false)
                  }}
                >
                  {language.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      id === language.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
