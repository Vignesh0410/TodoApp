# SSH Setup Guide — Multiple GitHub Accounts on One Laptop

## Overview

This guide covers setting up SSH keys to use both a **company** and **personal** GitHub account on the same machine.

## Files Structure

```
~/.ssh/
  ├── id_ed25519        ← company private key
  ├── id_ed25519.pub    ← company public key (added to company GitHub)
  ├── id_personal       ← personal private key
  ├── id_personal.pub   ← personal public key (added to personal GitHub)
  ├── config            ← routing rules (which key for which host)
  ├── known_hosts       ← trusted servers list
  └── known_hosts.old   ← backup
```

---

## Step 1: Generate SSH Keys

### Company key (already existed)

```bash
ssh-keygen -t ed25519 -C "your-company@email.com"
```

Saves to default location: `~/.ssh/id_ed25519`

### Personal key (new, custom name to avoid overwriting company key)

```bash
ssh-keygen -t ed25519 -C "your-personal@email.com" -f ~/.ssh/id_personal
```

| Flag | Meaning |
|------|---------|
| `-t ed25519` | Encryption algorithm type |
| `-C "email"` | Comment/label on the key |
| `-f path` | Where to save the key file |

---

## Step 2: Add Public Keys to GitHub

### View public keys

```bash
cat ~/.ssh/id_ed25519.pub      # company key
cat ~/.ssh/id_personal.pub     # personal key
```

### Add to GitHub

- **Company key** → github.com (company account) → Settings → SSH Keys → New SSH Key → Paste
- **Personal key** → github.com (personal account) → Settings → SSH Keys → New SSH Key → Paste

---

## Step 3: Create SSH Config File

Create/edit `~/.ssh/config`:

```
Host github.com
  HostName github.com
  IdentityFile ~/.ssh/id_ed25519

Host github-personal
  HostName github.com
  IdentityFile ~/.ssh/id_personal
```

### How config routing works

- `git@github.com:...` → matches `Host github.com` → uses company key (`id_ed25519`)
- `git@github-personal:...` → matches `Host github-personal` → uses personal key (`id_personal`)

Both connect to the same `github.com` server but with different SSH keys.

---

## Step 4: Test SSH Connections

```bash
ssh -T git@github.com            # Should say: Hi <company-username>!
ssh -T git@github-personal       # Should say: Hi <personal-username>!
```

| Flag | Meaning |
|------|---------|
| `-T` | Don't open terminal, just test authentication |

---

## Step 5: Configure Git for the Project

### Set personal identity for this project only

```bash
cd /path/to/your/project
git config user.name "your-personal-username"
git config user.email "your-personal@email.com"
```

This only changes the identity for this project. Company repos are unaffected.

---

## Step 6: Push to Personal GitHub

### Initial setup (first time)

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin git@github-personal:<username>/<repo>.git
git push -u origin main
```

### If remote was already set to HTTPS (permission denied error)

```bash
# Change from HTTPS to SSH
git remote set-url origin git@github-personal:<username>/<repo>.git

# Verify
git remote -v

# Push
git push -u origin main
```

### Subsequent pushes

```bash
git add .
git commit -m "your message"
git push
```

---

## Common Issues & Fixes

### 1. Permission denied (wrong account)

```
remote: Permission to <personal>/<repo>.git denied to <company-user>.
```

**Cause:** Using HTTPS URL instead of SSH, or wrong Host in remote URL.

**Fix:**
```bash
git remote set-url origin git@github-personal:<username>/<repo>.git
```

### 2. Bad configuration option (BOM encoding)

```
~/.ssh/config: line 1: Bad configuration option: \357\273\277host
```

**Cause:** Config file saved with BOM (Byte Order Mark) by PowerShell.

**Fix:** Recreate the config file without BOM encoding (use Git Bash or a proper text editor).

### 3. List existing SSH keys

```bash
ls ~/.ssh/
```

### 4. View current SSH config

```bash
cat ~/.ssh/config
```

### 5. Check which remote URL a repo uses

```bash
git remote -v
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Generate key | `ssh-keygen -t ed25519 -C "email" -f path` |
| View public key | `cat ~/.ssh/id_personal.pub` |
| Test connection | `ssh -T git@github-personal` |
| Set SSH remote | `git remote set-url origin git@github-personal:USER/REPO.git` |
| Push first time | `git push -u origin main` |
| Push after | `git push` |
| Check remote | `git remote -v` |
| Set project identity | `git config user.name "name"` |
