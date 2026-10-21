# Stack atual — SOS Compressores

Levantamento feito em 2026-10-06, a partir de `package.json`, configs na raiz, `node_modules` instalado e leitura de `src/`. O projeto foi criado a partir do template AdminCN Free (shadcn/studio).

## 1. Framework

| Item | Valor |
|---|---|
| Framework | **Next.js 16.2.6** |
| Roteador | **App Router** (`src/app/`). Não existe diretório `pages/` do Pages Router. |
| React | 19.2.4 (`react` + `react-dom`) |
| TypeScript | 5.9.3, `strict: true`, alias `@/*` → `./src/*` |
| Config | [next.config.ts](next.config.ts): `basePath` via env, `reactStrictMode`, `pageExtensions`, e 2 redirects permanentes (`/` → `/dashboard/orders`, `/apps/users` → `/apps/users/list`) |
| Lint / formatação | ESLint 9 (flat config com `eslint-config-next` core-web-vitals + typescript, `@stylistic`, `eslint-config-prettier`), Prettier 3 com `prettier-plugin-tailwindcss` |

## 2. Gerenciador de pacotes e Node

- **O template usa pnpm**. Os sinais disso são `pnpm-lock.yaml` (lockfile v9, versionado), `pnpm-workspace.yaml` e `.npmrc` com `auto-install-peers` e `shamefully-hoist`.
- **Localmente também foi usado npm**: existe um `package-lock.json` não versionado. Os dois lockfiles convivem, então é bom escolher um só e apagar o outro. O npm avisa `Unknown project config` por causa do `.npmrc`, que é específico do pnpm.
- **Versão do Node**: o `package.json` não tem `engines` nem `packageManager`, e não há `.nvmrc` nem `.node-version`. O mínimo efetivo vem do Next.js 16: **Node >= 20.9.0**. A máquina atual roda Node 25.4.0 e npm 11.7.0.

## 3. UI

| Lib | Versão | Observações |
|---|---|---|
| **shadcn/ui** (CLI `shadcn`) | 4.13.0 | [components.json](components.json): style `base-vega`, `rsc: true`, `baseColor: neutral`, CSS variables, ícones `lucide`. O pacote `shadcn` também é importado em CSS (`@import 'shadcn/tailwind.css'`). |
| **Base UI** (`@base-ui/react`) | 1.6.0 | **É o primitivo headless dos componentes shadcn neste projeto (estilo `base-*`), não o Radix.** 23 dos 42 arquivos em `components/ui` importam `@base-ui/react`. |
| Radix UI | — | **Não é dependência direta.** Só aparece como dependência transitiva no lockfile (via `cmdk`). |
| **Tailwind CSS** | 4.3.3 (`tailwindcss@4`) | Tailwind v4 **sem `tailwind.config.*`**. A configuração fica em CSS, em [src/app/globals.css](src/app/globals.css) (`@theme inline`, `@custom-variant dark`), e é processada por `@tailwindcss/postcss` ([postcss.config.mjs](postcss.config.mjs)). Tokens de cor em OKLCH. |
| `tw-animate-css` | 1.4.0 | Animações utilitárias |
| `class-variance-authority`, `clsx`, `tailwind-merge` | 0.7.1 / 2.1.1 / 3.6.0 | Variantes e `cn()` em [src/lib/utils.ts](src/lib/utils.ts) |
| **lucide-react** | 1.24.0 | Ícones |
| `next-themes` | 0.4.6 | Tema claro/escuro por classe, em [ThemeProvider.tsx](src/components/ThemeProvider.tsx) |
| `sonner` | 2.0.7 | Toasts |
| `recharts` | 3.8.0 | Gráficos (via `components/ui/chart.tsx`) |
| `@tanstack/react-table` | 8.21.3 | Data tables |
| `cmdk` | 1.1.1 | Command palette (`components/ui/command.tsx`) |
| `input-otp` | 1.4.2 | Campo OTP (two-steps) |
| `react-resizable-panels` | 4.12.1 | `components/ui/resizable.tsx` (app de Mail) |
| `date-fns` | 4.4.0 | Datas (calendário, mail) |

### Componentes em `src/components/ui` (42)

`alert`, `avatar`, `background-ripple`, `badge`, `breadcrumb`, `button`, `button-group`, `card`, `chart`, `checkbox`, `circular-progress`, `collapsible`, `combobox`, `command`, `dialog`, `dropdown-menu`, `field`, `input`, `input-group`, `input-otp`, `label`, `pagination`, `popover`, `progress`, `radio-group`, `rating`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `timeline`, `toggle`, `toggle-group`, `tooltip`

