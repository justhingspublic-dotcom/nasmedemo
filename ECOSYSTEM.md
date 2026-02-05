# Technology Ecosystem Diagram
# 技術生態系統圖

## Complete System Ecosystem Overview | 完整系統生態系統總覽

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NameTag Generator Ecosystem                          │
│                              名牌產生器生態系統                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          USER INTERACTION LAYER                              │
│                              使用者互動層                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Web Browser (Chrome, Firefox, Safari, Edge)                                │
│  ├─ HTML5 Engine                                                            │
│  ├─ CSS3 Rendering                                                          │
│  ├─ JavaScript V8/SpiderMonkey                                              │
│  └─ LocalStorage API                                                        │
│                                                                              │
└──────────────────────────────┬───────────────────────────────────────────────┘
                               │
                               │ HTTP/HTTPS
                               │
┌──────────────────────────────▼───────────────────────────────────────────────┐
│                         APPLICATION LAYER                                    │
│                             應用程式層                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                         index.html                                     │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │                        UI Structure                              │  │ │
│  │  │  ┌──────────┐  ┌──────────────┐  ┌─────────────┐               │  │ │
│  │  │  │  Header  │  │   Sidebar    │  │   Preview   │               │  │ │
│  │  │  │          │  │              │  │     Grid    │               │  │ │
│  │  │  │  Logo    │  │ Import Panel │  │             │               │  │ │
│  │  │  │  Title   │  │Settings Panel│  │  Nametags   │               │  │ │
│  │  │  │          │  │ Export Panel │  │  (Dynamic)  │               │  │ │
│  │  │  └──────────┘  └──────────────┘  └─────────────┘               │  │ │
│  │  │                                                                   │  │ │
│  │  │  ┌──────────┐  ┌──────────────┐                                 │  │ │
│  │  │  │  Modal   │  │    Toast     │                                 │  │ │
│  │  │  │  (Edit)  │  │(Notification)│                                 │  │ │
│  │  │  └──────────┘  └──────────────┘                                 │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                         styles.css                                     │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │                      Visual Design                               │  │ │
│  │  │  • CSS Variables (Colors, Spacing)                               │  │ │
│  │  │  • Layout System (Flexbox, Grid)                                 │  │ │
│  │  │  • Component Styles (Cards, Buttons)                             │  │ │
│  │  │  • Responsive Design (@media queries)                            │  │ │
│  │  │  • Animations & Transitions                                      │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                          app.js                                        │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │                   Application Logic                              │  │ │
│  │  │                                                                   │  │ │
│  │  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │  │ │
│  │  │  ┃              STATE MANAGEMENT CORE                      ┃  │  │ │
│  │  │  ┃  • Global State Object                                  ┃  │  │ │
│  │  │  ┃  • Configuration                                        ┃  │  │ │
│  │  │  ┃  • Data Store (allPersons, personsByBus)               ┃  │  │ │
│  │  │  ┃  • UI State (currentBus, selectedIndex)                ┃  │  │ │
│  │  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │  │ │
│  │  │                            │                                      │  │ │
│  │  │                            ▼                                      │  │ │
│  │  │  ┌───────────────────────────────────────────────────────────┐  │  │ │
│  │  │  │         BUSINESS LOGIC LAYER                              │  │  │ │
│  │  │  │                                                            │  │  │ │
│  │  │  │  File Processing Module                                   │  │  │ │
│  │  │  │  ├─ handleFileUpload()                                    │  │  │ │
│  │  │  │  ├─ parseExcelData()                                      │  │  │ │
│  │  │  │  └─ validateData()                                        │  │  │ │
│  │  │  │                                                            │  │  │ │
│  │  │  │  Data Transformation Module                               │  │  │ │
│  │  │  │  ├─ groupByBus()                                          │  │  │ │
│  │  │  │  ├─ calculateFontSize()                                   │  │  │ │
│  │  │  │  └─ formatPersonData()                                    │  │  │ │
│  │  │  │                                                            │  │  │ │
│  │  │  │  Rendering Module                                         │  │  │ │
│  │  │  │  ├─ renderPreview()                                       │  │  │ │
│  │  │  │  ├─ renderNametagHTML()                                   │  │  │ │
│  │  │  │  └─ applyFormat()                                         │  │  │ │
│  │  │  │                                                            │  │  │ │
│  │  │  │  Configuration Module                                     │  │  │ │
│  │  │  │  ├─ setupConfigListeners()                                │  │  │ │
│  │  │  │  ├─ updateBusTabs()                                       │  │  │ │
│  │  │  │  └─ selectBus()                                           │  │  │ │
│  │  │  │                                                            │  │  │ │
│  │  │  │  Edit Module                                              │  │  │ │
│  │  │  │  ├─ openEditModal()                                       │  │  │ │
│  │  │  │  ├─ closeEditModal()                                      │  │  │ │
│  │  │  │  └─ saveEdit()                                            │  │  │ │
│  │  │  │                                                            │  │  │ │
│  │  │  │  Export Module                                            │  │  │ │
│  │  │  │  ├─ exportPdf()                                           │  │  │ │
│  │  │  │  ├─ exportSelectedPdf()                                   │  │  │ │
│  │  │  │  └─ getSelectedBuses()                                    │  │  │ │
│  │  │  │                                                            │  │  │ │
│  │  │  │  Utility Module                                           │  │  │ │
│  │  │  │  ├─ showToast()                                           │  │  │ │
│  │  │  │  ├─ debounce()                                            │  │  │ │
│  │  │  │  └─ init()                                                │  │  │ │
│  │  │  └───────────────────────────────────────────────────────────┘  │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────┬───────────────────────────────────────────────┘
                               │
                               │ Dependencies
                               │
