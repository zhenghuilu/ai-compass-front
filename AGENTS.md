# agents.md - 前端项目代码风格与规范指南

本文档用于指导 AI 助手生成符合本项目标准的代码。请严格遵循以下规范。

## 一、项目技术栈

- **框架**: React 18+
- **语言**: TypeScript (严格模式)
- **构建工具**: Vite
- **样式方案**: CSS Modules (强制使用，禁止 Tailwind CSS)
- **包管理器**: npm

## 二、目录结构规范

### 2.1 核心目录职责

```
src/
├── components/        # 纯 UI 组件，无业务逻辑，跨项目可复用
├── features/         # 业务功能模块，按领域划分
├── hooks/            # 全局自定义 Hooks
├── layouts/          # 布局组件
├── pages/            # 页面组件，与路由对应
├── routes/           # 路由配置
├── services/         # API 服务层
├── store/            # 全局状态管理
├── types/            # 全局 TypeScript 类型
├── utils/            # 工具函数
└── assets/           # 静态资源
    └── styles/       # 全局样式文件
```

### 2.2 组件内部结构

每个独立组件使用文件夹组织：

```
ComponentName/
├── ComponentName.tsx        # 组件实现
├── ComponentName.module.css # 组件样式 (CSS Modules，强制)
├── ComponentName.test.tsx   # 单元测试
└── index.ts                 # 仅导出: export { ComponentName } from './ComponentName'
```

### 2.3 样式文件组织

```
src/assets/styles/
├── globals.css       # 全局样式 (CSS 变量、reset、基础样式)
├── variables.css     # CSS 变量定义
└── mixins.css        # 全局 mixins (如使用 CSS 预处理器)
```

## 三、命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `Button.tsx`, `UserProfile.tsx` |
| 组件文件夹 | PascalCase | `Button/`, `UserProfile/` |
| Hook 文件 | camelCase，use 前缀 | `useAuth.ts`, `useDebounce.ts` |
| 工具函数文件 | camelCase | `formatDate.ts`, `validateEmail.ts` |
| 类型定义文件 | camelCase 或 index.ts | `userTypes.ts`, `index.ts` |
| 常量文件 | camelCase 或 constants.ts | `apiEndpoints.ts` |
| 样式文件 | 与组件同名，`.module.css` 后缀 | `Button.module.css` |
| 页面文件 | PascalCase + Page 后缀 | `HomePage.tsx`, `AboutPage.tsx` |
| CSS 类名 | camelCase | `.primaryButton`, `.userAvatar` |

### 3.1 代码命名

```typescript
// 组件: PascalCase
const UserProfile: React.FC = () => { ... }

// Hook: camelCase + use 前缀
const useAuthStatus = () => { ... }

// 类型/接口: PascalCase
interface UserInfo { ... }
type StatusType = 'active' | 'inactive';

// 常量: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// 变量/函数: camelCase
const getUserData = () => { ... }
const isLoggedIn = true;
```

## 四、TypeScript 规范

### 4.1 强制要求

- **禁止使用 `any`**：除非有充分理由并添加注释说明
- **优先使用 `interface`** 定义对象类型，`type` 用于联合类型、工具类型
- **组件 Props 必须定义类型**
- **函数参数和返回值必须显式声明类型**

### 4.2 示例

```typescript
// ✅ 正确
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// ❌ 错误 - 使用 any
const Button = ({ onClick, data }: any) => { ... }

// ❌ 错误 - Props 无类型
const Button = ({ label, onClick }) => { ... }

// ❌ 错误 - 隐式 any
const handleData = (data) => { ... }
```

## 五、React 组件规范

### 5.1 组件结构顺序

```typescript
// 1. imports (按分组排序)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import styles from './MyComponent.module.css';

// 2. 类型定义
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

// 3. 组件定义
const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  // 4. Hooks (useState, useEffect, 自定义 hooks)
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  
  // 5. 事件处理函数
  const handleClick = () => {
    setCount(prev => prev + 1);
    onAction?.();
  };
  
  // 6. 副作用
  useEffect(() => {
    // effect logic
    return () => {
      // cleanup
    };
  }, []);
  
  // 7. 条件渲染/辅助变量
  const isDisabled = count === 0;
  
  // 8. 渲染
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <button 
        className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
        onClick={handleClick} 
        disabled={isDisabled}
      >
        Count: {count}
      </button>
    </div>
  );
};

// 9. 导出
export default MyComponent;
```

### 5.2 导出方式

