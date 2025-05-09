import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeProvider } from './ThemeProvider'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
        <Navigation />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Outlet />
        </motion.main>
        <footer className="py-6 text-center text-blue-600 text-sm">
          <p>© {new Date().getFullYear()} Missionaries and Cannibals Puzzle</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}