┌──────────────────────────────▼───────────────────────────────────────────────┐
│                       LIBRARY ECOSYSTEM LAYER                                │
│                            函式庫生態層                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │   xlsx.min.js        │  │   jspdf.min.js       │  │html2canvas.min.js│  │
│  │   (SheetJS)          │  │   (jsPDF)            │  │                  │  │
│  │                      │  │                      │  │                  │  │
│  │  • Excel Parser     │  │  • PDF Generator     │  │  • HTML→Canvas   │  │
│  │  • CSV Parser       │  │  • Page Layout       │  │  • Rendering     │  │
│  │  • Data Extraction  │  │  • Image Embedding   │  │  • Screenshot    │  │
│  │  • Workbook Reader  │  │  • A4 Format         │  │                  │  │
│  │                      │  │  • Multi-page        │  │                  │  │
│  │  Version: 0.20.3    │  │  Version: 2.5.2      │  │  Version: 1.4.1  │  │
│  │  Size: 882 KB       │  │  Size: 364 KB        │  │  Size: 198 KB    │  │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘  │
│                                                                              │
└──────────────────────────────┬───────────────────────────────────────────────┘
                               │
                               │ Browser APIs
                               │
┌──────────────────────────────▼───────────────────────────────────────────────┐
│                      BROWSER API LAYER                                       │
│                         瀏覽器 API 層                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  File APIs                    Storage APIs              Canvas APIs         │
│  ├─ FileReader               ├─ localStorage            ├─ Canvas 2D        │
│  ├─ File                     └─ sessionStorage          ├─ getContext()     │
│  ├─ Blob                                                └─ toDataURL()      │
│  └─ FormData                 DOM APIs                                       │
│                              ├─ querySelector           Event APIs          │
│  Drag & Drop APIs            ├─ createElement           ├─ addEventListener │
│  ├─ dragover                 ├─ appendChild             ├─ Event Bubbling  │
│  ├─ drop                     └─ removeChild             └─ Event Delegation│
│  └─ dragleave                                                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════════
                              DATA FLOW DIAGRAM
                               資料流程圖
═════════════════════════════════════════════════════════════════════════════

┌──────────┐
│   User   │
│  使用者   │
└────┬─────┘
     │
     │ (1) Upload Excel/CSV File
     │     上傳 Excel/CSV 檔案
     ▼
┌─────────────────────┐
│  FileReader API     │
│  ├─ Read file       │
│  └─ Convert to data │
└─────┬───────────────┘
      │
      │ (2) Raw file data
      │     原始檔案資料
      ▼
┌─────────────────────┐
│  SheetJS (xlsx)     │
│  ├─ Parse Excel     │
│  ├─ Parse CSV       │
│  └─ Extract rows    │
└─────┬───────────────┘
      │
      │ (3) Structured data array
      │     結構化資料陣列
      ▼
