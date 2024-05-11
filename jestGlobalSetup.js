/*
 Refs:
  - https://nextjs.org/docs/basic-features/environment-variables#test-environment-variables
  - https://github.com/vercel/next.js/issues/17903
  - https://jestjs.io/docs/configuration#globalsetup-string
*/
import { loadEnvConfig } from '@next/env';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async () => {
  loadEnvConfig(process.cwd());
};
