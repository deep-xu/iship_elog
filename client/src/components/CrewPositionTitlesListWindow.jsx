const ROWS = [
  { code: '', title: 'Vessel Manager', abbr: '', highlight: true },
  { code: '1', title: 'Master', abbr: 'MSTR' },
  { code: '2', title: 'Additional Master', abbr: 'AMST' },
  { code: '3', title: 'Chief Officer', abbr: 'C/O' },
  { code: '4', title: 'Addtnl Chief Officer', abbr: 'ACO' },
  { code: '5', title: 'Second Officer', abbr: '2/O' },
  { code: '6', title: 'Technical Superintendent', abbr: 'TECH' },
  { code: '7', title: 'Third Officer', abbr: '3/O' },
  { code: '8', title: 'Fourth Officer', abbr: '4/O' },
  { code: '9', title: 'Chief Engineer', abbr: 'C/E' },
  { code: '10', title: 'Fourth Officer', abbr: '4/O' },
  { code: '11', title: 'Second Engineer', abbr: '2/E' },
  { code: '13', title: 'Third Engineer', abbr: '3/E' },
  { code: '15', title: 'Fourth Engineer', abbr: '4/E' },
  { code: '16', title: 'Junior 4th Engineer', abbr: 'J4/E' },
  { code: '18', title: 'Fifth Engineer', abbr: '5/E' },
  { code: '21', title: 'Electrical Officer', abbr: 'E/O' },
  { code: '22', title: 'Trainee Electrical Officer', abbr: 'TE/O' },
  { code: '24', title: 'Junior Electrician', abbr: 'J/EL' },
  { code: '25', title: 'Deck Cadet', abbr: 'NCAD' },
  { code: '26', title: 'Deck Cadet', abbr: 'ADC1' },
  { code: '27', title: 'Engine Cadet', abbr: 'ECAD' },
  { code: '28', title: 'Electro Cadet', abbr: 'ELCA' },
  { code: '29', title: 'Bosun', abbr: 'BSN' },
  { code: '31', title: 'Able Bodied Seaman', abbr: 'AB' },
  { code: '32', title: 'HSEQ Superintendent', abbr: 'HSEQ' },
  { code: '33', title: 'Ordinary Seaman', abbr: 'OS' },
  { code: '35', title: 'Trainee Dk Hand', abbr: 'TDH' },
  { code: '37', title: 'Fitter', abbr: 'FTR' },
  { code: '41', title: 'Oiler', abbr: 'OLR' },
  { code: '42', title: 'Wiper', abbr: 'WPR' },
  { code: '43', title: 'Trainee Eng Hand', abbr: 'TEH' },
  { code: '45', title: 'Chief Cook', abbr: 'CCK' },
  { code: '47', title: 'Cook Trainee', abbr: 'TCK' },
  { code: '48', title: 'Messman', abbr: 'MSM' },
  { code: '49', title: '2nd Cook', abbr: '2CK' },
  { code: '52', title: 'Catering Trainee', abbr: 'CT' },
  { code: '53', title: 'Steward', abbr: 'STWD' },
  { code: '60', title: 'Supernumerary', abbr: 'SUP' },
  { code: '61', title: 'Welder', abbr: 'WLR' },
  { code: '62', title: 'Cadet Training Officer', abbr: 'CTO' },
  { code: '63', title: 'Reefer Assistant', abbr: 'RA' },
  { code: '899', title: 'Second Cook', abbr: '2CK' },
  { code: '997', title: 'Riding Crew', abbr: '' },
  { code: '998', title: 'Visitors', abbr: 'VIS' },
  { code: '999', title: 'Stevedore', abbr: 'STEV' },
]

export default function CrewPositionTitlesListWindow() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex items-center justify-between border-b border-[#d7e5ed] bg-[#e4edf3] px-4 py-2">
        <div className="flex items-center gap-3 text-[18px] font-semibold text-ns-navy">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-ns-blue text-[14px]">
            O
          </span>
          <span>Crew Position Titles List</span>
        </div>
        <div className="flex items-center gap-4 text-ns-navy">
          <button type="button" className="text-[18px] leading-none">
            _
          </button>
          <button type="button" className="text-[18px] leading-none">
            □
          </button>
          <button type="button" className="text-[18px] leading-none">
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-[14px] text-ns-navy">
          <thead>
            <tr className="bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] text-left text-white">
              <th className="w-8 border border-[#d7e5ed] px-2 py-2"></th>
              <th className="w-8 border border-[#d7e5ed] px-2 py-2"></th>
              <th className="border border-[#d7e5ed] px-3 py-2">Code</th>
              <th className="border border-[#d7e5ed] px-3 py-2">Title</th>
              <th className="border border-[#d7e5ed] px-3 py-2">Abbreviation</th>
              <th className="border border-[#d7e5ed] px-3 py-2">Registry Requires</th>
              <th className="border border-[#d7e5ed] px-3 py-2">Company Requir...</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr
                key={i}
                className={row.highlight ? 'bg-ns-blue text-white' : 'odd:bg-white even:bg-[#f2f2f2]'}
              >
                <td className="border border-[#e4edf3] px-2 py-1 text-center">
                  <input type="checkbox" readOnly />
                </td>
                <td className="border border-[#e4edf3] px-2 py-1"></td>
                <td className="border border-[#e4edf3] px-3 py-1">{row.code}</td>
                <td className="border border-[#e4edf3] px-3 py-1">{row.title}</td>
                <td className="border border-[#e4edf3] px-3 py-1">{row.abbr}</td>
                <td className="border border-[#e4edf3] px-3 py-1">0</td>
                <td className="border border-[#e4edf3] px-3 py-1">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
