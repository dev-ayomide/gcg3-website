import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // ── Restored radius — soft on cards, zero on buttons/frames ──
    borderRadius: {
      none: '0',
      sm:   '3px',
      DEFAULT: '6px',
      md:   '8px',
      lg:   '12px',
      xl:   '16px',
      '2xl': '20px',
      '3xl': '28px',
      full: '9999px',
    },
    extend: {
      colors: {
        // ── Near-blacks (Apple-style depth) ──
        void:        '#08090e',   // hero, footer — max depth
        'void-2':    '#111218',   // slightly lifted dark

        // ── Brand indigo (reserve for specialty sections) ──
        bg:          '#222b64',
        surface:     '#1c2460',
        primary:     '#2d3a82',
        deep:        '#0d1240',

        // ── Light sections (Apple canvas) ──
        canvas:      '#f5f5f7',   // off-white — Apple's page gray
        'canvas-2':  '#eeeef2',   // slightly darker cream

        // ── Electric yellow — the ONE moment ──
        accent:      '#ece94c',
        'accent-warm': '#d5c532',
        'accent-light': '#fefde8',

        // ── Dark section text ──
        text:  '#f2f0fc',   // lavender-white
        muted: '#8e95c8',   // indigo-tinted midtone

        // ── Light section text (indigo-tinted, not gray) ──
        ink:        '#0c0c14',  // near-black headings on white
        'ink-mid':  '#3a3a5c',  // subheadings on white
        'ink-muted': '#6b6b8a', // body on white — indigo tint
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        heading: ['var(--font-outfit)', 'sans-serif'],
        label:   ['var(--font-outfit)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        syne:    ['var(--font-syne)', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
