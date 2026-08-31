import ModulePage from './ModulePage.jsx'
import { HSQE_SECTIONS } from '../data/navigator.js'

export default function HsqePage() {
  return (
    <ModulePage
      sections={HSQE_SECTIONS}
      defaultSection="hsqe"
      initialWindow="calendar"
      showMore
    />
  )
}