```typescript
// 组件文件: 使用默认导出
export default MyComponent;

// index.ts: 使用命名导出
export { MyComponent } from './MyComponent';

// 统一导出 (components/index.ts)
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';
```

## 六、CSS Modules 样式规范（强制）

### 6.1 基础使用

本项目强制使用 CSS Modules，禁止使用 Tailwind CSS 或其他原子化 CSS 框架。

```tsx
// ✅ 正确 - 使用 CSS Modules
import styles from './Button.module.css';

<button className={styles.primaryButton}>
  Click me
</button>

// ✅ 正确 - 组合多个类名
<div className={`${styles.container} ${styles.active}`}>
  Content
</div>

// ✅ 正确 - 条件类名
<div className={isActive ? styles.active : styles.inactive}>
  Content
</div>

// ❌ 错误 - 禁止使用 Tailwind 类名
<button className="bg-blue-500 text-white px-4 py-2">
  Click me
</button>

// ❌ 错误 - 禁止内联样式（除非动态计算值）
<div style={{ color: 'red' }}>Content</div>
```

### 6.2 CSS 文件规范

```css
/* Button.module.css */
/* 使用 camelCase 命名类名 */
.primaryButton {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.primaryButton:hover {
  background-color: var(--color-primary-dark);
}

.primaryButton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.secondaryButton {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

/* 支持嵌套选择器 */
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.cardHeader {
  background-color: #f5f5f5;
  padding: 12px 16px;
  font-weight: bold;
}

.cardBody {
  padding: 16px;
}
```

### 6.3 全局样式

```css
/* src/assets/styles/globals.css */
:root {
  /* CSS 变量定义 */
  --color-primary: #1890ff;
  --color-primary-dark: #096dd9;
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-error: #ff4d4f;
  --color-white: #ffffff;
  --color-black: #000000;
  --color-text: #333333;
  --color-text-secondary: #666666;
  --color-border: #e0e0e0;
  --color-background: #f5f5f5;
  
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* 圆角 */
  --border-radius-sm: 2px;
  --border-radius-md: 4px;
  --border-radius-lg: 8px;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
  background-color: var(--color-background);
}
```

### 6.4 CSS 最佳实践

```css
/* ✅ 推荐 - 使用 CSS 变量 */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
}

/* ✅ 推荐 - BEM 命名思想结合 camelCase */
.cardContainer { }
.cardContainer__header { }
.cardContainer__body { }
.cardContainer--large { }

/* ❌ 避免 - 过深的选择器嵌套 */
.container .wrapper .content .button .icon { }

/* ❌ 避免 - 使用 ID 选择器 */
#submitButton { }
```

## 七、导入顺序规范

```typescript
// 1. React 核心
import React, { useState, useEffect, useCallback } from 'react';

// 2. 第三方库
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

// 3. 路径别名导入 (@)
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/formatDate';

// 4. 相对路径导入 (同级/父级)
import { helpers } from '../utils/helpers';
import { apiClient } from '../services/apiClient';

// 5. 样式文件 (最后导入)
import styles from './MyComponent.module.css';
import '@/assets/styles/globals.css';

// 6. 类型导入 (可选，可放在对应区域)
import type { User } from '@/types/user';
import type { ApiResponse } from '@/types/api';
```

## 八、路径别名配置

本项目使用 `@` 作为 `src` 目录的别名：

```typescript
// ✅ 正确 - 使用 @ 别名
import Button from '@/components/Button/Button';
import { formatDate } from '@/utils/formatDate';
import { useAuth } from '@/hooks/useAuth';
import { UserProfile } from '@/features/user/components/UserProfile';

// ❌ 错误 - 避免深层相对路径
import Button from '../../../components/Button/Button';
import { formatDate } from '../../utils/formatDate';
```

## 九、代码格式化规范

### 9.1 缩进与空格

- 使用 2 个空格缩进（禁止使用 Tab）
- 行尾不加分号 
- 使用单引号 
- 每行最多 100 个字符 
- 文件末尾保留一个空行 

### 9.2 示例

```typescript
// ✅ 正确格式
const handleSubmit = (data: FormData) => {
  const result = apiCall(data)
  return result
}

// ❌ 错误格式
const handleSubmit=(data:FormData)=>{
    const result=apiCall(data);
    return result;
}
```

## 十、Git 提交规范

