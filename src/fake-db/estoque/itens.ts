export type ItemEstoqueTipo = 'Equipamento' | 'Peça' | 'Insumo' | 'Consumível'
export type ItemEstoqueStatus = 'Em estoque' | 'Estoque baixo' | 'Sem estoque'
export type MovimentacaoTipo = 'Entrada' | 'Saída' | 'Correção'

export type ItemEstoqueMovimentacao = {
  data: string
  tipo: MovimentacaoTipo
  quantidade: number
  responsavel: string
}

export type ItemEstoque = {
  id: string
  codigo: string
  nome: string
  tipo: ItemEstoqueTipo
  categoria: string
  unidade: string
  quantidade: number
  estoqueMinimo: number
  estoqueMaximo: number
  precoMedio: number
  precoVenda: number
  localizacao: string
  fornecedor: string
  movimentacoes: ItemEstoqueMovimentacao[]
}

export const TIPOS_ITEM: ItemEstoqueTipo[] = ['Equipamento', 'Peça', 'Insumo', 'Consumível']
export const UNIDADES = ['un', 'kit', 'L', 'm', 'kg', 'cx']

export function getStatusEstoque(item: Pick<ItemEstoque, 'quantidade' | 'estoqueMinimo'>): ItemEstoqueStatus {
  if (item.quantidade <= 0) return 'Sem estoque'
  if (item.quantidade <= item.estoqueMinimo) return 'Estoque baixo'

  return 'Em estoque'
}

export const itensEstoqueData: ItemEstoque[] = [
  {
    id: '1',
    codigo: 'PC-1001',
    nome: 'Compressor Parafuso 50HP',
    tipo: 'Equipamento',
    categoria: 'Compressores',
    unidade: 'un',
    quantidade: 4,
    estoqueMinimo: 2,
    estoqueMaximo: 8,
    precoMedio: 18500,
    precoVenda: 24900,
    localizacao: 'Galpão A · Prateleira 1',
    fornecedor: 'Atlas Industrial',
    movimentacoes: [
      { data: '2026-09-28', tipo: 'Entrada', quantidade: 2, responsavel: 'Carlos Eduardo Santos' },
      { data: '2026-09-10', tipo: 'Saída', quantidade: 1, responsavel: 'Fernanda Lima' }
    ]
  },
  {
    id: '2',
    codigo: 'PC-1002',
    nome: 'Filtro de Ar FA-220',
    tipo: 'Peça',
    categoria: 'Filtros',
    unidade: 'un',
    quantidade: 2,
    estoqueMinimo: 6,
    estoqueMaximo: 30,
    precoMedio: 118.5,
    precoVenda: 165,
    localizacao: 'Galpão B · Gaveta 4',
    fornecedor: 'FiltroMax',
    movimentacoes: [
      { data: '2026-09-27', tipo: 'Saída', quantidade: 5, responsavel: 'Fernanda Lima' },
      { data: '2026-09-02', tipo: 'Entrada', quantidade: 10, responsavel: 'Fernanda Lima' }
    ]
  },
  {
    id: '3',
    codigo: 'PC-1003',
    nome: 'Óleo Lubrificante Sintético 5L',
    tipo: 'Insumo',
    categoria: 'Lubrificantes',
    unidade: 'un',
    quantidade: 18,
    estoqueMinimo: 8,
    estoqueMaximo: 40,
    precoMedio: 165,
    precoVenda: 210,
    localizacao: 'Galpão B · Prateleira 2',
    fornecedor: 'LubriPro',
    movimentacoes: [
      { data: '2026-09-25', tipo: 'Entrada', quantidade: 10, responsavel: 'Fernanda Lima' },
      { data: '2026-09-18', tipo: 'Saída', quantidade: 4, responsavel: 'Paulo Henrique Souza' }
    ]
  },
  {
    id: '4',
    codigo: 'PC-1004',
    nome: 'Correia Industrial B-52',
    tipo: 'Peça',
    categoria: 'Correias',
    unidade: 'un',
    quantidade: 0,
    estoqueMinimo: 4,
    estoqueMaximo: 16,
    precoMedio: 72,
    precoVenda: 105,
    localizacao: 'Galpão B · Gaveta 1',
    fornecedor: 'Correias Brasil',
    movimentacoes: [{ data: '2026-09-26', tipo: 'Saída', quantidade: 3, responsavel: 'Fernanda Lima' }]
  },
  {
    id: '5',
    codigo: 'PC-1005',
    nome: 'Válvula de Segurança 1/2"',
    tipo: 'Peça',
    categoria: 'Válvulas',
    unidade: 'un',
    quantidade: 9,
    estoqueMinimo: 4,
    estoqueMaximo: 20,
    precoMedio: 94,
    precoVenda: 140,
    localizacao: 'Galpão A · Gaveta 2',
    fornecedor: 'Atlas Industrial',
    movimentacoes: [{ data: '2026-09-12', tipo: 'Entrada', quantidade: 6, responsavel: 'Carlos Eduardo Santos' }]
  },
  {
    id: '6',
    codigo: 'PC-1006',
    nome: 'Kit Reparo Compressor Pistão',
    tipo: 'Peça',
    categoria: 'Kits de reparo',
    unidade: 'kit',
    quantidade: 3,
    estoqueMinimo: 3,
    estoqueMaximo: 12,
    precoMedio: 310,
    precoVenda: 430,
    localizacao: 'Galpão A · Prateleira 3',
    fornecedor: 'Atlas Industrial',
    movimentacoes: [{ data: '2026-09-24', tipo: 'Correção', quantidade: 1, responsavel: 'Carlos Eduardo Santos' }]
  }
]
