"use client";
import { lazy, Suspense, useState } from "react";
const ProjectPreview = lazy(() => import("./ProjectPreview"));
export function CaseDemo({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="engineering-demo-button"
        aria-expanded={open}
        aria-controls={`demo-${id}`}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close interactive example" : `Try ${title}`}{" "}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id={`demo-${id}`} hidden={!open}>
        {open && (
          <Suspense fallback={<p role="status">Opening example…</p>}>
            <ProjectPreview id={id} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
