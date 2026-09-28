import fs from "node:fs";
import path from "node:path";
import type { FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import { HEAL_ATTACHMENT, HealEvent } from "./healer";
import { HEAL_MODE, ROOT } from "../config/env";

/** Collects every heal event from test attachments into reports/self-heal-report.json. Always written, even when empty. */
export default class HealReporter implements Reporter {
  private events: HealEvent[] = [];
  constructor(private readonly options: { outputFile?: string } = {}) {}

  onTestEnd(_test: TestCase, result: TestResult): void {
    for (const a of result.attachments) {
      if (a.name !== HEAL_ATTACHMENT || !a.body) continue;
      this.events.push(JSON.parse(a.body.toString("utf8")) as HealEvent);
    }
  }

  onEnd(result: FullResult): void {
    const file = this.options.outputFile ?? path.join(ROOT, "reports", "self-heal-report.json");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const report = { generatedAt: new Date().toISOString(), mode: HEAL_MODE, status: result.status, heals: this.events.length, events: this.events };
    fs.writeFileSync(file, JSON.stringify(report, null, 2));
  }

  printsToStdio(): boolean {
    return false;
  }
}
