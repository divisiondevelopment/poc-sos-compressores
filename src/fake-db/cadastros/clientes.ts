export type ClienteStatus = 'Ativo' | 'Inativo'

export type Cliente = {
  id: string
  nome: string
  documento: string
  email: string
  telefone: string
  endereco: string
  cidade: string
  status: ClienteStatus
  observacoes: string
}

export const clientesData: Cliente[] = [
  {
    id: '1',
    nome: 'João Pereira',
    documento: '123.456.789-00',
    email: 'joao.pereira@email.com',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Acácias, 88',
    cidade: 'São Paulo - SP',
    status: 'Ativo',
    observacoes: ''
  },
  {
    id: '2',
    nome: 'Indústria Metalcorte Ltda',
    documento: '98.765.432/0001-21',
    email: 'compras@metalcorte.com.br',
    telefone: '(19) 3251-7788',
    endereco: 'Distrito Industrial, 75',
    cidade: 'Campinas - SP',
    status: 'Ativo',
    observacoes: ''
  },
  {
    id: '3',
    nome: 'Transportadora Rota Sul',
    documento: '11.222.333/0001-44',
    email: 'frota@rotasul.com.br',
    telefone: '(41) 99887-1122',
    endereco: 'Avenida dos Transportes, 980',
    cidade: 'Curitiba - PR',
    status: 'Ativo',
    observacoes: 'Frota com compressores veiculares. Atendimento prioritário.'
  },
  {
    id: '4',
    nome: 'Frigorífico Vale Verde',
    documento: '22.333.444/0001-55',
    email: 'manutencao@valeverde.com.br',
    telefone: '(34) 3215-6677',
    endereco: 'Avenida Frigorífico, 120',
    cidade: 'Uberlândia - MG',
    status: 'Inativo',
    observacoes: ''
  },
  {
    id: '5',
    nome: 'Posto Estrela Azul',
    documento: '33.444.555/0001-66',
    email: 'contato@estrelaazul.com.br',
    telefone: '(16) 3622-4455',
    endereco: 'Rodovia BR-050, Km 12',
    cidade: 'Ribeirão Preto - SP',
    status: 'Ativo',
    observacoes: ''
  },
  {
    id: '6',
    nome: 'Construtora Horizonte',
    documento: '44.555.666/0001-77',
    email: 'obras@horizonte.com.br',
    telefone: '(31) 3344-5566',
    endereco: 'Rua dos Engenheiros, 210',
    cidade: 'Belo Horizonte - MG',
    status: 'Inativo',
    observacoes: ''
  },
  {
    id: '7',
    nome: 'Metalúrgica Reis',
    documento: '55.666.777/0001-88',
    email: 'manutencao@metalurgicareis.com.br',
    telefone: '(31) 3344-5566',
    endereco: 'Rua das Indústrias, 450',
    cidade: 'Belo Horizonte - MG',
    status: 'Ativo',
    observacoes: 'Cliente desde 2022. Contrato de revisão preventiva a cada 4.000h.'
  }
]

export function getClienteByNome(nome: string): Cliente | undefined {
  return clientesData.find(c => c.nome === nome)
}
