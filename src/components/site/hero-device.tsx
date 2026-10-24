const waveBars = [
  [0.8, 6.4, 5.4, 0.78],
  [5.8, 3.2, 10.8, 0.98],
  [10.8, 1.1, 13.8, 0.7],
  [15.8, 4.4, 8.2, 1.06],
  [20.8, 0.6, 14.8, 0.84],
  [25.8, 2.8, 11.2, 0.92],
  [30.8, 5.2, 6.6, 0.74],
  [35.8, 2, 12.4, 1.1],
] as const;

function Waveform() {
  return (
    <svg viewBox="0 0 39 16" className="hero-caption__wave" aria-hidden>
      {waveBars.map(([x, y, height, duration], index) => (
        <rect
          key={x}
          x={x}
          y={y}
          width="2.7"
          height={height}
          rx="1.05"
          style={{
            animationDuration: `${duration}s`,
            animationDelay: `${-index * 0.11}s`,
          }}
        />
      ))}
    </svg>
  );
}

function SideButton({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="2"
        fill="url(#heroPhoneMetal)"
        stroke="#121624"
        strokeWidth="0.6"
      />
      <rect
        x={x + 0.7}
        y={y + 1}
        width={Math.max(width - 1.4, 1)}
        height="0.9"
        rx="0.45"
        fill="#8b94b0"
        opacity="0.65"
      />
    </g>
  );
}

export function HeroDevice() {
  return (
    <div className="hero-device">
      <div className="hero-phone-wrap">
        <svg
          className="hero-phone"
          width="100%"
          viewBox="-16 0 416 812"
          role="img"
          aria-labelledby="hero-phone-title"
        >
          <title id="hero-phone-title">DafoTalk secured call with Saocac</title>
          <defs>
            <linearGradient id="heroPhoneMetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#343b54" />
              <stop offset="22%" stopColor="#2e344a" />
              <stop offset="62%" stopColor="#272c40" />
              <stop offset="100%" stopColor="#1a1e30" />
            </linearGradient>
            <linearGradient id="heroPhoneEdge" x1="0.2" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor="#5c6582" />
              <stop offset="12%" stopColor="#424a64" />
              <stop offset="40%" stopColor="#31384e" />
              <stop offset="100%" stopColor="#222736" />
            </linearGradient>
            <linearGradient id="heroPhoneLip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
              <stop offset="22%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
            </linearGradient>
            <clipPath id="heroPhoneScreen">
              <rect x="13" y="13" width="358" height="786" rx="32" />
            </clipPath>
          </defs>
          <SideButton x={-5.2} y={168} width={7.2} height={54} />
          <SideButton x={-5.2} y={234} width={7.2} height={54} />
          <SideButton x={381.2} y={300} width={7.2} height={86} />
          <rect
            x="1.3"
            y="1.3"
            width="381.4"
            height="809.4"
            rx="45"
            fill="url(#heroPhoneMetal)"
            stroke="url(#heroPhoneEdge)"
            strokeWidth="2.6"
          />
          <rect
            x="10.6"
            y="10.6"
            width="362.8"
            height="790.8"
            rx="34.4"
            fill="#07080f"
          />
          <image
            href="/hero.webp"
            x="13"
            y="13"
            width="358"
            height="786"
            clipPath="url(#heroPhoneScreen)"
            preserveAspectRatio="xMidYMid meet"
          />
          <rect
            x="11"
            y="11"
            width="362"
            height="790"
            rx="34"
            fill="none"
            stroke="#05060c"
            strokeWidth="2"
          />
          <rect
            x="13.6"
            y="13.6"
            width="356.8"
            height="784.8"
            rx="31.4"
            fill="none"
            stroke="url(#heroPhoneLip)"
            strokeWidth="1.25"
          />
        </svg>
        <p className="hero-caption hero-caption--away">
          <span className="hero-caption__line">
            “What’s it like living
            <br />
            over there?”
          </span>
          <Waveform />
        </p>
        <p className="hero-caption hero-caption--near">
          <Waveform />
          <span className="hero-caption__line">
            “Honestly, there’s a lot
            <br />
            to get used to.”
          </span>
        </p>
      </div>
    </div>
  );
}
