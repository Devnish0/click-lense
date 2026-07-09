"use client";

import * as React from "react";
import QRCode from "react-qr-code";

interface QRCodeCardProps {
  value: string;
}

export default function QRCodeCard({ value }: QRCodeCardProps) {
  return React.createElement(
    "div",
    {
      className:
        "flex bg-secondary items-center justify-center rounded-2xl border bg-card p-6",
    },
    React.createElement(QRCode, {
      value: value,
      size: 180,
      bgColor: "transparent",
      fgColor: "#004838",
    }),
  );
}
