export class RegexUtils {
  static getSequenceMatcher({ query, modifiers = 'i' }: { query: string; modifiers?: string }): RegExp {
    const expression = query
      .split('')
      .map(c => `.*${c}`)
      .join('');
    return new RegExp(`^${expression}.*$`, modifiers);
  }
}
