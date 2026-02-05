# NameTag Generator | 名牌產生器

一個功能完善的網頁應用程式，用於批次產生可自訂的活動名牌。支援多車/組別管理、即時預覽與 PDF 匯出功能。

A comprehensive web application for batch generating customizable event name tags with multi-bus/group management, real-time preview, and PDF export capabilities.

## 🌟 Features | 功能特色

- **📁 Data Import** - 支援 Excel (.xlsx, .xls) 和 CSV 格式的批次匯入
- **🚌 Multi-Bus Management** - 支援 A-T (20 組字母) 和 1-20 (20 組數字) 共 40 個車次/組別
- **🎨 Customizable Templates** - 可自訂公司名稱、活動名稱、旅行社資訊、標籤與顏色
- **📏 Font Size Control** - 六大區塊的字型大小獨立控制
- **👁️ Real-time Preview** - 即時預覽名牌效果，支援 4/6/8 列分割顯示
- **✏️ Individual Editing** - 點擊任一名牌可單獨編輯內容
- **📤 PDF Export** - 支援全部匯出或選擇特定車次匯出，自動分頁處理
- **💾 Local Storage** - 自動儲存設定，重新整理頁面不會遺失資料

## 🏗️ System Architecture | 系統架構

### Technology Stack | 技術生態系統

```
┌─────────────────────────────────────────────────────────────┐
│                    NameTag Generator                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend (Client-Side)                                      │
│  ├─ HTML5                                                    │
│  ├─ CSS3 (Custom Variables & Modern Layout)                 │
│  └─ Vanilla JavaScript (ES6+)                               │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Core Libraries (Offline-First)                             │
│  ├─ SheetJS (xlsx.min.js v0.20.3)                          │
│  │  └─ Excel/CSV file parsing                              │
│  ├─ jsPDF (jspdf.min.js v2.5.2)                            │
│  │  └─ PDF generation                                       │
│  └─ html2canvas (html2canvas.min.js v1.4.1)                │
│     └─ HTML to Canvas conversion                            │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Data Storage                                                │
│  └─ Browser LocalStorage                                     │
│     └─ Persistent state management                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Components | 架構組件

#### 1. **State Management Layer** | 狀態管理層
集中式狀態管理，包含：
- **Global State**: 所有人員資料、分組資料、當前選擇
- **Configuration**: 共用設定（公司名、活動名等）
- **Font Sizes**: 六大區塊字型大小
- **Bus Settings**: 每個車次的顏色與底部文字

#### 2. **UI Component Layer** | UI 組件層
- **Header**: 應用程式標題與導航
- **Sidebar**: 三大功能面板
  - 資料匯入面板 (Data Import)
  - 樣板設定面板 (Template Settings)
  - 匯出面板 (Export Panel)
- **Main Content Area**: 預覽網格顯示區域
- **Modal**: 編輯對話框

#### 3. **Business Logic Layer** | 業務邏輯層
- **File Processing**: Excel/CSV 解析與驗證
- **Data Transformation**: 資料轉換與分組
- **Template Rendering**: 名牌 HTML 生成
- **PDF Generation**: Canvas 轉換與 PDF 組裝

#### 4. **Storage Layer** | 儲存層
- **LocalStorage**: 持久化狀態儲存
- 自動儲存與載入機制

## 📊 Data Flow | 資料流程

```
User Upload File (Excel/CSV)
        ↓
    SheetJS Parse
        ↓
Data Validation & Transformation
        ↓
Group by Bus/Ship Number
        ↓
    Store in State
        ↓
    Render Preview (HTML)
        ↓
User Customize (Config/Edit)
        ↓
    Re-render Preview
        ↓
    Export to PDF
        ↓
html2canvas → Convert to Images
        ↓
jsPDF → Assemble PDF Pages
        ↓
    Download PDF File
