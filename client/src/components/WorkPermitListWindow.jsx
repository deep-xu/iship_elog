import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = [
  'CL043-High Temp/Pressure',
  'FM106-Cold Work',
  'FM107-Enclosed Space Entr',
  'FM108-High Voltage Sys',
  'FM109-Hot Work',
  'FM110-Mach/Elect Power',
  'FM111-Underwater Work',
  'FM112-Work Aloft/Overside',
]

export default function WorkPermitListWindow(props) {
  return <DescriptionListWindow {...props} title="Work Permit List" rows={ROWS} selectedIndex={7} />
}
