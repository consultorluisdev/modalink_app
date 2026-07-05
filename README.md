# ModaLink

## Stack

- **React Native** + **Expo** (SDK 57)
- **TypeScript**
- **Expo Router** (file-based navigation)
- **NativeWind** (Tailwind CSS for RN)
- **Zustand** (state management)
- **TanStack React Query** (server state)
- **Axios** (HTTP client)
- **React Hook Form** + **Zod** (forms/validation)

## Estrutura

```
src/
├── app/              # Expo Router pages
├── assets/           # fonts, icons, images
├── components/
│   ├── common/       # Button, Input, Card, etc.
│   ├── forms/        # form components
│   └── layout/       # layout components
├── config/           # providers & app config
├── constants/        # app constants
├── hooks/            # custom hooks
├── navigation/       # route definitions
├── screens/          # full screen components
├── services/         # API client (Axios)
├── store/            # Zustand stores
├── theme/            # colors, spacing, typography
├── types/            # TS types/interfaces
└── utils/            # helpers
```

## Como executar

```bash
npm install
npx expo start
```

Scaneie o QR code com o app Expo Go, ou pressione:
- `a` para Android emulator
- `i` para iOS simulator
- `w` para web
