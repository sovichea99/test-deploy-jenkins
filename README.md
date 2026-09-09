# Simple Next.js + Spring Boot Demo (for Jenkins CI/CD)

Minimal two-service app: a Spring Boot API (`/api/hello`) and a Next.js page
that fetches and displays it. Built to demo an auto-deploy Jenkins pipeline —
commit a change, and the running site updates.

## Run locally (no Jenkins needed, just to sanity check)

```bash
docker compose up -d --build
```

- Backend: http://localhost:8081/api/hello
- Frontend: http://localhost:3000

## Push to GitHub

```bash
cd simple-demo
git init
git add .
git commit -m "Initial simple Next.js + Spring Boot demo"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Set up the Jenkins pipeline job

1. On your Jenkins server, install the **GitHub plugin** and **Docker Pipeline plugin**
   if you don't have them (Manage Jenkins → Plugins → Available plugins).
2. Make sure the `jenkins` user/container can run Docker:
   ```bash
   sudo usermod -aG docker jenkins
   sudo systemctl restart jenkins
   ```
   (If Jenkins itself runs in Docker, mount `/var/run/docker.sock` into the container instead.)
3. New Item → name it (e.g. `simple-demo`) → **Pipeline**.
4. Under **Pipeline**, choose **Pipeline script from SCM** → SCM: Git →
   paste your repo URL → Script Path: `Jenkinsfile`.
5. Under **Build Triggers**, check **GitHub hook trigger for GITScm polling**.
6. On GitHub: repo → **Settings → Webhooks → Add webhook**
   - Payload URL: `http://YOUR_SERVER_IP:8080/github-webhook/`
   - Content type: `application/json`
   - Event: **Just the push event**
7. Save, then push a commit — Jenkins should trigger the job automatically.

## Prove auto-deploy works

1. Open the site, note the message and `version` value.
2. Edit `backend/src/main/java/com/example/demo/HelloController.java`,
   change `VERSION` to `"v2"` (or edit the message text in `frontend/app/page.js`).
3. Commit and push.
4. Watch the job run in Jenkins (Build History → console output).
5. Refresh the site — the change should appear once the pipeline finishes.

## Notes

- `docker compose down && up -d --build` is intentionally simple (full
  rebuild each time) — fine for a demo, but for a real project you'd want
  tagged images, zero-downtime swaps, and separate build/deploy stages.
- If Jenkins and this app run on the same server, make sure ports 8081,
  3000, and 8080 (Jenkins itself) don't collide with anything else you're
  already running.
- `CrossOrigin(origins = "*")` in `HelloController` is demo-only — lock
  this down to your actual frontend origin before this goes anywhere real.
