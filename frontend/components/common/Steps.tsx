"use client";
import { ClipboardList, Copy, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    number: 1,
    title: "Paste your URL",
    description: "Drop any long link into the input field above",
  },
  {
    icon: Sparkles,
    number: 2,
    title: "Create",
    description: "Click the Generate button to generate a shortened URL",
  },
  {
    icon: Copy,
    number: 3,
    title: "Copy & Share",
    description: "Copy your short URL and share it anywhere",
  },
];

const numberClasses = (active: boolean) =>
  `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
    active
      ? "bg-emerald-500 border-emerald-500 text-white"
      : "bg-background border-border text-muted-foreground"
  }`;

function Steps() {
  return (
    <>
      <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">
        How it works
      </p>

      {/* Mobile */}
      <div className="flex flex-col sm:hidden">
        {STEPS.map(({ icon: Icon, number, title, description }, i) => (
          <div key={number} className="flex items-start gap-4">
            <div className="flex flex-col items-center shrink-0">
              <div className={numberClasses(i === 0)}>{number}</div>

              {i !== STEPS.length - 1 && (
                <hr className="flex-1 w-px bg-border min-h-20" />
              )}
            </div>

            <div className="pb-4">
              <Icon className="w-5 h-5 text-emerald-500 mb-1" />

              <p className="text-sm font-semibold text-foreground mb-0.5">
                {title}
              </p>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-0 relative">
        <hr className="absolute top-12 left-[130px] lg:left-[140px] h-px z-0 w-[450px] lg:w-[520px]" />

        {STEPS.map(({ icon: Icon, number, title, description }, i) => (
          <div
            key={number}
            className="flex flex-col items-center text-center relative py-2 px-4"
          >
            <Icon className="w-5 h-5 text-emerald-500 mb-2" />

            <div className={`${numberClasses(i === 0)} mb-3 relative z-10`}>
              {number}
            </div>

            <p className="text-sm font-semibold text-foreground mb-1 leading-snug">
              {title}
            </p>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Steps;
