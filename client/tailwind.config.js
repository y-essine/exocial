function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `var(${variable})`
  }
}

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  content: [],
  theme: {
    extend: {},
    screens: {
      '2xs': '1px',
      'xs': '400px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'dark-mode': { 'raw': '(prefers-color-scheme: dark)' },
      //enables dark-mode: bg-gray-900 etc
    },
    extend: {
      colors: {
        'primary': withOpacityValue('--color-primary'),
        'secondary': withOpacityValue('--color-secondary'),
        'tertiary': withOpacityValue('--color-tertiary'),
        'accent': withOpacityValue('--color-accent'),
        't-primary': withOpacityValue('--text-primary'),
        't-secondary': withOpacityValue('--text-secondary'),
        't-accent': withOpacityValue('--text-accent')
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
