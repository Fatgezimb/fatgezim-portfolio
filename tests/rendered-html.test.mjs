import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import test from "node:test";

const posterPdfPath =
  "/media/fatgezim-bela-computational-neuroscience-poster.pdf";
const posterPreviewPath =
  "/media/fatgezim-bela-computational-neuroscience-poster-preview.jpg";
const researchDetailPath =
  "/research/george-mason-neuronal-reconstruction";

const portfolioSections = [
  "process",
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

function openingTags(html, tagName) {
  return [
    ...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi")),
  ].map((match) => match[0]);
}

function attributeValue(tag, attributeName) {
  const escapedName = attributeName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return tag.match(
    new RegExp(`\\b${escapedName}=["']([^"']*)["']`, "i"),
  )?.[1];
}

function assertSingleH1(html, label) {
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert.equal(headings.length, 1, `${label} should have exactly one h1`);
  return headings[0][1];
}

async function assertPublicAsset(relativePath, minimumBytes = 100) {
  const assetUrl = new URL(`../public${relativePath}`, import.meta.url);
  const asset = await stat(assetUrl);
  assert.ok(asset.isFile(), `${relativePath} should be a file`);
  assert.ok(
    asset.size >= minimumBytes,
    `${relativePath} should contain a real media artifact`,
  );
}

test("server-renders the semantic portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<html\b(?=[^>]*\blang=["']en["'])(?=[^>]*\bdata-theme=["']light["'])[^>]*>/i,
  );
  assert.match(html, /<main\b[^>]*>/i);
  assert.match(html, /<nav\b[^>]*>/i);
  assert.match(html, /Switch to dark theme/i);
  assert.match(html, /Open navigation search/i);
  assert.match(html, /Quick navigation/i);
  assert.match(
    html,
    /<meta\b(?=[^>]*\bname=["']theme-color["'])(?=[^>]*\bcontent=["']#f1eff6["'])[^>]*>/i,
  );
  assert.doesNotMatch(
    html,
    /three\.module/i,
    "Three.js must stay out of the initial document and load near a spatial scene",
  );

  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert.equal(headings.length, 1, "homepage should have exactly one h1");
  assert.match(headings[0][1], /desk/i);
  assert.match(html, /Fatgezim.*?Zim.*?Bela/i);
  assert.match(html, /Explore five workspace topics/i);
  for (const topic of ["Neuroscience", "Software", "Data", "Medicine", "Design"]) {
    assert.match(html, new RegExp(`<h2>${topic}</h2>`), `${topic} story must be readable without JavaScript`);
  }

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
    ...navigation.matchAll(
      /<a\b[^>]*\bhref=["']\/?#([^"']+)["'][^>]*>/gi,
    ),
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

test("server-renders the print resume", async () => {
  const response = await render("/resume");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Résumé \| Fatgezim “Zim” Bela<\/title>/i);
  assert.match(html, /Doctor of Medicine Candidate/i);
  assert.match(html, /Expected 2028/i);
  assert.match(html, /M\.Ed\. in Special Education/i);
  assert.match(html, /B\.S\. in Neuroscience/i);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/fatgezimzimbela\//i);
  assert.match(html, /https:\/\/github\.com\/Fatgezimb/i);
  assert.doesNotMatch(html, /fatgezimbela1@gmail\.com/i);
  assert.doesNotMatch(html, /Public materials omit|Print-ready résumé available/i);

  assert.doesNotMatch(html, /1331 Recordz|IronGlassByte|Boston University/i);
  assert.doesNotMatch(html, /Project Cleo|Spinal Fracture/i);
  assert.doesNotMatch(
    html,
    /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/,
  );
  assert.doesNotMatch(html, /Bela_Fatgezim_Resume\.pdf/i);
});

test("renders canonical sharing and crawler metadata", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*fatgezimb\.github\.io\/fatgezim-portfolio\/)[^>]*>/i,
  );
  assert.match(html, /property=["']og:image["'][^>]*\/og\.png/i);
  assert.match(html, /name=["']twitter:card["'][^>]*summary_large_image/i);
  assert.match(html, /application\/ld\+json/i);

  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Sitemap:.*\/sitemap\.xml/i);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<loc>.*fatgezimb\.github\.io\/fatgezim-portfolio<\/loc>/i);
  assert.match(sitemap, /<loc>.*\/resume<\/loc>/i);
  assert.match(sitemap, /<loc>.*\/research<\/loc>/i);
  assert.match(
    sitemap,
    /<loc>.*\/research\/george-mason-neuronal-reconstruction<\/loc>/i,
  );
});

