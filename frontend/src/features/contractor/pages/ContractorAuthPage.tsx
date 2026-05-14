import ContractorAuth from "../components/ContractorAuth";


export const ContractorAuthPage = () => {

    return (
        <section className="bg-brand-dark px-4 py-12 text-white md:px-8 md:py-20">
            <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="np-reveal space-y-5">
                    <p className="inline-flex rounded-sm border border-brand-dark-soft bg-brand-dark-soft px-3 py-2 text-[11px] uppercase tracking-[0.12em]">
                        Acceso de contratistas
                    </p>
                    <h1 className="max-w-xl text-3xl font-medium tracking-[-0.03em] md:text-5xl">
                        Ingresa y completa tu onboarding operativo
                    </h1>
                    <p className="max-w-xl text-[16px] leading-7 text-white/75">
                        Registra tu cuenta con token de invitacion o inicia sesion para continuar el flujo documental y de pagos.
                    </p>

                    <div className="np-reveal np-delay-1 grid gap-3 max-w-xl">
                        <div className="rounded-sm border border-brand-dark-soft bg-brand-dark-card px-4 py-3 text-sm text-white/85">
                            1. Valida tu token
                        </div>
                        <div className="rounded-sm border border-brand-dark-soft bg-brand-dark-card px-4 py-3 text-sm text-white/85">
                            2. Completa credenciales
                        </div>
                        <div className="rounded-sm border border-brand-dark-soft bg-brand-dark-card px-4 py-3 text-sm text-white/85">
                            3. Continua al panel
                        </div>
                    </div>
                </div>

                <div className="np-reveal np-delay-1 w-full max-w-xl lg:justify-self-end">
                    <ContractorAuth />

                    <div className="mt-5 rounded-sm border border-brand-dark-soft bg-brand-dark-card px-4 py-3 text-center">
                        <p className="text-sm text-white/75">
                            {"¿No tenes un token de invitacion? "}
                            <a href="mailto:support@northpay.com" className="text-white underline decoration-brand-mint underline-offset-4">
                                Contactar soporte
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ContractorAuthPage;