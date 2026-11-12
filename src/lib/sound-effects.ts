// DPSBE Titans Sound System - Web Audio API Synthesis & Music Player

class TitansSoundSystem {
  private ctx: AudioContext | null = null;
  private musicAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private musicStarted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      void this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public get muted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.musicAudio) {
      this.musicAudio.muted = muted;
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Mechanical switch / relay click
  public playMechanicalClick(pitch = 1.0): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "square";
      osc.frequency.setValueAtTime(800 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(120 * pitch, now + 0.025);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200 * pitch, now);
      filter.Q.setValueAtTime(3.5, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Audio errors should never crash the UI
    }
  }

  // Electrical arc / circuit zap
  public playElectricZap(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.06);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Graceful fallback
    }
  }

  // Terminal keystroke chirp
  public playKeyChirp(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400 + Math.random() * 400, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.018);
    } catch {
      // Graceful fallback
    }
  }

  // Massive Cinematic Thunder Boom + Shockwave Explosion
  public playThunderBoom(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Initial electric crackle / lightning transient
      const crackleOsc = ctx.createOscillator();
      const crackleGain = ctx.createGain();
      crackleOsc.type = "sawtooth";
      crackleOsc.frequency.setValueAtTime(3200, now);
      crackleOsc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
      crackleGain.gain.setValueAtTime(0.4, now);
      crackleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      crackleOsc.connect(crackleGain);
      crackleGain.connect(ctx.destination);
      crackleOsc.start(now);
      crackleOsc.stop(now + 0.15);

      // 2. Heavy Sub-Bass Boom
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = "sine";
      bassOsc.frequency.setValueAtTime(180, now);
      bassOsc.frequency.exponentialRampToValueAtTime(32, now + 1.2);
      bassGain.gain.setValueAtTime(0.65, now + 0.02);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 1.9);

      // 3. Cinematic Thunder Rumble (synthesized white noise buffer passed through decaying low-pass)
      const bufferSize = ctx.sampleRate * 2.2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter for deep organic thunder texture
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 2.0);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.6, now + 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 2.2);
    } catch {
      // Graceful fallback
    }
  }

  // Official theme music playback (disabled as requested)
  public playThemeMusic(_volume = 0.45): void {
    if (this.musicAudio) {
      this.stopThemeMusic(0);
    }
  }

  public stopThemeMusic(fadeMs = 800): void {
    if (!this.musicAudio) return;
    try {
      const audio = this.musicAudio;
      const startVolume = audio.volume;
      const startTime = Date.now();

      const fadeInterval = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / fadeMs);
        audio.volume = Math.max(0, startVolume * (1 - progress));
        if (progress >= 1) {
          window.clearInterval(fadeInterval);
          audio.pause();
          audio.currentTime = 0;
          audio.volume = startVolume;
        }
      }, 50);
    } catch {
      // Graceful fallback
    }
  }
}

export const soundSystem = new TitansSoundSystem();

if (typeof window !== "undefined") {
  (window as unknown as { __titansSoundSystem?: TitansSoundSystem }).__titansSoundSystem =
    soundSystem;
}
