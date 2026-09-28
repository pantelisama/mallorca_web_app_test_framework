import { test, expect, Locator, TestInfo } from "@playwright/test";
import { Candidate, heal, HealError, HEAL_ATTACHMENT, Root } from "../../framework/healing/healer";

/** A fake root whose locators match according to a table of counts keyed by strategy description. */
function fakeRoot(counts: Record<string, number>, aria = ""): Root & { calls: string[] } {
  const calls: string[] = [];
  const loc = (key: string): Locator => {
    calls.push(key);
    const l = { count: async () => counts[key] ?? 0, first: () => l, ariaSnapshot: async () => aria, waitFor: async () => { if (!counts[key]) throw new Error("timeout"); } };
    return l as unknown as Locator;
  };
  return {
    calls,
    getByRole: (role: string, o?: { name?: string | RegExp; exact?: boolean }) => loc(`role=${role}[name=${String(o?.name)}]${o?.exact ? "!" : ""}`),
    getByTestId: (id: string) => loc(`testid=${id}`),
    getByText: (t: string | RegExp) => loc(`text=${String(t)}`),
    locator: (s: string) => loc(`css=${s}`),
  };
}

function fakeTestInfo() {
  const annotations: TestInfo["annotations"] = [];
  const attachments: { name: string; body: string }[] = [];
  const info = {
    annotations,
    titlePath: ["healer.spec.ts", "fake"],
    file: "healer.spec.ts",
    attach: async (name: string, o: { body: string }) => void attachments.push({ name, body: o.body }),
  } as unknown as TestInfo;
  return { info, annotations, attachments };
}

const C: Candidate[] = [
  { by: "role", role: "button", name: "Go" },
  { by: "testid", id: "go" },
  { by: "text", text: "Go" },
  { by: "css", selector: ".go" },
];

test("primary match: no heal recorded, in either mode", async () => {
  for (const mode of ["strict", "report"] as const) {
    const t = fakeTestInfo();
    const root = fakeRoot({ "role=button[name=Go]": 1, "css=.go": 1 });
    await heal(root, "go", C, { testInfo: t.info, mode, timeoutMs: 1 });
    expect(t.annotations).toEqual([]);
    expect(t.attachments).toEqual([]);
  }
});

test("first matching candidate wins, in order", async () => {
  const t = fakeTestInfo();
  const root = fakeRoot({ "text=Go": 1, "css=.go": 1 });
  await heal(root, "go", C, { testInfo: t.info, mode: "report", timeoutMs: 1 });
  expect(root.calls).not.toContain("css=.go");
  expect(JSON.parse(t.attachments[0].body)).toMatchObject({ used: "text=Go", usedIndex: 2 });
});

test("report mode: a heal passes and is recorded as annotation and attachment", async () => {
  const t = fakeTestInfo();
  await heal(fakeRoot({ "css=.go": 1 }), "go", C, { testInfo: t.info, mode: "report", timeoutMs: 1 });
  expect(t.annotations).toEqual([{ type: HEAL_ATTACHMENT, description: "go: role=button[name=Go] failed, healed with css=.go" }]);
  expect(t.attachments.map((a) => a.name)).toEqual([HEAL_ATTACHMENT]);
  expect(JSON.parse(t.attachments[0].body)).toMatchObject({ element: "go", primary: "role=button[name=Go]", used: "css=.go", usedIndex: 3, mode: "report" });
});

test("strict mode: the same heal fails the test, and is still recorded", async () => {
  const t = fakeTestInfo();
  await expect(heal(fakeRoot({ "css=.go": 1 }), "go", C, { testInfo: t.info, mode: "strict", timeoutMs: 1 })).rejects.toThrow(/strict mode.*healed with css=\.go/);
  expect(t.attachments).toHaveLength(1);
});

test("mutation check: if strict mode stopped throwing, the strict test above would go red", async () => {
  // Same input as the strict test with mode forced to report: resolves. So the strict assertion
  // depends on mode alone, not on the fake.
  const t = fakeTestInfo();
  await expect(heal(fakeRoot({ "css=.go": 1 }), "go", C, { testInfo: t.info, mode: "report", timeoutMs: 1 })).resolves.toBeTruthy();
});

test("nothing matches: fails loud listing every candidate tried", async () => {
  const t = fakeTestInfo();
  const err = await heal(fakeRoot({}), "go", C, { testInfo: t.info, mode: "report", timeoutMs: 1 }).catch((e) => e);
  expect(err).toBeInstanceOf(HealError);
  for (const c of ["role=button[name=Go] -> 0", "testid=go -> 0", "text=Go -> 0", "css=.go -> 0"]) expect(err.message).toContain(c);
  expect(t.attachments).toEqual([]);
});

test("no candidates is an error, not a silent pass", async () => {
  await expect(heal(fakeRoot({}), "go", [], { testInfo: fakeTestInfo().info, timeoutMs: 1 })).rejects.toThrow(/no candidates/);
});

test("a heal records what it resolved to and suggests a unique role+name primary", async () => {
  const t = fakeTestInfo();
  const root = fakeRoot({ "css=.go": 1, "role=button[name=Go now]!": 1 }, '- button "Go now"');
  await heal(root, "go", C, { testInfo: t.info, mode: "report", timeoutMs: 1 });
  expect(JSON.parse(t.attachments[0].body)).toMatchObject({ resolvedAria: '- button "Go now"', suggestion: "role=button[name=Go now]" });
});

test("no suggestion when the role+name is not unique", async () => {
  const t = fakeTestInfo();
  const root = fakeRoot({ "css=.go": 1, "role=button[name=Go now]!": 2 }, '- button "Go now"');
  await heal(root, "go", C, { testInfo: t.info, mode: "report", timeoutMs: 1 });
  expect(JSON.parse(t.attachments[0].body).suggestion).toBeNull();
});
