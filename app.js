// ===== Global State =====
const state = {
    allPersons: [],      // All data
    personsByBus: {},    // Data grouped by bus
    currentBus: 'A',     // Current selected bus
    selectedIndex: null,
    splitCount: 4,
    isApplied: false,    // Whether format is applied
    // Shared config (same for all buses)
    config: {
        companyName: '台灣通力電梯',
        eventName: '親清日月潭山系',
        travelInfo: 'FOUND WONDER TRAVEL 農新家旅遊',
        busLabel: '★ 車 / 船號：',
        tableLabel: '★ 桌　　號：',
        roomLabel: '★ 房　　號：'
    },
    // Font sizes for 6 groups (shared across all buses)
    fontSizes: {
        company: 3.5,      // 公司名稱 (mm)
        event: 5,          // 活動名稱 (mm)
        name: 12,          // 姓名 (mm) - range 12-40
        travel: 2.8,       // 旅行社資訊 (mm)
        labels: 3.5,       // 標籤區 (mm)
        footer: 3          // 底部資訊 (mm)
    },
    // Per-bus settings (colors and footer) - 支援字母 A-T 和數字 1-20
    busSetting: {
        'A': { bgColor: '#d4e6d4', textColor: '#2a4a2a', borderColor: '#5a7a5a', footerText: 'A 號 領隊 待確認' },
        'B': { bgColor: '#d4e0e6', textColor: '#2a3a4a', borderColor: '#5a6a7a', footerText: 'B 號 領隊 待確認' },
        'C': { bgColor: '#e6e4d4', textColor: '#4a4a2a', borderColor: '#7a7a5a', footerText: 'C 號 領隊 待確認' },
        'D': { bgColor: '#e6d4d4', textColor: '#4a2a2a', borderColor: '#7a5a5a', footerText: 'D 號 領隊 待確認' },
        'E': { bgColor: '#e4d4e6', textColor: '#3a2a4a', borderColor: '#6a5a7a', footerText: 'E 號 領隊 待確認' },
        'F': { bgColor: '#d4e6e0', textColor: '#2a4a3a', borderColor: '#5a7a6a', footerText: 'F 號 領隊 待確認' },
        'G': { bgColor: '#e6d4e0', textColor: '#4a2a3a', borderColor: '#7a5a6a', footerText: 'G 號 領隊 待確認' },
        'H': { bgColor: '#d4d4e6', textColor: '#2a2a4a', borderColor: '#5a5a7a', footerText: 'H 號 領隊 待確認' },
        'I': { bgColor: '#e0e6d4', textColor: '#3a4a2a', borderColor: '#6a7a5a', footerText: 'I 號 領隊 待確認' },
        'J': { bgColor: '#e6e0d4', textColor: '#4a3a2a', borderColor: '#7a6a5a', footerText: 'J 號 領隊 待確認' },
        'K': { bgColor: '#d4e0e0', textColor: '#2a3a3a', borderColor: '#5a6a6a', footerText: 'K 號 領隊 待確認' },
        'L': { bgColor: '#e0d4e6', textColor: '#3a2a4a', borderColor: '#6a5a7a', footerText: 'L 號 領隊 待確認' },
        'M': { bgColor: '#d4e6d4', textColor: '#2a4a2a', borderColor: '#5a7a5a', footerText: 'M 號 領隊 待確認' },
        'N': { bgColor: '#d4e0e6', textColor: '#2a3a4a', borderColor: '#5a6a7a', footerText: 'N 號 領隊 待確認' },
        'O': { bgColor: '#e6e4d4', textColor: '#4a4a2a', borderColor: '#7a7a5a', footerText: 'O 號 領隊 待確認' },
        'P': { bgColor: '#e6d4d4', textColor: '#4a2a2a', borderColor: '#7a5a5a', footerText: 'P 號 領隊 待確認' },
        'Q': { bgColor: '#e4d4e6', textColor: '#3a2a4a', borderColor: '#6a5a7a', footerText: 'Q 號 領隊 待確認' },
        'R': { bgColor: '#d4e6e0', textColor: '#2a4a3a', borderColor: '#5a7a6a', footerText: 'R 號 領隊 待確認' },
        'S': { bgColor: '#e6d4e0', textColor: '#4a2a3a', borderColor: '#7a5a6a', footerText: 'S 號 領隊 待確認' },
        'T': { bgColor: '#d4d4e6', textColor: '#2a2a4a', borderColor: '#5a5a7a', footerText: 'T 號 領隊 待確認' },
        '1': { bgColor: '#d4e6d4', textColor: '#2a4a2a', borderColor: '#5a7a5a', footerText: '1 號 領隊 待確認' },
        '2': { bgColor: '#d4e0e6', textColor: '#2a3a4a', borderColor: '#5a6a7a', footerText: '2 號 領隊 待確認' },
        '3': { bgColor: '#e6e4d4', textColor: '#4a4a2a', borderColor: '#7a7a5a', footerText: '3 號 領隊 待確認' },
        '4': { bgColor: '#e6d4d4', textColor: '#4a2a2a', borderColor: '#7a5a5a', footerText: '4 號 領隊 待確認' },
        '5': { bgColor: '#e4d4e6', textColor: '#3a2a4a', borderColor: '#6a5a7a', footerText: '5 號 領隊 待確認' },
        '6': { bgColor: '#d4e6e0', textColor: '#2a4a3a', borderColor: '#5a7a6a', footerText: '6 號 領隊 待確認' },
        '7': { bgColor: '#e6d4e0', textColor: '#4a2a3a', borderColor: '#7a5a6a', footerText: '7 號 領隊 待確認' },
        '8': { bgColor: '#d4d4e6', textColor: '#2a2a4a', borderColor: '#5a5a7a', footerText: '8 號 領隊 待確認' },
        '9': { bgColor: '#e0e6d4', textColor: '#3a4a2a', borderColor: '#6a7a5a', footerText: '9 號 領隊 待確認' },
        '10': { bgColor: '#d4e6d4', textColor: '#2a4a2a', borderColor: '#5a7a5a', footerText: '10 號 領隊 待確認' },
        '11': { bgColor: '#d4e0e6', textColor: '#2a3a4a', borderColor: '#5a6a7a', footerText: '11 號 領隊 待確認' },
        '12': { bgColor: '#e6e4d4', textColor: '#4a4a2a', borderColor: '#7a7a5a', footerText: '12 號 領隊 待確認' },
        '13': { bgColor: '#e6d4d4', textColor: '#4a2a2a', borderColor: '#7a5a5a', footerText: '13 號 領隊 待確認' },
        '14': { bgColor: '#e4d4e6', textColor: '#3a2a4a', borderColor: '#6a5a7a', footerText: '14 號 領隊 待確認' },
        '15': { bgColor: '#d4e6e0', textColor: '#2a4a3a', borderColor: '#5a7a6a', footerText: '15 號 領隊 待確認' },
        '16': { bgColor: '#e6d4e0', textColor: '#4a2a3a', borderColor: '#7a5a6a', footerText: '16 號 領隊 待確認' },
        '17': { bgColor: '#d4d4e6', textColor: '#2a2a4a', borderColor: '#5a5a7a', footerText: '17 號 領隊 待確認' },
        '18': { bgColor: '#e0e6d4', textColor: '#3a4a2a', borderColor: '#6a7a5a', footerText: '18 號 領隊 待確認' },
        '19': { bgColor: '#e6e0d4', textColor: '#4a3a2a', borderColor: '#7a6a5a', footerText: '19 號 領隊 待確認' },
        '20': { bgColor: '#d4e0e0', textColor: '#2a3a3a', borderColor: '#5a6a6a', footerText: '20 號 領隊 待確認' }
    }
};

