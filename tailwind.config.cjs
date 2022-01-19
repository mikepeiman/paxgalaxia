const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  important: false,
  experimental: {
    applyComplexClasses: true,
  },
  mode: 'jit',
  content: ['./src/**/*.svelte'],
  theme: {
    fontFamily: {
      'sans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
      'serif': ['Newsreader', ...defaultTheme.fontFamily.serif],
      'mono': ['Inconsolata', ...defaultTheme.fontFamily.mono],
      // Inconsolata,Menlo,Monaco,Consolas,'Courier New',monospace;
      'display': ['Vollkorn', ...defaultTheme.fontFamily.sans],
      'body': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
      'open': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
      'cairo': ['Cairo', '"Open Sans"', ...defaultTheme.fontFamily.sans],
      'merriweather': ['Merriweather', '"Open Sans"', ...defaultTheme.fontFamily.sans],
      'eczar': ['Eczar', '"Open Sans"', ...defaultTheme.fontFamily.sans],
      'vollkorn': ['Vollkorn',  ...defaultTheme.fontFamily.serif],
      'newsreader': ['Newsreader', ...defaultTheme.fontFamily.serif],
      'fira': ['"Fira Sans"', '"Open Sans"', ...defaultTheme.fontFamily.sans],
      'josefin': ['"Josefin Sans"', '"Open Sans"', ...defaultTheme.fontFamily.sans],
      'montserrat': ['Montserrat', '"Open Sans"', ...defaultTheme.fontFamily.sans],

    },
    extend: {

      colors: {
        ...colors,
        gray: {
          750: '#223240',
        },
        warm1: {
          100: "#f3d9d0",
          200: "#e7b4a1",
          300: "#da8e71",
          400: "#ce6942",
          500: "#c24313",
          600: "#9b360f",
          700: "#74280b",
          800: "#4e1b08",
          900: "#270d04"
        },
        warm2: {
          100: "#fde8d8",
          200: "#fbd0b2",
          300: "#fab98b",
          400: "#f8a165",
          500: "#f68a3e",
          600: "#c56e32",
          700: "#945325",
          800: "#623719",
          900: "#311c0c"
        },
        cool1: {
          100: "#ccecfd",
          200: "#99d9fb",
          300: "#66c6f9",
          400: "#33b3f7",
          500: "#00a0f5",
          600: "#0080c4",
          700: "#006093",
          800: "#004062",
          900: "#002031"
        },
        cool2: {
          100: "#d0d4f3",
          200: "#a1a9e7",
          300: "#717fda",
          400: "#4254ce",
          500: "#1329c2",
          600: "#0f219b",
          700: "#0b1974",
          800: "#08104e",
          900: "#040827"
        },
        cool3: {
          100: "#d7dae9",
          200: "#b0b4d2",
          300: "#888fbc",
          400: "#6169a5",
          500: "#39448f",
          600: "#2e3672",
          700: "#222956",
          800: "#171b39",
          900: "#0b0e1d"
        },
        prussianblue: {
          100: "#ccd7e0",
          200: "#99aec2",
          300: "#6686a3",
          400: "#335d85",
          500: "#003566",
          600: "#002a52",
          700: "#00203d",
          800: "#001529",
          900: "#000b14"
        },
        ceruleanblue: {
          100: "#ccdcf8",
          200: "#99b9f1",
          300: "#6696e9",
          400: "#3373e2",
          500: "#0050db",
          600: "#0040af",
          700: "#003083",
          800: "#002058",
          900: "#00102c"
        },
        bluecrayola: {
          100: "#dee6fd",
          200: "#bdcdfc",
          300: "#9bb3fa",
          400: "#7a9af9",
          500: "#5981f7",
          600: "#4767c6",
          700: "#354d94",
          800: "#243463",
          900: "#121a31"
        },
        orangeyellow: {
          100: "#fbf1cc",
          200: "#f7e399",
          300: "#f3d466",
          400: "#efc633",
          500: "#ebb800",
          600: "#bc9300",
          700: "#8d6e00",
          800: "#5e4a00",
          900: "#2f2500"
        },
        carnelian: {
          100: "#efccce",
          200: "#de999e",
          300: "#ce666d",
          400: "#bd333d",
          500: "#ad000c",
          600: "#8a000a",
          700: "#680007",
          800: "#450005",
          900: "#230002"
        },
        forest: {
          100: "#ccdbd3",
          200: "#99b7a7",
          300: "#67937b",
          400: "#346f4f",
          500: "#014b23",
          600: "#013c1c",
          700: "#012d15",
          800: "#001e0e",
          900: "#000f07"
},
        lincolngreen: {
          100: "#ccdecd",
          200: "#99be9b",
          300: "#669d6a",
          400: "#337d38",
          500: "#005c06",
          600: "#004a05",
          700: "#003704",
          800: "#002502",
          900: "#001201"
        },
        limegreen: {
          100: "#ccf7cf",
          200: "#99ef9f",
          300: "#66e66e",
          400: "#33de3e",
          500: "#00d60e",
          600: "#00ab0b",
          700: "#008008",
          800: "#005606",
          900: "#002b03"
        },
        electricindigo: {
          100: "#e4ccfa",
          200: "#c999f5",
          300: "#ad66f0",
          400: "#9233eb",
          500: "#7700e6",
          600: "#5f00b8",
          700: "#47008a",
          800: "#30005c",
          900: "#18002e"
        },
        electricviolet: {
          100: "#eacffc",
          200: "#d59efa",
          300: "#c06ef7",
          400: "#ab3df5",
          500: "#960df2",
          600: "#780ac2",
          700: "#5a0891",
          800: "#3c0561",
          900: "#1e0330"
        },
        electricpurple: {
          100: "#f1d8fd",
          200: "#e4b1fb",
          300: "#d68bf9",
          400: "#c964f7",
          500: "#bb3df5",
          600: "#9631c4",
          700: "#702593",
          800: "#4b1862",
          900: "#250c31"
        },
        greenge: {
          100: "#ccff33",
          200: "#9ef01a",
          300: "#70e000",
          400: "#38b000",
          500: "#008000",
          600: "#007200",
          700: "#006400",
          800: "#004b23",
          900: "#002411"
        },
        deepreds: {
          100: "#370617",
          200: "#6a040f",
          300: "#9d0208",
          400: "#d00000",
          500: "#dc2f02",
          600: "#e85d04",
          700: "#f48c06",
          800: "#faa307",
          900: "#ffba08"
        },
        winterblues: {
          100: "#caf0f8",
          200: "#ade8f4",
          300: "#90e0ef",
          400: "#48cae4",
          500: "#00b4d8",
          600: "#0096c7",
          700: "#0077b6",
          800: "#023e8a",
          900: "#03045e",
        },
        limegreens: {
          100: "#002411",
          200: "#004b23",
          300: "#006400",
          400: "#007200",
          500: "#008000",
          600: "#38b000",
          700: "#70e000",
          800: "#9ef01a",
          900: "#ccff33"
        },
 
      },
    },
    screens: {
      'sm': '480px',
      'md': '700px',
      'lg': '1100px',
      'xl': '1600px',
      '2xl': '2000px',
      '3xl': '2400px',
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
  daisyui: {
    themes: [
      {
        'quotes': {                          /* your theme name */
          'primary': '#a991f7',           /* Primary color */
          'primary-focus': '#8462f4',     /* Primary color - focused */
          'primary-content': '#ffffff',   /* Foreground content color to use on primary color */

          'secondary': '#f6d860',         /* Secondary color */
          'secondary-focus': '#f3cc30',   /* Secondary color - focused */
          'secondary-content': '#ffffff', /* Foreground content color to use on secondary color */

          'accent': '#37cdbe',            /* Accent color */
          'accent-focus': '#2aa79b',      /* Accent color - focused */
          'accent-content': '#ffffff',    /* Foreground content color to use on accent color */

          'neutral': '#3d4451',           /* Neutral color */
          'neutral-focus': '#2a2e37',     /* Neutral color - focused */
          'neutral-content': '#ffffff',   /* Foreground content color to use on neutral color */

          'base-100': '#000000',          /* Base color of page, used for blank backgrounds */
          'base-200': '#051122',          /* Base color, a little darker */
          'base-300': '#020511',          /* Base color, even more darker */
          'base-content': '#cfeff7',      /* Foreground content color to use on base color */

          'info': '#2094f3',              /* Info */
          'success': '#009485',           /* Success */
          'warning': '#ff9900',           /* Warning */
          'error': '#ff5724',             /* Error */
        },
      },
      'dark',
      'forest',
      'aqua',
      'fantasy',
      'luxury',
      'CMYK'
    ],
  }
}