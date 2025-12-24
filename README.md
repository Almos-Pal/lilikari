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

# Vercel Blob Storage token
BLOB_READ_WRITE_TOKEN=your_token_here
```

### Vercel Blob Storage token létrehozása

1. Menj a [Vercel Dashboard](https://vercel.com/dashboard)-ra
2. Válaszd ki a projektet
3. Settings → Environment Variables
4. Kattints a "Blob" fülre
5. Hozz létre egy új tokent és add hozzá `BLOB_READ_WRITE_TOKEN` néven

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