`background-ripple`, `circular-progress`, `rating` e `timeline` não fazem parte do registry oficial do shadcn/ui. Vêm do shadcn/studio. Os componentes não guardam versão individual: eles seguem o estilo `base-vega` do CLI 4.13.0.

Fora de `ui/`: `components/layout/` (`Sidebar`, `Header`, `Footer`, `BlankLayout`, `ModeToggle`, `ScrollToTop`, `Download`) e `components/shared/` (`Logo`, `LanguageDropdown`, `ProfileDropdown`).

## 4. Estado e dados

| Tecnologia | Em uso? | Onde |
|---|---|---|
| React Query / SWR | **Não** | — |
| Zustand / Redux / Jotai | **Não** | — |
| Context API | Só dentro de componentes UI | `createContext` em `ui/sidebar.tsx` (`SidebarProvider`), `ui/chart.tsx` e `ui/toggle-group.tsx`. Nenhum contexto de domínio. |
| `useState` em hooks customizados | **Sim**, é o principal | [use-mail-app.ts](src/hooks/use-mail-app.ts) e [use-user-app.ts](src/hooks/use-user-app.ts) carregam o `fake-db` em `useState` e fazem filtros, busca e CRUD só em memória |
| Estado na URL | **Sim**, com `nuqs` 2.9.0 | `NuqsAdapter` (adapter `nuqs/adapters/next/app`) em [layout.tsx](src/app/layout.tsx); `useQueryState` nas abas de user-settings e user-profile |
| Formulários | **Sim** | `react-hook-form` 7.81.0 + `zod` 3.25.76 + `@hookform/resolvers` 5.4.0 |
| HTTP | `fetch` nativo, só em 2 lugares | [src/lib/nav-apps.ts](src/lib/nav-apps.ts) (cliente → `/api/nav-apps`) e [api/nav-apps/route.ts](src/app/api/nav-apps/route.ts) (servidor → CDN do shadcn/studio). Não usa axios. |
| Fonte de dados | Mock estático | `src/fake-db/` (calendar, mail, users, user-profile), importado direto pelos componentes. Não há backend, banco ou autenticação real. |

## 5. Rotas (App Router)

Há dois route groups, que não aparecem na URL: `(pages)` usa o layout com Sidebar, Header e Footer; `(blank)` usa o layout sem shell, para auth e erro.

| URL | Arquivo | Layout |
|---|---|---|
| `/` | — (redirect → `/dashboard/orders`) | — |
| `/dashboard/orders` | `(pages)/dashboard/orders/page.tsx` | pages |
| `/apps/calendar` | `(pages)/apps/calendar/page.tsx` | pages |
| `/apps/mail` | `(pages)/apps/mail/page.tsx` | pages |
| `/apps/users` | — (redirect → `/apps/users/list`) | — |
| `/apps/users/list` | `(pages)/apps/users/list/page.tsx` | pages |
| `/apps/users/view` | `(pages)/apps/users/view/page.tsx` | pages |
| `/datatable` | `(pages)/datatable/page.tsx` | pages |
| `/forms/form-layouts/horizontal` | `(pages)/forms/form-layouts/horizontal/page.tsx` | pages |
| `/forms/form-layouts/vertical` | `(pages)/forms/form-layouts/vertical/page.tsx` | pages |
| `/forms/form-validation` | `(pages)/forms/form-validation/page.tsx` | pages |
| `/pages/user-profile` | `(pages)/pages/user-profile/page.tsx` | pages |
| `/pages/user-settings` | `(pages)/pages/user-settings/page.tsx` | pages |
| `/pages/auth/login` | `(blank)/pages/auth/login/page.tsx` | blank |
| `/pages/auth/register` | `(blank)/pages/auth/register/page.tsx` | blank |
| `/pages/auth/forgot-password` | `(blank)/pages/auth/forgot-password/page.tsx` | blank |
| `/pages/auth/reset-password` | `(blank)/pages/auth/reset-password/page.tsx` | blank |
| `/pages/auth/two-steps` | `(blank)/pages/auth/two-steps/page.tsx` | blank |
| `/pages/auth/verify-email` | `(blank)/pages/auth/verify-email/page.tsx` | blank |
| `/pages/misc/error-page` | `(blank)/pages/misc/error-page/page.tsx` | blank |
| `GET /api/nav-apps` | `api/nav-apps/route.ts` | Route Handler |
| 404 | `not-found.tsx` | raiz |

Não há rotas dinâmicas (`[param]`). As páginas `/apps/users/view`, `user-profile` e `user-settings` usam query string (`?view=`, `?setting=`) em vez de segmentos.

