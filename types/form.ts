import type { iInputData } from './input'

export interface IForm {
  [key: string]: Omit<iInputData, 'id'>
  name: Omit<iInputData, 'id'>
  email: Omit<iInputData, 'id'>
  message: Omit<iInputData, 'id'>
}
