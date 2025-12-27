let scoreA = 0;
let scoreB = 0;
let historyStack = []; // Para deshacer
let playHistory = []; // Historial completo de jugadas
let playIdCounter = 0; // ID único para cada jugada
let currentInput = ""; // Almacena los números que se escriben
// Obtenemos el bono guardado o usamos 25 por defecto
let bonusValue = localStorage.getItem('cardiotechBonus') ? parseInt(localStorage.getItem('cardiotechBonus')) : 25;
// Obtenemos el límite guardado o usamos 200 por defecto
let gameLimit = localStorage.getItem('cardiotechLimit') ? parseInt(localStorage.getItem('cardiotechLimit')) : 200;

// --- FUNCIONES DE LA CALCULADORA ---

// Cuando tocas un número en el teclado
function appendNumber(num) {
    if (currentInput.length < 5) { // Límite de dígitos por seguridad
        currentInput += num.toString();
        updateScreen();
    }
}

// Borrar el último número (backspace)
function deleteLastChar() {
    currentInput = currentInput.slice(0, -1);
    updateScreen();
}

// Borrar todo (C)
function clearInput() {
    currentInput = "";
    updateScreen();
}

// Actualiza la pantalla gris con el número actual
function updateScreen() {
    const screen = document.getElementById('calcScreen');
    if (currentInput === "") {
        screen.innerText = "0";
        screen.style.color = "#ccc"; // Gris claro si es cero
    } else {
        screen.innerText = currentInput;
        screen.style.color = "var(--brand-black)";
    }
}

// --- FUNCIONES DE PUNTUACIÓN ---

// Función principal: Asigna el número de la pantalla a un equipo
function assignTo(team) {
    if (currentInput === "") return; // No hacer nada si está vacío

    const points = parseInt(currentInput);
    if (isNaN(points) || points === 0) return;

    saveState(); // Guardar para deshacer

    if (team === 'A') scoreA += points;
    else scoreB += points;

    // Agregar al historial
    addToPlayHistory(team, points, 'normal');

    // Después de asignar, limpiamos la pantalla
    clearInput();
    updateDisplay();
    checkWinner();
}

// Función para los botones rápidos de Premio/Bono
function addBonus(team) {
    saveState();
    if (team === 'A') scoreA += bonusValue;
    else scoreB += bonusValue;

    // Agregar al historial
    addToPlayHistory(team, bonusValue, 'premio');

    updateDisplay();
    checkWinner();
}

// --- FUNCIONES DE CONFIGURACIÓN (Premio) ---

function configureBonus() {
    let newValue = prompt("Configurar valor del Premio (Capicúa, Pase...):", bonusValue);
    if (newValue && !isNaN(newValue) && newValue > 0) {
        bonusValue = parseInt(newValue);
        // Guardar en la memoria del navegador
        localStorage.setItem('cardiotechBonus', bonusValue);
        updateBonusLabels();
    }
}

// Actualiza el texto de los botones de premio (ej: muestra +25 o +50)
function updateBonusLabels() {
    document.querySelectorAll('.bonus-val').forEach(el => {
        el.innerText = bonusValue;
    });
}

// --- FUNCIONES DE CONFIGURACIÓN ---

// Abrir modal de configuración
function openConfigModal() {
    const modal = document.getElementById('configModal');
    modal.classList.add('active');

    // Actualizar valor del input
    document.getElementById('bonusInput').value = bonusValue;
    document.getElementById('currentLimit').textContent = gameLimit;

    // Actualizar botones de límite
    document.querySelectorAll('.btn-limit').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = Array.from(document.querySelectorAll('.btn-limit')).find(btn =>
        btn.textContent.includes(gameLimit.toString())
    );
    if (activeBtn) activeBtn.classList.add('active');
}

// Cerrar modal de configuración
function closeConfigModal() {
    const modal = document.getElementById('configModal');
    modal.classList.remove('active');
}

