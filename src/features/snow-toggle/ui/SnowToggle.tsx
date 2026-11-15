import { Snowflake } from "lucide-react";

type SnowToggleProps = {
  isEnabled: boolean;
  onToggle: () => void;
  enableLabel: string;
  disableLabel: string;
};

export function SnowToggle({
  isEnabled,
  onToggle,
  enableLabel,
  disableLabel,
}: SnowToggleProps) {
  const label = isEnabled ? disableLabel : enableLabel;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isEnabled}
      title={label}
      onClick={onToggle}
      className={`inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border p-[2px] backdrop-blur-xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ea4043] sm:h-10 sm:w-10 sm:rounded-xl sm:p-[3px] lg:h-11 lg:w-11 ${
        isEnabled
          ? "border-white/20 bg-white/20 text-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          : "border-white/15 bg-white/[0.06] text-[#8e8e93] hover:border-white/30 hover:text-white"
      }`}
    >
      <Snowflake aria-hidden="true" size={17} strokeWidth={1.8} />
    </button>
  );
}
