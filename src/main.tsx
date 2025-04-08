import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './providers/theme-provider.tsx'
import { ScrollContainer } from 'react-nice-scroll'
import 'react-nice-scroll/dist/styles.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ScrollContainer>
        <RouterProvider router={router} />
        <Toaster />
      </ScrollContainer>
    </ThemeProvider>
  </StrictMode>
)
