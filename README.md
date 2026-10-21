<h1 align="center">SOS Compressores</h1>

<p align="start">SOS Compressores is a responsive dashboard built with React, Vite, TanStack Router, Shadcn UI and Tailwind CSS. It ships with an orders dashboard, Mail, Calendar & Users apps, authentication pages, form layouts, data tables, and the SOS Compressores operational modules (Operacional, Estoque, Financeiro, Cadastros, Configurações).</p>

## Key Features ✨

- **Dashboard** - Ready-to-use dashboard layout with statistics, charts, and widgets
- **Operational modules** - Ordens de Serviço, Ordens de Venda, Ordens de Compra, Estoque, Financeiro, Cadastros, Configurações
- **Apps** - Mail, Calendar, and Users apps out of the box
- **Authentication Pages** - Login, Register, Forgot Password, Verify Email, Reset Password, and Two Steps Verification
- **Forms & Tables** - Vertical & Horizontal form layouts, form validation, and a data table
- **Built with Vite + TanStack Router** - Fast dev server and file-based, fully typed routing
- **Tailwind CSS v4** - Easy theming and utility-based styling
- **Responsive & Mobile-First** - Designed to look great on all devices

## Folder Structure

```
|-- public/                                    # Static assets served from the site root
|   |-- images/                                # Public images, logos, and media
|-- src/                                       # Application source code
|   |-- main.tsx                               # App entry point
|   |-- globals.css                            # Tailwind CSS, CSS variables, and theme tokens
|   |-- routes/                                # TanStack Router file-based routes and layouts
|   |   |-- __root.tsx                         # Root layout and providers
|   |   |-- _pages.tsx                         # Admin shell layout (sidebar + header)
|   |   |-- _pages/                            # Routes rendered with the admin shell
|   |   |-- _blank.tsx                         # Layout without the admin shell
|   |   |-- _blank/                            # Routes without the admin shell (auth, error)
|   |-- assets/                                # Local data files, SVGs, and static helpers
|   |   |-- data/                               # Constants and option data
|   |   |-- svg/                                # SVG assets used by the UI
|   |-- components/                            # Shared React components
|   |   |-- layout/                             # Sidebar, header, and shell pieces
|   |   |-- shared/                             # Shared UI components
|   |   |-- ui/                                 # shadcn/ui primitives
|   |   |-- Providers.tsx                       # App provider wrapper
|   |   |-- ThemeProvider.tsx                   # Theme provider wrapper
|   |-- configs/                               # App configuration files
|   |   |-- navConfig.tsx                       # Sidebar menu structure and icons
|   |   |-- themeConfig.ts                      # Theme config
|   |   |-- mailConfig.ts                       # Mail app config
|   |-- fake-db/                               # Mock data used by demos before API integration
|   |-- hooks/                                 # Reusable client hooks
|   |-- lib/                                   # General utilities and shared helpers
|   |-- types/                                 # Shared TypeScript interfaces and types
|   |-- utils/                                 # Feature-specific helper functions
|   |-- views/                                 # Page-level UI composed by route files
|   |   |-- apps/                              # App view modules
|   |   |-- dashboards/                        # Dashboard charts, statistics, and widgets
|   |   |-- datatables/                        # Data table views
|   |   |-- forms/                             # Form layout and validation views
|   |   |-- pages/                             # Auth, misc, profile, and settings views
|   |   |-- operacional/, estoque/, financeiro/, clientes/, fornecedores/, funcionarios/, configuracoes/
|   |   |                                       # SOS Compressores module placeholders
|-- components.json                            # shadcn/ui aliases and registry config
|-- eslint.config.mjs                          # ESLint configuration
|-- vite.config.ts                             # Vite, React, TanStack Router and Tailwind plugins
|-- index.html                                 # Vite entry HTML
|-- package.json                               # Scripts and dependencies
|-- tsconfig.json                              # TypeScript compiler and path aliases
```

**Key UI Sections**

- **Dashboard** - Orders overview with statistics, charts, and widgets
- **Operacional / Estoque / Financeiro / Cadastros / Configurações** - SOS Compressores modules
- **Apps** - Mail, Calendar, and Users management
- **Authentication** - Login, Register, and account recovery flows
- **Forms & Tables** - Layouts, validation, and data table views
- **User Pages** - Profile and account settings

---

## What's Included 📦

- Dashboard
  - Orders Dashboard
- Operacional
  - Ordens de Serviço, Ordens de Venda, Ordens de Compra
- Estoque
  - Itens, Ajustes de Estoque
- Financeiro
  - Conciliação Bancária, Boletos e Pagamentos, Faturamento
- Cadastros
  - Clientes, Fornecedores, Funcionários
- Configurações
  - Permissões, Integrações, Logs
- Apps
  - Mail
  - Calendar
  - Users
- Pages
  - User Settings
  - User Profile
  - Login Page
  - Register Page
  - Forgot Password Page
  - Verify Email Page
  - Reset Password Page
  - Two Steps Verification Page
  - Error Page
- Forms & Tables
  - Form Layouts
  - Form Validation
  - Data Table

## 🚀 Quick Start

### Prerequisites

- Node.js `^20.19.0 || >=22.12.0`
- pnpm (recommended)

### Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start the development server:**

   ```bash
   pnpm dev
   ```

   The site will be available at `http://localhost:3000`

3. **Build for production:**

   ```bash
   pnpm build
   ```

4. **Preview the production build:**

   ```bash
   pnpm preview
   ```

## 🧞 Available Commands

| Command       | Action                                                                       |
| :------------ | :--------------------------------------------------------------------------- |
| `dev`         | Starts the Vite development server with hot-reload enabled.                  |
| `build`       | Creates an optimized production build of your application.                   |
| `preview`     | Serves the production build locally so you can test it before deploying.     |
| `lint`        | Runs ESLint to check your code for potential errors and code quality issues. |
| `lint:fix`    | Runs ESLint and automatically fixes problems where possible.                 |
| `format`      | Formats all files using Prettier to ensure consistent code style.            |
| `clean`       | Cleans the project by removing build artifacts.                              |
| `check-types` | Checks TypeScript types to catch type errors before building or deploying.   |

## Changelog 📆

Please refer to the [CHANGELOG file](CHANGELOG.md).

## License &copy;

Licensed under [MIT](LICENSE.md). This project started from an open-source admin template; see [LICENSE.md](LICENSE.md) for the original copyright notice, kept as required by the MIT license.

## Credits 🤘

We are grateful for the contributions of the open-source community, particularly:

- [shadcn/ui](https://ui.shadcn.com/)
- [tweakcn](https://tweakcn.com/) (theme generation inspiration)
