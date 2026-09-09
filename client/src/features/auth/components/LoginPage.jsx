import { useState } from 'react'
import loginVessel from '@/assets/login-vessel.png'
import ishipLogo from '@/assets/iship-logo-custom.png'
import { api, ApiError } from '@/services/api/client.js'

export default function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Credentials are checked against the `users` table; the password itself is
  // never held in the bundle and only its PBKDF2 hash is stored server-side.
  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)

    try {
      const account = await api.post('/auth/login', { userId: userId.trim(), password })
      setError('')
      // Awaited so the button stays disabled while the app loads this
      // account's data, rather than flashing an empty workspace.
      await onLogin(account.role, account.userId)
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : 'Cannot reach the server. Check that the NS5 API is running.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#dceef0] font-ui text-ns-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginVessel})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#1c5864]/20" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex min-h-[142px] items-center justify-between border-b border-white/60 bg-[#eaf6f7]/82 px-[clamp(24px,6vw,92px)] py-7 backdrop-blur-sm">
          <div>
            <img
              src={ishipLogo}
              alt="iSHIP"
              className="mb-3 h-[clamp(48px,5vw,72px)] w-auto object-contain"
            />
            <h1 className="text-[clamp(32px,5vw,64px)] font-semibold tracking-[-0.035em] text-ns-navy">
              Marine Operations
            </h1>
            <p className="mt-1 text-[clamp(13px,1.35vw,19px)] font-medium tracking-[0.13em] text-[#47757c]">
              SIMPLE. CONNECTED. READY.
            </p>
          </div>
          <div className="hidden items-center gap-3 text-right sm:flex">
            <span className="h-10 w-px bg-[#9ac4c9]" />
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#69969c]">Fleet portal</p>
              <p className="mt-1 text-[15px] font-medium text-ns-navy">Secure crew access</p>
            </div>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-end px-[clamp(24px,9vw,170px)] py-12">
          <div className="w-full max-w-[540px] border border-white/80 bg-[#eef8f8]/88 p-[clamp(22px,3vw,42px)] shadow-[0_24px_70px_rgba(18,64,73,0.26)] backdrop-blur-md">
            <div className="border-b border-[#c2dde0] pb-5 text-center">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#6a989e]">Welcome aboard</p>
              <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.02em] text-ns-navy">Login</h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-[15px] font-semibold text-[#416f76]">User ID</span>
                <input
                  required
                  autoComplete="username"
                  className="mt-2 w-full border-0 border-b-2 border-[#b8d6d9] bg-transparent px-1 py-3 text-[18px] text-ns-navy outline-none transition-colors placeholder:text-[#91b3b8] focus:border-ns-blue"
                  placeholder="Enter your user ID"
                  type="text"
                  value={userId}
                  onChange={(event) => {
                    setUserId(event.target.value)
                    if (error) setError('')
                  }}
                />
              </label>

              <label className="block">
                <span className="text-[15px] font-semibold text-[#416f76]">Password</span>
                <span className="relative mt-2 block">
                  <input
                    required
                    autoComplete="current-password"
                    className="w-full border-0 border-b-2 border-[#b8d6d9] bg-transparent px-1 py-3 pr-12 text-[18px] text-ns-navy outline-none transition-colors placeholder:text-[#91b3b8] focus:border-ns-blue"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)
                      if (error) setError('')
                    }}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#63949a] transition-colors hover:text-ns-navy"
                  >
                    <EyeIcon visible={showPassword} />
                  </button>
                </span>
              </label>

              {error ? (
                <p
                  role="alert"
                  className="rounded-[12px] border border-[#e9b3c1] bg-[#fdf6f8] px-4 py-3 text-[15px] font-semibold text-[#b14d4d]"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="mx-auto mt-4 flex min-w-[166px] items-center justify-center bg-ns-navy px-8 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-ns-navy-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#eaf6f7] disabled:opacity-60"
              >
                {submitting ? 'Signing in…' : 'Login'}
              </button>
            </form>

            <label className="mt-9 flex items-center gap-5 border-t border-[#c2dde0] pt-5 text-[15px] font-semibold text-[#47757c]">
              Interface theme
              <select
                defaultValue="light"
                className="min-w-0 flex-1 border-0 border-b border-[#a9ced2] bg-transparent px-1 py-2 text-[16px] text-ns-navy outline-none"
              >
                <option value="light">Light</option>
              </select>
            </label>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/55 bg-[#eaf6f7]/88 px-[clamp(24px,5vw,88px)] py-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#48757b] backdrop-blur-sm">
          <span>Production environment</span>
          <span>Version 6.5.36</span>
          <span>Marine systems portal</span>
        </footer>
      </div>
    </main>
  )
}

function EyeIcon({ visible }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.9">
      <path d="M2.5 12s3.3-5.5 9.5-5.5S21.5 12 21.5 12 18.2 17.5 12 17.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
      {visible && <path d="M4 4 20 20" />}
    </svg>
  )
}
