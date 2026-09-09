const ROWS = [
  { name: 'US DOLLAR', abbr: 'USD', rate: '1.0000000', date: '11/03/2003' },
  { name: 'Canadian Dollars', abbr: 'CAD', rate: '1.4042300', date: '08/03/2026' },
  { name: 'Chinese Renminbi', abbr: 'CNY', rate: '6.7903500', date: '08/03/2026' },
  { name: 'Australian Dollars', abbr: 'AUD', rate: '1.4277861', date: '08/03/2026' },
  { name: 'New Zealand Dollars', abbr: 'NZD', rate: '1.7047101', date: '08/03/2026' },
  { name: 'Danish Kroner', abbr: 'DKK', rate: '6.4876155', date: '08/03/2026' },
  { name: 'Japanese Yen', abbr: 'JPY', rate: '157.0910000', date: '08/03/2026' },
  { name: 'Hong Kong Dollars', abbr: 'HKD', rate: '7.8424000', date: '08/03/2026' },
  { name: 'South Korean Won', abbr: 'KRW', rate: '1338.9282680', date: '02/03/2024' },
]

export default function CurrenciesExchangeRatesListWindow() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex items-center justify-between border-b border-[#d7e5ed] bg-[#e4edf3] px-4 py-2">
        <div className="flex items-center gap-3 text-[18px] font-semibold text-ns-navy">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-ns-blue text-[14px]">
            O
          </span>
          <span>Currencies &amp; Exchange Rates List</span>
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
              <th className="border border-[#d7e5ed] px-3 py-2">Currency Name</th>
              <th className="border border-[#d7e5ed] px-3 py-2">Abbreviation</th>
              <th className="border border-[#d7e5ed] px-3 py-2 text-right">Ex.Rate(Ref.Curr.USD)</th>
              <th className="border border-[#d7e5ed] px-3 py-2">Effective Date</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.abbr} className={i === 0 ? 'bg-ns-blue text-white' : 'odd:bg-white even:bg-[#f2f2f2]'}>
                <td className="border border-[#e4edf3] px-3 py-2">{row.name}</td>
                <td className="border border-[#e4edf3] px-3 py-2">{row.abbr}</td>
                <td className="border border-[#e4edf3] px-3 py-2 text-right">{row.rate}</td>
                <td className="border border-[#e4edf3] px-3 py-2">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
