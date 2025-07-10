import type { PrismaClient } from '@generated/prisma';

import { testAccountId } from '../account.seed';

const contentJSON = {
  content: [
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'requestAnimationFrame',
          type: 'text',
        },
        {
          text: " doesn't always run at 60 Hz. Modern displays can have refresh rates of 120 Hz, 144 Hz, or even higher, and browsers adapt to match the display's native refresh rate.",
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "This means your animations and game loops need to be frame-rate independent. Don't assume 60 FPS - measure the actual delta time between frames and scale your animations accordingly.",
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'The Problem',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'Traditional animation code assumes 60 FPS:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'javascript',
      },
      content: [
        {
          text: '// ❌ Wrong - assumes 60 FPS\nlet position = 0;\n\nfunction animate() {\n  position += 5; // Moves 5px per frame\n  element.style.transform = `translateX(${position}px)`;\n  requestAnimationFrame(animate);\n}\n\n// On 120 Hz display: 600px/s\n// On 60 Hz display: 300px/s\n// On 30 Hz display: 150px/s',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'The Solution',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'Use delta time to make animations frame-rate independent:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'javascript',
      },
      content: [
        {
          text: '// ✅ Correct - frame-rate independent\nlet position = 0;\nlet lastTime = 0;\nconst speed = 300; // pixels per second\n\nfunction animate(currentTime) {\n  const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds\n  position += speed * deltaTime; // Scale by time\n  \n  element.style.transform = `translateX(${position}px)`;\n  lastTime = currentTime;\n  requestAnimationFrame(animate);\n}\n\n// Now runs at 300px/s regardless of refresh rate!',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Detecting Refresh Rate',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'javascript',
      },
      content: [
        {
          text: '// Measure actual refresh rate\nlet frameCount = 0;\nlet startTime = performance.now();\nlet refreshRate = 60;\n\nfunction measureRefreshRate() {\n  frameCount++;\n  \n  if (frameCount >= 60) {\n    const endTime = performance.now();\n    const duration = (endTime - startTime) / 1000; // seconds\n    refreshRate = Math.round(frameCount / duration);\n    \n    console.log(`Detected refresh rate: ${refreshRate} Hz`);\n    return;\n  }\n  \n  requestAnimationFrame(measureRefreshRate);\n}\n\nmeasureRefreshRate();',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'CSS Animations',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'CSS animations automatically adapt to the display refresh rate, but you can still optimize them:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'css',
      },
      content: [
        {
          text: '/* CSS animations are already frame-rate independent */\n.smooth-animation {\n  animation: slide 2s ease-in-out;\n  /* Will complete in exactly 2 seconds regardless of refresh rate */\n}\n\n@keyframes slide {\n  from { transform: translateX(0); }\n  to { transform: translateX(300px); }\n}\n\n/* Use will-change for better performance on high refresh displays */\n.optimized {\n  will-change: transform;\n  animation: slide 2s ease-in-out;\n}',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Game Loops',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'javascript',
      },
      content: [
        {
          text: '// Game loop with fixed time step\nclass GameLoop {\n  constructor() {\n    this.lastTime = 0;\n    this.accumulator = 0;\n    this.timestep = 1 / 60; // 60 Hz physics\n    this.isRunning = false;\n  }\n  \n  start() {\n    this.isRunning = true;\n    this.lastTime = performance.now();\n    this.loop();\n  }\n  \n  stop() {\n    this.isRunning = false;\n  }\n  \n  loop(currentTime) {\n    if (!this.isRunning) return;\n    \n    const deltaTime = (currentTime - this.lastTime) / 1000;\n    this.lastTime = currentTime;\n    \n    // Accumulate time for fixed physics updates\n    this.accumulator += deltaTime;\n    \n    // Run physics at fixed timestep\n    while (this.accumulator >= this.timestep) {\n      this.update(this.timestep);\n      this.accumulator -= this.timestep;\n    }\n    \n    // Render with interpolation\n    this.render(this.accumulator / this.timestep);\n    \n    requestAnimationFrame(this.loop.bind(this));\n  }\n  \n  update(dt) {\n    // Physics update - runs at fixed 60 Hz\n    // Update positions, velocities, collisions, etc.\n  }\n  \n  render(alpha) {\n    // Render with interpolation factor\n    // alpha = 0 to 1 for smooth interpolation\n  }\n}',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Performance Considerations',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'High refresh rate displays can expose performance issues:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'javascript',
      },
      content: [
        {
          text: '// Monitor frame times\nlet frameTimes = [];\nlet lastFrameTime = performance.now();\n\nfunction monitorPerformance(currentTime) {\n  const frameTime = currentTime - lastFrameTime;\n  frameTimes.push(frameTime);\n  \n  // Keep last 60 frames\n  if (frameTimes.length > 60) {\n    frameTimes.shift();\n  }\n  \n  // Calculate average frame time\n  const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;\n  const fps = 1000 / avgFrameTime;\n  \n  console.log(`Average FPS: ${fps.toFixed(1)}`);\n  \n  lastFrameTime = currentTime;\n  requestAnimationFrame(monitorPerformance);\n}\n\nmonitorPerformance(performance.now());',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Throttling for Performance',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'javascript',
      },
      content: [
        {
          text: '// Throttle to specific frame rate if needed\nclass ThrottledAnimation {\n  constructor(targetFPS = 60) {\n    this.targetFPS = targetFPS;\n    this.frameInterval = 1000 / targetFPS;\n    this.lastFrameTime = 0;\n  }\n  \n  animate(currentTime) {\n    if (currentTime - this.lastFrameTime >= this.frameInterval) {\n      // Update animation\n      this.update();\n      this.lastFrameTime = currentTime;\n    }\n    \n    requestAnimationFrame(this.animate.bind(this));\n  }\n  \n  update() {\n    // Your animation logic here\n  }\n}\n\n// Use for heavy animations on high refresh displays\nconst throttled = new ThrottledAnimation(30);\nthrottled.animate(performance.now());',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Browser Support',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'Modern browsers automatically match the display refresh rate:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'javascript',
      },
      content: [
        {
          text: '// Check if browser supports high refresh rate\nif (window.screen && window.screen.refreshRate) {\n  console.log(`Display refresh rate: ${window.screen.refreshRate} Hz`);\n}\n\n// Fallback for older browsers\nconst getRefreshRate = () => {\n  return window.screen?.refreshRate || 60;\n};\n\n// Use in your animation calculations\nconst refreshRate = getRefreshRate();\nconst frameTime = 1000 / refreshRate;',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Common Mistakes',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Assuming 60 FPS in calculations',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Not using delta time for movement',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Hard-coding animation speeds',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Ignoring performance on high refresh displays',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Not testing on different refresh rates',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Using setTimeout/setInterval for animations',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Best Practices',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Always use delta time for animations',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Test on displays with different refresh rates',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Monitor frame times and performance',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Use CSS animations when possible',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Implement frame-rate independent game loops',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Consider throttling for heavy animations',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Use will-change for performance hints',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'Modern displays are getting faster, but your animations should stay consistent. Always measure time, not frames.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedRequestAnimationFrameNot60HzShard = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-05-23T21:00:00.000Z');
  const publishedAt = createdAt;

  const entry = await tx.shardEntry.create({
    data: {
      authorId: testAccountId,
      createdAt,
      publishedAt,
    },
  });

  await tx.shard.create({
    data: {
      authorId: testAccountId,
      contentJSON,
      createdAt,
      entryId: entry.id,
      languageCode: 'en',
      publishedAt,
      seoDescription:
        "Learn why requestAnimationFrame doesn't always run at 60 Hz and how to create frame-rate independent animations for modern high refresh displays.",
      seoKeywords:
        'requestAnimationFrame, animation, frame rate, refresh rate, 60fps, game loop, delta time, performance, modern displays',
      seoTitle: 'requestAnimationFrame is Not Always 60 Hz',
      shortDescription: 'How to create frame-rate independent animations for modern high refresh displays.',
      slug: 'requestanimationframe-not-60hz',
      title: 'requestAnimationFrame ≠ 60 Hz',
    },
  });
};
