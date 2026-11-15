import type { CSSProperties } from "react";
import styles from "./Snowfall.module.css";

const snowflakes = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 13) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  size: `${2 + (index % 3)}px`,
  duration: `${12 + (index % 8) * 1.7}s`,
  delay: `-${(index % 17) * 1.1}s`,
  opacity: 0.34 + (index % 4) * 0.14,
  drift: `${((index * 19) % 70) - 35}px`,
}));

type SnowflakeStyle = CSSProperties & {
  "--snow-left": string;
  "--snow-top": string;
  "--snow-size": string;
  "--snow-duration": string;
  "--snow-delay": string;
  "--snow-drift": string;
};

export function Snowfall() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {snowflakes.map((flake) => {
        const style = {
          "--snow-left": flake.left,
          "--snow-top": flake.top,
          "--snow-size": flake.size,
          "--snow-duration": flake.duration,
          "--snow-delay": flake.delay,
          "--snow-drift": flake.drift,
          opacity: flake.opacity,
        } satisfies SnowflakeStyle;

        return <span key={flake.id} className={styles.flake} style={style} />;
      })}
    </div>
  );
}
