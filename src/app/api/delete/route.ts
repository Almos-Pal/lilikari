import { del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Jelszó ellenőrzés
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token');
    
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    // A Vercel production-ban automatikusan kezeli a token-t
    const deleteOptions: { token?: string } = {};
    
    // Ha van BLOB_READ_WRITE_TOKEN env változó, használjuk
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      deleteOptions.token = process.env.BLOB_READ_WRITE_TOKEN;
    }

    await del(url, deleteOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Delete error details:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to delete image', details: errorMessage },
      { status: 500 }
    );
  }
}

