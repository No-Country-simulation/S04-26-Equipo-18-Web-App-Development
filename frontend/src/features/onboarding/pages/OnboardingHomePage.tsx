import { Zap, ArrowRight, Users, Shield, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingHomePage = () => {
  return (
    <>
      <section className="h-screen py-20 bg-[url('/hero_background.png')] bg-cover bg-center">
        <div className="w-full text-center h-full max-w-2/4 px-4 flex flex-col justify-center items-center mr-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Plataforma de onboarding de contratistas
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Optimizá el onboarding de contratistas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Reducí el tiempo de activación de 12 días a menos de 3. Centralizá la carga de documentos,
            la firma de contratos y la configuración de pagos en un único portal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/invite/NORTH-2024-ABC123"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Comenzar con invitación
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/auth/admin/login"
              className="flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Abrir portal de administración
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            Todo lo que necesitás para un onboarding eficiente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Datos personales",
                description: "Recolección de información con formularios validados",
              },
              {
                icon: Shield,
                title: "Carga de documentos",
                description: "Recepción segura de documentos con seguimiento de estado",
              },
              {
                icon: CheckCircle2,
                title: "Contratos digitales",
                description: "Firmas electrónicas con marca de tiempo y trazabilidad",
              },
              {
                icon: Clock,
                title: "Activación ágil",
                description: "Reducí el tiempo de onboarding en un 75% con automatización",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enlaces demo */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Explorá la plataforma
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/invite/NORTH-2024-ABC123"
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Onboarding de contratistas</h3>
              <p className="text-sm text-muted-foreground">
                Ingresá desde un enlace de invitación y continuá con autenticación y onboarding.
              </p>
            </Link>

            <Link
              to="/auth/admin/login"
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Panel de administración</h3>
              <p className="text-sm text-muted-foreground">
                Visualizá y gestioná todos los onboardings de contratistas con estados en tiempo real.
              </p>
            </Link>
          </div>
        </div>
      </section>



      {/* <section className="relative overflow-hidden bg-white pt-xl pb-24 md:pt-32 md:pb-40">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-xs bg-emerald-light px-3 py-1 rounded-full mb-md">
                <span className="material-symbols-outlined text-emerald-accent text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
                <span className="text-label-caps font-label-caps text-emerald-accent">ACTIVACIÓN EN &lt; 72 HORAS</span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-slate-900 mb-md leading-tight">
                Contrata y gestiona contractors en <span className="text-gradient">tiempo récord</span>
              </h1>
              <p className="text-body-md text-slate-600 mb-xl max-w-lg">
                Centraliza el onboarding, el cumplimiento y los pagos internacionales en una sola plataforma. Reduce el tiempo de activación de 12 días a menos de 72 horas.
              </p>
              <div className="flex flex-col sm:flex-row gap-md">
                <button className="bg-emerald-accent text-white px-xl py-4 font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-sm">
                  Comenzar ahora
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="bg-white text-slate-700 border border-slate-200 px-xl py-4 font-semibold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-sm">
                  <span className="material-symbols-outlined">calendar_today</span>
                  Agendar demo
                </button>
              </div>
              <div className="mt-xl flex items-center gap-lg border-t border-slate-100 pt-md">
                <div>
                  <p className="text-headline-md text-slate-900 font-bold">1,000+</p>
                  <p className="text-helper-text text-slate-500">Contractors este mes</p>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div>
                  <p className="text-headline-md text-slate-900 font-bold">2.8 días</p>
                  <p className="text-helper-text text-slate-500">Promedio de activación</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-accent/5 rounded-3xl blur-2xl group-hover:bg-emerald-accent/10 transition-colors duration-500"></div>
              <div className="relative bg-white p-sm rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <img alt="Fintech Portal Interface" className="rounded-2xl w-full h-[500px] object-cover" data-alt="A professional Latina executive in a high-rise modern office overlooking a bright city skyline. She is smiling confidently while working on a sleek silver laptop, representing a fast-paced fintech environment. The lighting is soft, natural, and emphasizes a clean, corporate aesthetic with vibrant emerald and neutral slate color tones. The image conveys institutional stability and digital velocity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEGah85ER7tM5RuwHnvDGPtTioCBnXCfWZE0MFk1B5yefPBQi8QF5Pp8nWZsRt9E0L7zFxBxfC0V91lms-GNjRk1W1NzD0DQ3wFSBUaY5MC_1lfziYMV-KcDczqb0On9OMia0QQFhOhtv-mRxSJ4dimipRgT3I6vwnvTxDwUjYtBZB9wH-eMJRqKrQyTuONY0w7Wzxt1s9aOc9lUNhOu2WwBlkxmZVxVT9z65KC92h2CBJ9p57QtzzGF2w2XZViofyoSj5dWmN1YwI" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-md rounded-xl border border-white/50 shadow-2xl">
                  <div className="flex items-center justify-between mb-sm">
                    <span className="text-label-caps text-slate-500 uppercase">Estado de Onboarding</span>
                    <span className="bg-emerald-accent text-white text-[10px] px-2 py-0.5 rounded-full font-bold">ACTIVO</span>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Ana Martínez</p>
                      <p className="text-helper-text text-slate-500">Diseñadora UX • Argentina</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-emerald-600 font-bold">$4,500 USD</p>
                      <p className="text-[10px] text-slate-400">Transferencia enviada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-xl">
            <h2 className="font-headline-md text-headline-md text-slate-900 mb-sm">Por qué las empresas eligen NorthPay</h2>
            <p className="text-body-md text-slate-600 max-w-2xl mx-auto">Eliminamos las barreras geográficas para que puedas escalar tu equipo global sin complicaciones legales ni demoras bancarias.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-lg">
            <div className="bg-white p-lg rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-emerald-accent">bolt</span>
              </div>
              <h3 className="font-headline-md text-lg text-slate-900 mb-xs">Onboarding ultra-rápido</h3>
              <p className="text-body-md text-slate-600">Completa el proceso en 5 pasos sencillos. Nuestra plataforma guía al contractor automáticamente para que esté listo en horas.</p>
            </div>
            <div className="bg-white p-lg rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-emerald-accent">gavel</span>
              </div>
              <h3 className="font-headline-md text-lg text-slate-900 mb-xs">Cumplimiento garantizado</h3>
              <p className="text-body-md text-slate-600">Gestión de documentos y contratos legales locales. Mitigamos riesgos fiscales y laborales en más de 150 países.</p>
            </div>

            <div className="bg-white p-lg rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-emerald-accent">account_balance</span>
              </div>
              <h3 className="font-headline-md text-lg text-slate-900 mb-xs">Pagos simplificados</h3>
              <p className="text-body-md text-slate-600">Configuración de métodos de pago globales como SWIFT, SEPA y Digital Wallets con las mejores tasas del mercado.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-3xl p-xl overflow-hidden relative">

            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-emerald-500 to-transparent"></div>
            </div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-xl items-center">
              <div>
                <h2 className="font-headline-md text-display-lg-mobile text-white mb-xl">Tu equipo global en tres pasos</h2>
                <div className="space-y-xl">
                  <div className="flex gap-md group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">1</div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-xs">Invitar</h4>
                      <p className="text-slate-400 text-body-md">Envía una invitación digital a tu nuevo talento. Nosotros nos encargamos de solicitar la documentación necesaria.</p>
                    </div>
                  </div>
                  <div className="flex gap-md group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">2</div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-xs">Onboarding</h4>
                      <p className="text-slate-400 text-body-md">El contractor firma contratos localizados y sube su identificación. Verificamos todo en tiempo real.</p>
                    </div>
                  </div>
                  <div className="flex gap-md group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">3</div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-xs">Activar</h4>
                      <p className="text-slate-400 text-body-md">¡Listo para trabajar! Configura el ciclo de pagos y empieza a operar sin fronteras.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-md rounded-2xl">
                  <img alt="Modern Team Working" className="rounded-xl shadow-2xl" data-alt="A diverse group of professional software developers collaborating in a high-tech, sun-lit modern loft office. The scene features multiple monitors with code, large windows, and a warm, inclusive atmosphere. The visual style is crisp and professional, using a corporate color palette of slate and emerald accents to represent successful international team integration." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtdLx1s4j_xmATCvygB0yO3Y4KU-rcJ897fYA6xvbQnzHLdd2dDyhVSxCYQJPOO6puBZHbgPiX87-YG3ynfDuEju-rbymhWKYWBYL-sOfWTeP1G_UbWMRBlXi8LfxWPxaFpvx1hR-SEHo50uxRA0s2N9lJS32Cddup50aH6WZ-KNgPAKm59dskpRl_UHz9VxYGfGjE7gW3KmnLb3grTzB_tqmBfSauUZ1J-NSp_C8MXGTV_0ndA7HZxhYVflmPriJacI0KmBzaGnQZ" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-label-caps text-emerald-accent mb-md uppercase tracking-widest">NUESTRO IMPACTO ESTE MES</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg items-center">
            <div className="p-lg bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-display-lg text-slate-900 font-black">1k+</p>
              <p className="text-body-md text-slate-500">Contractors activados</p>
            </div>
            <div className="p-lg bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-display-lg text-slate-900 font-black">2.8</p>
              <p className="text-body-md text-slate-500">Días de activación promedio</p>
            </div>
            <div className="p-lg bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-display-lg text-slate-900 font-black">150+</p>
              <p className="text-body-md text-slate-500">Países soportados</p>
            </div>
            <div className="p-lg bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-display-lg text-slate-900 font-black">0%</p>
              <p className="text-body-md text-slate-500">Errores de cumplimiento</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-slate-900 mb-md">¿Listo para contratar sin fronteras?</h2>
          <p className="text-body-md text-slate-600 mb-xl">Únete a las empresas que están escalando sus equipos globales de forma eficiente y segura con NorthPay.</p>
          <div className="flex flex-col sm:flex-row gap-md justify-center">
            <button className="bg-primary text-on-primary px-xl py-4 font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-xl">
              Comenzar ahora gratis
            </button>
            <button className="bg-surface border border-slate-200 text-slate-700 px-xl py-4 font-bold rounded-xl hover:bg-slate-100 transition-all">
              Hablar con un experto
            </button>
          </div>
        </div>
      </section> */}
    </>
  )
}

export default OnboardingHomePage
