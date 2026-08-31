import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = [
  '10 Year Keychain',
  'Award : 5 Years Service',
  'Award : For Exemplary Act',
  'Award: 10 Years Service',
  'Award: Cadet Scholarship',
  'Company Business Card',
  'Facebook: Featured Post',
  'Project Work',
  'Seamen Document Folder',
  'Signed Media Release Form',
]

export default function SkillListWindow(props) {
  return <DescriptionListWindow {...props} title="Skill List" rows={ROWS} selectedIndex={6} />
}