// ===== DOM Elements =====
const elements = {
    appContainer: document.getElementById('appContainer'),
    uploadZone: document.getElementById('uploadZone'),
    fileInput: document.getElementById('fileInput'),
    fileInfo: document.getElementById('fileInfo'),
    busTabs: document.getElementById('busTabs'),
    previewGrid: document.getElementById('previewGrid'),
    previewCount: document.getElementById('previewCount'),
    previewModeInfo: document.getElementById('previewModeInfo'),
    editModal: document.getElementById('editModal'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    applyBtn: document.getElementById('applyBtn'),
    exportPdf: document.getElementById('exportPdf'),
    exportSelectedPdf: document.getElementById('exportSelectedPdf'),
    busCheckboxes: document.getElementById('busCheckboxes'),
    selectAllBuses: document.getElementById('selectAllBuses'),
    deselectAllBuses: document.getElementById('deselectAllBuses')
};

// ===== Debounce utility =====
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ===== Toast Function =====
function showToast(message, type = 'success') {
    elements.toastMessage.textContent = message;
    elements.toast.className = `toast ${type}`;
    elements.toast.classList.add('show');

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ===== File Import Functions =====
function handleFileUpload(file) {
    if (!file) return;

    // 檢查 XLSX 函式庫是否載入
    if (typeof XLSX === 'undefined') {
        showToast('Excel 函式庫載入失敗，請重新整理頁面', 'error');
        console.error('XLSX library not loaded');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Read from 總表 sheet
            const sheetName = workbook.SheetNames.includes('總表') ? '總表' : workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            console.log('Excel 欄位名稱:', jsonData.length > 0 ? Object.keys(jsonData[0]) : '無資料');
            console.log('讀取到的資料筆數:', jsonData.length);

            state.allPersons = jsonData.map((row, index) => {
                // Get name - support multiple column names
                const nameValue = row['姓名'] || row['名字'] || row['姓 名'] || row['Name'] || row['name'] || '';

                // Get table value - could be number or "素"
                let tableValue = row['桌次&活動'] || row['桌次'] || row['桌號'] || row['桌'] || '';
                let isVeg = false;

                if (tableValue === '素' || String(tableValue).includes('素')) {
                    isVeg = true;
                    tableValue = String(tableValue).replace('素', '').trim() || '素食桌';
                }

                // Get bus value - support multiple column names
                let busValue = row['車次'] || row['車 / 船號'] || row['車次&遊湖'] || row['車號'] ||
                               row['船號'] || row['船次'] || row['號'] || row['編號'] || row['組別'] ||
                               row['幾號船'] || row['幾號車'] || row['遊湖'] || 'A';
                // 提取字母或數字 (例如 "A號船" -> "A", "10號船" -> "10")
                busValue = String(busValue).replace(/[號船車遊湖]/g, '').trim();
                // 如果是數字開頭，取整個數字；如果是字母開頭，取第一個字母
                const numMatch = busValue.match(/^\d+/);
                if (numMatch) {
                    busValue = numMatch[0];
                } else {
                    busValue = busValue.charAt(0).toUpperCase();
                }

                return {
                    id: index,
                    name: nameValue,
                    bus: busValue,
                    table: String(tableValue),
                    room: String(row['房號'] || row['房 號'] || row['Room'] || ''),
                    note: row['備註'] || row['備 註'] || row['Note'] || '',
                    isVeg: isVeg,
                    override: {
                        fontSize: null,
                        bgColor: null
                    }
                };
            }).filter(p => p.name); // Filter out empty rows

            // Group by bus - 支援字母 A-T 和數字 1-20
            state.personsByBus = {
                A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [],
                K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [],
                '1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': [], '8': [], '9': [], '10': [],
                '11': [], '12': [], '13': [], '14': [], '15': [], '16': [], '17': [], '18': [], '19': [], '20': []
            };
            state.allPersons.forEach(person => {
                const bus = person.bus; // 直接使用已解析的值 (如 "10", "A")
                if (state.personsByBus[bus] !== undefined) {
                    state.personsByBus[bus].push(person);
                } else {
                    // 如果是未預設的組別，動態建立
                    state.personsByBus[bus] = [person];
                }
            });

            // Update UI
            updateBusTabs();
            state.isApplied = false;
            renderPreview();

            elements.uploadZone.classList.add('has-file');
            elements.fileInfo.style.display = 'block';
            elements.fileInfo.textContent = `已匯入：${file.name} (${state.allPersons.length} 筆資料)`;
            elements.busTabs.style.display = 'flex';
            elements.applyBtn.disabled = false;

            showToast(`成功匯入 ${state.allPersons.length} 筆資料`, 'success');
        } catch (error) {
            console.error('File parse error:', error);
            showToast('檔案解析失敗，請確認格式正確', 'error');
        }
    };
    reader.readAsArrayBuffer(file);
}

function updateBusTabs() {
    document.querySelectorAll('.bus-tab').forEach(tab => {
        const bus = tab.dataset.bus;
        const count = state.personsByBus[bus]?.length || 0;
        tab.querySelector('.count').textContent = count;

        // Hide tabs with no data
        tab.style.display = count > 0 ? 'flex' : 'none';
    });

    // Update checkbox counts in export panel and hide empty ones
    document.querySelectorAll('.bus-checkbox').forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        const span = label.querySelector('.check-count');
        const bus = checkbox.value;
        const count = state.personsByBus[bus]?.length || 0;
        span.textContent = count;
        // Hide checkboxes with no data
        label.style.display = count > 0 ? 'flex' : 'none';
    });

    // Select first bus with data - 支援字母 A-T 和數字 1-20
    const firstBusWithData = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
    ].find(bus => state.personsByBus[bus]?.length > 0);
    if (firstBusWithData) {
        selectBus(firstBusWithData);
    }
}

