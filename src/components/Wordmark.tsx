export function Wordmark({ tone = "forest" }: { tone?: "forest" | "warm" }) {
  const ink = tone === "warm" ? "#F8F7F0" : "#103F35"
  const leaf = tone === "warm" ? "#B9D94B" : "#103F35"
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" className="shrink-0">
        <path
          d="M11 2.2c1.7 3.2 2.5 5.2 2.5 7.1a2.5 2.5 0 1 1-5 0c0-1.9.8-3.9 2.5-7.1z"
          fill={leaf}
        />
        <path
          d="M11 8.4c2 .2 4 1.1 5.6 2.5"
          fill="none"
          stroke={ink}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[1.35rem] leading-none font-semibold tracking-[-0.05em]" style={{ color: ink }}>
        Aminova
      </span>
    </span>
  )
}
