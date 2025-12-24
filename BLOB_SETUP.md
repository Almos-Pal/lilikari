# Vercel Blob Storage Beállítás

## Production környezetben

Ha a projekt Vercel-en van deployolva, a Blob Storage automatikusan működik, **NEM kell manuálisan beállítani a `BLOB_READ_WRITE_TOKEN`-t**, mert a Vercel automatikusan kezeli.

### Automatikus működés (ajánlott)

1. Menj a Vercel Dashboard-ra: https://vercel.com/dashboard
2. Válaszd ki a projektet
3. Menj a **Storage** fülre
4. Kattints a **Create Database** vagy **Add Integration** gombra
5. Válaszd ki a **Blob** opciót
6. Kövesd a lépéseket a Blob Store létrehozásához

A Vercel automatikusan beállítja a szükséges környezeti változókat, és a kód működni fog token nélkül.

### Manuális token beállítása (csak ha szükséges)

Ha valamiért mégis manuálisan szeretnéd beállítani:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add hozzá: `BLOB_READ_WRITE_TOKEN` = `vercel_blob_rw_xxxxx...`
3. A token-t a Vercel Blob Store beállításokban találod

### Hiba elhárítás

Ha a feltöltés nem működik production-ban:

1. **Ellenőrizd, hogy létrehoztad-e a Blob Store-t**
   - Vercel Dashboard → Storage → Blob

2. **Ellenőrizd az environment változókat**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Ne legyen `BLOB_READ_WRITE_TOKEN` beállítva (hagyd, hogy a Vercel automatikusan kezelje)

3. **Nézd meg a deployment logokat**
   - Vercel Dashboard → Deployments → Latest → Functions
   - Keress rá az "Upload error" üzenetekre

4. **Ellenőrizd a browser console-t**
   - F12 → Console
   - Nézd meg, hogy milyen hibaüzenet jelenik meg

### Local development

Local development-ban két lehetőség van:

1. **Használj Vercel Blob token-t** (ajánlott)
   - Add hozzá az `.env.local` fájlhoz:
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx...
   ```

2. **Vagy használj Vercel CLI-t**
   ```bash
   vercel dev
   ```
   Ez automatikusan betölti az environment változókat.