```bash
# 格式: <type>(<scope>): <subject>

# 功能开发
feat: 添加用户登录功能
feat(auth): 实现 JWT token 刷新逻辑

# Bug 修复
fix: 修复按钮点击无响应问题
fix(modal): 修复弹窗关闭后无法重新打开的问题

# 文档更新
docs: 更新 README 文档
docs(api): 补充 API 接口文档

# 代码样式调整
style: 格式化代码，调整缩进
style: 统一 CSS 类名命名规范

# 代码重构
refactor: 重构 useAuth Hook
refactor(button): 优化按钮组件性能

# 测试相关
test: 添加 Button 组件单元测试
test: 补充 utils 工具函数测试

# 构建/工具链
chore: 更新依赖包版本
chore: 配置 ESLint 规则

# 性能优化
perf: 优化组件懒加载
perf: 减少不必要的重渲染
```

## 十一、代码检查清单

在生成代码前，请确认：

### 文件组织
- [ ] 文件放置位置符合目录职责
- [ ] 组件/文件命名符合 PascalCase/camelCase 规范
- [ ] 组件文件夹包含 `index.ts` 导出文件
- [ ] 页面文件以 `Page` 后缀结尾

### TypeScript
- [ ] 没有使用 `any` 类型
- [ ] Props 有完整的类型定义
- [ ] 函数参数和返回值有类型声明
- [ ] 使用 `interface` 定义对象类型

### 样式
- [ ] 使用 CSS Modules（`.module.css` 文件）
- [ ] 禁止使用 Tailwind CSS 类名
- [ ] CSS 类名使用 camelCase
- [ ] 优先使用 CSS 变量而非硬编码值

### 代码组织
- [ ] 导入路径按规范排序
- [ ] 使用 `@` 别名导入（而非相对路径）
- [ ] 组件结构顺序正确
- [ ] 导出方式正确（默认导出组件，命名导出索引）

### 最佳实践
- [ ] 组件遵循单一职责原则
- [ ] 复杂逻辑抽取为自定义 Hook
- [ ] 避免过深的组件嵌套
- [ ] 事件处理函数命名以 `handle` 开头
- [ ] 布尔值变量命名以 `is`/`has`/`should` 开头

## 十二、示例代码模板

### 新组件模板

```typescript
// components/Button/Button.tsx
import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
```

```css
/* components/Button/Button.module.css */
.button {
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.button:active {
  transform: translateY(1px);
}

/* Variants */
.primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.secondary:hover:not(:disabled) {
  background-color: rgba(24, 144, 255, 0.1);
}

.danger {
  background-color: var(--color-error);
  color: var(--color-white);
}

/* Sizes */
.small {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 12px;
}

.medium {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 14px;
}

.large {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 16px;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```typescript
// components/Button/index.ts
export { default as Button } from './Button'
```

### 新页面模板

```typescript
// pages/Home/HomePage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/Button'
import styles from './HomePage.module.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome Back, {user?.name || 'Guest'}</h1>
        <p className={styles.description}>
          This is your dashboard where you can manage everything.
        </p>
        {isAuthenticated ? (
          <Button onClick={handleGetStarted} variant="primary" size="large">
            Go to Dashboard
          </Button>
        ) : (
          <Button onClick={handleGetStarted} variant="secondary" size="large">
            Get Started
          </Button>
        )}
      </section>
    </div>
  )
}

export default HomePage
```

```css
/* pages/Home/HomePage.module.css */
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-xl);
  min-height: 80vh;
}

.title {
  font-size: 48px;
  color: var(--color-white);
  margin-bottom: var(--spacing-md);
}

.description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--spacing-lg);
  max-width: 600px;
}
```

### 自定义 Hook 模板

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
```

### 工具函数模板

```typescript
// utils/formatDate.ts
import dayjs from 'dayjs'

/**
 * 格式化日期
 * @param date - 日期对象、时间戳或日期字符串
 * @param format - 日期格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
  date: Date | number | string,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string => {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 获取相对时间描述
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 相对时间描述，如 "3分钟前"
 */
export const getRelativeTime = (date: Date | number | string): string => {
  const now = dayjs()
  const target = dayjs(date)
  const diffMinutes = now.diff(target, 'minute')
  
  if (diffMinutes < 1) return '刚刚'
  if (diffMinutes < 60) return `${diffMinutes}分钟前`
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}小时前`
  return `${Math.floor(diffMinutes / 1440)}天前`
}
```

---

**最后更新**: 2026-05-26
**维护者**: 剡溪

**重要提醒**: 本项目严格禁止使用 Tailwind CSS，所有样式必须通过 CSS Modules 编写，使用 camelCase 命名规范，并优先使用 CSS 变量。