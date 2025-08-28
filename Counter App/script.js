// Advanced Counter App with Multiple Features
class AdvancedCounterApp {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeState();
        this.loadSettings();
        this.loadHistory();
        this.updateStatistics();
        this.setupKeyboardShortcuts();
    }

    initializeElements() {
        // Main counter elements
        this.countElement = document.getElementById('count');
        this.decrementBtn = document.getElementById('decrement');
        this.incrementBtn = document.getElementById('increment');
        this.resetBtn = document.getElementById('reset');
        this.setValueBtn = document.getElementById('setValue');
        
        // Step counter elements
        this.stepCountElement = document.getElementById('stepCount');
        this.stepSizeInput = document.getElementById('stepSize');
        this.decrementStepBtn = document.getElementById('decrementStep');
        this.incrementStepBtn = document.getElementById('incrementStep');
        
        // Timer elements
        this.timerCountElement = document.getElementById('timerCount');
        this.startTimerBtn = document.getElementById('startTimer');
        this.stopTimerBtn = document.getElementById('stopTimer');
        this.resetTimerBtn = document.getElementById('resetTimer');
        
        // Settings elements
        this.autoSaveCheckbox = document.getElementById('autoSave');
        this.soundEnabledCheckbox = document.getElementById('soundEnabled');
        this.maxValueInput = document.getElementById('maxValue');
        this.minValueInput = document.getElementById('minValue');
        
        // History and statistics
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistory');
        this.exportHistoryBtn = document.getElementById('exportHistory');
        this.totalClicksElement = document.getElementById('totalClicks');
        this.maxReachedElement = document.getElementById('maxReached');
        this.minReachedElement = document.getElementById('minReached');
        this.resetCountElement = document.getElementById('resetCount');
        
        // Quick action buttons
        this.doubleValueBtn = document.getElementById('doubleValue');
        this.halfValueBtn = document.getElementById('halfValue');
        this.squareValueBtn = document.getElementById('squareValue');
        this.randomValueBtn = document.getElementById('randomValue');
        
        // Modal elements
        this.setValueModal = document.getElementById('setValueModal');
        this.customValueInput = document.getElementById('customValue');
        this.confirmValueBtn = document.getElementById('confirmValue');
        this.cancelValueBtn = document.getElementById('cancelValue');
        
        // Theme toggle
        this.themeToggle = document.querySelector('.theme-toggle');
    }

    initializeEventListeners() {
        // Main counter controls
        this.decrementBtn.addEventListener('click', () => this.decrement());
        this.incrementBtn.addEventListener('click', () => this.increment());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.setValueBtn.addEventListener('click', () => this.showSetValueModal());
        
        // Step counter controls
        this.decrementStepBtn.addEventListener('click', () => this.decrementStep());
        this.incrementStepBtn.addEventListener('click', () => this.incrementStep());
        this.stepSizeInput.addEventListener('change', () => this.updateStepSize());
        
        // Timer controls
        this.startTimerBtn.addEventListener('click', () => this.startTimer());
        this.stopTimerBtn.addEventListener('click', () => this.stopTimer());
        this.resetTimerBtn.addEventListener('click', () => this.resetTimer());
        
        // Settings
        this.autoSaveCheckbox.addEventListener('change', () => this.saveSettings());
        this.soundEnabledCheckbox.addEventListener('change', () => this.saveSettings());
        this.maxValueInput.addEventListener('change', () => this.saveSettings());
        this.minValueInput.addEventListener('change', () => this.saveSettings());
        
        // History controls
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.exportHistoryBtn.addEventListener('click', () => this.exportHistory());
        
        // Quick actions
        this.doubleValueBtn.addEventListener('click', () => this.doubleValue());
        this.halfValueBtn.addEventListener('click', () => this.halfValue());
        this.squareValueBtn.addEventListener('click', () => this.squareValue());
        this.randomValueBtn.addEventListener('click', () => this.randomValue());
        
        // Modal controls
        this.confirmValueBtn.addEventListener('click', () => this.setCustomValue());
        this.cancelValueBtn.addEventListener('click', () => this.hideSetValueModal());
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Modal backdrop click
        this.setValueModal.addEventListener('click', (e) => {
            if (e.target === this.setValueModal) {
                this.hideSetValueModal();
            }
        });
    }

    initializeState() {
        this.count = 0;
        this.stepCount = 0;
        this.timerCount = 0;
        this.stepSize = 1;
        this.timerRunning = false;
        this.timerInterval = null;
        this.isDarkTheme = false;
        
        // Statistics
        this.totalClicks = 0;
        this.maxReached = 0;
        this.minReached = 0;
        this.resetCount = 0;
        
        // Settings
        this.settings = {
            autoSave: true,
            soundEnabled: true,
            maxValue: 999999,
            minValue: -999999
        };
        
        // History
        this.history = [];
    }

    // Main counter methods
    increment() {
        const newValue = this.count + 1;
        if (newValue <= this.settings.maxValue) {
            this.count = newValue;
            this.updateDisplay();
            this.addToHistory('Increment', this.count);
            this.updateStatistics();
            this.playSound('increment');
            this.animateButton(this.incrementBtn);
        } else {
            this.showNotification('Maximum value reached!');
        }
    }

    decrement() {
        const newValue = this.count - 1;
        if (newValue >= this.settings.minValue) {
            this.count = newValue;
            this.updateDisplay();
            this.addToHistory('Decrement', this.count);
            this.updateStatistics();
            this.playSound('decrement');
            this.animateButton(this.decrementBtn);
        } else {
            this.showNotification('Minimum value reached!');
        }
    }

    reset() {
        this.count = 0;
        this.updateDisplay();
        this.addToHistory('Reset', this.count);
        this.resetCount++;
        this.updateStatistics();
        this.playSound('reset');
        this.animateButton(this.resetBtn);
        this.showNotification('Counter reset to 0');
    }

    // Step counter methods
    incrementStep() {
        const newValue = this.stepCount + this.stepSize;
        if (newValue <= this.settings.maxValue) {
            this.stepCount = newValue;
            this.updateStepDisplay();
            this.addToHistory('Step Increment', this.stepCount);
            this.playSound('increment');
            this.animateButton(this.incrementStepBtn);
        }
    }

    decrementStep() {
        const newValue = this.stepCount - this.stepSize;
        if (newValue >= this.settings.minValue) {
            this.stepCount = newValue;
            this.updateStepDisplay();
            this.addToHistory('Step Decrement', this.stepCount);
            this.playSound('decrement');
            this.animateButton(this.decrementStepBtn);
        }
    }

    updateStepSize() {
        this.stepSize = parseInt(this.stepSizeInput.value) || 1;
        this.stepSizeInput.value = this.stepSize;
    }

    // Timer methods
    startTimer() {
        if (!this.timerRunning) {
            this.timerRunning = true;
            this.startTimerBtn.disabled = true;
            this.stopTimerBtn.disabled = false;
            
            this.timerInterval = setInterval(() => {
                this.timerCount++;
                this.updateTimerDisplay();
                this.addToHistory('Timer Tick', this.timerCount);
            }, 1000);
            
            this.playSound('start');
            this.animateButton(this.startTimerBtn);
        }
    }

    stopTimer() {
        if (this.timerRunning) {
            this.timerRunning = false;
            this.startTimerBtn.disabled = false;
            this.stopTimerBtn.disabled = true;
            
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            
            this.playSound('stop');
            this.animateButton(this.stopTimerBtn);
        }
    }

    resetTimer() {
        this.stopTimer();
        this.timerCount = 0;
        this.updateTimerDisplay();
        this.addToHistory('Timer Reset', this.timerCount);
        this.playSound('reset');
        this.animateButton(this.resetTimerBtn);
    }

    // Display update methods
    updateDisplay() {
        this.countElement.textContent = this.count;
        this.animateCountChange();
        
        if (this.settings.autoSave) {
            this.saveSettings();
        }
    }

    updateStepDisplay() {
        this.stepCountElement.textContent = this.stepCount;
        this.animateCountChange();
    }

    updateTimerDisplay() {
        this.timerCountElement.textContent = this.timerCount;
        this.animateCountChange();
    }

    // Quick action methods
    doubleValue() {
        const newValue = this.count * 2;
        if (newValue <= this.settings.maxValue) {
            this.count = newValue;
            this.updateDisplay();
            this.addToHistory('Double Value', this.count);
            this.playSound('special');
            this.animateButton(this.doubleValueBtn);
        } else {
            this.showNotification('Value too large to double!');
        }
    }

    halfValue() {
        this.count = Math.floor(this.count / 2);
        this.updateDisplay();
        this.addToHistory('Half Value', this.count);
        this.playSound('special');
        this.animateButton(this.halfValueBtn);
    }

    squareValue() {
        const newValue = this.count * this.count;
        if (newValue <= this.settings.maxValue) {
            this.count = newValue;
            this.updateDisplay();
            this.addToHistory('Square Value', this.count);
            this.playSound('special');
            this.animateButton(this.squareValueBtn);
        } else {
            this.showNotification('Value too large to square!');
        }
    }

    randomValue() {
        const min = this.settings.minValue;
        const max = this.settings.maxValue;
        this.count = Math.floor(Math.random() * (max - min + 1)) + min;
        this.updateDisplay();
        this.addToHistory('Random Value', this.count);
        this.playSound('special');
        this.animateButton(this.randomValueBtn);
    }

    // Modal methods
    showSetValueModal() {
        this.setValueModal.style.display = 'block';
        this.customValueInput.value = this.count;
        this.customValueInput.focus();
        this.customValueInput.select();
    }

    hideSetValueModal() {
        this.setValueModal.style.display = 'none';
        this.customValueInput.value = '';
    }

    setCustomValue() {
        const value = parseInt(this.customValueInput.value);
        if (!isNaN(value) && value >= this.settings.minValue && value <= this.settings.maxValue) {
            this.count = value;
            this.updateDisplay();
            this.addToHistory('Set Value', this.count);
            this.hideSetValueModal();
            this.playSound('special');
        } else {
            this.showNotification('Invalid value!');
        }
    }

    // History methods
    addToHistory(action, value) {
        const historyItem = {
            action: action,
            value: value,
            timestamp: new Date().toLocaleTimeString(),
            id: Date.now()
        };
        
        this.history.unshift(historyItem);
        
        // Keep only last 50 items
        if (this.history.length > 50) {
            this.history.pop();
        }
        
        this.updateHistoryDisplay();
        this.saveHistory();
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <span class="action">${item.action}</span>
                <span class="value">${item.value}</span>
                <span class="time">${item.timestamp}</span>
            `;
            this.historyList.appendChild(historyItem);
        });
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
        this.saveHistory();
        this.showNotification('History cleared!');
    }

    exportHistory() {
        const csv = this.history.map(item => 
            `${item.action},${item.value},${item.timestamp}`
        ).join('\n');
        
        const blob = new Blob([`Action,Value,Timestamp\n${csv}`], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'counter-history.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        
        this.showNotification('History exported!');
    }

    // Statistics methods
    updateStatistics() {
        this.totalClicks++;
        
        if (this.count > this.maxReached) {
            this.maxReached = this.count;
        }
        
        if (this.count < this.minReached) {
            this.minReached = this.count;
        }
        
        this.totalClicksElement.textContent = this.totalClicks;
        this.maxReachedElement.textContent = this.maxReached;
        this.minReachedElement.textContent = this.minReached;
        this.resetCountElement.textContent = this.resetCount;
    }

    // Settings methods
    saveSettings() {
        this.settings.autoSave = this.autoSaveCheckbox.checked;
        this.settings.soundEnabled = this.soundEnabledCheckbox.checked;
        this.settings.maxValue = parseInt(this.maxValueInput.value) || 999999;
        this.settings.minValue = parseInt(this.minValueInput.value) || -999999;
        
        localStorage.setItem('counterSettings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('counterSettings');
        if (saved) {
            this.settings = JSON.parse(saved);
            this.autoSaveCheckbox.checked = this.settings.autoSave;
            this.soundEnabledCheckbox.checked = this.settings.soundEnabled;
            this.maxValueInput.value = this.settings.maxValue;
            this.minValueInput.value = this.settings.minValue;
        }
    }

    // Storage methods
    saveHistory() {
        localStorage.setItem('counterHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('counterHistory');
        if (saved) {
            this.history = JSON.parse(saved);
            this.updateHistoryDisplay();
        }
    }

    // Utility methods
    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        document.body.classList.toggle('dark-theme', this.isDarkTheme);
        
        const icon = this.themeToggle.querySelector('i');
        if (this.isDarkTheme) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        this.themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }

    playSound(type) {
        if (!this.settings.soundEnabled) return;
        
        // Create audio context for sound effects
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        let frequency, duration;
        
        switch (type) {
            case 'increment':
                frequency = 800;
                duration = 0.1;
                break;
            case 'decrement':
                frequency = 600;
                duration = 0.1;
                break;
            case 'reset':
                frequency = 400;
                duration = 0.2;
                break;
            case 'special':
                frequency = 1000;
                duration = 0.15;
                break;
            case 'start':
                frequency = 1200;
                duration = 0.1;
                break;
            case 'stop':
                frequency = 300;
                duration = 0.1;
                break;
        }
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Animation methods
    animateButton(button) {
        button.style.animation = 'bounce 0.6s ease-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 600);
    }

    animateCountChange() {
        const elements = [this.countElement, this.stepCountElement, this.timerCountElement];
        elements.forEach(element => {
            if (element.textContent !== '0') {
                element.style.animation = 'pulse 0.3s ease-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 300);
            }
        });
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            
            switch (e.key) {
                case '+':
                case '=':
                    e.preventDefault();
                    this.increment();
                    break;
                case '-':
                case '_':
                    e.preventDefault();
                    this.decrement();
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    this.reset();
                    break;
                case ' ':
                    e.preventDefault();
                    if (this.timerRunning) {
                        this.stopTimer();
                    } else {
                        this.startTimer();
                    }
                    break;
            }
        });
    }
}

// Initialize the counter app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedCounterApp();
});

// Add additional animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification {
        font-weight: 600;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);
