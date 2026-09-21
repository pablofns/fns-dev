/**
 * Cybernetic Audio SFX Synthesizer (Web Audio API)
 * Generates futuristic sound effects natively without loading heavy audio assets
 */
class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.toggleBtn = document.getElementById('audio-toggle-btn');
    this.init();
  }

  init() {
    if (!this.toggleBtn) return;

    // Retrieve audio preference
    const savedPref = localStorage.getItem('cyber_audio_pref');
    if (savedPref === 'true') {
      this.enabled = true;
      this.toggleBtn.classList.add('active');
    }

    this.toggleBtn.addEventListener('click', () => {
      this.toggle();
    });

    this.bindEvents();
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('cyber_audio_pref', this.enabled);

    if (this.enabled) {
      this.ensureContext();
      this.toggleBtn.classList.add('active');
      this.playSuccess();
    } else {
      this.toggleBtn.classList.remove('active');
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playHover() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.07);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.07 + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.07);
      osc.stop(this.ctx.currentTime + i * 0.07 + 0.18);
    });
  }

  bindEvents() {
    document.querySelectorAll('.cyber-btn, .filter-btn, .social-btn, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => this.playHover());
      el.addEventListener('click', () => this.playClick());
    });
  }
}

// Global instance
window.cyberAudio = new CyberAudioEngine();
