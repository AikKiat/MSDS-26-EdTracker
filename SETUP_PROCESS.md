1. Installed vite project via:
```bash
npm create vite@latest

#Created project name called test
#Selected React
#Selected Typescript
#Selected ESLint 
#Selected yes
```

2. Installed tailwincss via these steps:
    ```
    npm install tailwindcss @tailwindcss/vite
    ```
    Changed vite.config.ts file to this:
    ```typescript
    import { defineConfig } from 'vite'
    import tailwindcss from '@tailwindcss/vite'
    export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    })
    ```

    Added this line to test/src/index.css:
    ```
    @import "tailwindcss";
    ```

3. Added this block to the tsconfig.json file:
```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
```

4. Installed shadn UI library via:
```bash
npx shadcn@latest init

#Select Nova
#Select Base UI
```
