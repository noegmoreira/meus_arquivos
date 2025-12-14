// --- DADOS DO JOGO ---
let gameData = {
    coins: 0, gems: 0, pets: [], furniture: [],
    theme: 'light', quality: 'high',
    mapStyle: 'linear-gradient(to bottom, #87CEEB, #90EE90)',
    settings: { volume: 50 },
    upgrades: {
        multiplier: 1, // Multiplicador Global de Renda
        efficiency: 1, // Reduz fome globalmente
        clickPower: 1, // Dinheiro por clique no mapa
        maxStats: 100  // Capacidade máxima das barras
    }
};

let currentSaveSlot = 1;
let selectedPet = null;
let previousScreen = 'menu-screen';
const SAVE_VERSION = 'saveV12_Full'; 

// --- DATABASE COMPLETA (TODAS AS RAÇAS RESTAURADAS) ---
const shopDB = {
    pets: [
        { id: 'd_std', name: 'Caramelo', price: 100, curr: 'coins', color: '#e67e22', breed: 'std', inc: 5 },
        { id: 'd_lab', name: 'Labrador', price: 300, curr: 'coins', color: '#f4e5c6', breed: 'std', inc: 8 },
        { id: 'd_blk', name: 'Pretinho', price: 350, curr: 'coins', color: '#333', breed: 'std', inc: 10 },
        { id: 'd_pug', name: 'Pug', price: 400, curr: 'coins', color: '#f1c40f', breed: 'std', inc: 12 },
        { id: 'd_pin', name: 'Pinscher', price: 600, curr: 'coins', color: '#5e3c25', breed: 'std', inc: 15 },
        { id: 'd_dal', name: 'Dálmata', price: 1500, curr: 'coins', color: '#ecf0f1', breed: 'spot', spotColor:'#333', inc: 25 },
        { id: 'd_bea', name: 'Beagle', price: 1800, curr: 'coins', color: '#e67e22', breed: 'spot', spotColor:'#ecf0f1', inc: 30 },
        { id: 'd_gol', name: 'Golden', price: 2500, curr: 'coins', color: '#ffd700', breed: 'std', inc: 40 },
        { id: 'd_rot', name: 'Rottweiler', price: 2800, curr: 'coins', color: '#2c3e50', breed: 'pattern', spotColor:'#d35400', inc: 45 },
        { id: 'd_hus', name: 'Husky', price: 3000, curr: 'coins', color: '#95a5a6', breed: 'pattern', spotColor:'#ecf0f1', inc: 50 },
        { id: 'd_she', name: 'Pastor', price: 3500, curr: 'coins', color: '#795548', breed: 'pattern', spotColor:'#333', inc: 60 },
        { id: 'd_ali', name: 'Alien', price: 50, curr: 'gems', color: '#2ecc71', breed: 'std', inc: 100 },
        { id: 'd_rob', name: 'RoboDog', price: 150, curr: 'gems', color: '#bdc3c7', breed: 'robot', inc: 200 },
        { id: 'd_zom', name: 'Zumbidog', price: 200, curr: 'gems', color: '#8e44ad', breed: 'shadow', inc: 300 },
        { id: 'd_gho', name: 'Fantasma', price: 300, curr: 'gems', color: '#ecf0f1', breed: 'shadow', inc: 500 }
    ],
    furniture: [
        // Tipo 'ball': Quica pela tela
        { id: 'f_ball1', name: 'Bola de Tênis', price: 200, curr: 'coins', color: '#e67e22', sym: '🎾', fType: 'ball' },
        { id: 'f_ball2', name: 'Bola de Futebol', price: 500, curr: 'coins', color: '#ecf0f1', sym: '⚽', fType: 'ball' },
        
        // Tipo 'rest': Pets perto descansam
        { id: 'f_bed1', name: 'Cama Simples', price: 500, curr: 'coins', color: '#ff7675', sym: '🛏️', fType: 'rest' },
        { id: 'f_hou1', name: 'Casinha', price: 1500, curr: 'coins', color: '#e67e22', sym: '🏠', fType: 'rest' },
        
        // Tipo 'generator': Gera moedas
        { id: 'f_tre1', name: 'Árvore da Fortuna', price: 2000, curr: 'coins', color: '#2ecc71', sym: '🌳', fType: 'generator' },
        { id: 'f_fir', name: 'Fogueira Mágica', price: 3500, curr: 'coins', color: '#e74c3c', sym: '🔥', fType: 'generator' },

        // Decorativos
        { id: 'f_box', name: 'Caixa de Papelão', price: 50, curr: 'coins', color: '#d35400', sym: '📦', fType: 'deco' },
        { id: 'f_bow1', name: 'Pote Azul', price: 100, curr: 'coins', color: '#74b9ff', sym: '🥣', fType: 'deco' },
    ],
    upgrades: [
        { id: 'u_mult', name: 'Marketing (+50% Valor)', basePrice: 1000, type: 'multiplier', power: 0.5 },
        { id: 'u_eff', name: 'Nutrição (+20% Resist.)', basePrice: 800, type: 'efficiency', power: 0.2 },
        { id: 'u_click', name: 'Poder do Clique (+1)', basePrice: 500, type: 'clickPower', power: 1 },
        { id: 'u_cap', name: 'Estômago Forte (+50 Max)', basePrice: 2000, type: 'maxStats', power: 50 }
    ],
    maps: [
        { id: 'm_dia', name: 'Padrão Dia', price: 0, curr: 'coins', style: 'linear-gradient(to bottom, #87CEEB, #90EE90)' },
        { id: 'm_tar', name: 'Entardecer', price: 200, curr: 'coins', style: 'linear-gradient(to bottom, #ff7e5f, #feb47b)' },
        { id: 'm_noi', name: 'Noite', price: 400, curr: 'coins', style: 'linear-gradient(to bottom, #2d3436, #0984e3)' },
        { id: 'm_gal', name: 'Galáxia', price: 30, curr: 'gems', style: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)' },
        { id: 'm_neo', name: 'Neon City', price: 50, curr: 'gems', style: 'linear-gradient(to bottom, #00c6ff, #0072ff)' },
        { id: 'm_fir', name: 'Inferno', price: 3000, curr: 'coins', style: 'linear-gradient(to bottom, #f12711, #f5af19)' },
        { id: 'm_ice', name: 'Gelo', price: 3000, curr: 'coins', style: 'linear-gradient(to bottom, #E0EAFC, #CFDEF3)' }
    ]
};