// Establecer límite del juego
function setGameLimit(limit) {
    gameLimit = limit;
    localStorage.setItem('cardiotechLimit', limit);

    // Actualizar UI
    document.getElementById('currentLimit').textContent = limit;
    document.querySelectorAll('.btn-limit').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Actualizar barras de progreso
    updateProgressBars();
}

// Guardar configuración de premio
function saveBonusConfig() {
    const newValue = parseInt(document.getElementById('bonusInput').value);
    if (newValue && newValue > 0 && newValue <= 100) {
        bonusValue = newValue;
        localStorage.setItem('cardiotechBonus', bonusValue);
        updateBonusLabels();
        alert(`✅ Premio actualizado a +${bonusValue}`);
    } else {
        alert('❌ Por favor ingresa un valor entre 1 y 100');
    }
}

// Nueva partida desde configuración
function resetGameFromConfig() {
    closeConfigModal();
    if (confirm('¿Comenzar nueva partida?')) {
        scoreA = 0;
        scoreB = 0;
        historyStack = [];
        playHistory = [];
        playIdCounter = 0;
        clearInput();
        updateDisplay();
        updateProgressBars();
        renderHistory();
    }
}


// --- FUNCIONES GENERALES DEL JUEGO ---

function updateDisplay() {
    // Animación simple al cambiar puntos
    animateValue("scoreA", document.getElementById('scoreA').innerText, scoreA);
    animateValue("scoreB", document.getElementById('scoreB').innerText, scoreB);
    updateProgressBars();
    hapticFeedback();
}

// Pequeña animación para que los números suban gradualmente
function animateValue(id, start, end) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const duration = 300; // ms
    start = parseInt(start);
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerText = end; // Asegurar valor final
        }
    };
    window.requestAnimationFrame(step);
}


function saveState() {
    historyStack.push({ scoreA, scoreB });
}

function undo() {
    if (historyStack.length > 0) {
        const lastState = historyStack.pop();
        scoreA = lastState.scoreA;
        scoreB = lastState.scoreB;
        updateDisplay();
    }
}

function checkWinner() {
    setTimeout(() => {
        if (scoreA >= gameLimit) {
            triggerConfetti();
            setTimeout(() => {
                alert("🎉 ¡GANARON " + document.querySelector('#teamA input').value + "! 🎉");
            }, 500);
        }
        if (scoreB >= gameLimit) {
            triggerConfetti();
            setTimeout(() => {
                alert("🎉 ¡GANARON " + document.querySelector('#teamB input').value + "! 🎉");
            }, 500);
        }
    }, 350);
}

function resetGame() {
    if (confirm("¿Comenzar nueva partida?")) {
        scoreA = 0;
        scoreB = 0;
        historyStack = [];
        playHistory = [];
        playIdCounter = 0;
        clearInput();
        updateDisplay();
        updateProgressBars();
        renderHistory();
    }
}

// --- FUNCIONES DE FEEDBACK VISUAL ---

// Actualiza las barras de progreso
function updateProgressBars() {
    const progressA = document.getElementById('progressA');
    const progressB = document.getElementById('progressB');

    if (progressA) {
        const percentA = Math.min((scoreA / gameLimit) * 100, 100);
        progressA.style.width = percentA + '%';
    }

    if (progressB) {
        const percentB = Math.min((scoreB / gameLimit) * 100, 100);
        progressB.style.width = percentB + '%';
    }
}

// Vibración haptica (solo funciona en dispositivos móviles)
function hapticFeedback() {
    if ('vibrate' in navigator) {
        navigator.vibrate(10); // Vibración corta de 10ms
    }
}

