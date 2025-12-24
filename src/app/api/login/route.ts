import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Jelszó megadása kötelező' },
        { status: 400 }
      );
    }

    // Jelszó ellenőrzés
    // Ha van PASSWORD_HASH env változó, bcrypt-t használunk
    // Egyébként SITE_PASSWORD env változót vagy alapértelmezett jelszót használunk
    const sitePassword = process.env.SITE_PASSWORD || 'lili2026';
    let isValid = false;

    if (process.env.PASSWORD_HASH) {
      isValid = await bcrypt.compare(password, process.env.PASSWORD_HASH);
    } else {
      isValid = password === sitePassword;
    }

    if (isValid) {
      const response = NextResponse.json({ success: true });
      // Jelszó token beállítása cookie-ban (30 nap)
      response.cookies.set('auth_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 nap
        path: '/',
      });
      return response;
    } else {
      return NextResponse.json(
        { error: 'Hibás jelszó' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Hiba történt a bejelentkezés során' },
      { status: 500 }
    );
  }
}