// --- STARTUP ---
window.onload = function() {
    showScreen('menu-screen');
    applySettings();
};

function showScreen(screenId) {
    document.querySelectorAll('section.screen').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    if(target) {
        target.style.display = 'flex';
        setTimeout(() => target.classList.add('active'), 10);
    }
    if(screenId === 'game-screen') render();
}

function getDistance(obj1, obj2) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// --- SAVE SYSTEM ---
function goToSaveScreen() { updateSaveUI(); showScreen('save-screen'); }

function updateSaveUI() {
    for(let i=1; i<=3; i++) {
        const btn = document.getElementById(`save-btn-${i}`);
        const saved = localStorage.getItem(`${SAVE_VERSION}_${i}`);
        if(saved) {
            try {
                const d = JSON.parse(saved);
                btn.innerHTML = `Slot ${i}: <strong>OCUPADO</strong><br>Pets: ${d.pets.length} | Moedas: $${Math.floor(d.coins)}`;
                btn.style.border = "2px solid #2ecc71";
                btn.style.background = "var(--secondary)";
            } catch(e) { btn.innerHTML = `Slot ${i}: Dados Corrompidos`; btn.style.background = "#e74c3c"; }
        } else {
            btn.innerHTML = `Slot ${i}: VAZIO (Criar Novo)`;
            btn.style.border = "2px dashed #999";
            btn.style.background = "transparent";
        }
    }
}

function selectSave(slot) {
    currentSaveSlot = slot;
    const saved = localStorage.getItem(`${SAVE_VERSION}_${slot}`);
    if(saved) {
        try { 
            gameData = JSON.parse(saved); 
            // Migração segura dos dados novos
            gameData.upgrades = gameData.upgrades || { multiplier: 1, efficiency: 1, clickPower: 1, maxStats: 100 };
            gameData.upgrades.clickPower = gameData.upgrades.clickPower || 1;
            gameData.upgrades.maxStats = gameData.upgrades.maxStats || 100;
            gameData.pets.forEach(p => { p.level = p.level || 1; });
            loadGame(); 
        } catch(e) { 
            alert("Save antigo incompatível ou corrompido. Iniciando novo.");
            startGame('macho'); 
        }
    } else {
        showScreen('creation-screen');
    }
}

// --- GAME LOGIC ---
function startGame(gender) {
    gameData = {
        coins: 800, gems: 25, pets: [], furniture: [],
        theme: 'light', quality: 'high',
        mapStyle: 'linear-gradient(to bottom, #87CEEB, #90EE90)',
        settings: { volume: 50 },
        upgrades: { multiplier: 1, efficiency: 1, clickPower: 1, maxStats: 100 }
    };
    gameData.pets.push({
        id: Date.now(), 
        name: gender==='macho'?'Rex':'Mel',
        color: gender==='macho'?'#e67e22':'#f1c40f', breed: 'std',
        x: 50, y: 50, 
        hunger: 100, thirst: 100, 
        inc: 5,
        level: 1 
    });
    saveGame();
    loadGame();
}

