import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — massoterapia e estética corporal em Goiânia`;

/**
 * Cartão de compartilhamento gerado no build. É o que aparece quando alguém
 * manda o link do studio no WhatsApp ou no Instagram, então vale a pena ser
 * a marca de verdade e não um print da home.
 */
export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-lockup.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1c1610",
          color: "#efe7db",
          fontFamily: "sans-serif",
          padding: 72,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={420} />
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 34,
            letterSpacing: 1,
            color: "#c89f63",
          }}
        >
          Massoterapia e estética corporal
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontSize: 26,
            color: "#ab9f8f",
          }}
        >
          {`${site.address.district}, ${site.address.city}`}
        </div>
      </div>
    ),
    size,
  );
}