┌─────────────────────┐
│  Data Validation    │
│  ├─ Check columns   │
│  ├─ Validate format │
│  └─ Handle errors   │
└─────┬───────────────┘
      │
      │ (4) Valid data
      │     有效資料
      ▼
┌─────────────────────┐
│  Data Transformation│
│  ├─ Group by bus    │
│  ├─ Add indexes     │
│  └─ Store in state  │
└─────┬───────────────┘
      │
      │ (5) state.personsByBus
      │     分組資料
      ▼
┌─────────────────────┐
│  Template Engine    │
│  ├─ Generate HTML   │
│  ├─ Apply styles    │
│  ├─ Calculate sizes │
│  └─ Render to DOM   │
└─────┬───────────────┘
      │
      │ (6) HTML Elements
      │     HTML 元素
      ▼
┌─────────────────────┐
│  Preview Display    │
│  ├─ Show nametags   │
│  ├─ Enable editing  │
│  └─ Update count    │
└─────┬───────────────┘
      │
      │ (7) User clicks Export
      │     使用者點擊匯出
      ▼
┌─────────────────────┐
│  html2canvas        │
│  ├─ Capture HTML    │
│  ├─ Convert to img  │
│  └─ Scale to A4     │
└─────┬───────────────┘
      │
      │ (8) Canvas/Image data
      │     Canvas/圖片資料
      ▼
┌─────────────────────┐
│  jsPDF              │
│  ├─ Create PDF      │
│  ├─ Add pages       │
│  ├─ Embed images    │
│  └─ Generate blob   │
└─────┬───────────────┘
      │
      │ (9) PDF Blob
      │     PDF 二進制資料
      ▼
┌─────────────────────┐
│  Browser Download   │
│  ├─ Create link     │
│  ├─ Trigger click   │
│  └─ Save to disk    │
└─────┬───────────────┘
      │
      ▼
┌──────────┐
│ PDF File │
│ PDF 檔案 │
└──────────┘


═════════════════════════════════════════════════════════════════════════════
                          STATE MANAGEMENT DIAGRAM
                            狀態管理圖
═════════════════════════════════════════════════════════════════════════════

                        ┌──────────────────────┐
                        │   Global State       │
                        │   全域狀態           │
                        └──────┬───────────────┘
                               │
         ┌─────────────────────┼─────────────────────┬──────────────────┐
         │                     │                     │                  │
         ▼                     ▼                     ▼                  ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  Data State    │  │  Config State  │  │  UI State      │  │  Bus Settings  │
│  資料狀態      │  │  設定狀態      │  │  介面狀態      │  │  車次設定      │
├────────────────┤  ├────────────────┤  ├────────────────┤  ├────────────────┤
│ • allPersons   │  │ • companyName  │  │ • currentBus   │  │ • bgColor      │
│ • personsByBus │  │ • eventName    │  │ • selectedIdx  │  │ • textColor    │
│                │  │ • travelInfo   │  │ • splitCount   │  │ • borderColor  │
│                │  │ • busLabel     │  │ • isApplied    │  │ • footerText   │
│                │  │ • tableLabel   │  │                │  │ (per bus A-T,  │
│                │  │ • roomLabel    │  │                │  │  1-20)         │
└────────────────┘  └────────────────┘  └────────────────┘  └────────────────┘
         │                     │                     │                  │
         └─────────────────────┼─────────────────────┴──────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  LocalStorage       │
                    │  本地儲存           │
                    │  (Persistent)       │
                    └─────────────────────┘


═════════════════════════════════════════════════════════════════════════════
                       COMPONENT INTERACTION DIAGRAM
                          組件互動圖
═════════════════════════════════════════════════════════════════════════════

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Upload    │ ──(1)──>│   Parser    │ ──(2)──>│    State    │
│   Component │         │   Module    │         │   Manager   │
└─────────────┘         └─────────────┘         └──────┬──────┘
                                                        │
                                                        │ (3) notify
                                                        │
       ┌────────────────────────────────────────────────┼────────────┐
       │                                                │            │
       ▼                                                ▼            ▼
