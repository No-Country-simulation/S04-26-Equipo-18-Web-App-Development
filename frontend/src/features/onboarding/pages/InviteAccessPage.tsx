import { useParams } from 'react-router-dom'

const InviteAccessPage = () => {
  const { token } = useParams()

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Invitation</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">Invitation access</h1>
      <p className="mt-3 text-slate-600">Token detected: {token}</p>
      <p className="mt-2 text-slate-600">This route is ready for invitation validation and redirect logic.</p>
    </section>
  )
}

export default InviteAccessPage
