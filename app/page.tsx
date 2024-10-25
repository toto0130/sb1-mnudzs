"use client";

import { useState, useEffect } from "react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Pencil, RotateCcw, Save, Trophy, User, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const DIFFICULTY_LEVELS = [
  { value: "very-easy", label: "Very Easy" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "expert", label: "Expert" },
];

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("very-easy");
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#F8F8FF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          ナンプレAI生成サイト
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Difficulty Selection */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">難易度設定</h2>
            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              {DIFFICULTY_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Select>
            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsRunning(true)}
            >
              新しいパズルを生成
            </Button>
          </Card>

          {/* Timer */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">タイマー</h2>
            <div className="text-4xl font-mono text-center my-4">
              {formatTime(timer)}
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setTimer(0)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              リセット
            </Button>
          </Card>

          {/* Progress */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">進捗</h2>
            <Progress value={progress} className="mb-4" />
            <p className="text-center text-lg font-medium">
              {progress}% 完了
            </p>
          </Card>
        </div>

        {/* Sudoku Grid */}
        <Card className="p-8 shadow-lg">
          <div className="grid grid-cols-9 gap-0.5 bg-gray-300 p-0.5">
            {Array(81).fill(null).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square bg-white flex items-center justify-center text-xl font-medium",
                  "hover:bg-blue-50 cursor-pointer",
                  index % 9 === 2 || index % 9 === 5 ? "border-r-2 border-gray-400" : "",
                  Math.floor(index / 9) === 2 || Math.floor(index / 9) === 5 ? "border-b-2 border-gray-400" : ""
                )}
              />
            ))}
          </div>
        </Card>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Number Pad */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">操作パネル</h2>
            <div className="grid grid-cols-3 gap-2">
              {Array(9).fill(null).map((_, i) => (
                <Button
                  key={i + 1}
                  variant="outline"
                  className="aspect-square text-xl font-medium"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <Button variant="outline" title="Undo">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="outline" title="Redo">
                <RotateCcw className="w-4 h-4 transform scale-x-[-1]" />
              </Button>
              <Button variant="outline" title="Pencil Mode">
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="outline" title="Clear">
                <div className="w-4 h-4">×</div>
              </Button>
            </div>
          </Card>

          {/* Hints */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">ヒント</h2>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                候補数字を表示
              </Button>
              <Button className="w-full" variant="outline">
                次の一手をアドバイス
              </Button>
            </div>
          </Card>

          {/* User Functions */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">ユーザー機能</h2>
            <div className="space-y-2">
              <Button className="w-full flex items-center" variant="outline">
                <User className="w-4 h-4 mr-2" />
                プロフィール
              </Button>
              <Button className="w-full flex items-center" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                進捗を保存
              </Button>
              <Button className="w-full flex items-center" variant="outline">
                <Trophy className="w-4 h-4 mr-2" />
                実績
              </Button>
              <Button className="w-full flex items-center" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                詳細統計
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}