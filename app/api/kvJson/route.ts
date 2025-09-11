import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import mockKV from '@/public/mock_kv.json';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const KV = getRequestContext().env.KV; 
    const settings: Settings = await request.json();
    const settingsJson = JSON.stringify(settings, null, 2);

    await KV.put("CONTENT_MAP", settingsJson);

    return NextResponse.json({ success: true });

  } catch (error) {    
    return NextResponse.json({ error: 'Failed to save settings', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}


export async function GET() {
  try {

    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ settings: mockKV }, { status: 200 });
    }

    const KV = getRequestContext().env.KV;

    const settingsString = await KV.get("CONTENT_MAP");

    if (!settingsString) {
      return NextResponse.json({ error: "No settings found" },{ status: 404 });
    }

    const settings = JSON.parse(settingsString);

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}