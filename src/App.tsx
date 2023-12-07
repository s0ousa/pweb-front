import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { defaultTheme } from "./styles/themes/default";
import { AsidePainel } from "./components/AsidePainel";
import { Pacientes } from "./pages/Pacientes";
import { Medicos } from "./pages/Medicos";
import { Consultas } from "./pages/Consultas";
import { useEffect, useState } from "react";

function App() {
  const [pathname, setPathname] = useState("")
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  let pageAtual;

  if(pathname === '/medicos'){
    pageAtual = <Medicos />
    
  }else if(pathname === '/pacientes') {
    pageAtual = <Pacientes/>
    
  }else if(pathname === '/consultas'){
    
    pageAtual = <Consultas />
  }
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <AsidePainel />
      <main>
        {pageAtual}
      </main>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
