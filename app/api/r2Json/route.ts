import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const r2Bucket = getRequestContext().env.R2;
    const settings: Settings = await request.json();
    const settingsJson = JSON.stringify(settings, null, 2);

    // Save to R2 bucket
    await r2Bucket.put('settings.json', settingsJson, {
      httpMetadata: {
        contentType: 'application/json',
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {    
    return NextResponse.json({ error: 'Failed to save settings', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}