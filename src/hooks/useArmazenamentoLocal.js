import { useEffect, useState } from 'react'

// Hook personalizado: funciona como o useState, mas guarda o valor no localStorage do navegador.
// Assim o valor continua lá depois de recarregar a página.
// Uso: const [valor, setValor] = useArmazenamentoLocal('minha-chave', valorInicial)
export function useArmazenamentoLocal(chave, valorInicial) {
  // Passar uma função para o useState faz a leitura acontecer só na primeira renderização
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave)
      // O localStorage só guarda texto, então o valor é salvo em JSON
      return salvo !== null ? JSON.parse(salvo) : valorInicial
    } catch {
      // Navegador sem acesso ao armazenamento (ex.: modo privado restrito): usa o valor inicial
      return valorInicial
    }
  })

  // Sempre que o valor mudar, grava a nova versão
  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      // Sem armazenamento disponível, o valor continua funcionando só na memória
    }
  }, [chave, valor])

  return [valor, setValor]
}
