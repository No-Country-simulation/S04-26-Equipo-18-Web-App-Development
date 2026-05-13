import { Zap, ArrowRight, Users, Shield, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingHomePage = () => {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Contractor Onboarding Platform
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Streamline Your Contractor Onboarding
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Reduce activation time from 12 days to less than 3. Centralize document collection,
            contract signing, and payment setup in one seamless portal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/invite/NORTH-2024-ABC123"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Start with Invitation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/auth/admin/login"
              className="flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Open Admin Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            Everything You Need for Seamless Onboarding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Personal Data",
                description: "Collect contractor information with validated forms",
              },
              {
                icon: Shield,
                title: "Document Upload",
                description: "Secure document collection with status tracking",
              },
              {
                icon: CheckCircle2,
                title: "Digital Contracts",
                description: "Legally binding e-signatures with timestamps",
              },
              {
                icon: Clock,
                title: "Fast Activation",
                description: "Reduce onboarding time by 75% with automation",
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

      {/* Demo Links */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Explore the Platform
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
              <h3 className="font-semibold text-foreground mb-2">Contractor Onboarding</h3>
              <p className="text-sm text-muted-foreground">
                Enter from an invitation link and continue through auth and onboarding.
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
              <h3 className="font-semibold text-foreground mb-2">Admin Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                View and manage all contractor onboardings with real-time status updates.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default OnboardingHomePage
