import { ThemeToggle } from "./theme-toggle";
import Header from "./components/ui/header";

export default function Page() {
  return (
    <>
      <Header></Header>
      <main className="relative min-h-screen bg-background text-foreground font-sans flex items-center justify-center p-8">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>
        <section className="w-full max-w-2xl rounded-[2rem] border border-border/70 bg-card p-10 shadow-[0_24px_80px_rgba(0,72,56,0.12)]">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-secondary">
            Brand palette
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-foreground">
            Aspekta is now active.
          </h1>
          <p className="mt-6 text-lg leading-8 text-secondary">
            The app now uses the exact green, lime, and off-white tones from the
            reference, with a dark-mode mapping that keeps the same brand
            family.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="h-20 rounded-xl bg-primary" />
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                #004838
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="h-20 rounded-xl bg-accent" />
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                #E2FB6C
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="h-20 rounded-xl bg-surface" />
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                #073127
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
