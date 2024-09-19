import { cva } from '../../styled-system/css'
 
export const button = cva({
  base: {
    display: 'flex'
  },
  variants: {
    visual: {
      solid: { bg: 'blue.700', color: 'white' },
      outline: { borderWidth: '1px', borderColor: 'blue.700' },
    },
    rounded: {
      true: { borderRadius: '1rem' }
    },
    size: {
      sm: { padding: '4', fontSize: '12px' },
      lg: { padding: '8', fontSize: '24px' }
    }
  }
})