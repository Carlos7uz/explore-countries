# 🌍 Explorador de Países

Desafio técnico desenvolvido para a vaga de Desenvolvedor na **Bclouder**, consumindo a API pública [REST Countries](https://restcountries.com/). O objetivo da aplicação é listar, buscar, filtrar e exibir detalhes completos sobre os países do mundo, com foco em uma experiência de usuário (UX) fluida e código escalável.

## 🚀 Tecnologias Utilizadas

- **Angular 19** (Standalone Components, Signals, Control Flow `@if/@for`)
- **Angular Material** (Cards, Chips, Buttons, Spinners, Selects, Inputs)
- **SCSS** (Responsividade e Variáveis CSS)
- **RxJS** (Consumo reativo da API REST)
- **TypeScript** (Tipagem forte com interfaces estritas)

## 💻 Como rodar o projeto localmente

Siga os passos abaixo para executar a aplicação na sua máquina:

1. Clone este repositório:
   git clone [https://github.com/Carlos7uz/explore-countries.git](https://github.com/Carlos7uz/explore-countries.git)


2. Acesse a pasta do projeto:
cd NOME_DO_REPOSITORIO

3. Instale as dependências:
npm install

4. Inicie o servidor de desenvolvimento:
ng serve

5. Abra o navegador e acesse: `http://localhost:4200/`

## 🧠 Decisões Técnicas e Arquitetura

Para entregar um projeto robusto, escalavel, limpo e com alta performance, tomei as seguintes decisões:

1. **Gerenciamento de Estado com Signals:**
Optei por usar `signal` e `computed` nativos do Angular moderno em vez de gerenciar o estado local com complexos `BehaviorSubjects` ou bibliotecas externas (como NgRx). Isso garantiu que a filtragem e a ordenação dos países ocorressem de forma síncrona, reativa e altamente performática diretamente na Home.
2. **Otimização de Performance e Lazy Loading:**
Na estratégia de roteamento (`app.routes.ts`), utilizei o `loadComponent` para a página de detalhes (`CountryDetailComponent`). Isso faz com que o *bundle* dessa tela só seja carregado sob demanda (Lazy Loading). Além disso, consumi a propriedade `title` nativa do router para SEO e acessibilidade.
3. **Tipagem Estrita e Redução de Payload:**
Evitei o uso de `any`. Criei interfaces dedicadas (`Country`, `BorderCountry`) para mapear os retornos da API. Além disso, na busca por países fronteiriços, utilizei a query param `?fields=name,cca3` na requisição HTTP para transitar apenas os bytes necessários, poupando banda e memória.
4. **Tratamento de Edge Cases (UX):**
A aplicação foi pensada para não deixar o usuário "no escuro". Implementei *Loading States* (com `mat-spinner`), *Error States* (caso a API falhe ou a rota não exista, redirecionando para um componente Not Found), e *Empty States* (caso a busca não retorne resultados).
5. **Design System com CSS Variables:**
Centralizei cores e sombras em variáveis globais no SCSS (`--color-primary`, `--color-bg-surface`). Isso facilitou a padronização das cores nos componentes do Material e preparou o terreno para a fácil implementação de um *Dark Mode* no futuro.

## ⏱️ O que eu faria diferente com mais tempo

Se houvesse mais tempo para evolução técnica da aplicação, implementaria:

1. **Testes Unitários:** Utilizaria Jasmine/Karma ou Jest para garantir a cobertura dos métodos principais, especialmente a lógica do `computed` que filtra e ordena os países, e os retornos do `CountriesService`.
2. **Dark Mode Toggle:** Como toda a estrutura de cores já está mapeada em variáveis CSS globais, criaria um botão no Header e um Service genérico para alternar a classe do `body` e persistir a escolha no `localStorage`.
3. **Virtual Scrolling ou Paginação:** A API retorna mais de 250 países de uma vez. Embora os navegadores modernos lidem bem com isso usando o `OnPush` do Angular, para dispositivos muito antigos, a implementação de um `Virtual Scroll` do Angular CDK melhoraria o tempo de renderização no DOM.

---

Desenvolvido por **Carlos Pilati**.

[Meu LinkedIn](https://www.linkedin.com/in/carlos-roberto-dos-santos-pilati-luz-978b78258/) | [Meu GitHub](https://github.com/Carlos7uz)


