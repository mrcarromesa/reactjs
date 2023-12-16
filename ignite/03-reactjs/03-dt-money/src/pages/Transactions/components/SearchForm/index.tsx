import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../../../context/TransactionsContext";
import { useContextSelector } from "use-context-selector";


const searchFormSchema = z.object({
  query: z.string(),
})

// Diz qual a typagem do formulario
type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {

  const fetchTransactions  = useContextSelector(TransactionContext, (context) => {
    return context.fetchTransactions
  })

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return(
  <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
    <input 
      type="text" 
      placeholder="Busque por transações" 
      {...register('query')}
    />
    <button type="submit" disabled={isSubmitting}>
      <MagnifyingGlass size={20} />
      Buscar
    </button>
  </SearchFormContainer>)
}