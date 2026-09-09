import ModulePage from '@/components/layout/ModulePage.jsx'
import { SECTIONS } from '@/data/navigator.js'

export default function MaintenancePage({ currentUserId = '' }) {
  return (
    <ModulePage
      sections={SECTIONS}
      defaultSection="maintenance"
      initialWindow="equipment-explorer"
      currentUserId={currentUserId}
    />
  )
}
