import { motion } from "framer-motion"
import { Card, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { MoveRight, User, Skull, SailboatIcon as Boat } from 'lucide-react'
import { Link } from "react-router-dom"

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Missionaries and Cannibals</h1>
        <p className="text-xl text-blue-600">An Interactive Puzzle Visualization</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full shadow-lg border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-4 shadow-md">
                  <MoveRight className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-blue-800">The Objective</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Three missionaries and three cannibals must cross a river using a boat that can carry at most two
                people. If cannibals outnumber missionaries on either bank, the missionaries will be eaten.
              </p>
              <p className="text-gray-700">
                Find a sequence of boat crossings that will safely transport everyone to the other side of the river.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full shadow-lg border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-4 shadow-md">
                  <MoveRight className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-blue-800">The Rules</h2>
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>The boat can carry a maximum of two people</li>
                <li>The boat cannot cross the river by itself with no people</li>
                <li>At least one person must be in the boat to cross the river</li>
                <li>If cannibals outnumber missionaries on either bank, the missionaries will be eaten</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="mb-12">
        <Card className="shadow-lg border-2 border-blue-100">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Interactive Demonstration</h2>

            <div className="relative h-64 bg-gradient-to-b from-blue-300 to-blue-500 rounded-lg overflow-hidden mb-6">
              {/* Animated water */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1 bg-white rounded-full"
                    style={{
                      width: Math.random() * 100 + 50,
                      top: `${i * 20 + Math.random() * 5}%`,
                      left: `-${Math.random() * 100}px`,
                    }}
                    animate={{
                      x: ["0%", "100%"],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 15,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>

              {/* Left Bank */}
              <div className="absolute left-0 bottom-0 w-1/3 h-24 bg-gradient-to-r from-amber-800 to-amber-700 flex items-center justify-center rounded-tr-lg">
                <motion.div
                  className="grid grid-cols-3 gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`left-m-${i}`}
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + i * 0.2 }}
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md"
                    >
                      <User className="w-6 h-6 text-white" />
                    </motion.div>
                  ))}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`left-c-${i}`}
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 2 + i * 0.2 }}
                      className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-md"
                    >
                      <Skull className="w-6 h-6 text-white" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right Bank */}
              <div className="absolute right-0 bottom-0 w-1/3 h-24 bg-gradient-to-l from-amber-800 to-amber-700 flex items-center justify-center rounded-tl-lg"></div>

              {/* Boat */}
              <motion.div
                className="absolute bottom-24 w-28 h-16 bg-gradient-to-b from-amber-900 to-amber-800 rounded-lg flex items-center justify-center shadow-lg"
                initial={{ left: "15%", opacity: 0 }}
                animate={{ left: "15%", opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Boat className="w-10 h-10 text-amber-100" />
              </motion.div>
            </div>

            <div className="flex justify-center">
              <Link to="/visualization">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  >
                    Try the Interactive Puzzle
                    <MoveRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </CardContent>
        </Card>















































        
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show">
        <Card className="shadow-lg border-2 border-blue-100">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Key Concepts</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div variants={item}>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-md">
                        <MoveRight className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-blue-800">State Space</h3>
                    </div>
                    <p className="text-gray-700 text-sm">
                      All possible configurations of missionaries, cannibals, and the boat on both banks.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-md">
                        <MoveRight className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-blue-800">Valid Moves</h3>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Transitions between states that follow the rules and constraints of the problem.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-md">
                        <MoveRight className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-blue-800">Solution Path</h3>
                    </div>
                    <p className="text-gray-700 text-sm">
                      A sequence of valid moves that transforms the initial state to the goal state.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link to="/algorithm">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg">
                    Learn About the Algorithm
                    <MoveRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}