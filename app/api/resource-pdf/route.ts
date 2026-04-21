import { constants, createReadStream } from 'fs'
import { access } from 'fs/promises'
import path from 'path'
import { Readable } from 'stream'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

const FILES: Record<string, string> = {
  fullstack: 'fullstack development.pdf',
  cloud: 'Cloud-Computing.pdf',
  ux: 'User-Experience Design.pdf',
  programming: 'Programming.pdf',
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key || !(key in FILES)) {
    return new Response('Not found', { status: 404 })
  }

  const filename = FILES[key]
  const absPath = path.join(process.cwd(), 'public', filename)

  try {
    await access(absPath, constants.R_OK)
  } catch {
    return new Response('Not found', { status: 404 })
  }

  const nodeStream = createReadStream(absPath)
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>
  const safeName = filename.replace(/"/g, '')

  return new Response(webStream, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeName}"`,
    },
  })
}
