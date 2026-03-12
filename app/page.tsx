"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  LayoutDashboard,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  subject: string;
  done: boolean;
};

type Exam = {
  id: number;
  subject: string;
  date: string;
  countdown: string;
};

type Subject = {
  id: number;
  name: string;
  progress: number;
  color: string;
};

const initialTasks: Task[] = [
  { id: 1, title: "Complete algebra worksheet", subject: "Math", done: false },
  { id: 2, title: "Revise chemical reactions", subject: "Science", done: true },
  { id: 3, title: "Read History chapter 2", subject: "Social Science", done: false },
  { id: 4, title: "Practice Hindi writing", subject: "Hindi", done: false },
];

const exams: Exam[] = [
  { id: 1, subject: "Math Weekly", date: "18 Mar", countdown: "6 days left" },
  { id: 2, subject: "Science Test", date: "22 Mar", countdown: "10 days left" },
  { id: 3, subject: "SST Quiz", date: "26 Mar", countdown: "14 days left" },
];

const subjects: Subject[] = [
  { id: 1, name: "Math", progress: 74, color: "from-cyan-400 to-blue-500" },
  { id: 2, name: "Science", progress: 67, color: "from-violet-400 to-fuchsia-500" },
  { id: 3, name: "English", progress: 83, color: "from-emerald-400 to-teal-500" },
  { id: 4, name: "Hindi", progress: 58, color: "from-amber-400 to-orange-500" },
  { id: 5, name: "Social Science", progress: 71, color: "from-pink-400 to-rose-500" },
  { id: 6, name: "IT", progress: 88, color: "from-sky-400 to-indigo-500" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubject, setNewTaskSubject] = useState("Math");

  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks]
  );

  const focusHours = useMemo(() => {
    const base = 4.5;
    return (base + completedTasks * 0.4).toFixed(1);
  }, [completedTasks]);

  const streak = useMemo(() => 7 + completedTasks, [completedTasks]);

  const timerMinutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const timerSeconds = String(secondsLeft % 60).padStart(2, "0");

  const addTask = () => {
    const cleanTitle = newTaskTitle.trim();
    if (!cleanTitle) return;

    const newTask: Task = {
      id: Date.now(),
      title: cleanTitle,
      subject: newTaskSubject,
      done: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle("");
    setNewTaskSubject("Math");
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(25 * 60);
  };

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.16),_transparent_25%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.14),_transparent_30%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
          <aside className="hidden w-[280px] border-r border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:block">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                <span className="text-sm font-medium text-cyan-200">StudentOS</span>
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight">Kush&apos;s Dashboard</h1>
              <p className="mt-2 text-sm leading-6 text-white/65">
                A focused system for managing study, exams, and progress like a real product.
              </p>
            </div>

            <nav className="space-y-2">
              <SidebarItem icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" active />
              <SidebarItem icon={<CheckCircle2 className="h-5 w-5" />} label="Tasks" />
              <SidebarItem icon={<CalendarDays className="h-5 w-5" />} label="Exams" />
              <SidebarItem icon={<BookOpen className="h-5 w-5" />} label="Subjects" />
              <SidebarItem icon={<Clock3 className="h-5 w-5" />} label="Focus Timer" />
              <SidebarItem icon={<Target className="h-5 w-5" />} label="Goals" />
            </nav>

            <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-white/60">Current focus</p>
              <h3 className="mt-2 text-lg font-semibold">Finish Math + Science</h3>
              <p className="mt-2 text-sm text-cyan-300">
                Stay consistent. Small wins build serious momentum.
              </p>
            </div>
          </aside>

          <section className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/7 p-6 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
                  Smart Student Workspace
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                  Welcome back, Kush 👋
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
                  Working on AI, software, and building ambitious projects on the internet — while staying on top of school.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:w-[360px]">
                <TopPill label="Focus Streak" value={`${streak} days`} />
                <TopPill label="Study Goal" value="4 hrs today" />
                <TopPill label="Priority" value="Math Weekly" />
                <TopPill label="Mode" value="Deep Focus" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<CheckCircle2 className="h-5 w-5 text-cyan-300" />}
                title="Tasks Completed"
                value={`${completedTasks}/${tasks.length}`}
                note="Today"
              />
              <StatCard
                icon={<Clock3 className="h-5 w-5 text-violet-300" />}
                title="Study Time"
                value={`${focusHours}h`}
                note="This week"
              />
              <StatCard
                icon={<CalendarDays className="h-5 w-5 text-pink-300" />}
                title="Upcoming Exams"
                value={`${exams.length}`}
                note="Next 14 days"
              />
              <StatCard
                icon={<Flame className="h-5 w-5 text-amber-300" />}
                title="Consistency Streak"
                value={`${streak}`}
                note="Days"
              />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <section className="rounded-[28px] border border-white/10 bg-white/7 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight">Task System</h3>
                      <p className="mt-1 text-sm text-white/60">
                        Add tasks, manage progress, and stay consistent daily.
                      </p>
                    </div>
                  </div>

                  <div className="mb-5 grid gap-3 md:grid-cols-[1fr_180px_110px]">
                    <input
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Add a new task..."
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan-400/40"
                    />
                    <select
                      value={newTaskSubject}
                      onChange={(e) => setNewTaskSubject(e.target.value)}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                    >
                      <option className="bg-slate-900">Math</option>
                      <option className="bg-slate-900">Science</option>
                      <option className="bg-slate-900">English</option>
                      <option className="bg-slate-900">Hindi</option>
                      <option className="bg-slate-900">Social Science</option>
                      <option className="bg-slate-900">IT</option>
                    </select>
                    <button
                      onClick={addTask}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 font-semibold text-black transition hover:scale-[1.02]"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 transition hover:border-cyan-400/20 hover:bg-white/[0.06]"
                      >
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
                              task.done
                                ? "border-cyan-300 bg-cyan-300 text-black"
                                : "border-white/25 bg-transparent text-transparent"
                            }`}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>

                          <div>
                            <p
                              className={`font-medium ${
                                task.done ? "text-white/45 line-through" : "text-white"
                              }`}
                            >
                              {task.title}
                            </p>
                            <p className="mt-1 text-sm text-white/45">{task.subject}</p>
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            task.done
                              ? "bg-cyan-400/15 text-cyan-300"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {task.done ? "Completed" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[28px] border border-white/10 bg-white/7 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="mb-5">
                    <h3 className="text-2xl font-semibold tracking-tight">Subjects</h3>
                    <p className="mt-1 text-sm text-white/60">
                      Track progress across all your academic areas.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="rounded-3xl border border-white/10 bg-black/20 p-5"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-lg font-semibold">{subject.name}</p>
                            <p className="text-sm text-white/45">Progress overview</p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/85">
                            {subject.progress}%
                          </div>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${subject.color}`}
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-[28px] border border-white/10 bg-white/7 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="mb-5">
                    <h3 className="text-2xl font-semibold tracking-tight">Focus Timer</h3>
                    <p className="mt-1 text-sm text-white/60">
                      A clean Pomodoro timer for deep work sessions.
                    </p>
                  </div>

                  <div className="rounded-[28px] border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(59,130,246,0.12),rgba(168,85,247,0.14))] p-6 text-center">
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">
                      Deep Focus Mode
                    </p>
                    <div className="mt-4 text-6xl font-bold tracking-tight">
                      {timerMinutes}:{timerSeconds}
                    </div>
                    <p className="mt-3 text-sm text-white/65">
                      {isRunning ? "Focus session in progress..." : "Ready for your next session"}
                    </p>

                    <div className="mt-6 flex justify-center gap-3">
                      <button
                        onClick={() => setIsRunning(true)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
                      >
                        <Play className="h-4 w-4" />
                        Start
                      </button>
                      <button
                        onClick={() => setIsRunning(false)}
                        className="rounded-2xl border border-white/15 bg-white/8 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                      >
                        Pause
                      </button>
                      <button
                        onClick={resetTimer}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                      </button>
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-white/10 bg-white/7 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="mb-5">
                    <h3 className="text-2xl font-semibold tracking-tight">Upcoming Exams</h3>
                    <p className="mt-1 text-sm text-white/60">
                      Stay ahead of deadlines and weekly tests.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {exams.map((exam) => (
                      <div
                        key={exam.id}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-violet-400/20"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{exam.subject}</p>
                          <p className="text-sm text-white/45">{exam.date}</p>
                        </div>
                        <p className="mt-2 text-sm text-cyan-300">{exam.countdown}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[28px] border border-white/10 bg-white/7 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-cyan-300" />
                    <h3 className="text-xl font-semibold tracking-tight">Daily Momentum</h3>
                  </div>
                  <p className="text-sm leading-7 text-white/70">
                    Great products and great results are both built the same way:
                    consistently, patiently, and one focused session at a time.
                  </p>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
        active
          ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
          : "border border-transparent bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function TopPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white/90">{value}</p>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/7 p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3">{icon}</div>
      </div>
      <p className="mt-4 text-sm text-white/55">{title}</p>
      <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>
      <p className="mt-1 text-sm text-cyan-300">{note}</p>
    </div>
  );
}