function loadGame() {
    applySettings();
    updateUI();
    render();
    showScreen('game-screen');
    if(window.gameLoop) clearInterval(window.gameLoop);
    window.gameLoop = setInterval(gameLoop, 1000);
}

function gameLoop() {
    if(document.getElementById('game-screen').style.display === 'none') return;

    let totalIncome = 0;
    const max = gameData.upgrades.maxStats;

    // Lógica Pets
    gameData.pets.forEach((p) => {
        let isResting = false;
        gameData.furniture.forEach(f => {
            if(f.fType === 'rest' && getDistance(p, f) < 15) isResting = true;
        });

        let decayBase = isResting ? 0.2 : 0.8;
        let decay = decayBase / gameData.upgrades.efficiency;
        
        p.hunger = Math.max(0, p.hunger - decay);
        p.thirst = Math.max(0, p.thirst - (decay * 1.2));
        
        const petEl = document.getElementById(`pet-${p.id}`);
        if(petEl) {
            if(isResting) petEl.classList.add('resting-effect');
            else petEl.classList.remove('resting-effect');
        }

        if(p.hunger > max*0.2 && p.thirst > max*0.2) {
            let petIncome = p.inc * p.level * gameData.upgrades.multiplier;
            totalIncome += petIncome;
            if(Math.random() > 0.5) spawnFloatingText(p.x, p.y, `+$${Math.floor(petIncome)}`, '#2ecc71');
        }
    });

    // Lógica Móveis
    gameData.furniture.forEach((f) => {
        const el = document.getElementById(`furn-${f.id}`);
        if(!el || el.classList.contains('drag')) return;

        if(f.fType === 'ball') {
            if(f.vx === undefined) { f.vx = (Math.random()-0.5)*1.5; f.vy = (Math.random()-0.5)*1.5; }
            f.x += f.vx; f.y += f.vy;
            if(f.x <= 5 || f.x >= 95) f.vx *= -1;
            if(f.y <= 5 || f.y >= 95) f.vy *= -1;
            el.style.left = f.x + '%'; el.style.top = f.y + '%';
        }
        else if(f.fType === 'generator') {
            if(Math.random() < 0.1) {
                const bonus = Math.floor(10 * gameData.upgrades.multiplier);
                gameData.coins += bonus;
                spawnFloatingText(f.x, f.y, `+$${bonus}`, '#f1c40f');
            }
        }
    });

    gameData.coins += totalIncome;
    updateUI();
    if(selectedPet) updateModal();
}

function handleClick(e) {
    if(e.target.id !== 'play-area') return;
    const clickValue = gameData.upgrades.clickPower * gameData.upgrades.multiplier;
    gameData.coins += clickValue;
    updateUI();
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spawnFloatingText(x, y, `+$${Math.floor(clickValue)}`, '#ffffff');
}

function spawnFloatingText(x, y, text, color) {
    const area = document.getElementById('play-area');
    if(!area || document.getElementById('game-screen').style.display === 'none') return;
    const el = document.createElement('div'); el.className = 'float-text';
    el.innerText = text; el.style.color = color;
    el.style.left = x + '%'; el.style.top = (y - 5) + '%';
    area.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

function createPetHTML(pet) {
    const spotVar = pet.spotColor ? `--spot-color: ${pet.spotColor};` : '';
    return `<div class="css-pet" style="--pet-color: ${pet.color}; ${spotVar}" data-breed="${pet.breed}">
        <div class="ears"></div><div class="head"><div class="face"><div class="eyes"></div><div class="snout"></div></div></div>
    </div>`;
}

function render() {
    const area = document.getElementById('play-area'); area.innerHTML = '';
    
    gameData.furniture.forEach(item => {
        const el = document.createElement('div'); 
        el.className = 'game-object'; el.id = `furn-${item.id}`;
        el.style.left = item.x + '%'; el.style.top = item.y + '%'; el.style.zIndex = 5;
        let funcIcon = item.fType !== 'deco' ? '<span style="font-size:0.8rem">⚡</span>' : '';
        el.innerHTML = `<div style="font-size:3rem;background:${item.color};padding:5px;border-radius:10px;">${item.sym}${funcIcon}</div>`;
        addDrag(el, item); area.appendChild(el);
    });

    gameData.pets.forEach(pet => {
        const el = document.createElement('div'); 
        el.className = 'game-object'; el.id = `pet-${pet.id}`;
        el.style.left = pet.x + '%'; el.style.top = pet.y + '%'; el.style.zIndex = 10;
        el.innerHTML = `<div class="pet-label">${pet.name} (Nv.${pet.level})</div>${createPetHTML(pet)}`;
        addDrag(el, pet); el.onclick = () => { if(!el.classList.contains('drag')) openModal(pet); };
        area.appendChild(el);
    });
}

function addDrag(el, obj) {
    let startX, startY;
    el.onmousedown = (e) => {
        if(e.button !== 0) return; e.stopPropagation();
        startX = e.clientX; startY = e.clientY;
        const move = (m) => {
            if(Math.abs(m.clientX - startX) > 5 || Math.abs(m.clientY - startY) > 5) {
                el.classList.add('drag');
                const p = el.parentElement.getBoundingClientRect();
                obj.x = Math.max(0, Math.min(100, ((m.clientX - p.left)/p.width)*100));
                obj.y = Math.max(0, Math.min(100, ((m.clientY - p.top)/p.height)*100));
                el.style.left = obj.x + '%'; el.style.top = obj.y + '%';
                if(obj.fType === 'ball') { obj.vx = 0; obj.vy = 0; }
            }
        };
        const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); setTimeout(()=>{ el.classList.remove('drag'); saveGame(); }, 50); };
        document.addEventListener('mousemove', move); document.addEventListener('mouseup', up);
    };
}