function selectBus(bus) {
    state.currentBus = bus;
    state.isApplied = false;

    document.querySelectorAll('.bus-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.bus === bus);
    });

    // Update current bus label
    const busLabel = document.getElementById('currentBusLabel');
    if (busLabel) busLabel.textContent = bus;

    // Load bus-specific settings
    const busSetting = state.busSetting[bus];
    if (busSetting) {
        document.getElementById('footerText').value = busSetting.footerText;
        document.getElementById('bgColor').value = busSetting.bgColor;
        document.getElementById('textColor').value = busSetting.textColor;
        document.getElementById('borderColor').value = busSetting.borderColor;
    }

    renderPreview();
}

function setupUploadZone() {
    elements.uploadZone.addEventListener('click', () => {
        elements.fileInput.click();
    });

    elements.fileInput.addEventListener('change', (e) => {
        handleFileUpload(e.target.files[0]);
    });

    elements.uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.uploadZone.classList.add('dragover');
    });

    elements.uploadZone.addEventListener('dragleave', () => {
        elements.uploadZone.classList.remove('dragover');
    });

    elements.uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.uploadZone.classList.remove('dragover');
        handleFileUpload(e.dataTransfer.files[0]);
    });
}

function clearData() {
    if (state.allPersons.length === 0) {
        showToast('目前沒有資料', 'error');
        return;
    }
    if (confirm('確定要清除所有資料嗎？')) {
        state.allPersons = [];
        state.personsByBus = {
            A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [],
            K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [],
            '1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': [], '8': [], '9': [], '10': [],
            '11': [], '12': [], '13': [], '14': [], '15': [], '16': [], '17': [], '18': [], '19': [], '20': []
        };
        state.isApplied = false;
        renderPreview();
        elements.uploadZone.classList.remove('has-file');
        elements.fileInfo.style.display = 'none';
        elements.busTabs.style.display = 'none';
        elements.fileInput.value = '';
        elements.applyBtn.disabled = true;
        elements.exportPdf.disabled = true;
        elements.exportSelectedPdf.disabled = true;
        showToast('資料已清除', 'success');
    }
}