┌─────────────┐                              ┌─────────────┐  ┌─────────────┐
│  Bus Tabs   │                              │  Preview    │  │  Settings   │
│  Component  │                              │  Component  │  │  Component  │
└──────┬──────┘                              └──────┬──────┘  └──────┬──────┘
       │                                            │                │
       │ (4) selectBus()                            │                │ (5) config
       │                                            │                │     change
       └────────────────────┬───────────────────────┘                │
                            │                                        │
                            │ (6) trigger re-render                 │
                            │                                        │
                            ▼                                        │
                     ┌─────────────┐                                │
                     │  Render     │ <──────────────────────────────┘
                     │  Engine     │
                     └──────┬──────┘
                            │
                            │ (7) update DOM
                            │
                            ▼
                     ┌─────────────┐
                     │  Preview    │
                     │  Display    │
                     └──────┬──────┘
                            │
                            │ (8) user clicks
                            │
                            ▼
                     ┌─────────────┐
                     │  Edit Modal │
                     └──────┬──────┘
                            │
                            │ (9) save changes
                            │
                            └──────> back to State Manager


═════════════════════════════════════════════════════════════════════════════
                           DEPLOYMENT DIAGRAM
                             部署圖
═════════════════════════════════════════════════════════════════════════════

┌───────────────────────────────────────────────────────────────────────────┐
│                        Static Web Hosting                                  │
│                        靜態網頁託管                                         │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Options:                                                                  │
│  • GitHub Pages (recommended)                                              │
│  • Netlify                                                                 │
│  • Vercel                                                                  │
│  • AWS S3 + CloudFront                                                     │
│  • Azure Static Web Apps                                                   │
│  • Any web server (Apache, Nginx)                                          │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │                         Repository Files                              │ │
│  │                         儲存庫檔案                                    │ │
│  ├──────────────────────────────────────────────────────────────────────┤ │
│  │  index.html           (Entry Point)                                  │ │
│  │  app.js               (Application Logic)                            │ │
│  │  styles.css           (Styling)                                      │ │
│  │  xlsx.min.js          (Library - Offline)                            │ │
│  │  jspdf.min.js         (Library - Offline)                            │ │
│  │  html2canvas.min.js   (Library - Offline)                            │ │
│  │  README.md            (Documentation)                                │ │
│  │  ARCHITECTURE.md      (Technical Docs)                               │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
└────────────────────────────────┬───────────────────────────────────────────┘
                                 │
                                 │ HTTPS
                                 │
┌────────────────────────────────▼───────────────────────────────────────────┐
│                          User's Browser                                     │
│                          使用者瀏覽器                                       │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  • Download all files once                                                 │
│  • Run entirely client-side                                                │
│  • No server required after initial load                                   │
│  • Works offline after first visit                                         │
│  • Data stays on user's device (LocalStorage)                              │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════════
                        TECHNOLOGY STACK SUMMARY
                          技術棧總結
═════════════════════════════════════════════════════════════════════════════

Frontend Technologies:
  ✓ HTML5                      - Semantic structure
  ✓ CSS3                       - Modern styling, animations
  ✓ JavaScript ES6+            - Modern syntax, arrow functions, promises
  ✓ CSS Grid & Flexbox         - Responsive layout

Core Libraries:
  ✓ SheetJS (v0.20.3)          - Excel/CSV processing (882 KB)
  ✓ jsPDF (v2.5.2)             - PDF generation (364 KB)
  ✓ html2canvas (v1.4.1)       - HTML to image conversion (198 KB)

Browser APIs:
  ✓ File API                   - File reading and processing
  ✓ LocalStorage               - Persistent state storage
  ✓ Canvas API                 - Image rendering
  ✓ DOM API                    - Dynamic UI manipulation
  ✓ Drag & Drop API            - File upload UX

Design Patterns:
  ✓ MVC Architecture           - Separation of concerns
  ✓ Event-driven               - Reactive user interface
  ✓ State Management           - Centralized state
  ✓ Component-based            - Modular UI components
  ✓ Observer Pattern           - Event listeners

Performance Optimizations:
  ✓ Debouncing                 - Prevent excessive renders
  ✓ Lazy rendering             - Only render visible content
  ✓ Event delegation           - Efficient event handling
  ✓ LocalStorage caching       - Persistent configuration

Security Measures:
  ✓ File type validation       - Prevent malicious uploads
  ✓ File size limits           - Prevent DoS attacks
  ✓ XSS prevention             - Safe DOM manipulation
  ✓ Local libraries            - Avoid CDN hijacking

Total Bundle Size: ~1.4 MB (all libraries included)
Loading Time: < 2 seconds (on average connection)
Browser Support: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
