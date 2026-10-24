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
        rx={Math.min(width / 2, 3.2)}
        fill="#2e354c"
        stroke="#15192a"
        strokeWidth="0.45"
      />
      <rect
        x={x + 0.55}
        y={y + 0.7}
        width={Math.max(width - 1.1, 1)}
        height="0.7"
        rx="0.35"
        fill="#6d7694"
        opacity="0.55"
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
              <stop offset="0%" stopColor="#3c4460" />
              <stop offset="16%" stopColor="#2e354c" />
              <stop offset="70%" stopColor="#262c40" />
              <stop offset="100%" stopColor="#1c2133" />
            </linearGradient>
            <linearGradient id="heroPhoneEdge" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#4c5570" />
              <stop offset="18%" stopColor="#343b54" />
              <stop offset="100%" stopColor="#1a1f30" />
            </linearGradient>
            <linearGradient id="heroPhoneLip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
              <stop offset="24%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
            <clipPath id="heroPhoneScreen">
              <rect x="13" y="13" width="358" height="786" rx="32" />
            </clipPath>
          </defs>
          <SideButton x={-4.4} y={174} width={6.4} height={56} />
          <SideButton x={-4.4} y={243} width={6.4} height={56} />
          <SideButton x={381.8} y={216} width={6.4} height={74} />
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
          <g>
            <circle cx="192" cy="47.2" r="8.8" fill="#1a2236" />
            <circle cx="192" cy="47.2" r="7.1" fill="#070b16" />
            <circle cx="192" cy="47.2" r="4.6" fill="#10182c" />
            <circle cx="192" cy="47.2" r="2.7" fill="#1c2a4a" />
            <ellipse cx="190.2" cy="45.3" rx="1.35" ry="0.8" fill="#e4e8f4" opacity="0.8" />
          </g>
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
