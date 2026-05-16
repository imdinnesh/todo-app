import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  IconCheck, 
  IconCalendar, 
  IconCloudComputing, 
  IconUsers, 
  IconArrowRight,
  IconCircleCheckFilled
} from "@tabler/icons-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <IconCheck size={20} stroke={3} />
            </div>
            <span className="text-xl font-bold tracking-tight">TaskFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="transition-colors hover:text-primary">Features</Link>
            <Link href="#how-it-works" className="transition-colors hover:text-primary">How it works</Link>
            <Link href="#pricing" className="transition-colors hover:text-primary">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Log in
            </Link>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 [background:radial-gradient(100%_100%_at_50%_0%,rgba(124,58,237,0.1)_0,rgba(124,58,237,0)_100%)]" />
          <div className="absolute top-[10%] right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
          
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                  New: Collaborative workspaces are here
                </span>
              </div>
              <h1 className="mb-8 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up">
                Master your day, <br />
                <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  conquer your tasks.
                </span>
              </h1>
              <p className="mb-10 text-lg text-muted-foreground sm:text-xl animate-fade-in-up animation-delay-100">
                TaskFlow helps you organize, prioritize, and track everything you need to do in one beautiful, unified workspace. Stay productive anywhere.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up animation-delay-200">
                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30" asChild>
                  <Link href="/register">
                    Start Productivity for Free <IconArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base transition-all hover:bg-accent" asChild>
                  <Link href="#features">View Features</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up animation-delay-300">
                <div className="flex items-center gap-1.5">
                  <IconCircleCheckFilled size={16} className="text-primary" />
                  <span>Free Forever Plan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IconCircleCheckFilled size={16} className="text-primary" />
                  <span>No Credit Card</span>
                </div>
              </div>
            </div>

            {/* App Mockup */}
            <div className="mt-20 relative mx-auto max-w-5xl lg:mt-24">
              <div className="relative rounded-2xl border border-border/50 bg-background/50 p-2 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                <div className="overflow-hidden rounded-xl border border-border/50">
                  <Image 
                    src="/mockup.png" 
                    alt="TaskFlow Dashboard Mockup" 
                    width={1200} 
                    height={800} 
                    className="w-full object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
                    priority
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to stay organized</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Our features are designed to help you focus on what matters most, without the clutter.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={<IconCalendar size={24} />}
                title="Smart Scheduling"
                description="Intelligent due date suggestions and calendar integration to keep your schedule on track."
              />
              <FeatureCard 
                icon={<IconCloudComputing size={24} />}
                title="Cloud Sync"
                description="Access your tasks from any device. Your data is always synced and secured in the cloud."
              />
              <FeatureCard 
                icon={<IconUsers size={24} />}
                title="Team Collaboration"
                description="Share lists, assign tasks, and collaborate with your team in real-time."
              />
              <FeatureCard 
                icon={<IconCheck size={24} />}
                title="Priority Matrix"
                description="Focus on high-impact tasks with our built-in Eisenhower Matrix prioritization."
              />
              <FeatureCard 
                icon={<IconArrowRight size={24} />}
                title="Focus Mode"
                description="A distraction-free interface designed to help you get into deep work state faster."
              />
              <FeatureCard 
                icon={<IconCheck size={24} />}
                title="Detailed Analytics"
                description="Track your productivity trends and celebrate your wins with visual progress reports."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-2xl">
              {/* Decorative background for CTA */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              
              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Ready to transform your productivity?</h2>
                <p className="mb-10 text-lg text-primary-foreground/80">
                  Join thousands of users who are already conquering their goals with TaskFlow.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold" asChild>
                    <Link href="/register">Create Your Free Account</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 border-primary-foreground/20 bg-transparent px-8 text-base text-primary-foreground hover:bg-white/10" asChild>
                    <Link href="/contact">Talk to Sales</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <IconCheck size={20} stroke={3} />
                </div>
                <span className="text-xl font-bold tracking-tight">TaskFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The modern workspace for high-achieving individuals and teams.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} TaskFlow Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group relative rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

