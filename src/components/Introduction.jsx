import { Card, CardContent } from "./ui/Card"
import { MoveRight } from 'lucide-react'

export default function Introduction() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Understanding the Problem</h2>

      <p className="text-gray-700">
        The Missionaries and Cannibals problem is a classic river crossing puzzle that illustrates concepts in
        artificial intelligence, particularly state space search and constraint satisfaction.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">The Objective</h3>
            <p className="text-gray-700">
              Three missionaries and three cannibals must cross a river using a boat that can carry at most two people.
              If cannibals outnumber missionaries on either bank, the missionaries will be eaten. Find a sequence of
              boat crossings that will safely transport everyone to the other side of the river.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">The Rules</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>The boat can carry a maximum of two people</li>
              <li>The boat cannot cross the river by itself with no people</li>
              <li>At least one person must be in the boat to cross the river</li>
              <li>If cannibals outnumber missionaries on either bank, the missionaries will be eaten</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">Key Concepts</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <MoveRight className="w-4 h-4 text-blue-700" />
              </div>
              <h4 className="font-medium text-blue-800">State Space</h4>
            </div>
            <p className="text-sm text-gray-600">
              All possible configurations of missionaries, cannibals, and the boat on both banks.
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <MoveRight className="w-4 h-4 text-blue-700" />
              </div>
              <h4 className="font-medium text-blue-800">Valid Moves</h4>
            </div>
            <p className="text-sm text-gray-600">
              Transitions between states that follow the rules and constraints of the problem.
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <MoveRight className="w-4 h-4 text-blue-700" />
              </div>
              <h4 className="font-medium text-blue-800">Solution Path</h4>
            </div>
            <p className="text-sm text-gray-600">
              A sequence of valid moves that transforms the initial state to the goal state.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}