// --- SETTINGS ---
function openSettings(fromWhere) { if(fromWhere) previousScreen = (fromWhere === 'game' ? 'game-screen' : 'menu-screen'); showScreen('settings-screen'); updateSettingsUI(); }
function backSettings() { showScreen(previousScreen); }
function setQuality(level) { gameData.quality = level; applySettings(); updateSettingsUI(); }
function toggleTheme() { gameData.theme = (gameData.theme === 'light' ? 'dark' : 'light'); applySettings(); updateSettingsUI(); }
function updateSettingsUI() {
    document.getElementById('theme-btn').innerText = gameData.theme === 'light' ? 'Mudar para Escuro 🌙' : 'Mudar para Claro ☀️';
    document.querySelectorAll('.quality-btn').forEach(b => b.classList.remove('selected-quality'));
    const btn = document.getElementById(`q-${gameData.quality}`); if(btn) btn.classList.add('selected-quality');
}
function applySettings() {
    document.body.className = gameData.theme === 'dark' ? 'dark-mode' : '';
    document.body.classList.remove('quality-low', 'quality-high', 'quality-ultra');
    document.body.classList.add(`quality-${gameData.quality}`);
    document.getElementById('game-container').style.background = gameData.mapStyle;
}

// --- LOJA ---
function openShop() { showScreen('shop-screen'); filterShop('pets'); }
function closeShop() { showScreen('game-screen'); }

function filterShop(cat) {
    const div = document.getElementById('shop-items'); div.innerHTML = '';
    
    if(cat === 'upgrades') {
        shopDB.upgrades.forEach(u => {
            const el = document.createElement('div'); el.className = 'shop-item';
            let currentVal = gameData.upgrades[u.type];
            let priceMultiplier = u.type === 'maxStats' ? (currentVal/50 - 1) : (currentVal - (u.type==='multiplier'?0:1));
            let price = Math.floor(u.basePrice * Math.pow(1.5, Math.max(0, priceMultiplier)));
            let displayVal = u.type.includes('mult') || u.type.includes('eff') ? currentVal.toFixed(1)+'x' : currentVal;
            el.innerHTML = `<div style="font-size:2rem">⚡</div><h4>${u.name}</h4><p style="color:#aaa">Atual: ${displayVal}</p><p>$${price}</p><button onclick="buyUpgrade('${u.id}', ${price})" style="background:#f1c40f; color:#333">Melhorar</button>`;
            div.appendChild(el);
        });
        return;
    }

    shopDB[cat].forEach(i => {
        const el = document.createElement('div'); el.className = 'shop-item';
        let v, typeInfo = '';
        if(cat==='pets') v = `<div style="transform:scale(0.6)">${createPetHTML({color:i.color, breed:i.breed, spotColor:i.spotColor})}</div>`;
        else if(cat==='furniture') {
            v = `<div style="font-size:2rem;background:${i.color};border-radius:5px;">${i.sym}</div>`;
            if(i.fType === 'ball') typeInfo = '<br><span style="font-size:0.7rem;color:#3498db">Função: Quica</span>';
            if(i.fType === 'rest') typeInfo = '<br><span style="font-size:0.7rem;color:#2ecc71">Função: Descanso</span>';
            if(i.fType === 'generator') typeInfo = '<br><span style="font-size:0.7rem;color:#e74c3c">Função: Gera Ouro</span>';
        }
        else v = `<div style="height:30px;width:100%;background:${i.style};border-radius:5px;"></div>`;
        let currencySym = i.curr === 'coins' ? '$' : '💎';
        el.innerHTML = `${v}<h4>${i.name}${typeInfo}</h4><p>${currencySym}${i.price}</p><button onclick="buy('${cat}','${i.id}')">Comprar</button>`;
        div.appendChild(el);
    });
}

