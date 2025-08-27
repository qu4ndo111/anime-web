import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

export default function Background() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new PIXI.Application();

    if (!bgRef.current) return;

    const initPixi = async () => {
      await app.init({
        resizeTo: window,
        backgroundAlpha: 0,
        antialias: true,
      });

      if (bgRef.current) {
        bgRef.current.appendChild(app.canvas);
      }

      // tạo stars
      const stars: PIXI.Graphics[] = [];
      for (let i = 0; i < 150; i++) {
        const star = new PIXI.Graphics()
          .circle(0, 0, Math.random() * 2 + 1) // vẽ đường tròn
          .fill({ color: 0xffffff, alpha: Math.random() }); // fill mới hiện

        star.x = Math.random() * app.screen.width;
        star.y = Math.random() * app.screen.height;

        app.stage.addChild(star);
        stars.push(star);
      }

      // animation
      app.ticker.add(() => {
        stars.forEach((star) => {
          star.y += 0.3;
          if (star.y > app.screen.height) {
            star.y = 0;
            star.x = Math.random() * app.screen.width;
          }
        });
      });
    };
    initPixi();

  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
