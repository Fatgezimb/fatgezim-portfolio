import { registerHooks } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Node 24 strips TypeScript; this hook resolves the app's extensionless local imports.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) {
      return nextResolve(`${specifier}.ts`, context);
    }
    return nextResolve(specifier, context);
  },
});
const root = resolve(import.meta.dirname, '..');
const { resumeDocument } = await import(pathToFileURL(resolve(root, 'app/content/resume-document.ts')).href);
const target = resolve(process.argv[2] ?? resolve(root, 'work/reconciliation/docs/resume-data.json'));
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, JSON.stringify(resumeDocument, null, 2) + '\n');
console.log(`Exported shared resumeDocument to ${target}`);
