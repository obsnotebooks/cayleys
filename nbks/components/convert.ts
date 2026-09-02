function convertHtmlToNotebook(html: string, title: string = "Untitled"): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const children = Array.from(doc.body.children);

  const cells: { id: number; type: string; content: string; pinned: boolean }[] = [];
  let cellId = 1;
  let group: Element[] = [];

  function flush(): void {
    if (group.length === 0) return;
    const div = doc.createElement("div");
    for (const el of group) div.appendChild(el.cloneNode(true));
    cells.push({ id: cellId++, type: "text/markdown", content: div.innerHTML, pinned: false });
    group = [];
  }

  for (const el of children) {
    if (el.tagName === "H1" || el.tagName === "H2") flush();
    group.push(el);
  }
  flush();

  const escapeTitle = (s: string): string =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const indentContent = (text: string): string => {
    const lines = text.split(/\r\n?|\n/);
    return `\n${lines.map(l => (l.trim() ? `    ${l}` : "")).join("\n")}\n  `;
  };

  const closeTag = "<" + "/script>";
  const serializedCells = cells
    .map(({ id, type, content, pinned }) => {
      const attrs = pinned ? ` pinned=""` : "";
      return `  <script id="${id}" type="${type}"${attrs}>${indentContent(content)}${closeTag}`;
    })
    .join("\n");

  return [
    "<!doctype html>",
    `<notebook theme="air">`,
    `  <title>${escapeTitle(title)}</title>`,
    serializedCells,
    "</notebook>",
    ""
  ].join("\n");
}
export { convertHtmlToNotebook };