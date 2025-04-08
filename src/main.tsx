import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './providers/theme-provider.tsx'
import { ScrollContainer } from 'react-nice-scroll'
import 'react-nice-scroll/dist/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ScrollContainer>
        <RouterProvider router={router} />
      <Toaster />
      </ScrollContainer>
    </ThemeProvider>
  </StrictMode>,
)
