## Projeto Países

#### Projeto consiste em executar as seguintes tarefas:

(✓) Criar variáveis de estado da aplicação
(✓) Criar eventListnener de load com função start
(✓) Implementar start() com mapeamento de elementos 
   do DOM e invocação à função fetchCountries
(✓) Implementar fetchCountries() com async/await 
   com busca em 'https://restcountries.eu/rest/v2/all' 
   e transformação para obtenção de id, name, population e flag. 
   Ao final, invocar render();
(✓) Implementar render(), com invocação a funções menores: 
   renderCountryList, renderFavorites, renderSummary e handleCountryButtons.
(✓) Implementar renderCountryList com template literals.
(✓) Implementar renderFavorites com template literals.
(✓) Implementar renderSummary com reduce.
(✓) Implementar handleCountryButtons com querySelectorAll 
   e foreach, adicionando listener nos botões passando button.id
(✓) Implementar addToFavorites(id)
(✓) Implementar removeFromFavorites(id)
(✓) Implementar formatação de valores numéricos
