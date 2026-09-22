/**
 * Main Application Logic: Decryption text effect, ScrollSpy, Skill Bars & Uplink Form
 */
document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // Cyber Text Decryption Effect (Hero Title)
  // ---------------------------------------------------------------------------
  const decryptElements = document.querySelectorAll('.cyber-decrypt');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/';

  decryptElements.forEach(el => {
    const originalText = el.getAttribute('data-value') || el.innerText;
    let iterations = 0;

    const interval = setInterval(() => {
      el.innerText = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations) {
            return originalText[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');

      if (iterations >= originalText.length) {
        clearInterval(interval);
      }

      iterations += 1 / 2;
    }, 30);
  });

  // ---------------------------------------------------------------------------
  // Mobile Nav Toggle
  // ---------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const hudLinks = document.querySelector('.hud-links');

  if (mobileToggle && hudLinks) {
    mobileToggle.addEventListener('click', () => {
      hudLinks.classList.toggle('mobile-active');
      const isExpanded = hudLinks.classList.contains('mobile-active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    document.querySelectorAll('.hud-link').forEach(link => {
      link.addEventListener('click', () => {
        hudLinks.classList.remove('mobile-active');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // ScrollSpy & Skill Bars Animation with IntersectionObserver
  // ---------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.hud-link');

  const observerOptions = {
    threshold: 0.35
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // Skill bars fill animation
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width') || '85%';
        fill.style.width = targetWidth;
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ---------------------------------------------------------------------------
  // Terminal Uplink Contact Form (FormSubmit.co API Integration)
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById('uplink-form');
  const terminalOutput = document.getElementById('uplink-status-output');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameInput?.value.trim() || 'Visitante';
      const email = emailInput?.value.trim() || '';
      const subject = subjectInput?.value.trim() || 'Consulta General';
      const message = messageInput?.value.trim() || '';

      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
      const originalBtnBg = submitBtn ? submitBtn.style.background : '';
      const originalBtnShadow = submitBtn ? submitBtn.style.boxShadow : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          TRANSMITIENDO...
        `;
      }

      if (terminalOutput) {
        terminalOutput.style.display = 'block';
        terminalOutput.innerHTML = `
          <p class="terminal-line"><span class="terminal-prompt">&gt;</span> [SYN] Inicializando handshake cuántico...</p>
          <p class="terminal-line"><span class="terminal-prompt">&gt;</span> [ACK] Cifrando paquete de datos (AES-256)...</p>
          <p class="terminal-line"><span class="terminal-prompt">&gt;</span> [NET] Estableciendo uplink con el servidor de correo...</p>
        `;
      }

      try {
        const payload = {
          name: name,
          email: email,
          subject: subject,
          message: message,
          _subject: `[Portfolio FNS.DEV] Nuevo mensaje de ${name}: ${subject}`,
          _template: 'table',
          _captcha: 'false'
        };

        const response = await fetch('https://formsubmit.co/ajax/03eec55e5262958ed761ba14cd36844a', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && (result.success === 'true' || result.success === true || response.status === 200)) {
          if (terminalOutput) {
            terminalOutput.innerHTML += `
              <p class="terminal-line" style="color: var(--neon-emerald);"><span class="terminal-prompt">&gt;</span> [STATUS 200] Uplink completado con éxito. ¡Mensaje recibido y transmitido a la casilla de Pablo (${name})!</p>
              <p class="terminal-line" style="color: var(--text-muted);"><span class="terminal-prompt">&gt;</span> [ACK] Copia de confirmación en camino a ${email}. Responderé a la brevedad.</p>
            `;
          }

          if (window.cyberAudio) window.cyberAudio.playSuccess();

          if (submitBtn) {
            submitBtn.innerHTML = `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              TRANSMISIÓN ENVIADA
            `;
            submitBtn.style.background = 'var(--neon-emerald)';
            submitBtn.style.boxShadow = '0 0 20px var(--neon-emerald-glow)';
          }

          contactForm.reset();

          // Restaurar botón después de 6 segundos
          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHTML;
              submitBtn.style.background = originalBtnBg;
              submitBtn.style.boxShadow = originalBtnShadow;
            }
          }, 6000);

        } else {
          throw new Error(result.message || 'El servidor devolvió un estado no satisfactorio');
        }
      } catch (error) {
        console.error('Error al enviar mensaje:', error);

        if (terminalOutput) {
          terminalOutput.innerHTML += `
            <p class="terminal-line" style="color: var(--neon-pink);"><span class="terminal-prompt">&gt;</span> [ERROR] Fallo de enlace: ${error.message || 'Error en la conexión'}.</p>
            <p class="terminal-line" style="color: var(--neon-cyan);"><span class="terminal-prompt">&gt;</span> [FALLBACK] Puedes escribir directamente a: <a href="mailto:pablofns@gmail.com" style="color: var(--neon-cyan); text-decoration: underline;">pablofns@gmail.com</a></p>
          `;
        }

        if (submitBtn) {
          submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            REINTENTAR ENVÍO
          `;
          submitBtn.style.background = 'rgba(255, 0, 85, 0.3)';
          submitBtn.style.boxShadow = '0 0 15px rgba(255, 0, 85, 0.5)';
          submitBtn.disabled = false;

          setTimeout(() => {
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.style.background = originalBtnBg;
            submitBtn.style.boxShadow = originalBtnShadow;
          }, 5000);
        }
      }
    });
  }
});
