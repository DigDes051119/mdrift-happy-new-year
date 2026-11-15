# Production infrastructure

The production runtime targets one small Selectel VDS. GitHub Actions builds an immutable image, publishes it to GHCR, and the server only pulls and runs that image. The VDS never builds application code.

## Runtime layout

Nginx is the only container with published ports. Next.js serves the public website on the private `web` network. There is no database, lead API, mail transport, bot token, delivery worker, outbox, or server-side forwarding.

Every form builds a Telegram draft in the visitor's browser and opens the public chat configured in `siteConfig`. The visitor reviews the prepared message and explicitly sends it from their own Telegram account.

The configured memory ceilings are 512 MB for Next.js and 64 MB for Nginx. JSON container logs are rotated at 5 MB with three files per container. Next.js uses its standalone output and a bounded 384 MB V8 heap. The 2 GB production VDS keeps a persistent 2 GB swap file for operating-system headroom.

## One-time server bootstrap

1. Install Docker Engine and the Compose plugin and place the deployment files in `/opt/mdrift`.
2. Create `/opt/mdrift/.env.production` from `.env.production.example` and make it readable only by the deployment user with mode `0600`.
3. Authenticate the server to GHCR with a dedicated read-only package token.
4. Put an immutable image digest in `APP_IMAGE`, then run `/opt/mdrift/infra/server/bootstrap-tls.sh`.
5. Install and enable the certificate-renewal systemd timer from `infra/systemd`.

## GitHub configuration

The workflow publishes `linux/amd64` images to GHCR on each push to `main`. Set `PRODUCTION_SITE_URL` to the final HTTPS origin and `PRODUCTION_DEPLOY_ENABLED` to `true` in repository variables.

The protected `production` environment requires these secrets:

- `DEPLOY_HOST`;
- `DEPLOY_USER`;
- `DEPLOY_SSH_KEY`;
- `DEPLOY_KNOWN_HOSTS`.

The deployment user's authorized key must use `restrict,command="/opt/mdrift/infra/server/ssh-deploy-command.sh"`. The forced-command wrapper accepts only this repository's immutable GHCR digest. The deploy script pulls the image, validates and activates its Compose/Nginx/operations bundle, recreates services, checks health, and rolls runtime configuration back when possible. It does not run Yarn, Next.js, or Docker builds.

## Operations

Inspect service state and bounded logs:

```bash
cd /opt/mdrift
docker compose --env-file .env.production -f compose.production.yml ps
docker compose --env-file .env.production -f compose.production.yml logs --tail 100 app nginx
```

## Data handling

Form values are not submitted to M Drift School infrastructure and are not persisted on the server. They are encoded into a Telegram deep link in the visitor's browser. Application and Nginx logs do not contain form values.
