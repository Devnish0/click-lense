"use client";

import * as React from "react";
import QRCode from "react-qr-code";

interface QRCodeCardProps {
  value: string;
}

export default function QRCodeCard({ value }: QRCodeCardProps) {
  const [colors, setColors] = React.useState({
    foreground: "#004838",
    card: "#f8f9f6",
  });

  React.useEffect(() => {
    const root = document.documentElement;

    const syncColors = () => {
      const computed = window.getComputedStyle(root);

      setColors({
        foreground: computed.getPropertyValue("--primary").trim() || "#004838",
        card: computed.getPropertyValue("--card").trim() || "#f8f9f6",
      });
    };

    syncColors();

    const observer = new MutationObserver(syncColors);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return React.createElement(
    "div",
    {
      className:
        "flex items-center justify-center rounded-2xl border bg-card p-6",
      style: {
        backgroundColor: colors.card,
      },
    },
    React.createElement(QRCode, {
      value: value,
      size: 180,
      bgColor: "transparent",
      fgColor: colors.foreground,
    }),
  );
}
