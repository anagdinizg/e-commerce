# E-commerce Vue.js + Vuetify

Um e-commerce completo desenvolvido com Vue.js 3 e Vuetify 3, implementando todas as funcionalidades essenciais de uma loja online.

## 🚀 Funcionalidades

### ✅ Catálogo de Produtos

- Listagem de produtos com cards informativos
- Filtros por categoria e busca por nome
- Ordenação por nome e preço
- Layout responsivo

### ✅ Detalhes do Produto

- Página dedicada para cada produto
- Galeria de imagens
- Informações detalhadas
- Botão "Adicionar ao Carrinho"

### ✅ Carrinho de Compras

- Adicionar/remover produtos
- Alterar quantidades
- Cálculo automático de subtotais e total
- Drawer lateral para acesso rápido

### ✅ Checkout Avançado

- Formulário completo de dados pessoais
- Integração com API ViaCEP
- Preenchimento automático de endereço
- Validação de campos e tratamento de erros
- Acessibilidade (ARIA labels, foco automático)

### ✅ Integração ViaCEP

- Busca automática por CEP
- Preenchimento de logradouro, bairro, cidade e UF
- Tratamento de erros:
  - CEP incompleto/inválido
  - CEP não encontrado
  - Falhas de rede
- Campos editáveis para correções manuais

## 🛠 Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript reativo
- **Vuetify 3** - Framework de componentes Material Design
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento SPA
- **Vite** - Build tool e dev server
- **API ViaCEP** - Consulta de CEPs

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Passos para instalação

1. **Criar projeto Vue:**

   ```bash
   npm create vue@latest ecommerce-vue
   ```

2. **Configurar opções:**
   - Vue Router: ✅ Yes
   - Pinia: ✅ Yes
   - ESLint: ✅ Yes
   - Prettier: ✅ Yes

3. **Instalar dependências:**

   ```bash
   cd ecommerce-vue
   npm install
   npm install vuetify @mdi/font v-mask
   ```

4. **Executar em desenvolvimento:**

   ```bash
   npm run dev
   ```

5. **Acessar aplicação:**
   ```
   http://localhost:5173
   ```

## 🏗 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ProductCard.vue     # Card do produto
│   ├── CartDrawer.vue      # Drawer do carrinho
│   └── CheckoutForm.vue    # Formulário de checkout
├── views/              # Páginas da aplicação
│   ├── HomeView.vue        # Página inicial (catálogo)
│   ├── ProductView.vue     # Detalhes do produto
│   └── CheckoutView.vue    # Finalização de compra
├── stores/             # Gerenciamento de estado
│   ├── products.js         # Estado dos produtos
│   └── cart.js             # Estado do carrinho
├── services/           # Serviços externos
│   └── cep.js              # Integração ViaCEP
├── utils/              # Utilitários
│   └── currency.js         # Formatação de moeda
└── plugins/            # Plugins
    └── vuetify.js          # Configuração Vuetify
```

## 🎯 Conceitos Implementados

### JavaScript Moderno

- ✅ **Arrow Functions**: Uso extensivo em métodos e callbacks
- ✅ **Higher-Order Functions**: map, filter, reduce, find
- ✅ **Async/Await**: Requisições assíncronas para ViaCEP
- ✅ **Destructuring**: Desestruturação de objetos e arrays
- ✅ **Template Literals**: Strings dinâmicas
- ✅ **Modules**: Import/Export ES6

### Programação Orientada a Objetos

- ✅ **Classes**: CepService como classe utilitária
- ✅ **Encapsulamento**: Métodos privados e públicos
- ✅ **Abstração**: Serviços especializados

### Manipulação do DOM e Eventos

- ✅ **Event Handling**: Eventos de click, submit, input
- ✅ **Refs**: Acesso direto a elementos DOM
- ✅ **Watchers**: Reatividade em mudanças de estado
- ✅ **Lifecycle**: Hooks do Vue.js

### Tratamento de Erros

- ✅ **Try/Catch**: Captura de erros em requisições
- ✅ **Validações**: Campos obrigatórios e formatos
- ✅ **Feedback Visual**: Mensagens de erro e sucesso
- ✅ **Fallbacks**: Comportamento alternativo em falhas

### Acessibilidade (A11y)

- ✅ **ARIA Labels**: aria-live para leitores de tela
- ✅ **Foco Automático**: Navegação por teclado
- ✅ **Semântica**: HTML semântico correto
- ✅ **Contraste**: Cores acessíveis

## 🎨 Features de UX/UI

### Responsividade

- Design mobile-first
- Breakpoints Vuetify
- Layout flexível

### Interatividade

- Loading states
- Animações suaves
- Feedback visual
- Estados hover

### Navegação

- SPA (Single Page Application)
- Roteamento dinâmico
- Breadcrumbs visuais
- Drawer lateral

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## 🌟 Melhorias Implementadas

### Performance

- Lazy loading de imagens
- Debounce em buscas
- Estados de loading
- Otimização de re-renders

### Usabilidade

- Máscara em campos (CEP, telefone)
- Auto-preenchimento de endereço
- Validação em tempo real
- Confirmações visuais

### Robustez

- Tratamento de edge cases
- Estados de erro
- Fallbacks de rede
- Validações client-side
