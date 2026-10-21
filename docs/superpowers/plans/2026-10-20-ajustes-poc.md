# Ajustes POC SOS Compressores Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dashboard home and the 13 placeholder ("em construção") screens with real-looking content built on patterns copied from `/dashboard/orders` and `/apps/users/list`, and reduce the app to pt-br only.

**Architecture:** Two new shared pieces carry all the reuse: `SimpleListView` (generic card + search + action button + paginated table, modeled on `UserListApp`) and `createListActionsColumn` / `StatusBadge` (small reusable column/cell helpers, modeled on `user-table-columns.tsx` and `datatable-transaction.tsx`). The dashboard home becomes a copy of `OrdersDashboard`'s grid wired to SOS-Compressores data, reusing the existing dashboard widget components unchanged in shape. Each of the 13 placeholder screens becomes a thin file: a local row type, a static mock array, a `ColumnDef[]`, and one `<SimpleListView />` call.

**Tech Stack:** React 19, TanStack Router/Table, Tailwind v4, shadcn-style UI primitives already in `src/components/ui`, `date-fns` with `ptBR` locale, `lucide-react` icons. No i18n library exists in this project — "i18n" here means hardcoded pt-br strings and a cosmetic language switcher, not a key-based translation system.

**Spec:** User request (pasted in conversation, 2026-10-20): 3 changes — (1) dashboard built on `/dashboard/orders`'s layout, (2) a reusable simple-list pattern built on `/apps/users/list`'s layout applied to every screen that has no real content, with mock data, (3) pt-br-only i18n with no leftover English text.

## Global Constraints

- No emojis in logs/console or anywhere in code.
- Follow existing code style: no comments unless explaining a non-obvious WHY; `'use client'` directive on files that need client-side state, matching existing files; import-group comments (`// Third-party Imports`, `// Component Imports`, etc.) matching the convention visible in every file read above.
- Scope of the i18n cleanup (task 3 of the spec) is the real SOS Compressores product: the screens reachable from the "real" nav groups in `src/configs/navConfig.tsx` (Dashboard, Operacional, Estoque, Financeiro, Cadastros, Configurações) plus the shared layout chrome (`Header`, `Sidebar`, `ModeToggle`, `ProfileDropdown`, `NotFound`, `LanguageDropdown`) and the dashboard widget components reused by the new home dashboard. The nav config explicitly marks everything under the `Template · *` groups (mail, calendar, apps/users, auth pages, user-profile/settings, forms, datatable demos, `/dashboard/orders` itself) as "kept temporarily... reviewed and removed once no longer needed" — those are reference material only and are out of scope for translation; do not touch them beyond reading them as a pattern reference.
- Currency formatting for new/changed SOS Compressores content uses `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`, not literal `$` strings.
- Dates in mock data use `date-fns`'s `format` with the `ptBR` locale (`dd MMM yyyy`), matching `user-table-columns.tsx`.
- Every list column plus its header text is in Portuguese; every status badge value is a Portuguese word.
- There is no automated test suite in this repo (no test runner in `package.json`). Verification steps use `pnpm check-types`, `pnpm lint`, and `pnpm build` instead of a test command — treat a clean run of all three as the task's "tests pass" gate.
- Do not delete or rewrite any file under the `Template · *` nav groups.

## Review Focus

- Empty search result on a `SimpleListView` screen: typing a filter that matches nothing must show the `emptyMessage` row, not a crash or an empty `<tbody>` with broken colspan — covered in Task 1's manual check.
- Pagination at the boundary: clicking "Próxima" on the last page or "Anterior" on the first page must stay a no-op (buttons already disabled by `table.getCanNextPage()/getCanPreviousPage()`), and switching the search filter must reset back to page 1 so a filtered-out page index doesn't render a blank table — covered in Task 1.
- `ModulePlaceholder` becoming fully unused after Tasks 2–6: must be grep-confirmed dead and removed in Task 7 rather than left as orphaned code.
- The dashboard widgets reused on the real home screen (`statistics-card-01`, `widget-product-insights`, `chart-sales-metrics`, `widget-total-earning`, `datatable-transaction`) carry hardcoded English copy today; Task 2 must sweep all of it, not just the new `home.tsx` data, or the "no English visible in UI" requirement silently fails on the one screen that matters most.
- `LanguageDropdown`'s `useState('english')` default must become `'portuguese'` in the same change that trims the other options, otherwise the single remaining radio item renders unchecked.

---

### Task 1: Shared list building blocks

**Files:**
- Create: `src/components/shared/StatusBadge.tsx`
- Create: `src/components/shared/ListRowActions.tsx`
- Create: `src/components/shared/SimpleListView.tsx`
- Modify: `src/lib/utils.ts` (add `formatCurrencyBRL`)

