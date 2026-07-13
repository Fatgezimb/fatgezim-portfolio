"use client";

export function PrintButton() {
  return (
    <button className="button button--primary print-button" onClick={() => window.print()} type="button">
      Print / save as PDF
    </button>
  );
}
