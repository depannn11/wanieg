# CodeShare Deployment Guide

Panduan lengkap untuk deploy CodeShare ke production.

## Pre-Deployment Checklist

- [ ] Database migrations sudah dijalankan
- [ ] Environment variables sudah dikonfigurasi
- [ ] Testing di localhost berjalan dengan baik
- [ ] Code sudah di-commit ke git
- [ ] RLS policies sudah enabled di Supabase

## Vercel Deployment

### Step 1: Push ke GitHub

```bash
git add .
git commit -m "Deploy CodeShare"
git push origin main
```

### Step 2: Connect ke Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your GitHub repository
5. Click "Import"

### Step 3: Configure Environment Variables

Di Vercel Project Settings → Environment Variables, tambahkan:

```
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### Step 4: Deploy

Klik "Deploy" dan tunggu hingga selesai.

## Supabase Setup for Production

### 1. Create Production Project

```bash
# Via Supabase CLI
supabase projects create --name "codeshare-prod"
```

### 2. Run Migrations

```bash
# Apply migrations
supabase db push --linked
```

Atau manual via Supabase dashboard:
1. Go to SQL Editor
2. Create new query
3. Paste content dari `scripts/001_create_tables.sql`
4. Run
5. Repeat untuk `scripts/002_profile_trigger.sql`

### 3. Enable RLS

Di Supabase dashboard → SQL Editor, jalankan:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;
```

### 4. Verify Policies

Check di Table Editor → policies untuk masing-masing table.

## Post-Deployment

### Monitor Performance

1. **Vercel Analytics**
   - Check deployments page
   - Monitor Core Web Vitals
   - Check error logs

2. **Supabase Monitoring**
   - Check database queries
   - Monitor user signups
   - Track storage usage

### Setup Custom Domain

1. Vercel → Project Settings → Domains
2. Add custom domain
3. Update DNS records (Vercel akan provide)

### Setup Email Verification

Di Supabase dashboard:
1. Authentication → Email Templates
2. Customize email templates untuk project Anda
3. Set email confirmation required

### Backup Strategy

```bash
# Backup database weekly
supabase db pull
```

Store di GitHub atau cloud storage.

## Performance Optimization

### 1. Enable Caching

```tsx
// In pages that don't change frequently
export const revalidate = 3600 // 1 hour
```

### 2. Image Optimization

Next.js automatically optimizes images. Gunakan `next/image` untuk images.

### 3. Database Query Optimization

```tsx
// Use indexes untuk frequently queried columns
CREATE INDEX snippets_user_id_idx ON snippets(user_id);
CREATE INDEX snippets_is_public_idx ON snippets(is_public);
CREATE INDEX snippets_language_idx ON snippets(language);
```

### 4. Minimize Bundle Size

```bash
# Check bundle size
npm run build
```

## Security Checklist

- [ ] HTTPS enabled (automatic di Vercel)
- [ ] RLS policies enabled
- [ ] Password hashing via Supabase Auth
- [ ] CORS configured properly
- [ ] Environment variables hidden
- [ ] Rate limiting implemented (optional)
- [ ] Input validation on server
- [ ] SQL injection prevention (use parameterized queries)

## Troubleshooting

### Build Fails

```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Database Connection Issues

1. Check environment variables di Vercel
2. Verify Supabase project URL dan key
3. Check Supabase project status (storage limits?)
4. Review Supabase logs untuk errors

### Authentication Issues

1. Verify email domain di Supabase Auth settings
2. Check auth redirects configured correctly
3. Review browser console untuk errors
4. Check Supabase Auth logs

### Performance Issues

1. Check database query performance
   ```sql
   -- View slow queries
   SELECT * FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;
   ```

2. Optimize RLS policies - pastikan specific conditions
3. Add database indexes untuk commonly filtered columns
4. Use pagination untuk large datasets

## Scaling Strategy

### When to Scale

- Database approaching storage limits
- API rate limits being hit
- Build times increasing significantly

### How to Scale

1. **Database**
   - Supabase → Upgrade plan
   - Archive old data ke cold storage
   - Add more indexes

2. **Compute**
   - Vercel → Upgrade plan
   - Enable Edge Functions untuk distributed compute
   - Consider serverless functions untuk heavy operations

3. **Storage**
   - Move large files ke Vercel Blob
   - Compress images
   - Archive old snippets

## Maintenance

### Weekly
- Check Vercel deployment logs
- Monitor error rates
- Check database size

### Monthly
- Review access logs
- Update dependencies
- Run performance audit

### Quarterly
- Full backup
- Security audit
- Review and update RLS policies

## Disaster Recovery

### Backup Procedure

```bash
# Full database backup
supabase db pull > backup_$(date +%Y%m%d_%H%M%S).sql

# Upload to S3
aws s3 cp backup_*.sql s3://your-bucket/
```

### Recovery Procedure

```bash
# Restore from backup
supabase db push < backup_YYYYMMDD_HHMMSS.sql
```

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

## Common Environment Variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxx...

# Optional
NEXT_PUBLIC_APP_NAME=CodeShare
NEXT_PUBLIC_APP_URL=https://codeshare.app
```

---

**Last Updated**: January 2025

**Questions?** Open an issue on GitHub atau contact support.
