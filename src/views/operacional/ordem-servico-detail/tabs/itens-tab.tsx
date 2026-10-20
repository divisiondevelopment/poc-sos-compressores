// Type Imports
import type { OrdemServico } from '@/fake-db/operacional/ordens-servico'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Util Imports
import { formatCurrencyBRL } from '@/lib/utils'

export interface ItensTabProps {
  ordem: OrdemServico
}

export function ItensTab({ ordem }: ItensTabProps) {
  const total = ordem.itens.reduce((sum, item) => sum + item.quantidade * item.valorUnitario, 0)

  return (
    <Card className='py-0'>
      <CardContent className='px-0'>
        <Table>
          <TableHeader>
            <TableRow className='h-14 border-t'>
              <TableHead className='text-muted-foreground pl-4'>Descrição</TableHead>
              <TableHead className='text-muted-foreground'>Quantidade</TableHead>
              <TableHead className='text-muted-foreground'>Valor Unitário</TableHead>
              <TableHead className='text-muted-foreground pr-4 text-right'>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordem.itens.map(item => (
              <TableRow key={item.id}>
                <TableCell className='pl-4'>{item.descricao}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell>{formatCurrencyBRL(item.valorUnitario)}</TableCell>
                <TableCell className='pr-4 text-right'>
                  {formatCurrencyBRL(item.quantidade * item.valorUnitario)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className='pl-4 text-right font-semibold'>
                Total
              </TableCell>
              <TableCell className='pr-4 text-right font-semibold'>{formatCurrencyBRL(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
