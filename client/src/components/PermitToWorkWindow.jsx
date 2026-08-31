export default function PermitToWorkWindow() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="border-b border-[#c9c9c9] px-4 py-6">
        <h2 className="text-[26px] font-semibold text-ns-navy">
          Welcome to the Permit to Work Wizard
        </h2>
      </div>

      <div className="flex flex-1 overflow-hidden border-b border-[#c9c9c9]">
        <div className="flex w-[275px] shrink-0 items-start justify-center bg-[#7d95ad] px-5 py-8">
          <div className="flex h-[150px] w-[150px] items-center justify-center border-[3px] border-white bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]">
            <div className="relative h-[96px] w-[96px]">
              <span className="absolute left-[8px] top-[28px] h-[16px] w-[34px] rotate-[-38deg] rounded-[10px] bg-[#11d6cb]" />
              <span className="absolute left-[3px] top-[58px] h-[18px] w-[38px] rotate-[-28deg] rounded-[10px] bg-[#d6cc25]" />
              <span className="absolute left-[42px] top-[62px] h-[18px] w-[38px] rotate-[18deg] rounded-[10px] bg-[#e2333c]" />
              <span className="absolute left-[30px] top-[6px] h-[10px] w-[64px] rotate-[52deg] rounded-full bg-black" />
              <span className="absolute left-[58px] top-[10px] h-[4px] w-[4px] rounded-full bg-[#ff6845]" />
              <span className="absolute left-[75px] top-[18px] h-[4px] w-[4px] rounded-full bg-[#ff6845]" />
              <span className="absolute left-[70px] top-[2px] h-[4px] w-[4px] rounded-full bg-[#ff6845]" />
              <span className="absolute left-[86px] top-[30px] h-[4px] w-[4px] rounded-full bg-[#ff6845]" />
              <span className="absolute left-[50px] top-[34px] h-[4px] w-[4px] rounded-full bg-[#ff6845]" />
            </div>
          </div>
        </div>

        <div className="flex-1 px-6 py-10">
          <p className="max-w-[760px] text-[28px] font-semibold leading-[1.35] text-ns-navy">
            This Wizard will help you to create a Permit to Work Document.
            <br />
            To get started, click Next.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 px-6 py-4">
        <WizardButton label="<< Previous" />
        <WizardButton label="Next >>" active />
        <WizardButton label="Finish" />
        <WizardButton label="Help" />
      </div>
    </div>
  )
}

function WizardButton({ label, active = false }) {
  return (
    <button
      type="button"
      className={`min-w-[156px] border px-5 py-3 text-[18px] font-semibold ${
        active
          ? 'border-ns-blue bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] text-white'
          : 'border-[#7c7c7c] bg-[#ececec] text-[#7c7c7c]'
      }`}
    >
      {label}
    </button>
  )
}
