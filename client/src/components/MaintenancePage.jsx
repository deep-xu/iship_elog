import ModulePage from './ModulePage.jsx'
import { SECTIONS } from '../data/navigator.js'

export default function MaintenancePage() {
  return (
    <ModulePage
      sections={SECTIONS}
      defaultSection="maintenance"
      initialWindow="equipment-explorer"
    />
  )
}
