import { PortraitArt, type PortraitName } from "@/components/site/portraits";

const BUBBLE =
  "M14 0 H82 Q96 0 96 14 V40 Q96 54 82 54 H42 L15 69 L25 54 H14 Q0 54 0 40 V14 Q0 0 14 0 Z";
const REPLY =
  "M14 0 H82 Q96 0 96 14 V40 Q96 54 82 54 H70 L81 69 L54 54 H14 Q0 54 0 40 V14 Q0 0 14 0 Z";

export function LivingConversations() {
  return (
    <svg
      className="living-conversations absolute inset-0 h-full w-full"
      viewBox="8 36 1188 840"
      role="img"
      aria-labelledby="living-conversations-title"
    >
      <title id="living-conversations-title">Three private conversations, each between two people, gently exchanging thoughts</title>
      <g className="conversation-pair conversation-pair--first">
        <path className="conversation-connection" d="M160 270 C207 315 382 342 437 310" />
        <Avatar name="beard" x={65} y={85} size={190} />
        <Avatar name="bun" x={345} y={130} size={185} />
        <Bubble x={263} y={136} scale={0.75} />
        <Bubble x={270} y={209} scale={0.75} reply />
      </g>
      <g className="conversation-pair conversation-pair--second">
        <path className="conversation-connection" d="M818 289 C879 336 1036 359 1097 320" />
        <Avatar name="green" x={725} y={109} size={185} />
        <Avatar name="headphones" x={1010} y={150} size={175} />
        <Bubble x={919} y={158} scale={0.75} />
        <Bubble x={930} y={231} scale={0.75} reply />
      </g>
      <g className="conversation-pair conversation-pair--main">
        <path className="conversation-connection" d="M320 742 C450 828 755 842 878 764" />
        <Avatar name="cap" x={150} y={400} size={335} />
        <Avatar name="pink" x={715} y={440} size={335} />
        <Bubble x={527} y={466} scale={1} />
        <Bubble x={597} y={566} scale={1} reply />
      </g>
    </svg>
  );
}

function Avatar({ name, x, y, size }: { name: PortraitName; x: number; y: number; size: number }) {
  const radius = size * 0.495;
  const cx = x + size / 2;
  const cy = y + size / 2;

  return (
    <g className="conversation-avatar">
      <clipPath id={`conversation-avatar-${name}`}>
        <circle cx={cx} cy={cy} r={radius} />
      </clipPath>
      <g clipPath={`url(#conversation-avatar-${name})`}>
        <g transform={`translate(${x} ${y}) scale(${size / 200})`}>
          <PortraitArt name={name} />
        </g>
      </g>
      <circle className="conversation-avatar__edge" cx={cx} cy={cy} r={radius} />
    </g>
  );
}

function Bubble({ x, y, scale, reply = false }: { x: number; y: number; scale: number; reply?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={reply ? "conversation-bubble conversation-bubble--reply" : "conversation-bubble"}>
        <path className="conversation-bubble__body" d={reply ? REPLY : BUBBLE} />
        <circle cx="30" cy="27" r="4" className="conversation-dot conversation-dot--0" />
        <circle cx="48" cy="27" r="4" className="conversation-dot conversation-dot--1" />
        <circle cx="66" cy="27" r="4" className="conversation-dot conversation-dot--2" />
      </g>
    </g>
  );
}
