import type { AttributifyAttributes } from 'windicss/types/jsx'

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}
