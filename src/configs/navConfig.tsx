// Third-party Imports
import type * as Icon from 'lucide-react'

type IconName = keyof typeof Icon

export type MenuLeafSubItem = {
  label: string
  href: string
  activePath?: string
  badge?: string
  badgeClassName?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export type MenuGroupSubItem = {
  label: string
  childItems: MenuLeafSubItem[]
}

export type MenuSubItem = MenuLeafSubItem | MenuGroupSubItem

export type MenuItem = {
  icon: IconName
  label: string
} & (
  | {
      href: string
      badge?: string
      badgeClassName?: string
      childItems?: never
      target?: '_blank' | '_self' | '_parent' | '_top'
    }
  | {
      href?: never
      badge?: string
      badgeClassName?: string
      childItems: MenuSubItem[]
    }
)

export type NavItem = {
  groupLabel?: string
  items: MenuItem[]
}

export const navItems: NavItem[] = [
  {
    items: [
      {
        icon: 'LayoutDashboardIcon',
        label: 'Dashboard',
        href: '/'
      }
    ]
  },
  {
    groupLabel: 'Operacional',
    items: [
      {
        icon: 'WrenchIcon',
        label: 'Ordens de Serviço',
        href: '/ordens-servico'
      },
      {
        icon: 'ShoppingCartIcon',
        label: 'Ordens de Venda',
        href: '/ordens-venda'
      },
      {
        icon: 'PackagePlusIcon',
        label: 'Ordens de Compra',
        href: '/ordens-compra'
      }
    ]
  },
  {
    groupLabel: 'Estoque',
    items: [
      {
        icon: 'BoxesIcon',
        label: 'Itens',
        href: '/estoque'
      },
      {
        icon: 'SlidersHorizontalIcon',
        label: 'Ajustes de Estoque',
        href: '/estoque/ajustes'
      }
    ]
  },
  {
    groupLabel: 'Financeiro',
    items: [
      {
        icon: 'LandmarkIcon',
        label: 'Conciliação Bancária',
        href: '/financeiro/conciliacao'
      },
      {
        icon: 'ReceiptTextIcon',
        label: 'Boletos e Pagamentos',
        href: '/financeiro/boletos'
      },
      {
        icon: 'FileSpreadsheetIcon',
        label: 'Faturamento',
        href: '/financeiro/faturamento'
      }
    ]
  },
  {
    groupLabel: 'Cadastros',
    items: [
      {
        icon: 'UsersIcon',
        label: 'Clientes',
        href: '/clientes'
      },
      {
        icon: 'HandshakeIcon',
        label: 'Fornecedores',
        href: '/fornecedores'
      },
      {
        icon: 'IdCardIcon',
        label: 'Funcionários',
        href: '/funcionarios'
      }
    ]
  },
  {
    groupLabel: 'Configurações',
    items: [
      {
        icon: 'ShieldCheckIcon',
        label: 'Permissões',
        href: '/configuracoes/permissoes'
      },
      {
        icon: 'PlugZapIcon',
        label: 'Integrações',
        href: '/configuracoes/integracoes'
      },
      {
        icon: 'ScrollTextIcon',
        label: 'Logs',
        href: '/configuracoes/logs'
      }
    ]
  },

  // --- Below: original template navigation, kept temporarily (not part of the SOS Compressores
  // module structure above) so it can be reviewed and removed once no longer needed. ---
  {
    groupLabel: 'Template · Dashboard e Layouts',
    items: [
      {
        icon: 'Package',
        label: 'Pedidos',
        href: '/dashboard/orders'
      }
    ]
  },
  {
    groupLabel: 'Template · Apps',
    items: [
      {
        icon: 'MailIcon',
        label: 'E-mail',
        href: '/apps/mail'
      },
      {
        icon: 'CalendarIcon',
        label: 'Calendário',
        href: '/apps/calendar'
      },
      {
        icon: 'UsersIcon',
        label: 'Usuários',
        childItems: [
          { label: 'Listar', href: '/apps/users/list' },
          { label: 'Visualizar', href: '/apps/users/view' }
        ]
      }
    ]
  },
  {
    groupLabel: 'Template · Páginas',
    items: [
      {
        icon: 'UserCogIcon',
        label: 'Configurações do Usuário',
        childItems: [
          {
            label: 'Geral',
            href: '/pages/user-settings?setting=general'
          },
          {
            label: 'Workspace',
            href: '/pages/user-settings?setting=workspace'
          }
        ]
      },
      {
        icon: 'UserIcon',
        label: 'Perfil do Usuário',
        childItems: [
          {
            label: 'Perfil',
            href: '/pages/user-profile?view=profile'
          },
          {
            label: 'Conexões',
            href: '/pages/user-profile?view=connections'
          }
        ]
      },
      {
        icon: 'LockKeyholeIcon',
        label: 'Autenticação',
        childItems: [
          {
            label: 'Entrar',
            childItems: [{ label: 'Entrar v1', href: '/pages/auth/login', target: '_blank' }]
          },
          {
            label: 'Cadastrar',
            childItems: [{ label: 'Cadastrar v1', href: '/pages/auth/register', target: '_blank' }]
          },
          {
            label: 'Esqueci a Senha',
            childItems: [{ label: 'Esqueci a Senha v1', href: '/pages/auth/forgot-password', target: '_blank' }]
          },
          {
            label: 'Verificar E-mail',
            childItems: [{ label: 'Verificar E-mail v1', href: '/pages/auth/verify-email', target: '_blank' }]
          },
          {
            label: 'Redefinir Senha',
            childItems: [{ label: 'Redefinir Senha v1', href: '/pages/auth/reset-password', target: '_blank' }]
          },
          {
            label: 'Dois Fatores',
            childItems: [{ label: 'Dois Fatores v1', href: '/pages/auth/two-steps', target: '_blank' }]
          }
        ]
      },
      {
        icon: 'BugIcon',
        label: 'Páginas de Erro',
        childItems: [{ label: 'Página de Erro', href: '/pages/misc/error-page', target: '_blank' }]
      }
    ]
  },
  {
    groupLabel: 'Template · Formulários e Tabelas',
    items: [
      {
        icon: 'LayoutTemplateIcon',
        label: 'Layouts de Formulário',
        childItems: [
          { label: 'Layout Vertical', href: '/forms/form-layouts/vertical' },
          { label: 'Layout Horizontal', href: '/forms/form-layouts/horizontal' }
        ]
      },
      {
        icon: 'BadgeCheckIcon',
        label: 'Validação de Formulário',
        href: '/forms/form-validation'
      },
      {
        icon: 'TableIcon',
        label: 'Tabela de Dados',
        href: '/datatable'
      }
    ]
  },
  {
    groupLabel: 'Template · Diversos',
    items: [
      {
        icon: 'MenuIcon',
        label: 'Nível de Menu',
        childItems: [
          {
            label: 'Item de Menu',
            href: '#'
          },
          {
            label: 'Nível de Menu 1',
            childItems: [{ label: 'Nível de Menu 2', href: '#' }]
          }
        ]
      }
    ]
  }
]
