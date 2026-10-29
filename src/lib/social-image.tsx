import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";
export const socialImageAlt =
  "DafoTalk — Sometimes, you just need someone to talk to.";

export function renderSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12101c",
          color: "#f7f3ec",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c4b6ff",
          }}
        >
          DafoTalk
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.08,
              maxWidth: 980,
            }}
          >
            Sometimes, you just need someone to talk to.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(247,243,236,0.72)",
              maxWidth: 860,
            }}
          >
            Matched by who you are and what you want to talk about.
          </div>
        </div>
      </div>
    ),
    { ...socialImageSize },
  );
}
