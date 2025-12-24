import { put } from '@vercel/blob';
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const month = formData.get('month') as string;
    const missionId = formData.get('missionId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Feltöltés Vercel Blob Storage-ba
    // A Vercel production-ban automatikusan kezeli a token-t, de ha nincs, akkor használjuk a BLOB_READ_WRITE_TOKEN-t
    const uploadOptions: { access: 'public'; token?: string } = {
      access: 'public',
    };

    // Ha van BLOB_READ_WRITE_TOKEN env változó, használjuk (pl. local development vagy manuális beállítás)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      uploadOptions.token = process.env.BLOB_READ_WRITE_TOKEN;
    }

    const blob = await put(`month-${month}-mission-${missionId}-${Date.now()}.jpg`, file, uploadOptions);

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Upload error details:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to upload image', details: errorMessage },
      { status: 500 }
    );
  }
}

