// global modules
import { Helper } from 'casbin';
import type { Adapter, Model } from 'casbin';
import { and, eq, or, type SQL } from 'drizzle-orm';

// common modules
import type { DB } from 'src/db';

import {
  casbinRules,
  type DBCasbinRule,
  type DBCasbinRuleInsert,
} from 'src/db/schema';

export class DrizzleAdapter implements Adapter {
  filtered = false;

  isFiltered(): boolean {
    return this.filtered;
  }

  enableFiltered(enabled: boolean): void {
    this.filtered = enabled;
  }

  constructor(private readonly db: DB) {}

  async loadPolicy(model: Model): Promise<void> {
    const lines = await this.db.query.casbinRules.findMany();

    for (const line of lines) {
      this.#loadPolicyLine(line, model);
    }
  }

  /**
   * loadFilteredPolicy loads policy rules that match the filter from the storage;
   * use an empty string for selecting all values in a certain field.
   */
  async loadFilteredPolicy(
    model: Model,
    filter: { [key: string]: string[][] },
  ): Promise<void> {
    const whereFilter = Object.keys(filter)
      .map((ptype) => {
        const policyPatterns = filter[ptype];
        return policyPatterns.map((policyPattern) => {
          const filters: SQL[] = [eq(casbinRules.ptype, ptype)];
          if (policyPattern[0])
            filters.push(eq(casbinRules.v0, policyPattern[0]));
          if (policyPattern[1])
            filters.push(eq(casbinRules.v1, policyPattern[1]));
          if (policyPattern[2])
            filters.push(eq(casbinRules.v2, policyPattern[2]));
          if (policyPattern[3])
            filters.push(eq(casbinRules.v3, policyPattern[3]));
          if (policyPattern[4])
            filters.push(eq(casbinRules.v4, policyPattern[4]));
          if (policyPattern[5])
            filters.push(eq(casbinRules.v5, policyPattern[5]));

          return and(...filters);
        });
      })
      .flat()
      .filter((v) => !!v);

    const lines = await this.db.query.casbinRules.findMany({
      where: or(...whereFilter),
    });

    lines.forEach((line) => this.#loadPolicyLine(line, model));
    this.enableFiltered(true);
  }

  async savePolicy(model: Model): Promise<boolean> {
    await this.db.delete(casbinRules);

    const lines: DBCasbinRuleInsert[] = [];

    const savePolicyType = (ptype: string): void => {
      const astMap = model.model.get(ptype);
      if (astMap) {
        for (const [ptype, ast] of astMap) {
          for (const rule of ast.policy) {
            const line = this.#savePolicyLine(ptype, rule);
            lines.push(line);
          }
        }
      }
    };

    savePolicyType('p');
    savePolicyType('g');

    await this.db.insert(casbinRules).values(lines);

    return true;
  }

  async addPolicy(_sec: string, ptype: string, rule: string[]): Promise<void> {
    await this.db.insert(casbinRules).values(this.#savePolicyLine(ptype, rule));
  }

  async addPolicies(
    _sec: string,
    ptype: string,
    rules: string[][],
  ): Promise<void> {
    await this.db
      .insert(casbinRules)
      .values(rules.map((rule) => this.#savePolicyLine(ptype, rule)));
  }

  async removePolicy(
    _sec: string,
    ptype: string,
    rule: string[],
  ): Promise<void> {
    await this.db.delete(casbinRules).where(this.#savePolicyWhere(ptype, rule));
  }

  async removePolicies(
    _sec: string,
    ptype: string,
    rules: string[][],
  ): Promise<void> {
    await Promise.all(
      rules.map((rule) =>
        this.db.delete(casbinRules).where(this.#savePolicyWhere(ptype, rule)),
      ),
    );
  }

  async removeFilteredPolicy(
    _sec: string,
    ptype: string,
    fieldIndex: number,
    ...fieldValues: string[]
  ): Promise<void> {
    const filters: SQL[] = [eq(casbinRules.ptype, ptype)];

    const idx = fieldIndex + fieldValues.length;
    if (fieldIndex <= 0 && 0 < idx) {
      filters.push(eq(casbinRules.v0, fieldValues[0 - fieldIndex]));
    }
    if (fieldIndex <= 1 && 1 < idx) {
      filters.push(eq(casbinRules.v1, fieldValues[1 - fieldIndex]));
    }
    if (fieldIndex <= 2 && 2 < idx) {
      filters.push(eq(casbinRules.v2, fieldValues[2 - fieldIndex]));
    }
    if (fieldIndex <= 3 && 3 < idx) {
      filters.push(eq(casbinRules.v3, fieldValues[3 - fieldIndex]));
    }
    if (fieldIndex <= 4 && 4 < idx) {
      filters.push(eq(casbinRules.v4, fieldValues[4 - fieldIndex]));
    }
    if (fieldIndex <= 5 && 5 < idx) {
      filters.push(eq(casbinRules.v5, fieldValues[5 - fieldIndex]));
    }

    await this.db.delete(casbinRules).where(and(...filters));
  }

  static async newAdapter(db: DB): Promise<DrizzleAdapter> {
    return new DrizzleAdapter(db);
  }

  #loadPolicyLine = (line: DBCasbinRule, model: Model): void => {
    const result =
      line.ptype +
      ', ' +
      [line.v0, line.v1, line.v2, line.v3, line.v4, line.v5]
        .filter((n) => n)
        .join(', ');
    Helper.loadPolicyLine(result, model);
  };

  #savePolicyLine = (ptype: string, rule: string[]): DBCasbinRuleInsert => {
    const line: DBCasbinRuleInsert = { ptype };

    if (rule.length > 0) line.v0 = rule[0];
    if (rule.length > 1) line.v1 = rule[1];
    if (rule.length > 2) line.v2 = rule[2];
    if (rule.length > 3) line.v3 = rule[3];
    if (rule.length > 4) line.v4 = rule[4];
    if (rule.length > 5) line.v5 = rule[5];

    return line;
  };

  #savePolicyWhere = (ptype: string, rule: string[]) => {
    const filters: SQL[] = [eq(casbinRules.ptype, ptype)];

    if (rule.length > 0) filters.push(eq(casbinRules.v0, rule[0]));
    if (rule.length > 1) filters.push(eq(casbinRules.v1, rule[1]));
    if (rule.length > 2) filters.push(eq(casbinRules.v2, rule[2]));
    if (rule.length > 3) filters.push(eq(casbinRules.v3, rule[3]));
    if (rule.length > 4) filters.push(eq(casbinRules.v4, rule[4]));
    if (rule.length > 5) filters.push(eq(casbinRules.v5, rule[5]));

    return and(...filters);
  };
}