Muitos itens do menu ([navConfig.tsx](src/configs/navConfig.tsx)) apontam para URLs externas da demo Pro do template, não para rotas locais.

## 6. Recursos do Next.js afetados numa migração para Vite

| Recurso | Uso atual | Impacto na migração |
|---|---|---|
| **Server Components** | Os `page.tsx` e `layout.tsx` (raiz e `(blank)`) não têm `'use client'`, mas só renderizam componentes client. Nenhum faz `await`, acessa dados no servidor ou usa `next/headers` ou `cookies()`. Há 87 arquivos com `'use client'`, e o layout `(pages)` e a página de calendar são client. | **Baixo.** Viram componentes React comuns. |
| **Server Actions** | [src/app/server/actions.ts](src/app/server/actions.ts) tem `'use server'` com `getCalendarData`, `getMailData` e `getProfileData`, mas **nenhuma delas é importada em lugar nenhum** (código morto do template). | **Nenhum.** Dá para apagar. |
| **`next/image`** | **Não usado.** As imagens usam `<img>` direto (10 ocorrências), com a regra `@next/next/no-img-element` desligada. | **Nenhum.** |
| **Middleware / `proxy.ts`** | **Não existe.** | **Nenhum.** |
| **API Routes (Route Handlers)** | 1: `GET /api/nav-apps`, um proxy que busca um JSON no CDN do shadcn/studio para o menu "apps" da Sidebar. É a única rota dinâmica (`ƒ`) no build. | **Baixo.** No Vite não há servidor, então dá para chamar o CDN direto do cliente (se o CORS permitir) ou remover o recurso, que é do template. |
| **`next/font`** | `Geist` e `Geist_Mono` de `next/font/google` em [layout.tsx](src/app/layout.tsx), expostos como `--font-geist-sans` e `--font-geist-mono` e consumidos no `@theme` do `globals.css`. | **Baixo.** Trocar por `@fontsource/geist-sans` e `@fontsource/geist-mono`, ou pelo link do Google Fonts, mantendo as mesmas CSS variables. |
| **Metadata API** | `export const metadata` estático só no layout raiz (title, description, `metadataBase`, openGraph, twitter). Não há `generateMetadata`. | **Baixo.** Vai para o `<head>` do `index.html`, ou para `react-helmet-async` se cada página precisar de título próprio. |
| **SSG / SSR / ISR** | Todas as páginas saem como **estáticas** (`○`) no build. Não há `revalidate`, `generateStaticParams` nem `dynamic`. | **Nenhum.** Uma SPA reproduz isso. |
| **Roteamento por arquivos** | App Router com route groups e 2 layouts aninhados, `not-found.tsx` e redirects no `next.config.ts`. | **Médio.** É a maior parte do trabalho: recriar as rotas, os 2 layouts, o 404 e os redirects em React Router ou TanStack Router. |
| **`next/link`** | 17 arquivos. | **Médio, mas mecânico.** Trocar pelo `Link` do router escolhido (`href` → `to`). Vários usos passam por `render={<Link …/>}` do Base UI. |
| **`next/navigation`** | `usePathname` no Header e na Sidebar; `useSearchParams` na Sidebar. | **Baixo.** Equivalentes do router (`useLocation`, `useSearchParams`). |
| **`nuqs`** | Adapter `nuqs/adapters/next/app`. | **Baixo.** O nuqs tem adapters para React Router e TanStack Router. |
| **`basePath`** | `next.config.ts` lê `BASEPATH`. | **Baixo.** Vira `base` no `vite.config` e o `basename` do router. |
| **ESLint** | `eslint-config-next`. | **Baixo.** Trocar por `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh`. |
| **shadcn `rsc: true`** | Em `components.json`. | **Trivial.** Mudar para `false`. |

## 7. Variáveis de ambiente

Não há arquivo `.env*` no repositório.

| Chave | Onde é consumida | Para quê |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | [src/app/layout.tsx](src/app/layout.tsx) (`metadataBase`, com fallback `http://localhost:3000`, e `openGraph.url`) | URL pública usada na metadata e em OG |
| `BASEPATH` | [next.config.ts](next.config.ts) (`basePath`, com fallback `''`) | Servir a app num subcaminho |

No Vite, variáveis expostas ao cliente precisam do prefixo `VITE_` e são lidas com `import.meta.env`.

## 8. Scripts do `package.json`

| Script | Comando |
|---|---|
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `eslint` |
| `lint:fix` | `eslint --fix` |
| `format` | `prettier --write "src/**/*.{js,jsx,ts,tsx}"` |
| `check-types` | `tsc --noEmit` |
| `clean` | `rm -rf .next dist` |
| `clean:node_modules` | `rm -rf .next dist node_modules` |
