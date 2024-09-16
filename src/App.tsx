
import { ThemeProvider } from "@/components/theme-provider"
import Layout from "./contents/Layout"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <Layout />
    </ThemeProvider>
  )
}

export default App
