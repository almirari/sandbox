// Returns a stop() function. Add more games in js/ the same way.
export function flappy(k) {
  const g = k.getContext('2d');
  const sprite = new Image();
  sprite.src = 'textures/flappybird.png';
  let on = true, b, p, sc, dead, best = 0;

  const reset = () => {
    b = { y: 200, v: 0 };
    p = [{ x: 340, h: 140 }];
    sc = 0;
    dead = false;
  };
  reset();

  const flap = () => (dead ? reset() : (b.v = -6));
  k.style.touchAction = 'none';
  k.onpointerdown = e => { e.preventDefault(); flap(); };

  const key = e => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!e.repeat) flap();
    }
  };
  addEventListener('keydown', key);   // this line was missing in your paste

  (function step() {
    if (!on) return removeEventListener('keydown', key);
    requestAnimationFrame(step);

    if (!dead) {
      // physics
      b.v += 0.35;
      b.y += b.v;
      p.forEach(o => (o.x -= 2.2));

      // spawn a new pipe
      if (p[p.length - 1].x < 160) p.push({ x: 340, h: 80 + Math.random() * 180 });

      // score when the bird passes a pipe, then drop pipes that left the screen
      p.forEach(o => {
        if (!o.passed && o.x + 50 < 48) {
          o.passed = true;
          best = Math.max(best, ++sc);
        }
      });
      if (p[0].x < -50) p.shift();

      // collisions
      p.forEach(o => {
        if (72 > o.x && 48 < o.x + 50 && (b.y - 12 < o.h - 60 || b.y + 12 > o.h + 60)) dead = true;
      });
      if (b.y > 388 || b.y < 0) dead = true;
    }

        // draw
    g.clearRect(0, 0, 320, 400);

    g.fillStyle = '#ffdd3a';
    p.forEach(o => {
      g.fillRect(o.x, 0, 50, o.h - 60);
      g.fillRect(o.x, o.h + 60, 50, 400);
    });

    // bird sprite, tilts up when flapping and down when falling
    const S = 34;   // sprite size in px (the hitbox stays a 12px radius circle)
    if (sprite.complete && sprite.naturalWidth) {
      g.save();
      g.translate(60, b.y);
      g.rotate(Math.max(-0.5, Math.min(0.9, b.v * 0.08)));
      g.drawImage(sprite, -S / 2, -S / 2, S, S);
      g.restore();
    } else {
      g.fillStyle = '#55c9f2';            // fallback until the image loads
      g.beginPath();
      g.arc(60, b.y, 12, 0, 7);
      g.fill();
    }

    g.fillStyle = '#eef4ff';
    g.font = 'bold 22px monospace';
    g.fillText(sc + '  best ' + best, 10, 28);
    if (dead) g.fillText('oops! tap to retry', 60, 200);
  })();

  return () => (on = false);
}