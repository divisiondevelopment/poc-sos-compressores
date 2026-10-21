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

  {
    groupLabel: 'Conta',
    items: [
      {
        icon: 'LogInIcon',
        label: 'Entrar',
        href: '/pages/auth/login',
        target: '_blank'
      }
    ]
  }
]
