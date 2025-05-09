import { Card, CardContent } from "./ui/Card"
import { Button } from "./ui/Button"
import { MoveRight, User, Skull, SailboatIcon as Boat } from 'lucide-react'
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Algorithm() {
  const [currentStep, setCurrentStep] = useState(0)

  // Simple steps for the algorithm
  const steps = [
    {
      title: "Start with everyone on the left bank",
      description: "Begin with 3 missionaries, 3 cannibals, and the boat on the left bank.",
      visual: { leftM: 3, leftC: 3, boat: 1, rightM: 0, rightC: 0 },
    },
    {
      title: "Move 2 cannibals to the right bank",
      description: "This is safe because no missionaries are on the right bank yet.",
      visual: { leftM: 3, leftC: 1, boat: 0, rightM: 0, rightC: 2 },
    },
    {
      title: "Return 1 cannibal to the left bank",
      description: "We need to bring the boat back to move more people.",
      visual: { leftM: 3, leftC: 2, boat: 1, rightM: 0, rightC: 1 },
    },
    {
      title: "Move 2 cannibals to the right bank",
      description: "Now all cannibals are on the right bank.",
      visual: { leftM: 3, leftC: 0, boat: 0, rightM: 0, rightC: 3 },
    },
    {
      title: "Return 1 cannibal to the left bank",
      description: "We need to bring the boat back again.",
      visual: { leftM: 3, leftC: 1, boat: 1, rightM: 0, rightC: 2 },
    },
    {
      title: "Move 2 missionaries to the right bank",
      description: "This is safe because 2 missionaries can defend themselves against 2 cannibals.",
      visual: { leftM: 1, leftC: 1, boat: 0, rightM: 2, rightC: 2 },
    },
    {
      title: "Return 1 missionary and 1 cannibal to the left bank",
      description: "This keeps both banks balanced and safe.",
      visual: { leftM: 2, leftC: 2, boat: 1, rightM: 1, rightC: 1 },
    },
    {
      title: "Move 2 missionaries to the right bank",
      description: "Now most missionaries are on the right bank.",
      visual: { leftM: 0, leftC: 2, boat: 0, rightM: 3, rightC: 1 },
    },
    {
      title: "Return 1 cannibal to the left bank",
      description: "We need to bring the boat back to get the remaining cannibals.",
      visual: { leftM: 0, leftC: 3, boat: 1, rightM: 3, rightC: 0 },
    },
    {
      title: "Move 2 cannibals to the right bank",
      description: "Moving more cannibals to the right bank.",
      visual: { leftM: 0, leftC: 1, boat: 0, rightM: 3, rightC: 2 },
    },
    {
      title: "Return 1 cannibal to the left bank",
      description: "One more trip to get the last cannibal.",
      visual: { leftM: 0, leftC: 2, boat: 1, rightM: 3, rightC: 1 },
    },
    {
      title: "Move 2 cannibals to the right bank",
      description: "Everyone is now safely on the right bank!",
      visual: { leftM: 0, leftC: 0, boat: 0, rightM: 3, rightC: 3 },
    },
  ]

  // Simple visualization of the current step
  const StepVisualizer = ({ visual }) => {
    return (
      <div className="relative h-48 bg-gradient-to-b from-blue-300 to-blue-500 rounded-lg overflow-hidden my-4">
        {/* Left Bank */}
        <div className="absolute left-0 bottom-0 w-1/3 h-24 bg-gradient-to-r from-amber-800 to-amber-700 flex items-center justify-center rounded-tr-lg">
          <div className="grid grid-cols-3 gap-2 p-2">
            {[...Array(visual.leftM)].map((_, i) => (
              <div
                key={`left-m-${i}`}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md"
              >
                <User className="w-5 h-5 text-white" />
              </div>
            ))}
            {[...Array(visual.leftC)].map((_, i) => (
              <div
                key={`left-c-${i}`}
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-md"
              >
                <Skull className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Bank */}
        <div className="absolute right-0 bottom-0 w-1/3 h-24 bg-gradient-to-l from-amber-800 to-amber-700 flex items-center justify-center rounded-tl-lg">
          <div className="grid grid-cols-3 gap-2 p-2">
            {[...Array(visual.rightM)].map((_, i) => (
              <div
                key={`right-m-${i}`}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md"
              >
                <User className="w-5 h-5 text-white" />
              </div>
            ))}
            {[...Array(visual.rightC)].map((_, i) => (
              <div
                key={`right-c-${i}`}
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-md"
              >
                <Skull className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Boat */}
        <div
          className="absolute bottom-24 w-24 h-12 bg-gradient-to-b from-amber-900 to-amber-800 rounded-lg flex items-center justify-center shadow-lg"
          style={{ left: visual.boat === 1 ? "15%" : "65%" }}
        >
          <Boat className="w-8 h-8 text-amber-100" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">How to Solve the Puzzle</h1>
        <p className="text-xl text-purple-600">A simple step-by-step solution</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <Card className="shadow-lg border-2 border-purple-100 h-full">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold text-purple-800 mb-4">The Basic Rules</h2>

              <div className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2">
                      <span className="font-bold text-purple-800">1</span>
                    </div>
                    <h3 className="font-medium text-purple-800">The Boat</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    The boat can carry at most 2 people and needs at least 1 person to move.
                  </p>
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2">
                      <span className="font-bold text-purple-800">2</span>
                    </div>
                    <h3 className="font-medium text-purple-800">Safety Rule</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Cannibals must never outnumber missionaries on either bank, or the missionaries will be eaten!
                  </p>
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2">
                      <span className="font-bold text-purple-800">3</span>
                    </div>
                    <h3 className="font-medium text-purple-800">Goal</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Move all 3 missionaries and 3 cannibals from the left bank to the right bank safely.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-purple-800 mb-2">Legend</h3>
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">Missionary</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-2">
                    <Skull className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">Cannibal</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-lg border-2 border-purple-100">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-purple-800">Step-by-Step Solution</h2>
                <div className="text-sm text-purple-600 font-medium">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-purple-800 mb-2">{steps[currentStep].title}</h3>
                <p className="text-gray-700">{steps[currentStep].description}</p>

                <StepVisualizer visual={steps[currentStep].visual} />
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                >
                  Previous Step
                </Button>

                <Button
                  onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  disabled={currentStep === steps.length - 1}
                  className="bg-gradient-to-r from-purple-500 to-purple-700"
                >
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-purple-100 mt-6">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold text-purple-800 mb-4">The Key Insight</h2>

              <p className="text-gray-700 mb-4">The trick to solving this puzzle is to understand that:</p>

              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-4">
                <p className="font-medium text-yellow-800">
                  You need to use the cannibals to help shuttle people across, but be careful about the balance of
                  missionaries and cannibals on each bank.
                </p>
              </div>

              <p className="text-gray-700">
                The solution requires 11 crossings in total. The pattern involves moving cannibals first, then
                missionaries, and then using a mix of both to complete the crossing safely.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <Link to="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg">
              Back to Introduction
            </Button>
          </motion.div>
        </Link>

        <Link to="/visualization">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
            >
              Try the Interactive Puzzle
              <MoveRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}