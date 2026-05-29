# Frontend Agent 编程规范

> 本文档供 AI Agent 读取，只包含**约束和决策规则**，不含示例代码。
> 生成任何代码前，必须完整读取本文档。
>
> **最后更新**: 2026-05-27 ｜ **维护者**: 剡溪

---

## 一、技术栈（锁定，不得替换）

| 类别 | 选型 |
|------|------|
| 框架 | React 18+ |
| 语言 | TypeScript 5+，严格模式 |
| 构建 | Vite 5+ |
| 样式 | CSS Modules（**强制**，禁止 Tailwind CSS） |
| 状态 | Zustand 4+ |
| 路由 | React Router v6+ |
| 表单 | React Hook Form + Zod |
| HTTP | Axios（统一封装，禁止裸调用） |
| 类名拼接 | clsx（禁止模板字符串拼接类名） |
| 测试 | Vitest + React Testing Library |

---

## 二、目录结构与文件职责

```
src/
├── components/     # 纯 UI 组件，无业务逻辑，跨项目可复用
├── features/       # 业务领域模块（见下方结构）
├── hooks/          # 全局自定义 Hooks
├── layouts/        # 布局组件
├── pages/          # 页面组件，与路由一一对应
├── routes/         # 路由集中配置（禁止分散到页面内）
├── services/       # axios 实例 + 拦截器
├── store/          # 全局 Zustand store
├── types/          # 全局 TypeScript 类型
├── utils/          # 纯函数工具
├── constants/      # 常量（含环境变量统一出口）
└── assets/styles/  # globals.css、CSS 变量定义
```

**features 内部结构（每个领域自治）：**
```
features/<domain>/
├── components/   hooks/   services/   store/   types/
└── index.ts      ← 对外唯一出口，禁止跨领域引用内部文件
```

**组件文件夹结构（必须）：**
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
├── ComponentName.test.tsx
└── index.ts
```

---

## 三、命名规则

| 对象 | 规则 |
|------|------|
| 组件文件/文件夹 | PascalCase |
| 页面组件 | PascalCase + `Page` 后缀 |
| Hook 文件 | camelCase + `use` 前缀 |
| Store 文件 | camelCase + `Store` 后缀 |
| 工具/常量文件 | camelCase |
| 样式文件 | 与组件同名 + `.module.css` |
| CSS 类名 | camelCase |
| 常量值 | UPPER_SNAKE_CASE |
| 环境变量 | `VITE_` 前缀 + UPPER_SNAKE_CASE |
| 事件处理函数 | `handle` 前缀（如 `handleSubmit`） |
| 布尔变量 | `is` / `has` / `should` 前缀 |

---

## 四、TypeScript 强制规则

- **禁止 `any`**。确实需要时加 `// eslint-disable-next-line @typescript-eslint/no-explicit-any` 并注释原因
- 对象类型用 `interface`，联合类型 / 工具类型用 `type`
- 组件 Props 必须定义 interface，函数参数和返回值必须显式声明类型
- API 响应必须用泛型包装，禁止裸 `object` 或 `any`：
  ```
  ApiResponse<T>  /  PageResult<T>  /  ApiResponse<PageResult<T>>
  ```
- 纯类型导入统一使用 `import type`
- 从 Zod schema 推导表单类型：`type FormValues = z.infer<typeof schema>`，禁止手动维护两份类型

**全局类型约定（放在 `src/types/api.ts`）：**
```
ApiResponse<T>   → { code, message, data: T }
PageResult<T>    → { list, total, page, pageSize }
PageQuery        → { page, pageSize, ...filters }
ApiErrorResponse → { code, message }
```

---

## 五、组件规范

**组件内部书写顺序（必须）：**
1. imports
2. 类型定义（interface Props）
3. 组件函数
4. Hooks（useState → 自定义 hooks → 第三方 hooks）
5. 派生状态（无副作用的计算变量）
6. 事件处理函数（handle 前缀）
7. useEffect
8. return JSX
9. export default

**导出规则：**
- 组件文件：`export default`
- index.ts：`export { default as Foo } from './Foo'`

**性能优化规则（只在必要时使用）：**
- `React.memo`：仅用于 props 不频繁变化且渲染开销大的纯展示组件
- `useCallback`：仅用于传递给 memo 子组件的回调，或作为 useEffect 依赖
- `useMemo`：仅用于计算开销大的派生数据，禁止用于简单表达式
- 列表 `key`：必须使用业务 ID，**禁止使用数组 index**
- 页面组件全部使用 `React.lazy` + `Suspense` 懒加载

---

## 六、样式规则（CSS Modules 强制）

