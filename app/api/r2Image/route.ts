import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';


export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const r2Bucket = getRequestContext().env.R2;
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // Generate unique filename
    const name = file.name.split('.').slice(0, -1).join('.');
    const ext = file.name.split('.').pop();
    const filename = `artwork/${name}-${Date.now()}.${ext}`;

    // Upload to R2
    await r2Bucket.put(filename, await file.arrayBuffer(), {
      httpMetadata: {
        contentType: file.type,
      },
    });

    const cdnDomain = process.env.CDNUrl;
    const imageUrl = `https://${cdnDomain}/${filename}`;

    return NextResponse.json({ url: imageUrl,});

  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
