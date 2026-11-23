/**
 * Node 25+ eliminó `buffer.SlowBuffer` (DEP0030 EOL), pero `buffer-equal-constant-time@1.0.1`
 * (dependencia transitiva de `firebase-admin`, `google-auth-library` y `@google-cloud/storage`)
 * lee `SlowBuffer.prototype.equal` al cargarse y tumba el proceso antes de arrancar.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bufferModule = require('buffer') as { Buffer: typeof Buffer; SlowBuffer?: typeof Buffer };

if (!bufferModule.SlowBuffer) {
  bufferModule.SlowBuffer = bufferModule.Buffer;
}

export {};