```

## 📁 File Structure | 檔案結構

```
nasmedemo/
├── index.html              # 主 HTML 檔案（UI 結構）
├── app.js                  # 核心應用程式邏輯（772 行）
│   ├── State Management    # 狀態管理 (line 1-70)
│   ├── DOM Elements       # DOM 元素參照 (line 72-91)
│   ├── Utilities          # 工具函式 (line 93-112)
│   ├── File Processing    # 檔案處理 (line 114-238)
│   ├── UI Rendering       # UI 渲染 (line 240-474)
│   ├── Config Management  # 設定管理 (line 476-552)
│   ├── Edit Modal         # 編輯功能 (line 554-608)
│   ├── PDF Export         # PDF 匯出 (line 620-728)
│   └── Initialization     # 初始化 (line 750-772)
├── styles.css              # 樣式表（農創家風格設計）
│   ├── CSS Variables      # CSS 變數 (line 1-22)
│   ├── Layout             # 版面配置
│   ├── Components         # UI 組件樣式
│   └── Responsive         # 響應式設計
├── xlsx.min.js            # SheetJS 函式庫 (882 KB)
├── jspdf.min.js           # jsPDF 函式庫 (364 KB)
└── html2canvas.min.js     # html2canvas 函式庫 (198 KB)
```

## 🔧 Key Functions | 核心函式

### Data Management
- `handleFileUpload(file)` - 處理檔案上傳與解析
- `clearData()` - 清除所有資料
- `selectBus(bus)` - 切換車次顯示

### UI Rendering
- `renderPreview()` - 渲染預覽網格
- `renderNametagHTML(person, index)` - 生成單一名牌 HTML
- `applyFormat()` - 套用格式化設定

### Configuration
- `setupConfigListeners()` - 設定監聽器
- `openEditModal(index)` - 開啟編輯對話框
- `saveEdit()` - 儲存編輯內容

### Export
- `exportPdf()` - 匯出所有車次 PDF
- `exportSelectedPdf()` - 匯出選定車次 PDF

## 🚀 Usage | 使用方式

### 1. Open the Application | 開啟應用程式
在瀏覽器中開啟 `index.html` 檔案

### 2. Import Data | 匯入資料
將包含以下欄位的 Excel/CSV 檔案拖放至上傳區：
- **姓名** (Name) - 必填
- **車號/船號** (Bus/Ship Number) - 可選
- **桌號** (Table Number) - 可選
- **房號** (Room Number) - 可選

### 3. Customize Settings | 自訂設定
在「樣板設定」面板調整：
- 公司名稱
- 活動名稱
- 旅行社資訊
- 標籤文字
- 字型大小
- 顏色與底部文字（依車次）

### 4. Preview & Edit | 預覽與編輯
- 切換車次標籤查看不同組別
- 點擊任一名牌進行個別編輯
- 即時預覽效果

### 5. Export PDF | 匯出 PDF
- 選擇匯出全部或特定車次
- 自動生成分頁 PDF 檔案
- 下載至本機

## 💡 Design Principles | 設計原則

1. **Offline-First** - 所有函式庫本地化，避免 CDN 依賴
2. **Zero Dependencies** - 純 Vanilla JavaScript，無框架依賴
3. **Mobile-Friendly** - 響應式設計，支援各種螢幕尺寸
4. **Performance Optimized** - Debounce 機制降低渲染頻率
5. **User-Centric** - 直覺式操作，即時回饋

## 🔒 Browser Compatibility | 瀏覽器相容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 需啟用 JavaScript
- 建議使用桌面版瀏覽器以獲得最佳體驗

## 📝 Data Format | 資料格式範例

### Excel/CSV 格式
```
姓名      | 車號 | 桌號 | 房號
---------|------|------|------
王小明    | A    | 1    | 101
李小華    | A    | 1    | 102
張大偉    | B    | 2    | 201
```

## 🎨 Customization | 客製化

### 顏色主題
每個車次/組別可獨立設定：
- 背景色
- 文字色
- 邊框色
- 底部文字

### 字型大小
六大區塊可獨立調整（以 mm 為單位）：
- 公司名稱 (3.5mm)
- 活動名稱 (5mm)
- 姓名 (12-40mm, 自動縮放)
- 旅行社資訊 (2.8mm)
- 標籤區 (3.5mm)
- 底部資訊 (3mm)

## 📄 License | 授權

本專案為示範專案，供學習與參考使用。

---

**Made with ❤️ for Event Management**
