import assert from "node:assert/strict";
import test from "node:test";

const portfolioSections = [
  "about",
  "projects",
  "experience",
  "skills",
  "research",
  "founder",
  "education",
  "contact",
];

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function sectionPattern(id) {
  return new RegExp(
    `<section\\b(?=[^>]*\\bid=["']${id}["'])[^>]*>`,
    "i",
  );
}

function idPattern(id) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\bid=["']${escapedId}["']`, "i");
}

test("server-renders the semantic portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html\b(?=[^>]*\blang=["']en["'])[^>]*>/i);
  assert.match(html, /<main\b[^>]*>/i);
  assert.match(html, /<nav\b[^>]*>/i);

  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert.equal(headings.length, 1, "homepage should have exactly one h1");
  assert.match(headings[0][1], /Fatgezim/i);
  assert.match(headings[0][1], /Zim/i);
  assert.match(headings[0][1], /Bela/i);

  for (const id of portfolioSections) {
    assert.match(html, sectionPattern(id), `missing semantic #${id} section`);
  }
});

test("homepage navigation links resolve to portfolio sections", async () => {
  const response = await render();
  const html = await response.text();
  const navigation = [...html.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gi)]
    .map((match) => match[1])
    .join("\n");
  const targets = [
    ...navigation.matchAll(/<a\b[^>]*\bhref=["']#([^"']+)["'][^>]*>/gi),
  ].map((match) => match[1]);

  assert.ok(targets.length > 0, "navigation should include same-page links");
  for (const target of targets) {
    assert.match(html, idPattern(target), `navigation target #${target} is missing`);
  }

  for (const target of ["projects", "experience", "contact"]) {
    assert.ok(
      targets.includes(target),
      `navigation should include a link to #${target}`,
    );
  }
});

test("does not render the disposable starter preview", async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /codex-preview/i);
  assert.doesNotMatch(html, /sites-skeleton-preview/i);
  assert.doesNotMatch(html, /react-loading-skeleton/i);
  assert.doesNotMatch(html, /Your site is taking shape/i);
});

test("server-renders a sanitized print resume pending owner approval", async () => {
  const response = await render("/resume");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Print Résumé \| Fatgezim “Zim” Bela<\/title>/i);
  assert.match(html, /Doctor of Medicine Candidate/i);
  assert.match(html, /Expected 2028/i);
  assert.match(html, /M\.Ed\. in Special Education/i);
  assert.match(html, /B\.S\. in Neuroscience/i);
  assert.match(html, /Verified résumé download coming soon/i);
  assert.match(html, /fatgezimbela1@gmail\.com/i);

  assert.doesNotMatch(html, /1331 Recordz|IronGlassByte|Boston University/i);
  assert.doesNotMatch(html, /Project Cleo|Spinal Fracture/i);
  assert.doesNotMatch(
    html,
    /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/,
  );
  assert.doesNotMatch(html, /Bela_Fatgezim_Resume\.pdf/i);
});