function buy(cat, id) {
    const item = shopDB[cat].find(i => i.id === id);
    if(gameData[item.curr] >= item.price) {
        gameData[item.curr] -= item.price;
        if(cat==='pets') gameData.pets.push({id:Date.now(), name:item.name, color:item.color, breed:item.breed, spotColor:item.spotColor, x:50, y:50, hunger:gameData.upgrades.maxStats, thirst:gameData.upgrades.maxStats, inc:item.inc, level:1});
        else if(cat==='furniture') gameData.furniture.push({id:Date.now(), color:item.color, sym:item.sym, x:50, y:50, fType:item.fType});
        else { gameData.mapStyle = item.style; applySettings(); }
        saveGame(); loadGame(); alert('Comprado!');
    } else alert('Saldo insuficiente!');
}

function buyUpgrade(id, price) {
    const up = shopDB.upgrades.find(u => u.id === id);
    if(gameData.coins >= price) {
        gameData.coins -= price;
        gameData.upgrades[up.type] += up.power;
        saveGame(); updateUI(); filterShop('upgrades');
        alert('Melhoria Global Adquirida!');
    } else { alert('Moedas insuficientes!'); }
}

// --- MODAL & PET INDIVIDUAL ---
function openModal(pet) { selectedPet = pet; document.getElementById('pet-modal').classList.add('active'); updateModal(); }
function closeModal() { document.getElementById('pet-modal').classList.remove('active'); selectedPet = null; }

function updateModal() {
    if(!selectedPet) return;
    const max = gameData.upgrades.maxStats;
    document.getElementById('m-name').innerText = `${selectedPet.name} (Caramelo)`;
    document.getElementById('m-level').innerText = selectedPet.level;
    document.getElementById('b-hunger').style.width = (selectedPet.hunger / max * 100)+'%';
    document.getElementById('val-hunger').innerText = `${Math.floor(selectedPet.hunger)}/${max}`;
    document.getElementById('b-thirst').style.width = (selectedPet.thirst / max * 100)+'%';
    document.getElementById('val-thirst').innerText = `${Math.floor(selectedPet.thirst)}/${max}`;
    const cost = selectedPet.level * 500;
    const btn = document.getElementById('btn-upgrade-pet');
    btn.innerText = `Subir para Nível ${selectedPet.level + 1} ($${cost})`;
    btn.disabled = gameData.coins < cost;
    btn.style.opacity = gameData.coins < cost ? 0.5 : 1;
}

function upgradeSelectedPet() {
    if(!selectedPet) return;
    const cost = selectedPet.level * 500;
    if(gameData.coins >= cost) {
        gameData.coins -= cost;
        selectedPet.level++;
        saveGame(); updateUI(); updateModal(); render();
        spawnFloatingText(selectedPet.x, selectedPet.y, "LEVEL UP! ⚡", "#f1c40f");
    }
}

function feed() { 
    const max = gameData.upgrades.maxStats;
    if(gameData.coins>=20 && selectedPet.hunger < max) { gameData.coins-=20; selectedPet.hunger=Math.min(max, selectedPet.hunger + (max*0.3)); updateUI(); updateModal(); } 
}
function water() { 
    const max = gameData.upgrades.maxStats;
    if(gameData.coins>=10 && selectedPet.thirst < max) { gameData.coins-=10; selectedPet.thirst=Math.min(max, selectedPet.thirst + (max*0.4)); updateUI(); updateModal(); } 
}

function updateUI() { 
    document.getElementById('coin-d').innerText = Math.floor(gameData.coins); 
    document.getElementById('gem-d').innerText = Math.floor(gameData.gems); 
    document.getElementById('mult-d').innerText = gameData.upgrades.multiplier.toFixed(1);
}
function saveGame() { localStorage.setItem(`${SAVE_VERSION}_${currentSaveSlot}`, JSON.stringify(gameData)); }
function saveExit() { saveGame(); location.reload(); }
function setVol(v) { document.getElementById('bgm').volume = v/100; gameData.settings.volume = v; document.getElementById('bgm').play().catch(()=>{}); }