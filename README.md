# Lili éves randijai 💕

Egy privát, romantikus webalkalmazás, amely egy teljes évet mutat be havi randikon keresztül.

## Funkciók

- 🔒 **Jelszó védelem** - Privát hozzáférés jelszóval
- 📸 **Képfeltöltés** - Vercel Blob Storage használatával
- 📅 **Hónap szerinti lockolás** - Csak a cím látszik, amíg nem jön el az idő
- 📱 **QR-kód generálás** - Minden hónaphoz külön QR-kód
- 🎨 **Szép, modern UI** - Letisztult, érzelmes design

## Telepítés

```bash
npm install
```

## Environment változók

Hozd létre a `.env.local` fájlt:

```env
# Jelszó védelem
SITE_PASSWORD=lili2026

# Vagy bcrypt hash (production-hoz)
# PASSWORD_HASH=$2a$10$your_hash_here

# Vercel Blob Storage token (csak local development-hoz szükséges)
# Production-ban a Vercel automatikusan kezeli
BLOB_READ_WRITE_TOKEN=your_token_here
```

### Vercel Blob Storage beállítása

**Production környezetben (Vercel-en):**

1. Menj a [Vercel Dashboard](https://vercel.com/dashboard)-ra
2. Válaszd ki a projektet
3. Menj a **Storage** fülre
4. Kattints a **Create Database** vagy **Add Integration** gombra
5. Válaszd ki a **Blob** opciót
6. A Vercel automatikusan beállítja a szükséges környezeti változókat

**Local development-hoz:**

Ha local development-ban szeretnél dolgozni, add hozzá a `BLOB_READ_WRITE_TOKEN`-t az `.env.local` fájlhoz. A token-t a Vercel Blob Store beállításaiban találod.

## Fejlesztés

```bash
npm run dev
```

Nyisd meg [http://localhost:3000](http://localhost:3000) a böngészőben.

## Deploy Vercel-en

1. Pushold a kódot GitHub-ra
2. Kapcsold össze a Vercel-lel
3. Add hozzá az environment változókat a Vercel dashboard-ban
4. Deploy! 🚀

## Használat

- Alapértelmezett jelszó: `lili2026` (változtasd meg az `.env.local` fájlban!)
- Minden hónapnak van saját URL-je: `/month/1`, `/month/2`, stb.
- QR-kódok megtekintése: `/qr-codes`
