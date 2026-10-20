import { WrenchIcon, TriangleAlertIcon, CalendarX2Icon } from 'lucide-react'

import { Card } from '@/components/ui/card'

import ProductInsightsCard from '@/views/dashboards/widgets/widget-product-insights'
import SalesMetricsCard from '@/views/dashboards/charts/chart-sales-metrics'
import StatisticsCard from '@/views/dashboards/statistics/statistics-card-01'
import TotalEarningCard from '@/views/dashboards/widgets/widget-total-earning'
import TransactionDatatable, { type Item } from '@/views/datatables/datatable-transaction'

import { formatCurrencyBRL } from '@/lib/utils'

// Statistics card data
const StatisticsCardData = [
  {
    icon: <WrenchIcon className='size-4' />,
    value: '36',
    title: 'Ordens de Serviço Concluídas',
    changePercentage: '+12,4%'
  },
  {
    icon: <TriangleAlertIcon className='size-4' />,
    value: '5',
    title: 'Equipamentos com Avaria',
    changePercentage: '-6,1%'
  },
  {
    icon: <CalendarX2Icon className='size-4' />,
    value: '9',
    title: 'Entregas Atrasadas',
    changePercentage: '+2,8%'
  }
]

// Earning data for Total Earning card
const earningData = [
  {
    img: '/images/widgets/zipcar.webp',
    platform: 'Manutenção Industrial',
    technologies: 'Contratos mensais',
    earnings: formatCurrencyBRL(23569.26),
    progressPercentage: 75
  },
  {
    img: '/images/widgets/bitbank.webp',
    platform: 'Venda de Peças',
    technologies: 'Balcão e e-commerce',
    earnings: formatCurrencyBRL(12650.31),
    progressPercentage: 25
  }
]

// Transaction table data
const transactionData: Item[] = [
  {
    id: '1',
    avatar: '/images/avatars/avatar-1.webp',
    avatarFallback: 'JP',
    name: 'João Pereira',
    amount: 316.0,
    status: 'paid',
    email: 'joao.pereira@example.com',
    paidBy: 'mastercard'
  },
  {
    id: '2',
    avatar: '/images/avatars/avatar-2.webp',
    avatarFallback: 'MG',
    name: 'Maria Gonçalves',
    amount: 253.4,
    status: 'pending',
    email: 'maria.goncalves@example.com',
    paidBy: 'visa'
  },
  {
    id: '3',
    avatar: '/images/avatars/avatar-3.webp',
    avatarFallback: 'RA',
    name: 'Roberto Almeida',
    amount: 852.0,
    status: 'paid',
    email: 'roberto.almeida@example.com',
    paidBy: 'mastercard'
  },
  {
    id: '4',
    avatar: '/images/avatars/avatar-4.webp',
    avatarFallback: 'FL',
    name: 'Fernanda Lima',
    amount: 889.0,
    status: 'pending',
    email: 'fernanda.lima@example.com',
    paidBy: 'visa'
  },
  {
    id: '5',
    avatar: '/images/avatars/avatar-5.webp',
    avatarFallback: 'CS',
    name: 'Carlos Eduardo Santos',
    amount: 723.16,
    status: 'paid',
    email: 'carlos.santos@example.com',
    paidBy: 'mastercard'
  },
  {
    id: '6',
    avatar: '/images/avatars/avatar-6.webp',
    avatarFallback: 'JR',
    name: 'Juliana Ribeiro',
    amount: 612.0,
    status: 'failed',
    email: 'juliana.ribeiro@example.com',
    paidBy: 'mastercard'
  },
  {
    id: '7',
    avatar: '/images/avatars/avatar-7.webp',
    avatarFallback: 'PH',
    name: 'Paulo Henrique Souza',
    amount: 445.25,
    status: 'paid',
    email: 'paulo.souza@example.com',
    paidBy: 'visa'
  },
  {
    id: '8',
    avatar: '/images/avatars/avatar-8.webp',
    avatarFallback: 'MO',
    name: 'Marina Oliveira Costa',
    amount: 297.8,
    status: 'processing',
    email: 'marina.costa@example.com',
    paidBy: 'mastercard'
  },
  {
    id: '9',
    avatar: '/images/avatars/avatar-9.webp',
    avatarFallback: 'TP',
    name: 'Thiago Pires',
    amount: 756.9,
    status: 'paid',
    email: 'thiago.pires@example.com',
    paidBy: 'visa'
  },
  {
    id: '10',
    avatar: '/images/avatars/avatar-10.webp',
    avatarFallback: 'AC',
    name: 'Amanda Castro',
    amount: 189.5,
    status: 'pending',
    email: 'amanda.castro@example.com',
    paidBy: 'mastercard'
  }
]

const DashboardHome = () => {
  return (
    <div className='grid grid-cols-2 gap-6 lg:grid-cols-3'>
      {/* Statistics Cards */}
      <div className='col-span-full grid gap-6 sm:grid-cols-3 md:max-lg:grid-cols-1'>
        {StatisticsCardData.map((card, index) => (
          <StatisticsCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
            changePercentage={card.changePercentage}
          />
        ))}
      </div>

      <div className='grid gap-6 max-xl:col-span-full lg:max-xl:grid-cols-2'>
        {/* Product Insights Card */}
        <ProductInsightsCard className='justify-between gap-3 *:data-[slot=card-content]:space-y-5' />

        {/* Total Earning Card */}
        <TotalEarningCard
          title='Faturamento Total'
          earning={24650}
          trend='up'
          percentage={10}
          comparisonText='Comparado ao ano anterior (R$ 84.325,00)'
          earningData={earningData}
          className='justify-between gap-5 sm:min-w-0'
        />
      </div>

      <SalesMetricsCard className='col-span-full *:data-[slot=card-content]:space-y-6 xl:col-span-2' />

      <Card className='col-span-full w-full py-0'>
        <TransactionDatatable data={transactionData} />
      </Card>
    </div>
  )
}

export default DashboardHome
