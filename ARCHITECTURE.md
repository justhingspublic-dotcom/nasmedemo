# System Architecture Documentation
# 系統架構詳細文件

## Table of Contents | 目錄

1. [Overview | 概述](#overview--概述)
2. [Architecture Layers | 架構層次](#architecture-layers--架構層次)
3. [State Management | 狀態管理](#state-management--狀態管理)
4. [Component Architecture | 組件架構](#component-architecture--組件架構)
5. [Data Flow | 資料流程](#data-flow--資料流程)
6. [API Reference | API 參考](#api-reference--api-參考)
7. [Performance Optimization | 效能優化](#performance-optimization--效能優化)
8. [Security Considerations | 安全考量](#security-considerations--安全考量)

---

## Overview | 概述

NameTag Generator 是一個基於現代網頁技術的單頁應用程式（SPA），採用 **三層式架構設計**，專注於批次名牌生成與管理。

### Architecture Style | 架構風格
- **Pattern**: Model-View-Controller (MVC) variant
- **Paradigm**: Event-driven, Component-based
- **Deployment**: Static hosting, Client-side rendering

---

## Architecture Layers | 架構層次

### 1. Presentation Layer | 呈現層

**Responsibility**: 使用者介面與互動

```
┌────────────────────────────────────────┐
│         Presentation Layer              │
├────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────┐           │
│  │  Header  │  │ Sidebar  │           │
│  └──────────┘  └──────────┘           │
│                                         │
│  ┌──────────────────────────┐         │
│  │   Main Preview Grid      │         │
│  │  (Dynamic Nametag Cards) │         │
│  └──────────────────────────┘         │
│                                         │
│  ┌──────────┐  ┌──────────┐           │
│  │  Modal   │  │  Toast   │           │
│  └──────────┘  └──────────┘           │
│                                         │
└────────────────────────────────────────┘
```

**Components**:
- **Header**: App branding and navigation
- **Sidebar**: Control panels (Import, Settings, Export)
- **Preview Grid**: Dynamic nametag rendering
- **Modal**: Edit dialog for individual nametags
- **Toast**: Notification system

### 2. Business Logic Layer | 業務邏輯層

**Responsibility**: 資料處理、驗證與業務規則

```javascript
// Core Business Functions
├── Data Processing
│   ├── handleFileUpload()      // File parsing
│   ├── parseExcelData()        // Excel/CSV parsing
│   └── validateData()          // Data validation
│
├── Data Transformation
│   ├── groupByBus()            // Group persons by bus
│   ├── calculateFontSize()     // Auto font sizing
│   └── formatPersonData()      // Data formatting
│
├── Template Management
│   ├── renderNametagHTML()     // Generate HTML
│   ├── applyFormat()           // Apply styling
│   └── updatePreview()         // Update display
│
└── Export Management
    ├── exportPdf()             // Full export
    ├── exportSelectedPdf()     // Selective export
    └── generatePdfPages()      // PDF assembly
```

### 3. Data Layer | 資料層

**Responsibility**: 資料儲存與狀態管理

```javascript
// State Structure
const state = {
    // Core Data
    allPersons: [],              // Master data array
    personsByBus: {},            // Grouped by bus number
    currentBus: 'A',             // Active bus selection
    selectedIndex: null,         // Current editing index
    splitCount: 4,               // Grid layout (4/6/8)
    isApplied: false,           // Format applied flag
    
    // Configuration
    config: {
        companyName: '',         // Company name
        eventName: '',           // Event name
        travelInfo: '',          // Travel agency info
        busLabel: '',            // Bus label text
        tableLabel: '',          // Table label text
        roomLabel: ''            // Room label text
    },
    
    // Font Sizes (mm)
    fontSizes: {
        company: 3.5,            // Company name
        event: 5,                // Event name
        name: 12,                // Person name (12-40)
        travel: 2.8,             // Travel info
        labels: 3.5,             // Label section
        footer: 3                // Footer section
    },
    
    // Per-Bus Settings
    busSetting: {
        'A': {
            bgColor: '#d4e6d4',
            textColor: '#2a4a2a',
            borderColor: '#5a7a5a',
            footerText: 'A 號 領隊 待確認'
        },
        // ... (40 bus configurations)
    }
};
```

---

## State Management | 狀態管理

### State Flow | 狀態流動

```
User Action
    ↓
Event Handler
    ↓
Update State (state.*)
    ↓
Trigger Re-render
    ↓
Update DOM
    ↓
Save to LocalStorage (optional)
```

### Key State Operations | 主要狀態操作

#### 1. Data Import
```javascript
// File Upload → Parse → Validate → Group → Store
handleFileUpload(file) {
    XLSX.read() → data
    validateColumns(data)
    groupByBus(data) → personsByBus
    state.allPersons = data
    state.personsByBus = personsByBus
    renderPreview()
}
```

#### 2. Configuration Update
```javascript
// User Input → Update Config → Re-render
setupConfigListeners() {
    input.addEventListener('input', (e) => {
        state.config[key] = e.target.value
        debouncedRenderPreview()
    })
}
```

#### 3. Export
```javascript
// Select Buses → Render Canvas → Generate PDF → Download
exportSelectedPdf() {
    selectedBuses = getSelectedBuses()
    for (bus in selectedBuses) {
        html2canvas(element) → canvas
        jsPDF.addImage(canvas)
    }
    jsPDF.save()
}
```

---

## Component Architecture | 組件架構

### UI Component Hierarchy | UI 組件階層

```
App Container
├── Header
│   ├── Logo
│   └── Title
│
├── Main Content
│   ├── Sidebar
│   │   ├── Import Panel
│   │   │   ├── Upload Zone
│   │   │   ├── File Info
│   │   │   ├── Bus Tabs (40 tabs)
│   │   │   └── Clear Button
│   │   │
│   │   ├── Template Settings Panel
│   │   │   ├── Config Inputs (6 fields)
│   │   │   ├── Font Size Sliders (6 sliders)
│   │   │   ├── Bus Color Settings
│   │   │   ├── Footer Text Inputs
│   │   │   └── Apply Button
│   │   │
│   │   └── Export Panel
│   │       ├── Bus Checkboxes (40 checkboxes)
│   │       ├── Select/Deselect All
│   │       ├── Export All Button
│   │       └── Export Selected Button
│   │
│   └── Preview Area
│       ├── Preview Info (count, mode)
│       └── Preview Grid (4/6/8 columns)
│           └── Nametag Cards (dynamic)
│
├── Edit Modal
│   ├── Modal Header
│   ├── Form Fields (name, bus, table, room)
│   └── Action Buttons (save, cancel)
│
└── Toast Notification
    └── Message
```

### Component Responsibilities | 組件職責

#### Upload Zone Component
- **Purpose**: 檔案上傳介面
- **Features**: 拖放上傳、點擊上傳、檔案驗證
- **State**: `fileInfo`, `allPersons`
- **Events**: `drop`, `change`, `click`

#### Bus Tabs Component
- **Purpose**: 車次/組別切換
- **Features**: 40 個車次標籤、人數統計、啟用/停用狀態
- **State**: `currentBus`, `personsByBus`
- **Events**: `click` → `selectBus()`

#### Preview Grid Component
- **Purpose**: 名牌預覽顯示
- **Features**: 響應式網格、即時更新、點擊編輯
- **State**: `splitCount`, `currentBus`, `personsByBus`
- **Events**: `click` → `openEditModal()`

#### Template Settings Component
- **Purpose**: 樣板設定控制
- **Features**: 即時輸入、範圍滑桿、顏色選擇器
- **State**: `config`, `fontSizes`, `busSetting`
- **Events**: `input`, `change` → `debouncedRenderPreview()`

---

## Data Flow | 資料流程

### 1. File Upload Flow | 檔案上傳流程

```
┌────────────┐
│ User       │
│ Drops File │
└─────┬──────┘
      ↓
┌─────────────────┐
│ handleFileUpload│
│ - Validate type │
│ - Read file     │
└─────┬───────────┘
      ↓
┌─────────────────┐
│ SheetJS Parse   │
│ - XLSX.read()   │
│ - Extract data  │
└─────┬───────────┘
      ↓
┌─────────────────┐
│ Data Processing │
│ - Validate cols │
│ - Group by bus  │
│ - Store state   │
└─────┬───────────┘
      ↓
┌─────────────────┐
│ UI Update       │
│ - Show tabs     │
│ - Render preview│
│ - Show toast    │
└─────────────────┘
```

### 2. Preview Rendering Flow | 預覽渲染流程

```
┌────────────────┐
│ Trigger Event  │
│ (config change)│
└───────┬────────┘
        ↓
┌────────────────┐
│ Debounce (100ms)│
└───────┬────────┘
        ↓
┌────────────────────┐
│ renderPreview()    │
│ - Get current data │
│ - Clear grid       │
└───────┬────────────┘
        ↓
┌───────────────────────┐
│ For Each Person       │
│ - renderNametagHTML() │
│ - Calculate font size │
│ - Apply colors        │
│ - Append to grid      │
└───────┬───────────────┘
        ↓
┌────────────────┐
│ Update Display │
│ - Show count   │
│ - Update info  │
└────────────────┘
```

### 3. PDF Export Flow | PDF 匯出流程

```
┌──────────────┐
│ User Clicks  │
│ Export Button│
└──────┬───────┘
       ↓
┌──────────────────┐
│ Get Selected     │
│ Buses/All Data   │
└──────┬───────────┘
       ↓
┌──────────────────────┐
│ For Each Bus         │
│ - Get nametags       │
│ - Hide/Show elements │
│ - Apply format       │
└──────┬───────────────┘
       ↓
┌──────────────────┐
│ html2canvas()    │
│ - Convert to img │
│ - Scale to A4    │
└──────┬───────────┘
       ↓
┌──────────────────┐
│ jsPDF            │
│ - Add image      │
│ - Add page       │
│ - Repeat         │
└──────┬───────────┘
       ↓
┌──────────────────┐
│ Download PDF     │
│ - Save file      │
│ - Show toast     │
└──────────────────┘
```

---

## API Reference | API 參考

### Core Functions | 核心函式

#### Data Management APIs

##### `handleFileUpload(file: File): void`
處理檔案上傳與解析
- **Parameters**: `file` - Excel/CSV 檔案
- **Returns**: void
- **Side Effects**: 更新 `state.allPersons`, `state.personsByBus`
- **Events**: Triggers `renderPreview()`, shows toast

##### `clearData(): void`
清除所有資料與重置狀態
- **Parameters**: None
- **Returns**: void
- **Side Effects**: 重置 state, 清除 UI, 清除 localStorage

##### `selectBus(bus: string): void`
切換當前顯示的車次
- **Parameters**: `bus` - 車次代碼 (A-T, 1-20)
- **Returns**: void
- **Side Effects**: 更新 `state.currentBus`, 重新渲染預覽

#### Rendering APIs

##### `renderPreview(): void`
渲染當前車次的名牌預覽
- **Parameters**: None
- **Returns**: void
- **Side Effects**: 更新 preview grid DOM

##### `renderNametagHTML(person: Object, index: number): string`
生成單一名牌的 HTML
- **Parameters**: 
  - `person` - 人員資料物件
  - `index` - 索引
- **Returns**: HTML string
- **Side Effects**: None (pure function)

##### `applyFormat(): void`
套用格式化設定到所有名牌
- **Parameters**: None
- **Returns**: void
- **Side Effects**: 更新 `state.isApplied`, 重新渲染

#### Configuration APIs

##### `setupConfigListeners(): void`
設定配置欄位的事件監聽器
- **Parameters**: None
- **Returns**: void
- **Side Effects**: 註冊 input event listeners

#### Export APIs

##### `exportPdf(): Promise<void>`
匯出所有車次到 PDF
- **Parameters**: None
- **Returns**: Promise<void>
- **Side Effects**: 下載 PDF 檔案

##### `exportSelectedPdf(): Promise<void>`
匯出選定車次到 PDF
- **Parameters**: None
- **Returns**: Promise<void>
- **Side Effects**: 下載 PDF 檔案

##### `getSelectedBuses(): string[]`
取得使用者選擇的車次清單
- **Parameters**: None
- **Returns**: Array of bus codes
- **Side Effects**: None

#### Modal APIs

##### `openEditModal(index: number): void`
開啟編輯對話框
- **Parameters**: `index` - 人員索引
- **Returns**: void
- **Side Effects**: 顯示 modal, 填入資料

##### `closeEditModal(): void`
關閉編輯對話框
- **Parameters**: None
- **Returns**: void
- **Side Effects**: 隱藏 modal, 清除表單

##### `saveEdit(): void`
儲存編輯內容
- **Parameters**: None
- **Returns**: void
- **Side Effects**: 更新 state, 重新渲染, 關閉 modal

#### Utility APIs

##### `showToast(message: string, type: string = 'success'): void`
顯示通知訊息
- **Parameters**: 
  - `message` - 訊息內容
  - `type` - 類型 ('success', 'error', 'info')
- **Returns**: void
- **Side Effects**: 顯示 toast, 3 秒後自動消失

##### `debounce(func: Function, wait: number): Function`
防抖函式包裝器
- **Parameters**: 
  - `func` - 要包裝的函式
  - `wait` - 延遲時間 (ms)
- **Returns**: Debounced function
- **Side Effects**: None

---

## Performance Optimization | 效能優化

### 1. Debouncing | 防抖機制
```javascript
// Prevents excessive re-renders during rapid input
const debouncedRenderPreview = debounce(renderPreview, 100);
```
**Benefits**: 減少 100ms 內的重複渲染，提升輸入流暢度

### 2. Lazy Rendering | 延遲渲染
```javascript
// Only render visible bus tabs
if (state.currentBus !== bus) return;
```
**Benefits**: 只渲染當前車次，降低 DOM 操作成本

### 3. Event Delegation | 事件委派
```javascript
// Single listener for all nametag clicks
previewGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.nametag-card');
    if (card) openEditModal(card.dataset.index);
});
```
**Benefits**: 減少事件監聽器數量，降低記憶體使用

### 4. Canvas Optimization | Canvas 優化
```javascript
// Scale factor for better PDF quality
const scale = 2;
html2canvas(element, { scale });
```
**Benefits**: 平衡檔案大小與列印品質

---

## Security Considerations | 安全考量

### 1. File Upload Security | 檔案上傳安全

**Risk**: 惡意檔案上傳
**Mitigation**:
```javascript
// File type validation
if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
    showToast('不支援的檔案格式', 'error');
    return;
}

// File size limit (10MB)
if (file.size > 10 * 1024 * 1024) {
    showToast('檔案過大', 'error');
    return;
}
```

### 2. XSS Prevention | XSS 防護

**Risk**: 使用者輸入包含惡意腳本
**Mitigation**:
```javascript
// Use textContent instead of innerHTML
element.textContent = userInput;

// Sanitize HTML if necessary
const sanitized = DOMPurify.sanitize(html);
```

### 3. LocalStorage Security | 本地儲存安全

**Risk**: 敏感資料儲存在 localStorage
**Current**: 僅儲存配置，不含敏感個人資料
**Best Practice**: 避免儲存密碼、信用卡等敏感資訊

### 4. Third-Party Library Security | 第三方函式庫安全

**Strategy**: 
- 使用本地託管的函式庫（避免 CDN 劫持）
- 定期更新函式庫版本
- 檢查已知漏洞 (CVE database)

**Current Libraries**:
- SheetJS v0.20.3 ✓
- jsPDF v2.5.2 ✓
- html2canvas v1.4.1 ✓

---

## Extension Points | 擴展點

### 1. Custom Data Columns | 自訂資料欄位
```javascript
// Add new columns in data import
const customColumns = ['部門', '職稱', 'Email'];
```

### 2. Template Themes | 樣板主題
```javascript
// Add predefined color schemes
const themes = {
    'spring': { bgColor: '#e8f5e9', ... },
    'summer': { bgColor: '#fff9c4', ... },
    'autumn': { bgColor: '#ffe0b2', ... },
    'winter': { bgColor: '#e3f2fd', ... }
};
```

### 3. Export Formats | 匯出格式
```javascript
// Support additional export formats
exportFormats = ['PDF', 'PNG', 'SVG', 'Word'];
```

### 4. Multi-Language Support | 多語言支援
```javascript
// Internationalization (i18n)
const i18n = {
    'zh-TW': { upload: '上傳', ... },
    'en-US': { upload: 'Upload', ... }
};
```

---

## Testing Strategy | 測試策略

### Unit Tests | 單元測試
- Data parsing functions
- Validation logic
- State management

### Integration Tests | 整合測試
- File upload flow
- Preview rendering
- PDF generation

### E2E Tests | 端對端測試
- Complete user workflows
- Browser compatibility
- Performance benchmarks

---

## Maintenance & Updates | 維護與更新

### Version Control | 版本控制
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Maintain changelog
- Tag releases

### Library Updates | 函式庫更新
- Check for security updates quarterly
- Test thoroughly before upgrading
- Maintain backward compatibility

### Performance Monitoring | 效能監控
- Track page load time
- Monitor PDF generation time
- Profile JavaScript execution

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-05  
**Author**: System Architect