**Interfaces:**
- Produces: `StatusBadge({ children }: { children: ReactNode })` — a `<Badge>` styled exactly like the status cell in `src/views/datatables/datatable-transaction.tsx` (`bg-primary/10 text-primary h-auto rounded-sm px-1.5 capitalize`).
- Produces: `createListActionsColumn<TData>(): ColumnDef<TData>` from `ListRowActions.tsx` — an `id: 'actions'` column whose header is `'Ações'` and whose cell renders a dropdown with `Editar` / `Duplicar` / `Excluir` (destructive variant), modeled on `RowActions` in `datatable-transaction.tsx`.
- Produces: `SimpleListView<TData>` component from `SimpleListView.tsx` with props `{ title: string; description?: string; searchPlaceholder: string; actionLabel: string; columns: ColumnDef<TData, any>[]; data: TData[]; emptyMessage?: string }`. Renders: a page heading (`title` as `<h1 className='text-xl font-semibold'>`, optional `description` below in `text-muted-foreground text-sm`), then a `Card` containing — in this order — a toolbar row (search input left via `InputGroup`/`InputGroupAddon`/`InputGroupInput` with a `sr-only` `Label`, a primary `Button` with `PlusIcon` and `actionLabel` on the right), the `Table` built with `useReactTable` (`getCoreRowModel`, `getFilteredRowModel` via `globalFilter` bound to the search state, `getPaginationRowModel` with a fixed `pageSize = 10`), and a footer row matching `UserPagination`'s layout (`Exibindo X a Y de Z itens` + `Pagination` built from `usePagination()`). Changing the search value resets `pageIndex` to `0`. Empty results render one `TableRow` spanning `columns.length` with `emptyMessage` (default `'Nenhum registro encontrado.'`).
- Produces: `formatCurrencyBRL(value: number): string` from `src/lib/utils.ts`, using `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
- Consumes (all four): `Badge` (`@/components/ui/badge`), `Button` (`@/components/ui/button`), `Card` (`@/components/ui/card`), `DropdownMenu*` (`@/components/ui/dropdown-menu`), `InputGroup*` (`@/components/ui/input-group`), `Label` (`@/components/ui/label`), `Pagination*` (`@/components/ui/pagination`), `Table*` (`@/components/ui/table`), `usePagination` (`@/hooks/use-pagination`), `cn` (`@/lib/utils`) — all already used the same way in `src/views/apps/users/list/*` and `src/views/datatables/datatable-transaction.tsx`.

- [ ] **Step 1: Create `src/components/shared/StatusBadge.tsx`**

```tsx
import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'

export function StatusBadge({ children }: { children: ReactNode }) {
  return <Badge className='bg-primary/10 text-primary h-auto rounded-sm px-1.5 capitalize'>{children}</Badge>
}
```

- [ ] **Step 2: Create `src/components/shared/ListRowActions.tsx`**

Mirror the `RowActions`/`DropdownMenu` block at the bottom of `src/views/datatables/datatable-transaction.tsx:254-275`, but export a `createListActionsColumn<TData>(): ColumnDef<TData>` factory (`id: 'actions'`, `header: () => 'Ações'`, `size: 60`, `enableHiding: false`, `cell: () => <ListRowActions />`) instead of exporting the column array directly, so every domain file can do `columns: [...dataColumns, createListActionsColumn<Cliente>()]`.

- [ ] **Step 3: Add `formatCurrencyBRL` to `src/lib/utils.ts`**

Add next to the existing `cn` export:

```ts
export function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
```

- [ ] **Step 4: Create `src/components/shared/SimpleListView.tsx`**

Build it from `src/views/apps/users/list/index.tsx`, `user-table.tsx`, `user-table-toolbar.tsx` and `user-pagination.tsx` combined into one generic file, per the Interfaces block above. Use local `useState` for `search` and `pageIndex` (no URL/query-string state — the reference `useUserApp` hook is app-specific, this component must stay data-agnostic). Reset `pageIndex` to `0` in the search `onChange` handler.

- [ ] **Step 5: Verify types and lint**

Run: `pnpm check-types && pnpm lint`
Expected: no errors (the component isn't used anywhere yet, so this only checks it compiles standalone).

- [ ] **Step 6: Commit**

```bash
git add src/components/shared/StatusBadge.tsx src/components/shared/ListRowActions.tsx src/components/shared/SimpleListView.tsx src/lib/utils.ts
git commit -m "feat: add reusable simple list view building blocks"
```

---

### Task 2: Real dashboard home + pt-br dashboard widgets

**Files:**
- Modify: `src/views/dashboards/home.tsx` (full rewrite)
- Modify: `src/views/dashboards/statistics/statistics-card-01.tsx`
- Modify: `src/views/dashboards/widgets/widget-product-insights.tsx`
- Modify: `src/views/dashboards/charts/chart-sales-metrics.tsx`
- Modify: `src/views/dashboards/widgets/widget-total-earning.tsx`
- Modify: `src/views/datatables/datatable-transaction.tsx`

**Interfaces:**
- Consumes: `ProductInsightsCard`, `SalesMetricsCard`, `StatisticsCard`, `TotalEarningCard`, `TransactionDatatable`/`Item` — same import paths and prop shapes as used today in `src/views/dashboards/orders.tsx:1-9`. No prop signatures change in this task, only the literal strings/values inside each component and inside the new `home.tsx`.
- Produces: `DashboardHome` (default export of `home.tsx`) — same `grid grid-cols-2 gap-6 lg:grid-cols-3` structure as `OrdersDashboard`.

- [ ] **Step 1: Translate `statistics-card-01.tsx`**

Replace the hardcoded `than last week` (line 29) with `que na semana passada`.

- [ ] **Step 2: Translate `widget-product-insights.tsx`**

Replace: `'Product insight'` → `'Insights do produto'`; `'Published on 12 MAY 2025 - 6:10 PM'` → `'Publicado em 12 mai. 2025 - 18:10'`; `'Product reached'` → `'Alcance do produto'`; `'Order placed'` → `'Pedidos realizados'`. Leave the chart data/keys (`month`, `reached`, `orders`) and config structure untouched — only display strings change.

- [ ] **Step 3: Translate and re-denominate `chart-sales-metrics.tsx`**

Replace display strings: `'Sales trend'` → `'Tendência de vendas'`, `'Discount offers'` → `'Ofertas e descontos'`, `'Net profit'` → `'Lucro líquido'`, `'Total orders'` → `'Total de pedidos'`, `'Sales metrics'` → `'Métricas de vendas'`, `"Sandy' Company"` → `'SOS Compressores'`, `'sandy@company.com'` → `'contato@soscompressores.com.br'`, `'Revenue goal'` → `'Meta de faturamento'`, `'Total Profit'` → `'Lucro total'`, `'Plan completed'` → `'Meta atingida'`, `'Sales plan'` → `'Plano de vendas'`, `'Percentage profit from total sales'` → `'Percentual de lucro sobre o total de vendas'`, `'Cohort analysis indicators'` → `'Indicadores de análise de coorte'`, the cohort description paragraph → `'Analisa o comportamento de um grupo de clientes que iniciaram contrato no mesmo período, ao longo de um intervalo de tempo.'`, `'Open Statistics'` → `'Abrir Estatísticas'`, `'Percentage Change'` → `'Variação Percentual'`. Replace the `MetricsData` dollar-literal values (`'$11,548'`, `'$1,326'`, `'$17,356'`, `'248'`) with `formatCurrencyBRL(...)` calls (import from `@/lib/utils`) for the three currency rows, keep `'248'` as-is (it's a count, already language-neutral). Replace `logo-square.webp` alt text / surrounding copy only if it contains English (it doesn't — `alt='logo'` stays).

- [ ] **Step 4: Translate and re-denominate `widget-total-earning.tsx`**

Replace `listItems = ['Share', 'Update', 'Refresh']` with `['Compartilhar', 'Atualizar', 'Atualizar dados']` → actually use `['Compartilhar', 'Atualizar', 'Sincronizar']` (three distinct, non-redundant pt-br labels). Replace the hardcoded `${earning}` template literal with `{formatCurrencyBRL(earning)}` (import `formatCurrencyBRL` from `@/lib/utils`); the `earning` prop stays a plain `number`, formatting moves into the component.

- [ ] **Step 5: Translate `datatable-transaction.tsx`**

Replace column headers: `'Customer'` → `'Cliente'`, `'Amount'` → `'Valor'`, `'Status'` stays (already pt-br/neutral), `'Paid by'` → `'Pago com'`, `'Actions'` → `'Ações'`. Replace the `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` cell formatter with `formatCurrencyBRL` from `@/lib/utils`. Replace `'No results.'` → `'Nenhum resultado encontrado.'`. Replace pagination footer text `'Showing'` / `'to'` / `'of'` / `'entries'` with the `Exibindo X a Y de Z itens` phrasing already used in `user-pagination.tsx` (keep the same JSX structure, just swap the words). Replace `'Previous'` → `'Anterior'`, `'Next'` → `'Próxima'` (keep `aria-label`s, translate those too: `'Go to previous page'` → `'Ir para a página anterior'`, `'Go to next page'` → `'Ir para a próxima página'`). Replace `RowActions`' `'Edit'` / `'Duplicate'` / `'Delete'` → `'Editar'` / `'Duplicar'` / `'Excluir'`.

- [ ] **Step 6: Rewrite `src/views/dashboards/home.tsx`**

Copy the structure of `src/views/dashboards/orders.tsx` (statistics cards grid, `ProductInsightsCard` + `TotalEarningCard` column, `SalesMetricsCard`, `TransactionDatatable` in a full-width `Card`). Adapt the mock data to SOS Compressores:

```ts
const StatisticsCardData = [
  { icon: <WrenchIcon className='size-4' />, value: '36', title: 'Ordens de Serviço Concluídas', changePercentage: '+12.4%' },
  { icon: <TriangleAlertIcon className='size-4' />, value: '5', title: 'Equipamentos com Avaria', changePercentage: '-6.1%' },
  { icon: <CalendarX2Icon className='size-4' />, value: '9', title: 'Entregas Atrasadas', changePercentage: '+2.8%' }
]
```

(import `WrenchIcon`, `TriangleAlertIcon`, `CalendarX2Icon` from `lucide-react`, matching the icon set already used for the "Ordens de Serviço" nav item). For `TotalEarningCard`, pass `title='Faturamento Total'`, `earning={24650}`, `trend='up'`, `percentage={10}`, `comparisonText='Comparado ao ano anterior (R$ 84.325,00)'`, and an `earningData` array describing 2 real-looking compressor-business revenue lines (e.g. `{ img: '/images/widgets/zipcar.webp', platform: 'Manutenção Industrial', technologies: 'Contratos mensais', earnings: formatCurrencyBRL(23569.26), progressPercentage: 75 }` and one more in the same shape — reuse the existing placeholder images, only text/values change). For `TransactionDatatable`, reuse the same `transactionData` shape (`id/avatar/avatarFallback/name/amount/status/email/paidBy`) but with SOS-Compressores-flavored people (clients) — reuse the people from Task 3's `clientes` mock list is not required; any plausible Brazilian names with `.webp` avatar paths already in `/public/images/avatars/` work, with `status` kept to the existing union (`'pending' | 'processing' | 'paid' | 'failed'`, these are data values rendered through `StatusBadge`-style capitalize, not displayed as English words to the user since the only place the raw value prints is the badge text — translate the four status values' *display* by passing already-pt-br strings: `'pago' | 'pendente' | 'processando' | 'falhou'` and update the `Item['status']` union type and `Badge` cell accordingly in the same step).

- [ ] **Step 7: Verify in the browser**

Run: `pnpm dev` and open `/`. Confirm: the dashboard renders the same grid/card layout as `/dashboard/orders`, all visible text is Portuguese, currency values show `R$`, and no console errors.

- [ ] **Step 8: Verify types, lint, build**

Run: `pnpm check-types && pnpm lint && pnpm build`
Expected: all three succeed with no errors.

- [ ] **Step 9: Commit**

```bash
git add src/views/dashboards/home.tsx src/views/dashboards/statistics/statistics-card-01.tsx src/views/dashboards/widgets/widget-product-insights.tsx src/views/dashboards/charts/chart-sales-metrics.tsx src/views/dashboards/widgets/widget-total-earning.tsx src/views/datatables/datatable-transaction.tsx
git commit -m "feat: build real SOS Compressores dashboard from the orders dashboard pattern"
```

---

### Task 3: Simple list screens — Cadastros (Clientes, Fornecedores, Funcionários)

**Files:**
- Modify: `src/views/clientes/index.tsx`
- Modify: `src/views/fornecedores/index.tsx`
- Modify: `src/views/funcionarios/index.tsx`

**Interfaces:**
- Consumes: `SimpleListView`, `createListActionsColumn`, `StatusBadge` from Task 1.

- [ ] **Step 1: Rewrite `src/views/clientes/index.tsx`**

```ts
type Cliente = {
  id: string
  nome: string
  documento: string
  cidade: string
  telefone: string
  status: 'Ativo' | 'Inativo'
}

const clientesData: Cliente[] = [
  { id: '1', nome: 'João Pereira', documento: '123.456.789-00', cidade: 'São Paulo - SP', telefone: '(11) 98765-4321', status: 'Ativo' },
  { id: '2', nome: 'Indústria Metalcorte Ltda', documento: '98.765.432/0001-21', cidade: 'Campinas - SP', telefone: '(19) 3251-7788', status: 'Ativo' },
  { id: '3', nome: 'Transportadora Rota Sul', documento: '11.222.333/0001-44', cidade: 'Curitiba - PR', telefone: '(41) 99887-1122', status: 'Ativo' },
  { id: '4', nome: 'Frigorífico Vale Verde', documento: '22.333.444/0001-55', cidade: 'Uberlândia - MG', telefone: '(34) 3215-6677', status: 'Inativo' },
  { id: '5', nome: 'Posto Estrela Azul', documento: '33.444.555/0001-66', cidade: 'Ribeirão Preto - SP', telefone: '(16) 3622-4455', status: 'Ativo' },
  { id: '6', nome: 'Construtora Horizonte', documento: '44.555.666/0001-77', cidade: 'Belo Horizonte - MG', telefone: '(31) 3344-5566', status: 'Inativo' }
]

const columns: ColumnDef<Cliente>[] = [
  { accessorKey: 'nome', header: 'Cliente', cell: ({ row }) => (
      <div className='flex flex-col text-sm'>
        <span className='font-medium'>{row.original.nome}</span>
        <span className='text-muted-foreground'>{row.original.documento}</span>
      </div>
    ) },
  { accessorKey: 'cidade', header: 'Cidade' },
  { accessorKey: 'telefone', header: 'Telefone' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge> },
  createListActionsColumn<Cliente>()
]

const Clientes = () => (
  <SimpleListView
    title='Clientes'
    description='Cadastro e consulta dos clientes da SOS Compressores.'
    searchPlaceholder='Buscar cliente'
    actionLabel='Novo Cliente'
    columns={columns}
    data={clientesData}
  />
)

export default Clientes
```

- [ ] **Step 2: Rewrite `src/views/fornecedores/index.tsx`**

Same shape, domain fields `{ id, nome, cnpj, categoria, contato, status: 'Ativo' | 'Inativo' }`, columns `Fornecedor` (nome + cnpj stacked), `Categoria`, `Contato`, `Status`, actions. Data (5 rows): Compressores Brasil Peças Ltda / 10.203.040/0001-11 / Peças e componentes / contato@compressoresbrasil.com.br / Ativo; Lubrificantes Industriais SA / 20.304.050/0001-22 / Lubrificantes / vendas@lubrindustrial.com.br / Ativo; Metalúrgica Reis / 30.405.060/0001-33 / Usinagem / financeiro@metalurgicareis.com.br / Ativo; Distribuidora Ar Comprimido / 40.506.070/0001-44 / Equipamentos / comercial@distribuidorar.com.br / Inativo; Correias e Filtros Ltda / 50.607.080/0001-55 / Filtros e correias / atendimento@correiasefiltros.com.br / Ativo. `title='Fornecedores'`, `description` unchanged from current placeholder, `searchPlaceholder='Buscar fornecedor'`, `actionLabel='Novo Fornecedor'`.

- [ ] **Step 3: Rewrite `src/views/funcionarios/index.tsx`**

Fields `{ id, nome, cargo, setor, admissao: string (ISO date), status: 'Ativo' | 'Inativo' }`. Columns: `Funcionário` (nome + cargo stacked), `Setor`, `Admissão` (format with `date-fns`'s `format(new Date(row.original.admissao), 'dd MMM yyyy', { locale: ptBR })`), `Status`, actions. Data (6 rows): Carlos Eduardo Santos / Técnico de Manutenção / Operacional / 2021-03-15 / Ativo; Marina Oliveira Costa / Analista Financeiro / Financeiro / 2020-07-01 / Ativo; Roberto Almeida / Vendedor / Comercial / 2022-01-10 / Ativo; Fernanda Lima / Almoxarife / Estoque / 2019-11-20 / Ativo; Paulo Henrique Souza / Técnico de Manutenção / Operacional / 2023-05-02 / Inativo; Juliana Ribeiro / Assistente Administrativo / Administrativo / 2022-09-12 / Ativo. `title='Funcionários'`, `searchPlaceholder='Buscar funcionário'`, `actionLabel='Novo Funcionário'`.

- [ ] **Step 4: Verify in the browser**

Run: `pnpm dev`, open `/clientes`, `/fornecedores`, `/funcionarios`. Confirm each shows the `UserListApp`-style card (search left, primary button right, paginated table below), typing in search filters rows, and status badges render.

- [ ] **Step 5: Verify types, lint**

Run: `pnpm check-types && pnpm lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/views/clientes/index.tsx src/views/fornecedores/index.tsx src/views/funcionarios/index.tsx
git commit -m "feat: replace cadastros placeholders with mock data list views"
```

---

### Task 4: Simple list screens — Operacional (Ordens de Serviço, Venda, Compra)

**Files:**
- Modify: `src/views/operacional/ordens-servico.tsx`
- Modify: `src/views/operacional/ordens-venda.tsx`
- Modify: `src/views/operacional/ordens-compra.tsx`

**Interfaces:**
- Consumes: `SimpleListView`, `createListActionsColumn`, `StatusBadge` from Task 1, `formatCurrencyBRL` from `@/lib/utils` (venda/compra only).

- [ ] **Step 1: Rewrite `src/views/operacional/ordens-servico.tsx`**

Fields `{ id, codigo, cliente, equipamento, data: string (ISO), status: 'Aberta' | 'Em andamento' | 'Concluída' | 'Cancelada' }`. Columns: `Código`, `Cliente`, `Equipamento`, `Data` (ptBR-formatted), `Status`, actions. Data (6 rows): OS-1042 / Metalúrgica Reis / Compressor Parafuso 50HP / 2026-09-28 / Em andamento; OS-1041 / Frigorífico Vale Verde / Compressor Pistão 10HP / 2026-09-25 / Concluída; OS-1040 / Posto Estrela Azul / Compressor Parafuso 20HP / 2026-09-22 / Aberta; OS-1039 / Transportadora Rota Sul / Compressor Parafuso 75HP / 2026-09-18 / Concluída; OS-1038 / Construtora Horizonte / Compressor Pistão 15HP / 2026-09-15 / Cancelada; OS-1037 / Indústria Metalcorte Ltda / Compressor Parafuso 30HP / 2026-09-10 / Concluída. `title='Ordens de Serviço'`, `searchPlaceholder='Buscar ordem de serviço'`, `actionLabel='Nova Ordem de Serviço'`.

- [ ] **Step 2: Rewrite `src/views/operacional/ordens-venda.tsx`**

Fields `{ id, codigo, cliente, valor: number, data: string, status: 'Aberta' | 'Faturada' | 'Cancelada' }`. Columns: `Código`, `Cliente`, `Valor` (`formatCurrencyBRL`), `Data`, `Status`, actions. Data (5 rows): OV-2041 / Posto Estrela Azul / 8450 / 2026-09-27 / Faturada; OV-2040 / Frigorífico Vale Verde / 15200 / 2026-09-24 / Aberta; OV-2039 / Construtora Horizonte / 4300 / 2026-09-20 / Faturada; OV-2038 / Transportadora Rota Sul / 22750 / 2026-09-14 / Cancelada; OV-2037 / Indústria Metalcorte Ltda / 9890 / 2026-09-08 / Faturada. `title='Ordens de Venda'`, `searchPlaceholder='Buscar ordem de venda'`, `actionLabel='Nova Ordem de Venda'`.

- [ ] **Step 3: Rewrite `src/views/operacional/ordens-compra.tsx`**

Fields `{ id, codigo, fornecedor, valor: number, data: string, status: 'Aberta' | 'Recebida' | 'Cancelada' }`. Columns: `Código`, `Fornecedor`, `Valor`, `Data`, `Status`, actions. Data (5 rows): OC-3051 / Compressores Brasil Peças Ltda / 12300 / 2026-09-26 / Recebida; OC-3050 / Lubrificantes Industriais SA / 3200 / 2026-09-23 / Recebida; OC-3049 / Correias e Filtros Ltda / 1850 / 2026-09-19 / Aberta; OC-3048 / Metalúrgica Reis / 7600 / 2026-09-12 / Cancelada; OC-3047 / Distribuidora Ar Comprimido / 5400 / 2026-09-05 / Recebida. `title='Ordens de Compra'`, `searchPlaceholder='Buscar ordem de compra'`, `actionLabel='Nova Ordem de Compra'`.

- [ ] **Step 4: Verify in the browser**

Run: `pnpm dev`, open `/ordens-servico`, `/ordens-venda`, `/ordens-compra`. Confirm layout, currency formatting (`R$`), and search/pagination work.

- [ ] **Step 5: Verify types, lint**

Run: `pnpm check-types && pnpm lint`

- [ ] **Step 6: Commit**

```bash
git add src/views/operacional/ordens-servico.tsx src/views/operacional/ordens-venda.tsx src/views/operacional/ordens-compra.tsx
git commit -m "feat: replace operacional placeholders with mock data list views"
```

---

### Task 5: Simple list screens — Financeiro (Faturamento, Boletos, Conciliação)

**Files:**
- Modify: `src/views/financeiro/faturamento.tsx`
- Modify: `src/views/financeiro/boletos.tsx`
- Modify: `src/views/financeiro/conciliacao.tsx`

**Interfaces:**
- Consumes: `SimpleListView`, `createListActionsColumn`, `StatusBadge`, `formatCurrencyBRL`.

- [ ] **Step 1: Rewrite `src/views/financeiro/faturamento.tsx`**

Fields `{ id, numero, cliente, valor: number, emissao: string, status: 'Emitida' | 'Cancelada' }`. Columns: `Número`, `Cliente`, `Valor`, `Emissão`, `Status`, actions. Data (5 rows): NF-00512 / Posto Estrela Azul / 8450 / 2026-09-27 / Emitida; NF-00511 / Frigorífico Vale Verde / 15200 / 2026-09-24 / Emitida; NF-00510 / Construtora Horizonte / 4300 / 2026-09-20 / Cancelada; NF-00509 / Transportadora Rota Sul / 22750 / 2026-09-14 / Emitida; NF-00508 / Indústria Metalcorte Ltda / 9890 / 2026-09-08 / Emitida. `title='Faturamento'`, `searchPlaceholder='Buscar nota fiscal'`, `actionLabel='Emitir Nota Fiscal'`.

- [ ] **Step 2: Rewrite `src/views/financeiro/boletos.tsx`**

Fields `{ id, documento, destinatario, valor: number, vencimento: string, status: 'Pago' | 'Pendente' | 'Vencido' }`. Columns: `Documento`, `Destinatário`, `Valor`, `Vencimento`, `Status`, actions. Data (5 rows): BL-7001 / Posto Estrela Azul / 8450 / 2026-10-05 / Pendente; BL-7000 / Compressores Brasil Peças Ltda / 12300 / 2026-09-30 / Pago; BL-6999 / Frigorífico Vale Verde / 15200 / 2026-09-25 / Vencido; BL-6998 / Lubrificantes Industriais SA / 3200 / 2026-09-20 / Pago; BL-6997 / Transportadora Rota Sul / 22750 / 2026-10-10 / Pendente. `title='Boletos e Pagamentos'`, `searchPlaceholder='Buscar boleto'`, `actionLabel='Novo Boleto'`.

- [ ] **Step 3: Rewrite `src/views/financeiro/conciliacao.tsx`**

Fields `{ id, data: string, descricao, valor: number, status: 'Conciliado' | 'Pendente' }`. Columns: `Data`, `Descrição`, `Valor`, `Status`, actions. Data (5 rows): 2026-09-28 / Recebimento NF-00512 - Posto Estrela Azul / 8450 / Conciliado; 2026-09-27 / Pagamento BL-6999 - Frigorífico Vale Verde / -15200 / Pendente; 2026-09-26 / Tarifa bancária / -45.90 / Conciliado; 2026-09-25 / Recebimento NF-00509 - Transportadora Rota Sul / 22750 / Pendente; 2026-09-24 / Pagamento fornecedor OC-3050 / -3200 / Conciliado. `title='Conciliação Bancária'`, `searchPlaceholder='Buscar lançamento'`, `actionLabel='Novo Lançamento'`.

- [ ] **Step 4: Verify in the browser**

Run: `pnpm dev`, open `/financeiro/faturamento`, `/financeiro/boletos`, `/financeiro/conciliacao`.

- [ ] **Step 5: Verify types, lint**

Run: `pnpm check-types && pnpm lint`

- [ ] **Step 6: Commit**

```bash
git add src/views/financeiro/faturamento.tsx src/views/financeiro/boletos.tsx src/views/financeiro/conciliacao.tsx
git commit -m "feat: replace financeiro placeholders with mock data list views"
```

---

### Task 6: Simple list screens — Estoque (Itens, Ajustes) and Configurações (Logs, Permissões, Integrações)

**Files:**
- Modify: `src/views/estoque/index.tsx`
- Modify: `src/views/estoque/ajustes.tsx`
- Modify: `src/views/configuracoes/logs.tsx`
- Modify: `src/views/configuracoes/permissoes.tsx`
- Modify: `src/views/configuracoes/integracoes.tsx`

**Interfaces:**
- Consumes: `SimpleListView`, `createListActionsColumn`, `StatusBadge`.

- [ ] **Step 1: Rewrite `src/views/estoque/index.tsx`**

Fields `{ id, codigo, nome, categoria, quantidade: number, status: 'Em estoque' | 'Estoque baixo' | 'Sem estoque' }`. Columns: `Código`, `Item`, `Categoria`, `Quantidade`, `Status`, actions. Data (6 rows): PC-1001 / Compressor Parafuso 50HP / Equipamentos / 4 / Em estoque; PC-1002 / Filtro de Ar FA-220 / Filtros / 2 / Estoque baixo; PC-1003 / Óleo Lubrificante Sintético 5L / Lubrificantes / 18 / Em estoque; PC-1004 / Correia Industrial B-52 / Correias / 0 / Sem estoque; PC-1005 / Válvula de Segurança 1/2" / Peças / 9 / Em estoque; PC-1006 / Kit Reparo Compressor Pistão / Peças / 3 / Estoque baixo. `title='Itens'`, `searchPlaceholder='Buscar item'`, `actionLabel='Novo Item'`.

- [ ] **Step 2: Rewrite `src/views/estoque/ajustes.tsx`**

Fields `{ id, data: string, item, tipo: 'Entrada' | 'Saída' | 'Correção', quantidade: number, responsavel }`. Columns: `Data`, `Item`, `Tipo`, `Quantidade`, `Responsável`, actions. Data (5 rows): 2026-09-28 / Compressor Parafuso 50HP / Entrada / 2 / Carlos Eduardo Santos; 2026-09-27 / Filtro de Ar FA-220 / Saída / 5 / Fernanda Lima; 2026-09-26 / Correia Industrial B-52 / Saída / 3 / Fernanda Lima; 2026-09-25 / Óleo Lubrificante Sintético 5L / Entrada / 10 / Fernanda Lima; 2026-09-24 / Kit Reparo Compressor Pistão / Correção / 1 / Carlos Eduardo Santos. `title='Ajustes de Estoque'`, `searchPlaceholder='Buscar ajuste'`, `actionLabel='Novo Ajuste'`.

- [ ] **Step 3: Rewrite `src/views/configuracoes/logs.tsx`**

Fields `{ id, dataHora: string (ISO datetime), usuario, acao, modulo }`. Columns: `Data/Hora` (format `dd MMM yyyy HH:mm`), `Usuário`, `Ação`, `Módulo`, actions. Data (5 rows): 2026-09-28T14:32:00 / Carlos Eduardo Santos / Atualizou ordem de serviço OS-1042 / Operacional; 2026-09-28T11:05:00 / Marina Oliveira Costa / Emitiu nota fiscal NF-00512 / Financeiro; 2026-09-27T17:40:00 / Fernanda Lima / Registrou ajuste de estoque / Estoque; 2026-09-27T09:15:00 / Roberto Almeida / Criou cliente Posto Estrela Azul / Cadastros; 2026-09-26T16:02:00 / Juliana Ribeiro / Alterou permissões de usuário / Configurações. `title='Logs'`, `searchPlaceholder='Buscar log'`, `actionLabel='Novo Registro'`.

- [ ] **Step 4: Rewrite `src/views/configuracoes/permissoes.tsx`**

Fields `{ id, papel, modulo, nivel: 'Leitura' | 'Escrita' | 'Administrador' }`. Columns: `Papel`, `Módulo`, `Nível`, actions. Data (6 rows): Administrador / Todos os módulos / Administrador; Financeiro / Financeiro / Escrita; Operacional / Operacional / Escrita; Estoque / Estoque / Escrita; Comercial / Cadastros / Leitura; Auditoria / Logs / Leitura. `title='Permissões'`, `searchPlaceholder='Buscar permissão'`, `actionLabel='Nova Permissão'`.

- [ ] **Step 5: Rewrite `src/views/configuracoes/integracoes.tsx`**

Fields `{ id, nome, tipo, status: 'Conectado' | 'Desconectado', ultimaSincronizacao: string (ISO datetime) }`. Columns: `Integração`, `Tipo`, `Status`, `Última Sincronização` (format `dd MMM yyyy HH:mm`), actions. Data (5 rows): ERP Financeiro / Sistema de Gestão / Conectado / 2026-09-28T08:00:00; Gateway de Pagamento / Pagamentos / Conectado / 2026-09-28T07:30:00; Emissor de NF-e / Fiscal / Conectado / 2026-09-27T22:10:00; WhatsApp Business API / Comunicação / Desconectado / 2026-09-20T10:00:00; Rastreador de Frota / Logística / Conectado / 2026-09-28T06:45:00. `title='Integrações'`, `searchPlaceholder='Buscar integração'`, `actionLabel='Nova Integração'`.

- [ ] **Step 6: Verify in the browser**

Run: `pnpm dev`, open `/estoque`, `/estoque/ajustes`, `/configuracoes/logs`, `/configuracoes/permissoes`, `/configuracoes/integracoes`.

- [ ] **Step 7: Verify types, lint, build**

Run: `pnpm check-types && pnpm lint && pnpm build`
Expected: all succeed (this is the last screen task, so `build` here also validates Tasks 3–5 together).

- [ ] **Step 8: Commit**

```bash
git add src/views/estoque/index.tsx src/views/estoque/ajustes.tsx src/views/configuracoes/logs.tsx src/views/configuracoes/permissoes.tsx src/views/configuracoes/integracoes.tsx
git commit -m "feat: replace estoque and configuracoes placeholders with mock data list views"
```

---

### Task 7: pt-br-only language switcher and dead-code cleanup

**Files:**
- Modify: `src/components/shared/LanguageDropdown.tsx`
- Delete: `src/components/shared/ModulePlaceholder.tsx` (only if Step 2 confirms zero references)

**Interfaces:**
- No external interface changes — `LanguageDropdown`'s props (`trigger`, `defaultOpen`, `align`) are unchanged.

- [ ] **Step 1: Trim `LanguageDropdown` to pt-br only**

In `src/components/shared/LanguageDropdown.tsx`, change `useState('english')` to `useState('portuguese')`, and reduce the `DropdownMenuRadioGroup` children to the single `<DropdownMenuRadioItem value='portuguese'>Português</DropdownMenuRadioItem>` item, removing the English/German/Spanish/Korean items. Keep the component and its `language`/`setLanguage` state (not hardcoded/removed) so a future locale can be added by re-adding items — per the spec's "don't remove the key structure in case it's needed later."

- [ ] **Step 2: Confirm `ModulePlaceholder` is unused**

Run: `grep -rn "ModulePlaceholder" src/`
Expected: only the definition file `src/components/shared/ModulePlaceholder.tsx` itself matches (all 14 former call sites were replaced in Tasks 2–6). If anything else still matches, stop and finish replacing that caller instead of deleting the component.

- [ ] **Step 3: Delete `src/components/shared/ModulePlaceholder.tsx`**

Delete the file.

- [ ] **Step 4: Verify in the browser**

Run: `pnpm dev`, open the header's language switcher. Confirm it shows only "Português", checked.

- [ ] **Step 5: Verify types, lint, build**

Run: `pnpm check-types && pnpm lint && pnpm build`
Expected: all succeed — this is the full-project gate after every placeholder is gone and `ModulePlaceholder` is deleted.

- [ ] **Step 6: Commit**

```bash
git add src/components/shared/LanguageDropdown.tsx
git rm src/components/shared/ModulePlaceholder.tsx
git commit -m "feat: restrict language switcher to pt-br and remove unused placeholder component"
```