// Animación de confetti cuando alguien gana
function triggerConfetti() {
    // Crear múltiples piezas de confetti
    const colors = ['#D81E28', '#667eea', '#764ba2', '#f5576c', '#10B981', '#FFD700'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 30);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    confetti.style.transition = 'all 3s ease-out';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

    document.body.appendChild(confetti);

    // Animación
    setTimeout(() => {
        confetti.style.top = '100vh';
        confetti.style.left = (parseFloat(confetti.style.left) + (Math.random() - 0.5) * 100) + '%';
        confetti.style.opacity = '0';
        confetti.style.transform = 'rotate(' + (Math.random() * 720) + 'deg)';
    }, 50);

    // Remover del DOM después de la animación
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// --- FUNCIONES DE HISTORIAL ---

// Agregar jugada al historial
function addToPlayHistory(team, points, type) {
    const teamName = team === 'A'
        ? document.querySelector('#teamA input').value
        : document.querySelector('#teamB input').value;

    playHistory.push({
        id: playIdCounter++,
        team: team,
        teamName: teamName,
        points: points,
        type: type,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    });

    renderHistory();
}

// Renderizar el historial en el DOM
function renderHistory() {
    const historyList = document.getElementById('historyList');

    if (playHistory.length === 0) {
        historyList.innerHTML = '<p class="history-empty">No hay jugadas registradas</p>';
        return;
    }

    historyList.innerHTML = playHistory.map(play => `
        <div class="history-item">
            <div class="history-item-info">
                <span class="history-team-badge ${play.team === 'A' ? 'team-a' : 'team-b'}">
                    ${play.teamName}
                </span>
                <span class="history-points">+${play.points}</span>
                <span class="history-type">${play.type === 'premio' ? '🏆 Premio' : '📊 Normal'}</span>
            </div>
            <div class="history-item-actions">
                <button class="btn-history-action" onclick="editPlay(${play.id})">✏️</button>
                <button class="btn-history-action btn-history-delete" onclick="deletePlay(${play.id})">🗑️</button>
            </div>
        </div>
    `).reverse().join('');
}

// Editar una jugada
function editPlay(playId) {
    const play = playHistory.find(p => p.id === playId);
    if (!play) return;

    const newPoints = prompt(`Editar puntos de ${play.teamName}:`, play.points);
    if (newPoints === null || newPoints === '' || isNaN(newPoints)) return;

    const pointsDiff = parseInt(newPoints) - play.points;

    // Actualizar puntaje
    if (play.team === 'A') scoreA += pointsDiff;
    else scoreB += pointsDiff;

    // Actualizar historial
    play.points = parseInt(newPoints);

    updateDisplay();
    renderHistory();
}

// Eliminar una jugada
function deletePlay(playId) {
    const play = playHistory.find(p => p.id === playId);
    if (!play) return;

    if (!confirm(`¿Eliminar jugada de ${play.teamName} (+${play.points})?`)) return;

    // Restar puntos del equipo
    if (play.team === 'A') scoreA -= play.points;
    else scoreB -= play.points;

    // Remover del historial
    playHistory = playHistory.filter(p => p.id !== playId);

    updateDisplay();
    renderHistory();
}

// Limpiar todo el historial
function clearHistory() {
    if (playHistory.length === 0) return;

    if (!confirm('¿Limpiar todo el historial de jugadas? (Los puntajes actuales se mantendrán)')) return;

    playHistory = [];
    renderHistory();
}

// --- ACTUALIZACIÓN DINÁMICA DE NOMBRES ---

// Actualizar nombres de equipos en los botones cuando se editan
function setupTeamNameListeners() {
    const teamAInput = document.querySelector('#teamA input');
    const teamBInput = document.querySelector('#teamB input');
    const teamNameBtnA = document.getElementById('teamNameBtnA');
    const teamNameBtnB = document.getElementById('teamNameBtnB');

    if (teamAInput && teamNameBtnA) {
        teamAInput.addEventListener('input', function () {
            teamNameBtnA.textContent = this.value || 'NOSOTROS';
        });
    }

    if (teamBInput && teamNameBtnB) {
        teamBInput.addEventListener('input', function () {
            teamNameBtnB.textContent = this.value || 'ELLOS';
        });
    }
}

// Inicializar
updateDisplay();
updateBonusLabels();
updateScreen();
updateProgressBars();
setupTeamNameListeners();
renderHistory();