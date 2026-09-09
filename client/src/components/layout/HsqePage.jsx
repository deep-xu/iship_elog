import ModulePage from '@/components/layout/ModulePage.jsx'
import { HSQE_SECTIONS } from '@/data/navigator.js'

export default function HsqePage({ currentUserId = '' }) {
  return (
    <ModulePage
      sections={HSQE_SECTIONS}
      defaultSection="hsqe"
      initialWindow="calendar"
      showMore
      currentUserId={currentUserId}
    />
  )
}
