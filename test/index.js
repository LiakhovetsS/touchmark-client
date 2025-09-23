import test from 'node:test'
import assert from 'node:assert'
import { generateSignature } from '../dist/index.js';

test('Generate signature', async (t) => {
  const MY_SECRET_KEY = 'qEnR5RDq7t7gTuXFQmJLIJdUfuZhbwjt';
  const signature = generateSignature({
    method: 'POST',
    url: '/api/users',
    appSignature: MY_SECRET_KEY
  });
  console.log('Generated Signature:', signature);
  assert.ok(signature);
  // Example assertion (the actual signature will differ based on the implementation)
});