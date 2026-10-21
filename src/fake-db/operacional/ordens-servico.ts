export type OrdemServicoStatus = 'Aberta' | 'Em andamento' | 'Concluída' | 'Cancelada'

export type OrdemServicoItem = {
  id: string
  descricao: string
  quantidade: number
  valorUnitario: number
}

export type OrdemServicoHistoricoEntry = {
  data: string
  status: OrdemServicoStatus
  observacao?: string
}

export type OrdemServico = {
  id: string
  codigo: string
  cliente: string
  equipamento: string
  data: string
  status: OrdemServicoStatus
  tecnico: string
  clienteContato: string
  clienteEndereco: string
  itens: OrdemServicoItem[]
  historico: OrdemServicoHistoricoEntry[]
}

export const ordensServicoData: OrdemServico[] = [
  {
    id: '1',
    codigo: 'OS-1042',
    cliente: 'Metalúrgica Reis',
    equipamento: 'Compressor Parafuso 50HP',
    data: '2026-09-28',
    status: 'Em andamento',
    tecnico: 'Carlos Eduardo Santos',
    clienteContato: '(31) 3344-5566',
    clienteEndereco: 'Rua das Indústrias, 450 - Belo Horizonte - MG',
    itens: [
      { id: '1-1', descricao: 'Troca de kit de válvulas', quantidade: 1, valorUnitario: 850 },
      { id: '1-2', descricao: 'Óleo lubrificante sintético 5L', quantidade: 2, valorUnitario: 180 },
      { id: '1-3', descricao: 'Mão de obra técnica especializada', quantidade: 4, valorUnitario: 120 }
    ],
    historico: [
      { data: '2026-09-25', status: 'Aberta', observacao: 'Ordem de serviço registrada' },
      { data: '2026-09-28', status: 'Em andamento', observacao: 'Técnico iniciou o atendimento' }
    ]
  },
  {
    id: '2',
    codigo: 'OS-1041',
    cliente: 'Frigorífico Vale Verde',
    equipamento: 'Compressor Pistão 10HP',
    data: '2026-09-25',
    status: 'Concluída',
    tecnico: 'Paulo Henrique Souza',
    clienteContato: '(34) 3215-6677',
    clienteEndereco: 'Avenida Frigorífico, 120 - Uberlândia - MG',
    itens: [
      { id: '2-1', descricao: 'Substituição de correia', quantidade: 1, valorUnitario: 95 },
      { id: '2-2', descricao: 'Mão de obra técnica especializada', quantidade: 2, valorUnitario: 120 }
    ],
    historico: [
      { data: '2026-09-22', status: 'Aberta' },
      { data: '2026-09-24', status: 'Em andamento', observacao: 'Peça de reposição recebida' },
      { data: '2026-09-25', status: 'Concluída', observacao: 'Equipamento testado e entregue' }
    ]
  },
  {
    id: '3',
    codigo: 'OS-1040',
    cliente: 'Posto Estrela Azul',
    equipamento: 'Compressor Parafuso 20HP',
    data: '2026-09-22',
    status: 'Aberta',
    tecnico: 'Carlos Eduardo Santos',
    clienteContato: '(16) 3622-4455',
    clienteEndereco: 'Rodovia BR-050, Km 12 - Ribeirão Preto - SP',
    itens: [{ id: '3-1', descricao: 'Diagnóstico de ruído anormal', quantidade: 1, valorUnitario: 150 }],
    historico: [{ data: '2026-09-22', status: 'Aberta', observacao: 'Aguardando avaliação técnica' }]
  },
  {
    id: '4',
    codigo: 'OS-1039',
    cliente: 'Transportadora Rota Sul',
    equipamento: 'Compressor Parafuso 75HP',
    data: '2026-09-18',
    status: 'Concluída',
    tecnico: 'Paulo Henrique Souza',
    clienteContato: '(41) 99887-1122',
    clienteEndereco: 'Avenida dos Transportes, 980 - Curitiba - PR',
    itens: [
      { id: '4-1', descricao: 'Revisão geral preventiva', quantidade: 1, valorUnitario: 620 },
      { id: '4-2', descricao: 'Filtro de ar industrial', quantidade: 2, valorUnitario: 145 }
    ],
    historico: [
      { data: '2026-09-14', status: 'Aberta' },
      { data: '2026-09-16', status: 'Em andamento' },
      { data: '2026-09-18', status: 'Concluída', observacao: 'Revisão concluída dentro do prazo' }
    ]
  },
  {
    id: '5',
    codigo: 'OS-1038',
    cliente: 'Construtora Horizonte',
    equipamento: 'Compressor Pistão 15HP',
    data: '2026-09-15',
    status: 'Cancelada',
    tecnico: 'Carlos Eduardo Santos',
    clienteContato: '(31) 3344-5566',
    clienteEndereco: 'Rua dos Engenheiros, 210 - Belo Horizonte - MG',
    itens: [{ id: '5-1', descricao: 'Diagnóstico inicial', quantidade: 1, valorUnitario: 150 }],
    historico: [
      { data: '2026-09-12', status: 'Aberta' },
      { data: '2026-09-15', status: 'Cancelada', observacao: 'Cliente cancelou o atendimento' }
    ]
  },
  {
    id: '6',
    codigo: 'OS-1037',
    cliente: 'Indústria Metalcorte Ltda',
    equipamento: 'Compressor Parafuso 30HP',
    data: '2026-09-10',
    status: 'Concluída',
    tecnico: 'Paulo Henrique Souza',
    clienteContato: '(19) 3251-7788',
    clienteEndereco: 'Distrito Industrial, 75 - Campinas - SP',
    itens: [
      { id: '6-1', descricao: 'Troca de rolamentos', quantidade: 2, valorUnitario: 210 },
      { id: '6-2', descricao: 'Mão de obra técnica especializada', quantidade: 3, valorUnitario: 120 }
    ],
    historico: [
      { data: '2026-09-07', status: 'Aberta' },
      { data: '2026-09-09', status: 'Em andamento' },
      { data: '2026-09-10', status: 'Concluída', observacao: 'Equipamento entregue ao cliente' }
    ]
  },
  {
    id: '7',
    codigo: 'OS-1031',
    cliente: 'Metalúrgica Reis',
    equipamento: 'Compressor Parafuso 50HP',
    data: '2026-08-20',
    status: 'Concluída',
    tecnico: 'Carlos Eduardo Santos',
    clienteContato: '(31) 3344-5566',
    clienteEndereco: 'Rua das Indústrias, 450 - Belo Horizonte - MG',
    itens: [
      { id: '7-1', descricao: 'Revisão preventiva 4.000h', quantidade: 1, valorUnitario: 720 },
      { id: '7-2', descricao: 'Filtro separador de óleo', quantidade: 1, valorUnitario: 310 },
      { id: '7-3', descricao: 'Mão de obra técnica especializada', quantidade: 3, valorUnitario: 120 }
    ],
    historico: [
      { data: '2026-08-17', status: 'Aberta' },
      { data: '2026-08-19', status: 'Em andamento', observacao: 'Equipamento parado para revisão' },
      { data: '2026-08-20', status: 'Concluída', observacao: 'Revisão concluída e equipamento liberado' }
    ]
  },
  {
    id: '8',
    codigo: 'OS-1024',
    cliente: 'Metalúrgica Reis',
    equipamento: 'Compressor Pistão 10HP',
    data: '2026-07-08',
    status: 'Concluída',
    tecnico: 'Paulo Henrique Souza',
    clienteContato: '(31) 3344-5566',
    clienteEndereco: 'Rua das Indústrias, 450 - Belo Horizonte - MG',
    itens: [
      { id: '8-1', descricao: 'Troca de correia e polia', quantidade: 1, valorUnitario: 260 },
      { id: '8-2', descricao: 'Mão de obra técnica especializada', quantidade: 2, valorUnitario: 120 }
    ],
    historico: [
      { data: '2026-07-06', status: 'Aberta', observacao: 'Ruído excessivo na correia' },
      { data: '2026-07-08', status: 'Concluída', observacao: 'Correia substituída' }
    ]
  },
  {
    id: '9',
    codigo: 'OS-1012',
    cliente: 'Metalúrgica Reis',
    equipamento: 'Compressor Parafuso 50HP',
    data: '2026-05-14',
    status: 'Cancelada',
    tecnico: 'Carlos Eduardo Santos',
    clienteContato: '(31) 3344-5566',
    clienteEndereco: 'Rua das Indústrias, 450 - Belo Horizonte - MG',
    itens: [{ id: '9-1', descricao: 'Diagnóstico de queda de pressão', quantidade: 1, valorUnitario: 150 }],
    historico: [
      { data: '2026-05-12', status: 'Aberta' },
      { data: '2026-05-14', status: 'Cancelada', observacao: 'Cliente resolveu internamente' }
    ]
  }
]

export function getOrdemServicoById(id: string): OrdemServico | undefined {
  return ordensServicoData.find(ordem => ordem.id === id)
}
