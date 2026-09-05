/**
 * Variáveis `NEXT_PUBLIC_*` são substituídas no bundle em tempo de build.
 * Quando não estão definidas, chegam como string vazia — e não como
 * `undefined`. Por isso `??` não serve de fallback aqui: `"" ?? padrao`
 * devolve `""`. Foi assim que os links de WhatsApp subiram sem o número.
 *
 * Use sempre `env(process.env.X) ?? padrao`.
 */
export function env(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}
