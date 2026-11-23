/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cumid: {
          ivory: '#faf8f5',
          cream: '#f7f4ef',
          sand: '#eee9e0',
          stone: '#dcd6cb',
          charcoal: '#181716',
          slate: '#252321',
          muted: '#625d57',
          subtle: '#8c8782',
          plum: {
            DEFAULT: '#6b5b84',
            dark: '#55476b',
            hover: '#605177',
            light: '#9182aa',
            soft: '#efeaf5',
          },
          lavender: {
            DEFAULT: '#d7cee5',
            light: '#f5f2fa',
            accent: '#baacd1',
          },
          sage: {
            DEFAULT: '#929c8a',
            light: '#edf1eb',
            dark: '#737e6b',
          },
          terracotta: {
            DEFAULT: '#c86d51',
            light: '#fbeeeb',
          },
          peach: {
            DEFAULT: '#faeade',
            light: '#fff6f0',
          },
          sky: {
            DEFAULT: '#d9e6f2',
            light: '#f0f5fa',
          },
          yellow: {
            DEFAULT: '#f9e7a2',
            light: '#fdf8e6',
          }
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -1px rgba(24, 23, 22, 0.05), 0 1px 4px -1px rgba(24, 23, 22, 0.03)',
        'soft': '0 4px 20px -2px rgba(24, 23, 22, 0.06), 0 2px 8px -2px rgba(24, 23, 22, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(24, 23, 22, 0.08), 0 4px 12px -2px rgba(24, 23, 22, 0.05)',
        'soft-xl': '0 20px 40px -6px rgba(24, 23, 22, 0.1), 0 8px 16px -4px rgba(24, 23, 22, 0.06)',
        'book': '0 15px 35px -5px rgba(24, 23, 22, 0.15), 0 5px 15px rgba(24, 23, 22, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