- **禁止 Tailwind CSS**，所有样式写 `.module.css`
- 多条件类名用 `clsx()`，**禁止**模板字符串拼接
- **禁止内联 style**（动态计算值如进度条宽度除外）
- CSS 类名使用 camelCase
- 样式值优先使用 `globals.css` 中定义的 CSS 变量，禁止硬编码颜色、间距

---

## 七、路由规则

- 路由**集中**配置在 `src/routes/`，禁止分散
- 所有页面组件必须懒加载（`React.lazy`）
- 鉴权逻辑封装为 `<PrivateRoute>`，未登录重定向 `/auth/login`，无权限重定向 `/403`

---

## 八、API 层规则

- 唯一 axios 实例在 `src/services/apiClient.ts`，统一配置 baseURL / timeout / 拦截器
- 请求拦截器自动注入 Bearer token（从 `useAuthStore.getState()` 读取）
- 响应拦截器处理 401（自动登出跳转）和全局错误 toast，**组件层禁止重复处理网络错误**
- API 函数统一以 `xxxService` 对象导出，**禁止在组件或 Hook 内直接调用 axios**
- 环境变量通过 `src/constants/` 统一导出，**禁止在业务代码中直接读取 `import.meta.env`**

---

## 九、状态管理规则

**选型决策（必须遵守）：**

| 场景 | 方案 |
|------|------|
| 组件内 UI 状态（弹窗、输入值） | `useState` |
| 同一 feature 内跨组件共享 | 状态提升 或 Context |
| 全局认证 / 用户信息 / 全局 UI | Zustand（`src/store/`） |
| 领域服务端数据缓存 | Zustand（`features/*/store/`） |

**Zustand 使用规则：**
- store 内 State 和 Actions 必须分区注释
- 需持久化的 store 使用 `persist` middleware，`partialize` 只序列化必要字段
- 组件内只订阅需要的字段：`useXxxStore(state => state.field)`
- **禁止**：`const store = useXxxStore()`（订阅整个 store）
- 非组件环境（如拦截器）用 `useXxxStore.getState()`

---

## 十、错误处理规则

- 每个**页面级组件**外层包裹 `<ErrorBoundary>`
- 关键业务模块（支付、核心表单）单独包裹 `<ErrorBoundary>`
- 异步数据请求逻辑封装在自定义 Hook 内，**禁止**在组件内直接 try/catch 处理数据
- 请求状态统一用 `status: 'idle' | 'loading' | 'success' | 'error'` 管理

---

## 十一、表单规则

- 所有表单使用 React Hook Form + Zod
- 必须先定义 Zod schema，再用 `z.infer` 推导类型，禁止手写表单类型
- 使用 `zodResolver` 连接校验，错误信息从 `formState.errors` 读取并展示在字段下方

---

## 十二、环境变量规则

- 变量名必须以 `VITE_` 开头
- 所有环境变量必须在 `src/vite-env.d.ts` 的 `ImportMetaEnv` 中声明
- **禁止**在业务代码中直接使用 `import.meta.env.VITE_XXX`，统一在 `src/constants/` 封装后导出

---

## 十三、测试规则

**必须写测试：** `utils/` 工具函数、自定义 Hooks、纯展示组件、表单组件

**建议写测试：** 页面组件关键交互路径、API service 函数

---

## 十四、导入顺序（必须）

```
1. React 核心
2. 第三方库（react-router-dom、react-hook-form、clsx、dayjs…）
3. @ 别名导入（components、store、hooks、utils、constants）
4. 相对路径导入
5. 样式文件（最后）
6. import type（纯类型，可穿插在对应分组）
```

路径别名：`@` → `src/`，禁止使用三层以上相对路径 `../../../`

---

## 十五、生成代码前的检查清单

### 🔴 必查（AI 最常出错的点）
- [ ] 没有使用 Tailwind CSS 类名
- [ ] 没有使用 `any`
- [ ] 没有在组件内直接调用 axios
- [ ] 没有订阅整个 Zustand store（`useXxxStore()` 无参数）
- [ ] 列表 key 不是数组 index
- [ ] 没有在业务代码中直接读取 `import.meta.env`

### 🟡 常规检查
- [ ] 使用函数组件（class 组件仅 ErrorBoundary 一处例外）
- [ ] 组件有 Props interface，API 响应用 `ApiResponse<T>` 包装
- [ ] 多条件类名用 `clsx`，不用模板字符串
- [ ] 异步逻辑在 Hook 内，组件只消费状态
- [ ] 页面级包裹了 ErrorBoundary
- [ ] 表单使用 RHF + Zod，类型从 schema 推导
- [ ] 组件文件夹有 `index.ts`，页面文件名以 `Page` 结尾