import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  // Several lockfiles exist above this folder; pin the tracing root here.
  outputFileTracingRoot: path.join(__dirname),
}

export default nextConfig
