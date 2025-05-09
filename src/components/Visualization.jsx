import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { SailboatIcon as Boat, User, Skull, Play, Pause, RotateCcw, ChevronRight, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const solutionPath = [
  { leftM: 3, leftC: 3, boat: 1, rightM: 0, rightC: 0, move: "Initial state" },
  { leftM: 3, leftC: 1, boat: 0, rightM: 0, rightC: 2, move: "Move 2 cannibals to right" },
  { leftM: 3, leftC: 2, boat: 1, rightM: 0, rightC: 1, move: "Move 1 cannibal to left" },
  { leftM: 3, leftC: 0, boat: 0, rightM: 0, rightC: 3, move: "Move 2 cannibals to right" },
  { leftM: 3, leftC: 1, boat: 1, rightM: 0, rightC: 2, move: "Move 1 cannibal to left" },
  { leftM: 1, leftC: 1, boat: 0, rightM: 2, rightC: 2, move: "Move 2 missionaries to right" },
  { leftM: 2, leftC: 2, boat: 1, rightM: 1, rightC: 1, move: "Move 1 missionary & 1 cannibal to left" },
  { leftM: 0, leftC: 2, boat: 0, rightM: 3, rightC: 1, move: "Move 2 missionaries to right" },
  { leftM: 0, leftC: 3, boat: 1, rightM: 3, rightC: 0, move: "Move 1 cannibal to left" },
  { leftM: 0, leftC: 1, boat: 0, rightM: 3, rightC: 2, move: "Move 2 cannibals to right" },
  { leftM: 0, leftC: 2, boat: 1, rightM: 3, rightC: 1, move: "Move 1 cannibal to left" },
  { leftM: 0, leftC: 0, boat: 0, rightM: 3, rightC: 3, move: "Move 2 cannibals to right" }
];

const Character = ({ type, position, onBoat, isMoving, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0, x: isMoving ? [0, onBoat ? 10 : -10, 0] : 0 }}
    transition={{ duration: 0.5, delay, x: { duration: 0.8, repeat: isMoving ? 1 : 0, repeatType: "reverse" } }}
    className={`w-10 h-10 ${type === "cannibal" ? "bg-red-600" : "bg-blue-600"} rounded-full flex items-center justify-center shadow-lg`}
  >
    {type === "cannibal" ? <Skull className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
  </motion.div>
);

export default function Visualization() {
  const [state, setState] = useState({
    leftM: 3, leftC: 3, boat: 1, rightM: 0, rightC: 0, moves: 0,
    history: [{ leftM: 3, leftC: 3, boat: 1, rightM: 0, rightC: 0 }],
    gameOver: false, victory: false, message: "Move missionaries and cannibals across the river safely.",
    status: "ready", boatPassengers: []
  });
  const [autoPlay, setAutoPlay] = useState(false);
  const [solutionStep, setSolutionStep] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [movingCharacters, setMovingCharacters] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState({ missionaries: 0, cannibals: 0 });
  const boatControls = useAnimation();
  const statusControls = useAnimation();
  const riverRef = useRef(null);

  const isValidMove = (m, c) => {
    const { leftM, leftC, boat, rightM, rightC } = state;
    if (boat === 1 && (m > leftM || c > leftC)) return false;
    if (boat === 0 && (m > rightM || c > rightC)) return false;
    const newLeftM = boat === 1 ? leftM - m : leftM + m;
    const newLeftC = boat === 1 ? leftC - c : leftC + c;
    const newRightM = boat === 0 ? rightM - m : rightM + m;
    const newRightC = boat === 0 ? rightC - c : rightC + c;
    return !(newLeftM > 0 && newLeftM < newLeftC || newRightM > 0 && newRightM < newRightC);
  };

  const animateMove = async (m, c, isSolution = false, nextState = null) => {
    if (state.gameOver || movingCharacters) return;
    if (!isValidMove(m, c)) return;
    setMovingCharacters(true);
    const passengers = Array(m).fill({ type: "missionary" }).concat(Array(c).fill({ type: "cannibal" }));
    setState(s => ({ ...s, boatPassengers: passengers }));
    await new Promise(r => setTimeout(r, 1000));
    await boatControls.start({ left: state.boat === 1 ? "65%" : "15%", transition: { duration: 1.5, ease: "easeInOut" } });
    await new Promise(r => setTimeout(r, 500));

    const { leftM, leftC, boat, rightM, rightC, moves, history } = state;
    const newState = isSolution ? { ...nextState } : {
      leftM: boat === 1 ? leftM - m : leftM + m,
      leftC: boat === 1 ? leftC - c : leftC + c,
      boat: 1 - boat,
      rightM: boat === 0 ? rightM - m : rightM + m,
      rightC: boat === 0 ? rightC - c : rightC + c,
      moves: moves + 1,
      history: [...history, {
        leftM: boat === 1 ? leftM - m : leftM + m,
        leftC: boat === 1 ? leftC - c : leftC + c,
        boat: 1 - boat,
        rightM: boat === 0 ? rightM - m : rightM + m,
        rightC: boat === 0 ? rightC - c : rightC + c
      }],
      gameOver: false,
      victory: false,
      message: "Good move! Keep going.",
      status: "safe",
      boatPassengers: []
    };

    if (newState.leftM === 0 && newState.leftC === 0 && newState.rightM === 3 && newState.rightC === 3) {
      newState.gameOver = true;
      newState.victory = true;
      newState.message = `Victory! You solved the puzzle in ${newState.moves} moves.`;
      newState.status = "victory";
      statusControls.start({ scale: [1, 1.2, 1], transition: { duration: 0.5, repeat: 2 } });
    } else if ((newState.leftM > 0 && newState.leftM < newState.leftC) || (newState.rightM > 0 && newState.rightM < newState.rightC)) {
      newState.gameOver = true;
      newState.message = "Game over! Missionaries were eaten by cannibals.";
      newState.status = "danger";
    }

    setState(newState);
    if (!isSolution) setSelectedPeople({ missionaries: 0, cannibals: 0 });
    setMovingCharacters(false);
    if (isSolution) {
      setSolutionStep(s => s + 1);
      if (solutionStep + 1 === solutionPath.length - 1) setAutoPlay(false);
    }
  };

  const makeMove = () => animateMove(selectedPeople.missionaries, selectedPeople.cannibals);

  const resetGame = () => {
    setState({
      leftM: 3, leftC: 3, boat: 1, rightM: 0, rightC: 0, moves: 0,
      history: [{ leftM: 3, leftC: 3, boat: 1, rightM: 0, rightC: 0 }],
      gameOver: false, victory: false, message: "Move missionaries and cannibals across the river safely.",
      status: "ready", boatPassengers: []
    });
    setSolutionStep(0);
    setAutoPlay(false);
    setShowSolution(false);
    setSelectedPeople({ missionaries: 0, cannibals: 0 });
    boatControls.set({ left: "15%" });
  };

  const showNextStep = () => {
    if (solutionStep >= solutionPath.length - 1) return;
    const current = solutionPath[solutionStep];
    const next = solutionPath[solutionStep + 1];
    const mDiff = current.boat === 1 ? current.leftM - next.leftM : next.leftM - current.leftM;
    const cDiff = current.boat === 1 ? current.leftC - next.leftC : next.leftC - current.leftC;
    animateMove(mDiff, cDiff, true, { ...next, moves: solutionStep + 1, history: solutionPath.slice(0, solutionStep + 2), message: next.move, status: solutionStep + 1 === solutionPath.length - 1 ? "victory" : "safe", boatPassengers: [] });
  };

  useEffect(() => {
    let timer;
    if (autoPlay && solutionStep < solutionPath.length - 1) {
      timer = setTimeout(showNextStep, 2000);
    }
    return () => clearTimeout(timer);
  }, [autoPlay, solutionStep]);

  useEffect(() => {
    boatControls.set({ left: state.boat === 1 ? "15%" : "65%" });
  }, []);

  useEffect(() => {
    if (state.status === "danger") statusControls.start({ scale: [1, 1.1, 1], transition: { duration: 0.3, repeat: 2 } });
    else if (state.status === "victory") statusControls.start({ scale: [1, 1.2, 1], transition: { duration: 0.5, repeat: 2 } });
  }, [state.status]);

  const currentSelectionIsValid = isValidMove(selectedPeople.missionaries, selectedPeople.cannibals);

  return (
    <div className="max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Interactive Visualization</h1>
        <p className="text-xl text-blue-600">Solve the Missionaries and Cannibals puzzle</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <AnimatePresence>
          {showSolution && (
            <motion.div className="lg:col-span-1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
              <Card className="shadow-lg border-2 border-purple-100 h-full overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 border-b border-purple-200">
                    <h3 className="text-xl font-semibold text-purple-800">Solution Path</h3>
                  </div>
                  <div className="p-4 max-h-[400px] overflow-y-auto">
                    <ol className="space-y-2">
                      {solutionPath.map((step, index) => (
                        <motion.li key={index} className={`p-2 rounded ${index === solutionStep ? "bg-purple-100 text-purple-800" : "bg-gray-50 text-gray-700"}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                          <div className="flex items-center">
                            <span className="font-bold mr-2">{index + 1}.</span>
                            <span>{step.move}</span>
                          </div>
                          <div className="text-sm">Left: {step.leftM}M, {step.leftC}C | Boat: {step.boat === 1 ? "Left" : "Right"} | Right: {step.rightM}M, {step.rightC}C</div>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="lg:col-span-1">
          <Card className="shadow-lg border-2 border-blue-100 overflow-hidden h-full">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800">Game Status</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center justify-between bg-blue-50 p-2 rounded"><span className="font-medium">Moves:</span><span className="text-lg font-bold text-blue-700">{state.moves}</span></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="font-medium mb-1">Left Bank:</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center"><User className="w-4 h-4 text-blue-600 mr-1" /><span>{state.leftM}</span></div>
                        <div className="flex items-center"><Skull className="w-4 h-4 text-red-600 mr-1" /><span>{state.leftC}</span></div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="font-medium mb-1">Right Bank:</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center"><User className="w-4 h-4 text-blue-600 mr-1" /><span>{state.rightM}</span></div>
                        <div className="flex items-center"><Skull className="w-4 h-4 text-red-600 mr-1" /><span>{state.rightC}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-blue-50 p-2 rounded"><span className="font-medium">Boat Location:</span><span className="font-bold">{state.boat === 1 ? "Left Bank" : "Right Bank"}</span></div>
                </div>
                <div className="flex justify-between mt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" onClick={resetGame} className="group relative overflow-hidden" disabled={movingCharacters}>
                      <div className="absolute inset-0 bg-red-400/0 group-hover:bg-red-400/10 transition-colors duration-300 rounded-md"></div>
                      <RotateCcw className="w-4 h-4 mr-2" /><span className="relative z-10">Reset</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" onClick={() => setShowSolution(!showSolution)} className="group relative overflow-hidden" disabled={movingCharacters}>
                      <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 transition-colors duration-300 rounded-md"></div>
                      <span className="relative z-10">{showSolution ? "Hide Solution" : "Show Solution"}</span>
                    </Button>
                  </motion.div>
                </div>
                {showSolution && (
                  <div className="mt-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-2">Solution Controls</h4>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" onClick={() => setAutoPlay(!autoPlay)} disabled={solutionStep >= solutionPath.length - 1 || movingCharacters}>
                        {autoPlay ? <><Pause className="w-4 h-4 mr-2" />Pause</> : <><Play className="w-4 h-4 mr-2" />Play</>}
                      </Button>
                      <Button variant="outline" onClick={showNextStep} disabled={solutionStep >= solutionPath.length - 1 || movingCharacters}>
                        <ChevronRight className="w-4 h-4 mr-2" />Next
                      </Button>
                    </div>
                    <p className="mt-2 text-purple-700">Step {solutionStep + 1} of {solutionPath.length}: {solutionPath[solutionStep].move}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={showSolution ? "lg:col-span-3" : "lg:col-span-4"}>
          <Card className="shadow-lg border-2 border-blue-100 overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-6">Make Your Move</h3>
                  <div className="bg-blue-50 p-8 rounded-lg mb-6 border border-blue-200">
                    <p className="text-blue-800 font-medium text-lg mb-4">Who do you want to put in the boat?</p>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="bg-white p-6 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3"><User className="w-6 h-6 text-white" /></div></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Button variant="outline" size="sm" onClick={() => setSelectedPeople(p => ({ ...p, missionaries: Math.max(0, p.missionaries - 1) }))} disabled={selectedPeople.missionaries === 0} className="w-12 h-12 rounded-full text-lg">-</Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedPeople(p => ({ ...p, missionaries: Math.min(state.boat === 1 ? state.leftM : state.rightM, p.missionaries + 1, 2 - p.cannibals) }))} disabled={selectedPeople.missionaries + selectedPeople.cannibals >= 2 || selectedPeople.missionaries >= (state.boat === 1 ? state.leftM : state.rightM)} className="w-12 h-12 rounded-full text-lg">+</Button>
                        </div>
                        <div className="text-center mt-2 text-blue-800 font-medium">{selectedPeople.missionaries}</div>
                      </div>
                      <div className="bg-white p-6 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3"><Skull className="w-6 h-6 text-white" /></div></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Button variant="outline" size="sm" onClick={() => setSelectedPeople(p => ({ ...p, cannibals: Math.max(0, p.cannibals - 1) }))} disabled={selectedPeople.cannibals === 0} className="w-12 h-12 rounded-full text-lg">-</Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedPeople(p => ({ ...p, cannibals: Math.min(state.boat === 1 ? state.leftC : state.rightC, p.cannibals + 1, 2 - p.missionaries) }))} disabled={selectedPeople.missionaries + selectedPeople.cannibals >= 2 || selectedPeople.cannibals >= (state.boat === 1 ? state.leftC : state.rightC)} className="w-12 h-12 rounded-full text-lg">+</Button>
                        </div>
                        <div className="text-center mt-2 text-red-800 font-medium">{selectedPeople.cannibals}</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-8 rounded-lg border border-amber-200 mb-6">
                    <div className="flex items-center justify-between mb-3"><h4 className="font-bold text-amber-800 text-lg">Boat Preview</h4></div>
                    <div className="flex justify-center items-center bg-amber-800 rounded-lg p-4">
                      <div className="flex space-x-3">
                        {[...Array(selectedPeople.missionaries)].map((_, i) => <div key={i} className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"><User className="w-8 h-8 text-white" /></div>)}
                        {[...Array(selectedPeople.cannibals)].map((_, i) => <div key={i} className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center"><Skull className="w-8 h-8 text-white" /></div>)}
                        {selectedPeople.missionaries + selectedPeople.cannibals === 0 && <div className="text-amber-200 italic text-lg">Select people to add to boat</div>}
                      </div>
                    </div>
                    {selectedPeople.missionaries + selectedPeople.cannibals > 0 && (
                      <div className="mt-4">
                        <Button className={`w-full py-4 text-xl ${currentSelectionIsValid ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`} onClick={makeMove} disabled={!currentSelectionIsValid || movingCharacters}>
                          {currentSelectionIsValid ? `Send Boat to ${state.boat === 1 ? "Right" : "Left"} Bank` : "Invalid Move - Check Rules"}
                        </Button>
                        {!currentSelectionIsValid && selectedPeople.missionaries + selectedPeople.cannibals > 0 && <p className="text-red-600 text-base mt-3">This move would leave missionaries outnumbered by cannibals on one bank.</p>}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-blue-800">Puzzle Visualization</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowHelp(true)}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </Button>
                  </div>
                  <motion.div className={`p-6 border-b ${state.status === "ready" ? "bg-blue-50 border-blue-100" : state.status === "safe" ? "bg-green-50 border-green-100" : state.status === "danger" ? "bg-red-50 border-red-100" : "bg-purple-50 border-purple-100"}`} animate={statusControls}>
                    <div className="flex items-center">
                      {state.status === "ready" && <ChevronRight className="w-6 h-6 mr-3 text-blue-500" />}
                      {state.status === "safe" && <CheckCircle className="w-6 h-6 mr-3 text-green-500" />}
                      {state.status === "danger" && <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />}
                      {state.status === "victory" && <CheckCircle className="w-6 h-6 mr-3 text-purple-500" />}
                      <p className={`font-medium text-lg ${state.status === "ready" ? "text-blue-800" : state.status === "safe" ? "text-green-800" : state.status === "danger" ? "text-red-800" : "text-purple-800"}`}>{state.message}</p>
                    </div>
                  </motion.div>

                  <div className="relative h-96 bg-gradient-to-b from-blue-300 to-blue-500 rounded-lg overflow-hidden shadow-xl" ref={riverRef}>
                    <div className="absolute inset-0 opacity-30">
                      {[...Array(10)].map((_, i) => (
                        <motion.div key={i} className="absolute h-1 bg-white rounded-full" style={{ width: Math.random() * 150 + 75, top: `${i * 10 + Math.random() * 5}%`, left: `-${Math.random() * 150}px` }} animate={{ x: ["0%", "100%"] }} transition={{ duration: Math.random() * 10 + 15, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: Math.random() * 5 }} />
                      ))}
                    </div>
                    <div className="absolute top-3 left-0 right-0 mx-auto w-4/5 h-3 bg-white/20 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-white/60 rounded-full" style={{ width: `${(state.moves / 11) * 100}%` }} transition={{ duration: 0.5 }} />
                    </div>
                    <div className="absolute left-0 bottom-0 w-5/12 h-32 bg-gradient-to-r from-amber-800 to-amber-700 flex items-center justify-center rounded-tr-lg shadow-lg">
                      <div className="grid grid-cols-3 gap-4 p-3">
                        {[...Array(state.leftM)].map((_, i) => <Character key={`left-m-${i}`} type="missionary" position="left" onBoat={false} isMoving={movingCharacters && state.boat === 1} delay={i * 0.1} />)}
                        {[...Array(state.leftC)].map((_, i) => <Character key={`left-c-${i}`} type="cannibal" position="left" onBoat={false} isMoving={movingCharacters && state.boat === 1} delay={i * 0.1 + 0.3} />)}
                      </div>
                    </div>
                    <div className="absolute right-0 bottom-0 w-5/12 h-32 bg-gradient-to-l from-amber-800 to-amber-700 flex items-center justify-center rounded-tl-lg shadow-lg">
                      <div className="grid grid-cols-3 gap-4 p-3">
                        {[...Array(state.rightM)].map((_, i) => <Character key={`right-m-${i}`} type="missionary" position="right" onBoat={false} isMoving={movingCharacters && state.boat === 0} delay={i * 0.1} />)}
                        {[...Array(state.rightC)].map((_, i) => <Character key={`right-c-${i}`} type="cannibal" position="right" onBoat={false} isMoving={movingCharacters && state.boat === 0} delay={i * 0.1 + 0.3} />)}
                      </div>
                    </div>
                    <motion.div className="absolute bottom-32 w-36 h-20 bg-gradient-to-b from-amber-900 to-amber-800 rounded-lg flex items-center justify-center shadow-lg" animate={boatControls} initial={{ left: "15%" }}>
                      <Boat className="w-14 h-14 text-amber-100" />
                      <div className="absolute flex space-x-3">
                        {state.boatPassengers.map((p, i) => <Character key={`boat-${i}`} type={p.type} position="boat" onBoat={true} isMoving={movingCharacters} delay={i * 0.1} />)}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg max-w-md mx-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                How to Play
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  <span>Select people to put in the boat using the + buttons</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  <span>Click "Send Boat" to move them across</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  <span>Never let cannibals outnumber missionaries on any bank</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">4.</span>
                  <span>Boat can carry max 2 people</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6" 
                onClick={() => setShowHelp(false)}
              >
                Got It!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mt-8">
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
}