test("server-renders the research hub and George Mason detail route", async () => {
  const researchResponse = await render("/research");
  assert.equal(researchResponse.status, 200);
  assert.match(
    researchResponse.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );

  const researchHtml = await researchResponse.text();
  assert.match(assertSingleH1(researchHtml, "research hub"), /Research &amp; scientific work/i);
  assert.match(
    researchHtml,
    /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\/research["'])[^>]*>/i,
  );
  assert.match(researchHtml, /Featured research/i);
  assert.match(researchHtml, /Collaborative computational neuroscience/i);
  assert.doesNotMatch(researchHtml, /Artifact-led research record/i);
  assert.doesNotMatch(researchHtml, /Owner-confirmed; documentation pending/i);
  assert.match(researchHtml, new RegExp(`href=["']${researchDetailPath}["']`, "i"));

  const detailResponse = await render(researchDetailPath);
  assert.equal(detailResponse.status, 200);
  assert.match(
    detailResponse.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );

  const detailHtml = await detailResponse.text();
  assert.match(
    assertSingleH1(detailHtml, "George Mason research detail"),
    /Computational Neuroscience: Tracing Neurons from the Fruit Fly Larva/i,
  );
  assert.match(
    detailHtml,
    /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\/research\/george-mason-neuronal-reconstruction["'])[^>]*>/i,
  );
  assert.match(detailHtml, /Poster overview/i);
  assert.match(detailHtml, /Reconstruction workflow/i);
  assert.match(detailHtml, /Questions identified for later investigation/i);
});

test("publishes only poster-supported neuronal-reconstruction claims", async () => {
  const responses = await Promise.all([
    render("/research"),
    render(researchDetailPath),
  ]);
  const html = (await Promise.all(responses.map((response) => response.text()))).join(
    "\n",
  );

  assert.match(
    html,
    /Computational Neuroscience: Tracing Neurons from the Fruit Fly Larva/i,
  );
  assert.match(html, /Fatgezim Bela, Sumit Nanda, Giorgio A\. Ascoli/i);
  assert.match(
    html,
    /Centers for Neural Informatics, Structures &amp; Plasticity/i,
  );
  assert.doesNotMatch(html, /email address printed on the original poster is archival/i);
  assert.doesNotMatch(html, /fatgezimbela1@gmail\.com/i);
  assert.match(html, /Fiji\/ImageJ/i);
  assert.match(html, /Vaa3D/i);
  assert.match(html, /NeuTube/i);
  assert.match(html, /Class 4/i);
  assert.match(html, /vectorized[- ]tree/i);
  assert.match(html, /co-author and contributor/i);
  assert.match(html, /proposals rather than completed experiments/i);

  assert.match(html, new RegExp(posterPdfPath.replaceAll("/", "\\/"), "i"));
  assert.match(
    html,
    new RegExp(posterPreviewPath.replaceAll("/", "\\/"), "i"),
  );
  assert.match(html, /<dialog\b[^>]*\bid=["']research-poster-dialog["'][^>]*>/i);
  assert.match(
    html,
    new RegExp(
      `<a\\b(?=[^>]*\\bdownload(?:=["'][^"']*["'])?)(?=[^>]*\\bhref=["']${posterPdfPath.replaceAll("/", "\\/")}["'])[^>]*>`,
      "i",
    ),
  );

  assert.doesNotMatch(
    html,
    /Award-Winning Presentation|Outstanding Poster Presentation|Winning Research Proposal Presentation|Simons Foundation|completed NeuroMorpho|peer-reviewed (?:article|journal|publication)|sole (?:author|producer|presenter)/i,
  );
});

test("renders a clean contact form and social links", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(
    html,
    /<form\b(?=[^>]*\baction=["']mailto:fatgezimbela1@gmail\.com["'])(?=[^>]*\bmethod=["']post["'])[^>]*>/i,
  );
  assert.match(html, /Start a conversation/i);
  assert.match(html, /Create email draft/i);
  assert.match(html, /opens as a draft in your email app/i);
  assert.match(html, /mailto:fatgezimbela1@gmail\.com/i);
  assert.doesNotMatch(html, /Open email draft|Prefer email\?/i);
  assert.doesNotMatch(
    html,
    /<a\b(?=[^>]*\bhref=["']mailto:fatgezimbela1@gmail\.com["'])[^>]*>/i,
  );
  assert.doesNotMatch(html, />\s*fatgezimbela1@gmail\.com\s*</i);

  const linkedInPosition = html.search(
    /<a\b[^>]*\bhref=["']https:\/\/www\.linkedin\.com\/in\/fatgezimzimbela\/["']/i,
  );
  const githubPosition = html.search(
    /<a\b[^>]*\bhref=["']https:\/\/github\.com\/Fatgezimb["']/i,
  );
  assert.ok(linkedInPosition >= 0, "contact should show the full LinkedIn URL");
  assert.ok(githubPosition >= 0, "contact should show the full GitHub URL");
  assert.ok(
    linkedInPosition < githubPosition,
    "LinkedIn should appear before GitHub",
  );
  assert.doesNotMatch(html, /api\.web3forms\.com|web3forms|access_key/i);
  assert.doesNotMatch(html, /newsletter|subscribe for updates/i);
  assert.doesNotMatch(
    html,
    /<form\b(?=[^>]*\baction=["']https?:\/\/)[^>]*>/i,
  );
});

test("keeps internal review language out of visitor-facing pages", async () => {
  const responses = await Promise.all([
    render(),
    render("/resume"),
    render("/research"),
    render(researchDetailPath),
  ]);
  const html = (await Promise.all(responses.map((response) => response.text()))).join(
    "\n",
  );

  assert.doesNotMatch(
    html,
    /Verified public résumé|Print-ready résumé|Published without identifiers|System \/ End of transmission|Artifact-led research record|Evidence-backed scope and boundaries|Privacy and claim boundaries|Public materials omit|Owner-confirmed; documentation pending/i,
  );
});

test("renders the supplied portrait and soccer media without autoplay or looping", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(
    html,
    /<img\b(?=[^>]*\bsrc=["']\/media\/fatgezim-bela-headshot\.jpg["'])(?=[^>]*\balt=["'][^"']*Fatgezim[^"']*Zim[^"']*Bela[^"']*["'])[^>]*>/i,
  );
  assert.match(html, /Mason Intramurals on May 1, 2016/i);
  assert.match(
    html,
    /<source\b(?=[^>]*\bdata-src=["']\/media\/fatgezim-bela-soccer-winning-penalty\.mp4["'])(?=[^>]*\btype=["']video\/mp4["'])[^>]*>/i,
  );

  const videoTags = openingTags(html, "video");
  assert.equal(videoTags.length, 1, "homepage should render one archival video");
  assert.match(videoTags[0], /\bcontrols(?:=["'][^"']*["'])?/i);
  assert.match(
    videoTags[0],
    /\bdata-poster=["']\/media\/fatgezim-bela-soccer-winning-penalty-poster\.jpg["']/i,
  );
  assert.match(
    html,
    /<noscript>[\s\S]*?<img\b(?=[^>]*\bsrc=["']\/media\/fatgezim-bela-soccer-winning-penalty-poster\.jpg["'])[^>]*>[\s\S]*?<\/noscript>/i,
  );
  assert.match(html, /<html\b[^>]*\bdata-js=["']disabled["']/i);
  assert.match(videoTags[0], /\bpreload=["']none["']/i);
  assert.doesNotMatch(videoTags[0], /\bautoplay(?:\s|=|>)/i);
  assert.doesNotMatch(videoTags[0], /\bloop(?:\s|=|>)/i);

  await Promise.all([
    assertPublicAsset("/media/fatgezim-bela-headshot.jpg", 1_000),
    assertPublicAsset(
      "/media/fatgezim-bela-soccer-winning-penalty-poster.jpg",
      1_000,
    ),
    assertPublicAsset(
      "/media/fatgezim-bela-soccer-winning-penalty.mp4",
      10_000,
    ),
    assertPublicAsset(posterPreviewPath, 10_000),
    assertPublicAsset(posterPdfPath, 10_000),
  ]);
});

test("marks every new-tab link as safe and discloses its behavior", async () => {
  const responses = await Promise.all([
    render(),
    render("/resume"),
    render("/research"),
    render(researchDetailPath),
  ]);
  const documents = await Promise.all(
    responses.map(async (response) => response.text()),
  );

  for (const [documentIndex, html] of documents.entries()) {
    const links = [
      ...html.matchAll(
        /<a\b(?=[^>]*\btarget=["']_blank["'])[^>]*>[\s\S]*?<\/a>/gi,
      ),
    ].map((match) => match[0]);
    assert.ok(links.length > 0, `document ${documentIndex + 1} should have new-tab links`);

    for (const link of links) {
      const openingTag = openingTags(link, "a")[0];
      const rel = attributeValue(openingTag, "rel") ?? "";
      assert.ok(
        rel.split(/\s+/).includes("noreferrer"),
        `new-tab link should prevent opener access: ${openingTag}`,
      );
      assert.match(
        link,
        /opens in a new tab/i,
        `new-tab link should disclose its behavior: ${openingTag}`,
      );
    }
  }
});


test("technology resume preserves confirmed facts and working public project destinations", async () => {
  const responses = await Promise.all([render(), render("/resume")]);
  for (const response of responses) {
    const html = await response.text();
    assert.match(html, /Founder and (?:Chief Technology Officer|CTO)/);
    assert.match(html, /Create 13 Group/);
    assert.match(html, /2018 - Present/);
    assert.match(html, /href=["']https:\/\/rbt-pro\.vercel\.app\/["']/);
    assert.doesNotMatch(html, /href=["']https:\/\/fatgezimb\.github\.io\/rbt-practice-hub/);
    assert.doesNotMatch(html, /href=["']https:\/\/github\.com\/Fatgezimb\/rbt-practice-hub/);
  }
  const html = await (await render("/resume")).text();
  assert.match(html, /Clinical Assessment Portal/);
  assert.match(html, /locally tested with synthetic records/);
  assert.match(html, /USMLE Sprint/);
  assert.match(html, /Account-gated learning application/);
  assert.match(html, /B\.S\. in Neuroscience[\s\S]*?2017/);
  assert.match(html, /Co-founder and Co-builder/);
});

test("public download buttons serve the exact owner-reviewed document bytes", async () => {
  const approval = JSON.parse(await readFile(new URL("../resume/approval.json", import.meta.url), "utf8"));
  for (const route of ["/", "/resume"]) {
    const html = await (await render(route)).text();
    for (const [name, digest] of Object.entries(approval.sha256)) {
      assert.match(html, new RegExp(`href=["']/resume/${name.replaceAll(".", "\\.")}["']`));
      const contents = await readFile(new URL(`../public/resume/${name}`, import.meta.url));
      assert.equal(createHash("sha256").update(contents).digest("hex"), digest);
      assert.ok(contents.length > 10_000);
      assert.equal(contents.subarray(0, name.endsWith(".pdf") ? 4 : 2).toString(), name.endsWith(".pdf") ? "%PDF" : "PK");
    }
  }
});

test("project workspace exposes complete samples without eagerly loading external sites", async () => {
  const html = await (await render()).text();
  const tabs = openingTags(html, "button").filter(tag => attributeValue(tag, "role") === "tab");
  const panels = openingTags(html, "article").filter(tag => attributeValue(tag, "role") === "tabpanel");
  assert.equal(tabs.length, 7, "each featured project must be selectable");
  assert.equal(panels.length, 7, "each project must have server-rendered sample content");
  assert.equal(tabs.filter(tag => attributeValue(tag, "aria-selected") === "true").length, 1);
  for (const tab of tabs) {
    const target = attributeValue(tab, "aria-controls");
    assert.ok(panels.some(panel => attributeValue(panel, "id") === target), "project tab must identify its own panel");
  }
  assert.equal(openingTags(html, "iframe").length, 0, "external sites load only after an explicit action");
  assert.ok(html.includes("synthetic appointments"));
  assert.ok(html.includes("Local beta simulation"), "local automation must identify simulation");
  assert.ok(html.includes("https://fatgezimb.github.io/StepSpark/"), "StepSpark must link to its verified deployment");
  assert.ok(html.includes("https://rbt-pro.vercel.app/"));
  assert.ok(html.includes("https://github.com/Fatgezimb/neurostack-explorer"));
  assert.ok(!html.includes("12.4 Hz") && !html.includes("8.1 Hz"), "retired illustration values must not appear as measured neural data");
});