// ===== Preview Functions =====
function renderPreview() {
    const persons = state.personsByBus[state.currentBus] || [];

    if (persons.length === 0) {
        elements.previewGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <div class="empty-text">尚未匯入資料</div>
                <div class="empty-hint">請從左側面板上傳 Excel 或 CSV 檔案</div>
            </div>
        `;
        elements.previewCount.textContent = '共 0 張名牌';
        elements.previewModeInfo.style.display = 'none';
        return;
    }

    const split = state.splitCount;
    const totalPages = Math.ceil(persons.length / split);

    // If not applied, show first page with actual data (up to split count)
    if (!state.isApplied) {
        elements.previewModeInfo.style.display = 'block';
        const previewCount = Math.min(split, persons.length);
        elements.previewCount.textContent = `${state.currentBus} 號：共 ${persons.length} 張，預覽第 1 頁（${previewCount} 張）`;

        let html = `<div class="a4-page split-${split}">`;

        // Show first page of nametags
        for (let i = 0; i < split; i++) {
            if (i < persons.length) {
                const person = persons[i];
                html += renderNametagHTML(person, i);
            } else {
                // Empty slot
                html += `<div class="nametag" style="background: #fff; border-color: #ddd;"></div>`;
            }
        }
        html += '</div>';

        elements.previewGrid.innerHTML = html;
    } else {
        // Show all pages
        elements.previewModeInfo.style.display = 'none';

        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();

        for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
            const pageDiv = document.createElement('div');
            pageDiv.className = `a4-page split-${split}`;

            for (let i = 0; i < split; i++) {
                const personIndex = pageIndex * split + i;
                if (personIndex < persons.length) {
                    const person = persons[personIndex];
                    pageDiv.innerHTML += renderNametagHTML(person, personIndex);
                } else {
                    pageDiv.innerHTML += `<div class="nametag" style="background: #fff; border-color: #ddd;"></div>`;
                }
            }
            fragment.appendChild(pageDiv);
        }

        elements.previewGrid.innerHTML = '';
        elements.previewGrid.appendChild(fragment);
        elements.previewCount.textContent = `${state.currentBus} 號：${persons.length} 張名牌，${totalPages} 頁 A4`;
    }

    // Add click listeners using event delegation
    elements.previewGrid.onclick = function(e) {
        const card = e.target.closest('.nametag[data-index]');
        if (card) {
            const index = parseInt(card.dataset.index);
            openEditModal(index);
        }
    };
}

// Debounced version for input events
const debouncedRenderPreview = debounce(renderPreview, 100);

function renderNametagHTML(person, index) {
    const isVeg = person.isVeg || (person.note && person.note.includes('素'));

    // Get bus-specific colors
    const busSetting = state.busSetting[person.bus] || state.busSetting['A'];
    const bgColor = person.override.bgColor || busSetting.bgColor;
    const textColor = busSetting.textColor;
    const borderColor = busSetting.borderColor;
    const footerText = busSetting.footerText;

    // Get font sizes (use person override for name if set)
    const nameFontSize = person.override.fontSize || state.fontSizes.name;

    return `
        <div class="nametag" data-index="${index}" style="background: ${bgColor}; border-color: ${borderColor};">
            <div class="nametag-header">
                <div class="nametag-company" style="font-size: ${state.fontSizes.company}mm; color: ${borderColor};">${state.config.companyName}</div>
                <div class="nametag-main-title" style="font-size: ${state.fontSizes.event}mm; color: ${textColor};">${state.config.eventName}</div>
                <div class="nametag-sub-info" style="font-size: ${state.fontSizes.travel}mm; color: ${borderColor};">${state.config.travelInfo}</div>
            </div>
            <div class="nametag-name" style="font-size: ${nameFontSize}mm; color: ${textColor}; border-color: ${borderColor};">
                ${person.name}
            </div>
            <div class="nametag-details" style="font-size: ${state.fontSizes.labels}mm;">
                <div class="nametag-detail-row">
                    <span class="detail-label" style="color: ${borderColor};">${state.config.busLabel}</span>
                    <span class="detail-value" style="color: ${textColor};">${person.bus} 號</span>
                </div>
                <div class="nametag-detail-row">
                    <span class="detail-label" style="color: ${borderColor};">${state.config.tableLabel}</span>
                    <span class="detail-value" style="color: ${textColor};">${person.table}</span>
                    ${isVeg ? `<span class="veg-tag">素食桌</span>` : ''}
                </div>
                <div class="nametag-detail-row">
                    <span class="detail-label" style="color: ${borderColor};">${state.config.roomLabel}</span>
                    <span class="detail-value" style="color: ${textColor};">${person.room}</span>
                </div>
            </div>
            <div class="nametag-footer" style="font-size: ${state.fontSizes.footer}mm; color: ${borderColor}; border-color: ${borderColor};">
                ${footerText}
            </div>
        </div>
    `;
}

// ===== Apply Format =====
function applyFormat() {
    state.isApplied = true;
    elements.exportPdf.disabled = false;
    elements.exportSelectedPdf.disabled = false;
    renderPreview();
    showToast('格式已套用，顯示全部名牌', 'success');
}

// ===== Config Update Functions =====
function setupConfigListeners() {
    // Template settings - use debounced render for text inputs (shared across all buses)
    ['companyName', 'eventName', 'busLabel', 'tableLabel', 'roomLabel'].forEach(id => {
        document.getElementById(id).addEventListener('input', (e) => {
            state.config[id] = e.target.value;
            debouncedRenderPreview();
        });
    });

    // Footer text - save per bus
    document.getElementById('footerText').addEventListener('input', (e) => {
        state.busSetting[state.currentBus].footerText = e.target.value;
        debouncedRenderPreview();
    });

    // Color settings - save per bus
    ['bgColor', 'textColor', 'borderColor'].forEach(id => {
        document.getElementById(id).addEventListener('input', (e) => {
            state.busSetting[state.currentBus][id] = e.target.value;
            debouncedRenderPreview();
        });
    });

    // Font size sliders - 6 groups (shared across all buses)
    const fontSizeMap = {
        'fontSizeCompany': 'company',
        'fontSizeEvent': 'event',
        'fontSizeName': 'name',
        'fontSizeTravel': 'travel',
        'fontSizeLabels': 'labels',
        'fontSizeFooter': 'footer'
    };

    Object.keys(fontSizeMap).forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            slider.addEventListener('input', (e) => {
                const size = parseFloat(e.target.value);
                state.fontSizes[fontSizeMap[sliderId]] = size;
                // Update display value
                const valueSpan = document.querySelector(`.font-size-value[data-target="${sliderId}"]`);
                if (valueSpan) valueSpan.textContent = `${size}mm`;
                debouncedRenderPreview();
            });
        }
    });

    // Size presets (A4 split)
    document.querySelectorAll('.size-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            document.querySelectorAll('.size-preset').forEach(p => p.classList.remove('active'));
            preset.classList.add('active');
            state.splitCount = parseInt(preset.dataset.split);
            renderPreview();
        });
    });

    // Bus tabs
    document.querySelectorAll('.bus-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            selectBus(tab.dataset.bus);
        });
    });

    // Apply button
    elements.applyBtn.addEventListener('click', applyFormat);
}

// ===== Edit Modal Functions =====
function openEditModal(index) {
    const persons = state.personsByBus[state.currentBus] || [];
    if (index >= persons.length) return;

    state.selectedIndex = index;
    const person = persons[index];
    const busSetting = state.busSetting[person.bus] || state.busSetting['A'];

    document.getElementById('editName').value = person.name;
    document.getElementById('editBus').value = person.bus;
    document.getElementById('editTable').value = person.table;
    document.getElementById('editRoom').value = person.room;
    document.getElementById('editNote').value = person.note || '';
    document.getElementById('editFontSize').value = person.override.fontSize || state.fontSizes.name;
    document.getElementById('editBgColor').value = person.override.bgColor || busSetting.bgColor;

    elements.editModal.classList.add('active');
}

function closeEditModal() {
    elements.editModal.classList.remove('active');
    state.selectedIndex = null;
}

function saveEdit() {
    if (state.selectedIndex === null) return;

    const persons = state.personsByBus[state.currentBus];
    const person = persons[state.selectedIndex];

    person.name = document.getElementById('editName').value;
    person.bus = document.getElementById('editBus').value;
    person.table = document.getElementById('editTable').value;
    person.room = document.getElementById('editRoom').value;
    person.note = document.getElementById('editNote').value;
    person.isVeg = person.note && person.note.includes('素');
    person.override.fontSize = parseInt(document.getElementById('editFontSize').value);
    person.override.bgColor = document.getElementById('editBgColor').value;

    renderPreview();
    closeEditModal();
    showToast('名牌已更新', 'success');
}

function setupModalListeners() {
    document.getElementById('closeModal').addEventListener('click', closeEditModal);
    document.getElementById('cancelEdit').addEventListener('click', closeEditModal);
    document.getElementById('saveEdit').addEventListener('click', saveEdit);

    elements.editModal.addEventListener('click', (e) => {
        if (e.target === elements.editModal) {
            closeEditModal();
        }
    });
}

// ===== Panel Toggle =====
function setupPanelToggles() {
    document.querySelectorAll('.panel-header').forEach(header => {
        header.addEventListener('click', () => {
            header.closest('.panel').classList.toggle('collapsed');
        });
    });
}

// ===== Export Functions =====
async function exportPdf() {
    if (!state.isApplied) {
        showToast('請先點擊「套用格式並預覽全部」', 'error');
        return;
    }

    showToast('正在生成 PDF...', 'success');

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pages = document.querySelectorAll('.a4-page');

    for (let i = 0; i < pages.length; i++) {
        if (i > 0) {
            pdf.addPage();
        }

        const canvas = await html2canvas(pages[i], {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }

    pdf.save(`名牌輸出_${state.currentBus}號.pdf`);
    showToast('PDF 已下載', 'success');
}

// Get selected buses from checkboxes
function getSelectedBuses() {
    const checkboxes = elements.busCheckboxes.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

async function exportSelectedPdf() {
    if (!state.isApplied) {
        showToast('請先點擊「套用格式並預覽全部」', 'error');
        return;
    }

    const selectedBuses = getSelectedBuses();

    // Filter buses that have data
    const busesWithData = selectedBuses.filter(bus =>
        state.personsByBus[bus] && state.personsByBus[bus].length > 0
    );

    if (busesWithData.length === 0) {
        showToast('所選組別中沒有資料', 'error');
        return;
    }

    showToast(`正在生成 ${busesWithData.length} 個組別 PDF...`, 'success');

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    let isFirstPage = true;
    const originalBus = state.currentBus;

    for (const bus of busesWithData) {
        const persons = state.personsByBus[bus];
        if (!persons || persons.length === 0) continue;

        // Temporarily switch to this bus and render
        state.currentBus = bus;
        renderPreview();

        // Wait for render
        await new Promise(resolve => setTimeout(resolve, 100));

        const pages = document.querySelectorAll('.a4-page');

        for (let i = 0; i < pages.length; i++) {
            if (!isFirstPage) {
                pdf.addPage();
            }
            isFirstPage = false;

            const canvas = await html2canvas(pages[i], {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        }
    }

    // Restore original bus
    state.currentBus = originalBus;
    selectBus(originalBus);

    const busLabels = busesWithData.join('');
    pdf.save(`名牌輸出_${busLabels}號.pdf`);
    showToast(`${busesWithData.length} 個組別 PDF 已下載`, 'success');
}

function setupExportListeners() {
    elements.exportPdf.addEventListener('click', exportPdf);
    elements.exportSelectedPdf.addEventListener('click', exportSelectedPdf);

    // Select all / Deselect all buttons
    elements.selectAllBuses.addEventListener('click', () => {
        elements.busCheckboxes.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = true;
        });
    });

    elements.deselectAllBuses.addEventListener('click', () => {
        elements.busCheckboxes.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
    });
}

// ===== Initialize =====
function init() {
    document.getElementById('clearDataBtn').addEventListener('click', clearData);

    setupUploadZone();
    setupConfigListeners();
    setupModalListeners();
    setupPanelToggles();
    setupExportListeners();
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
