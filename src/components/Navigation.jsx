import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Code, PlayCircle, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";

export default function Navigation() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      path: "/",
      label: "Introduction",
      icon: <Users className="w-4 h-4" />,
    },
    {
      path: "/algorithm",
      label: "Algorithm",
      icon: <Code className="w-4 h-4" />,
    },
    {
      path: "/visualization",
      label: "Visualization",
      icon: <PlayCircle className="w-4 h-4" />,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <span className="relative z-10 text-white font-bold text-lg">MC</span>
            </div>
            <span className="font-bold text-xl text-blue-800 hidden md:block">
              Missionaries & Cannibals
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={pathname === item.path ? "default" : "ghost"}
                    className={`px-4 py-2 rounded-md font-medium flex items-center gap-2
                      hover:bg-gray-200 hover:text-black transition-all duration-300
                      ${pathname === item.path ? "bg-blue-500 text-white" : "text-gray-700"}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {pathname === item.path && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-lg"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-md font-medium
                    ${pathname === item.path ? "bg-blue-100 text-blue-800" : "text-gray-700"}
                    hover:bg-gray-100 transition-all duration-200`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}