# ModaLink Mobile App

Aplicativo React Native (Expo) para gestão de moda/varejo. Backend em .NET rodando em `localhost:5020/api`.

---

## Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Expo SDK | 57 |
| UI | React Native | 0.86 |
| Linguagem | TypeScript | ~6.0 |
| Navegação | Expo Router | ~57.0.3 |
| Estado (servidor) | TanStack React Query | ^5.101 |
| Estado (cliente) | Zustand | ^5.0 |
| Formulários | React Hook Form + Zod | ^7.80 / ^4.4 |
| HTTP | Axios | ^1.18 |
| Storage | AsyncStorage | ^3.1 |
| Animações | Reanimated | 4.5 |
| Ícones | Ionicons (@expo/vector-icons) | ^15.0 |

---

## Estrutura de Pastas

```
src/
├── app/                    # Rotas (Expo Router - file-based)
│   ├── _layout.tsx         # Root layout (Stack + Providers)
│   ├── index.tsx           # Gate de autenticação
│   ├── login.tsx           # Rota → LoginScreen
│   ├── register.tsx        # Rota → RegisterScreen
│   ├── dashboard.tsx       # Rota → DashboardScreen
│   ├── catalog.tsx         # Rota → CatalogScreen
│   └── product-detail/
│       └── [id].tsx        # Rota dinâmica produto
│
├── screens/                # Telas com lógica de negócio
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── dashboard/
│   │   └── DashboardScreen.tsx
│   └── catalog/
│       └── CatalogScreen.tsx
│
├── components/
│   └── common/             # Componentes reutilizáveis
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── EmptyState.tsx
│       ├── ErrorState.tsx
│       ├── Header.tsx
│       ├── Input.tsx
│       ├── Loader.tsx
│       └── Screen.tsx
│
├── config/
│   └── providers.tsx       # QueryClientProvider + AuthProvider
│
├── contexts/
│   └── AuthContext.tsx      # Autenticação (login/logout/token)
│
├── services/
│   ├── api.ts              # Instância Axios (baseURL: localhost:5020/api)
│   ├── authService.ts      # (vazio)
│   └── productsService.ts  # (vazio)
│
├── store/
│   ├── index.ts            # Zustand store (isReady)
│   ├── favoritesStore.ts   # Favoritos com AsyncStorage
│   └── cartStore.ts        # Carrinho com AsyncStorage
│
├── theme/
│   ├── colors.ts           # Paleta de cores (primary purple, neutral, semantic)
│   ├── spacing.ts          # Escala de espaçamento (2-64px)
│   ├── typography.ts       # Fontes, tamanhos, pesos
│   ├── radius.ts           # Border radius
│   └── shadows.ts          # Sombras (iOS/Android aware)
│
├── types/
│   └── index.ts            # BaseResponse, PaginatedResponse, BaseEntity, Product, ProductCategory
│
└── utils/
    └── index.ts            # cn(), formatCurrency(), formatDate(), calcDiscount()
```

---

## Arquitetura

```
Rota (src/app/)           →  Arquivo fino que delega para Screen
   ↓
Screen (src/screens/)     →  Lógica de negócio, hooks, estado
   ↓
Components (src/components/) → UI reutilizável
   ↓
Services (src/services/)  → Chamadas HTTP (Axios)
   ↓
Store (src/store/)        → Estado do cliente (Zustand)
Context (src/contexts/)   → Estado global (Auth)
```

---

## Fluxo de Navegação

```
App Inicia
    │
    ▼
_index.tsx (gate de auth)
    │
    ├── Não autenticado → /login
    │                        │
    │                        └── /register → volta para /login
    │
    └── Autenticado → /dashboard
                        │
                        ├── /catalog → /product-detail/[id]
                        ├── /favorites (não implementado)
                        ├── /cart (não implementado)
                        ├── /orders (não implementado)
                        ├── /customers (não implementado)
                        └── /promotions (não implementado)
```

---

## Fluxo de Autenticação

1. Usuário faz login → `POST /auth/login`
2. Resposta: `{ token, userName, userEmail }`
3. Token salvo em `@ModalinkApp:token` (AsyncStorage)
4. Token setado no Axios: `api.defaults.headers.Authorization = Bearer {token}`
5. Usuário salvo em `@ModalinkApp:user`
6. Na inicialização, AuthContext verifica se existe token/user e restaura sessão

---

## Endpoints da API

| Método | Endpoint | Usado em | Descrição |
|--------|----------|----------|-----------|
| POST | `/auth/login` | AuthContext | Login, retorna token + dados user |
| POST | `/auth/register` | RegisterScreen | Criar conta |
| GET | `/dashboard` | DashboardScreen | Métricas + pedidos recentes |
| GET | `/products` | CatalogScreen | Listar produtos (search, categoryId, limit) |
| GET | `/products/categories` | CatalogScreen | Listar categorias |

---

## Design System (Theme)

**Cor principal:** Purple `#6D28FF`

| Token | Uso |
|-------|-----|
| `colors.primary[50-900]` | tons de roxo |
| `colors.secondary[50-900]` | tons de lilás |
| `colors.neutral[50-950]` | cinzas |
| `colors.success/error/warning/info` | semânticas |
| `spacing.xxs-7xl` | de 2px a 64px |
| `typography.fontSize.xs-5xl` | de 12px a 48px |
| `shadows.sm/md/lg/xl` | sombras por plataforma |

---

## Comandos

```bash
# Iniciar dev server
npm start

# Android / iOS / Web
npm run android
npm run ios
npm run web

# Typecheck
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

---

## Checklist do que falta

### Rotas / Telas
- [ ] `/favorites` — Tela de favoritos
- [ ] `/cart` — Tela do carrinho
- [ ] `/orders` — Lista de pedidos
- [ ] `/order/[id]` — Detalhe de um pedido
- [ ] `/customers` — Lista de clientes
- [ ] `/promotions` — Tela de promoções
- [ ] Melhorar `/product-detail/[id]`

### Services (vazios)
- [ ] `authService.ts` — Mover chamadas de login/register
- [ ] `productsService.ts` — Mover chamadas de products/categories

### Configuração
- [ ] Criar `.env` com `EXPO_PUBLIC_API_URL`
- [ ] Interceptors Axios (token refresh, erros 401)

### Components / Hooks
- [ ] `src/hooks/` — useDebounce, useKeyboard
- [ ] `src/components/forms/` — Formulários reutilizáveis
- [ ] `src/components/layout/` — Modals, Sheets

### Constants
- [ ] `src/constants/routes.ts` — Nomes das rotas
- [ ] `src/constants/storageKeys.ts` — Chaves AsyncStorage

### Extras
- [ ] NativeWind/Tailwind (README menciona mas não instalado)
- [ ] Skeleton para DashboardScreen
- [ ] Tratamento de erro global (toast/snackbar)
- [ ] Conectar carrinho ao catálogo (adicionar ao clicar no produto)

---

## Backend

O backend está em `/home/luis-pc/Projetos/modalink/backend/` (.NET, `ModaLink.sln`). Roda na porta 5020.
