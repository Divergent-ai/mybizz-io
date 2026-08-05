"use client";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

const needOptions = [
  "Website design and build",
  "Web application or portal",
  "Digital product strategy",
  "Automation or AI workflow",
  "Compliance and security",
  "Unsure / other",
];
const sizeOptions = ["Only me", "1-5", "6-20", "21-50", "51+"];
const budgetOptions = ["Under £10k", "£10k - £25k", "£25k - £50k", "£50k - £100k", "Over £100k"];
const timelineOptions = ["Immediately", "1-3 months", "3-6 months", "6+ months"];
const contactMethods = ["Email", "Phone", "Any"];

const steps = [
  { title: "What do you need?", field: "need" },
  { title: "Business size", field: "size" },
  { title: "Estimated budget", field: "budget" },
  { title: "Timeline?", field: "timeline" },
  { title: "Please provide your website URL", field: "website" },
  { title: "Please provide the details below so we get in touch", field: "details" },
];

type WizardState = {
  need: string;
  customNeed: string;
  size: string;
  budget: string;
  timeline: string;
  website: string;
  name: string;
  company: string;
  companyNumber: string;
  phone: string;
  email: string;
  preferredContact: string;
};

export function BusinessWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [confirmClose, setConfirmClose] = useState(false);
  const [form, setForm] = useState<WizardState>({
    need: "",
    customNeed: "",
    size: "",
    budget: "",
    timeline: "",
    website: "",
    name: "",
    company: "",
    companyNumber: "",
    phone: "",
    email: "",
    preferredContact: "Email",
  });

  const activeStep = steps[step];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        if (!form.need) return false;
        if (form.need === "Unsure / other") return form.customNeed.trim().length > 5;
        return true;
      case 1:
        return form.size.length > 0;
      case 2:
        return form.budget.length > 0;
      case 3:
        return form.timeline.length > 0;
      case 4:
        return form.website.trim().length > 5;
      case 5:
        return (
          form.name.trim().length > 1 &&
          form.company.trim().length > 1 &&
          form.email.trim().length > 5 &&
          form.phone.trim().length > 5
        );
      default:
        return false;
    }
  }, [step, form]);

  const handleInput = (field: keyof WizardState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetWizard = () => {
    setStep(0);
    setStatus("idle");
    setForm({
      need: "",
      customNeed: "",
      size: "",
      budget: "",
      timeline: "",
      website: "",
      name: "",
      company: "",
      companyNumber: "",
      phone: "",
      email: "",
      preferredContact: "Email",
    });
  };

  const handleSubmit = async () => {
    if (!canContinue) return;
    setStatus("loading");

    const payload = {
      inquiry: form.need === "Unsure / other" ? form.customNeed : form.need,
      businessSize: form.size,
      budget: form.budget,
      timeline: form.timeline,
      website: form.website,
      name: form.name,
      company: form.company,
      companyNumber: form.companyNumber,
      phone: form.phone,
      email: form.email,
      preferredContact: form.preferredContact,
      source: "Business wizard",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-40 rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-extrabold text-[color:var(--on-accent)] shadow-xl"
        onClick={() => setOpen(true)}
      >
        Tell us about your business
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.72)]">
          <div className="relative flex h-full w-full flex-col overflow-hidden p-4 md:p-8">
            <div className="relative mx-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-[color:rgba(255,255,255,0.18)] bg-[color:var(--bg)] shadow-[0_40px_130px_rgba(0,0,0,0.45)]">
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full border border-[color:rgba(255,255,255,0.18)] bg-[color:var(--accent)] p-2 text-[color:var(--on-accent)] shadow-md"
                onClick={() => setConfirmClose(true)}
                aria-label="Close wizard"
              >
                <X className="size-4" />
              </button>

              <div className="border-b border-[color:rgba(255,255,255,0.14)] bg-[color:var(--accent)] px-6 py-5 text-[color:var(--on-accent)]">
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[.26em] text-[color:rgba(255,255,255,0.92)]">
                  <span>Business wizard</span>
                  <span>{progress}% complete</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.18)]">
                  <div className="h-full rounded-full bg-[color:var(--on-accent)] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="flex h-full flex-col overflow-hidden md:h-[calc(100vh-5rem)]">
                <div className="overflow-y-auto px-6 py-6 md:px-10 md:py-8">
                  {status === "sent" ? (
                    <div className="grid gap-6 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--on-accent)]">
                        <CheckCircle2 className="size-8" />
                      </div>
                      <h2 className="text-3xl font-bold">Thanks — we’ve received your details.</h2>
                      <p className="muted text-[color:rgba(255,255,255,0.82)]">A member of the team will review your business needs and reach out shortly.</p>
                      <button
                        type="button"
                        className="btn btn-primary mx-auto mt-4"
                        onClick={() => {
                          setOpen(false);
                          resetWizard();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      <div>
                        <div className="eyebrow text-[color:rgba(255,255,255,0.92)]">Business intake</div>
                        <h2 className="display mt-4 text-3xl font-bold md:text-4xl">Tell us about your business</h2>
                        <p className="muted mt-4 text-sm leading-7 text-[color:rgba(255,255,255,0.82)]">
                          Complete this quick guide and we’ll connect you with the right specialist.
                        </p>
                      </div>

                      <div className="rounded-[28px] bg-[color:var(--accent)] p-5 text-[color:var(--on-accent)] shadow-[0_20px_60px_rgba(255,90,0,0.25)]">
                        <div className="text-xs font-semibold uppercase tracking-[.22em] text-[color:rgba(255,255,255,0.82)]">
                          Step {step + 1} of {steps.length}
                        </div>
                        <h3 className="mt-3 text-2xl font-bold">{activeStep.title}</h3>
                      </div>

                      <div className="grid gap-4">
                        {step === 0 && (
                          <div className="grid gap-4">
                            <div className="grid gap-3 sm:grid-cols-2">
                              {needOptions.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => handleInput("need", option)}
                                  className={`rounded-3xl border px-4 py-3 text-left text-sm font-semibold transition ${
                                    form.need === option
                                      ? "border-[color:var(--on-accent)] bg-[rgba(255,255,255,0.18)] text-[color:var(--on-accent)]"
                                      : "border-[color:rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.08)] text-[color:var(--on-accent)] hover:border-[color:var(--on-accent)] hover:bg-[rgba(255,255,255,0.14)]"
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                            {form.need === "Unsure / other" && (
                              <label className="block text-sm font-semibold">
                                Tell us more
                                <textarea
                                  className="input mt-2 min-h-[120px] resize-none bg-[rgba(255,255,255,0.12)] text-[color:var(--on-accent)] placeholder:text-[rgba(255,255,255,0.7)]"
                                  value={form.customNeed}
                                  onChange={(event) => handleInput("customNeed", event.target.value)}
                                  placeholder="Describe the outcome or concern"
                                />
                              </label>
                            )}
                          </div>
                        )}

                        {step === 1 && (
                          <div className="grid gap-4 sm:grid-cols-2">
                            {sizeOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleInput("size", option)}
                                className={`rounded-3xl border px-4 py-3 text-left text-sm font-semibold transition ${
                                  form.size === option
                                    ? "border-[color:var(--on-accent)] bg-[rgba(255,255,255,0.18)] text-[color:var(--on-accent)]"
                                    : "border-[color:rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.08)] text-[color:var(--on-accent)] hover:border-[color:var(--on-accent)] hover:bg-[rgba(255,255,255,0.14)]"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}

                        {step === 2 && (
                          <div className="grid gap-4 sm:grid-cols-2">
                            {budgetOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleInput("budget", option)}
                                className={`rounded-3xl border px-4 py-3 text-left text-sm font-semibold transition ${
                                  form.budget === option
                                    ? "border-[color:var(--on-accent)] bg-[rgba(255,255,255,0.18)] text-[color:var(--on-accent)]"
                                    : "border-[color:rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.08)] text-[color:var(--on-accent)] hover:border-[color:var(--on-accent)] hover:bg-[rgba(255,255,255,0.14)]"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}

                        {step === 3 && (
                          <div className="grid gap-4 sm:grid-cols-2">
                            {timelineOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleInput("timeline", option)}
                                className={`rounded-3xl border px-4 py-3 text-left text-sm font-semibold transition ${
                                  form.timeline === option
                                    ? "border-[color:var(--on-accent)] bg-[rgba(255,255,255,0.18)] text-[color:var(--on-accent)]"
                                    : "border-[color:rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.08)] text-[color:var(--on-accent)] hover:border-[color:var(--on-accent)] hover:bg-[rgba(255,255,255,0.14)]"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}

                        {step === 4 && (
                          <label className="block text-sm font-semibold">
                            Website URL
                            <input
                              type="url"
                              className="input mt-2 bg-[rgba(255,255,255,0.12)] text-[color:var(--on-accent)] placeholder:text-[rgba(255,255,255,0.7)]"
                              value={form.website}
                              onChange={(event) => handleInput("website", event.target.value)}
                              placeholder="https://"
                            />
                          </label>
                        )}

                        {step === 5 && (
                          <div className="grid gap-4">
                            <label className="block text-sm font-semibold">
                              Name
                              <input
                                className="input mt-2 bg-[rgba(255,255,255,0.12)] text-[color:var(--on-accent)] placeholder:text-[rgba(255,255,255,0.7)]"
                                value={form.name}
                                onChange={(event) => handleInput("name", event.target.value)}
                                placeholder="Your full name"
                              />
                            </label>
                            <label className="block text-sm font-semibold">
                              Company name
                              <input
                                className="input mt-2 bg-[rgba(255,255,255,0.12)] text-[color:var(--on-accent)] placeholder:text-[rgba(255,255,255,0.7)]"
                                value={form.company}
                                onChange={(event) => handleInput("company", event.target.value)}
                                placeholder="Your company"
                              />
                            </label>
                            <label className="block text-sm font-semibold">
                              Company number
                              <input
                                className="input mt-2 bg-[rgba(255,255,255,0.12)] text-[color:var(--on-accent)] placeholder:text-[rgba(255,255,255,0.7)]"
                                value={form.companyNumber}
                                onChange={(event) => handleInput("companyNumber", event.target.value)}
                                placeholder="Company registration number"
                              />
                            </label>
                            <label className="block text-sm font-semibold">
                              Contact number
                              <input
                                className="input mt-2 bg-[rgba(255,255,255,0.12)] text-[color:var(--on-accent)] placeholder:text-[rgba(255,255,255,0.7)]"
                                value={form.phone}
                                onChange={(event) => handleInput("phone", event.target.value)}
                                placeholder="Phone number"
                              />
                            </label>
                            <label className="block text-sm font-semibold">
                              Email
                              <input
                                type="email"
                                className="input mt-2 bg-[rgba(255,255,255,0.12)] text-[color:var(--on-accent)] placeholder:text-[rgba(255,255,255,0.7)]"
                                value={form.email}
                                onChange={(event) => handleInput("email", event.target.value)}
                                placeholder="Email address"
                              />
                            </label>
                            <fieldset className="grid gap-3 rounded-3xl border border-[color:rgba(255,255,255,0.16)] p-4">
                              <legend className="text-sm font-semibold">Preferred method of communication</legend>
                              <div className="grid gap-3 sm:grid-cols-3">
                                {contactMethods.map((option) => (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleInput("preferredContact", option)}
                                    className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${
                                      form.preferredContact === option
                                        ? "border-[color:var(--on-accent)] bg-[rgba(255,255,255,0.18)] text-[color:var(--on-accent)]"
                                        : "border-[color:rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.08)] text-[color:var(--on-accent)] hover:border-[color:var(--on-accent)] hover:bg-[rgba(255,255,255,0.14)]"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </fieldset>
                          </div>
                        )}
                      </div>

                      {status === "error" && (
                        <p className="text-sm text-[color:#ffd7c0]">There was a problem submitting your details. Please try again.</p>
                      )}
                    </div>
                  )}
                </div>

                {status !== "sent" && (
                  <div className="flex flex-col gap-3 border-t border-[color:rgba(255,255,255,0.12)] px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
                    <button
                      type="button"
                      className="btn btn-secondary text-[color:var(--accent)]"
                      onClick={() => setConfirmClose(true)}
                    >
                      Cancel
                    </button>
                    <div className="flex gap-3">
                      {step > 0 && (
                        <button
                          type="button"
                          className="btn btn-secondary text-[color:var(--accent)]"
                          onClick={() => setStep((current) => Math.max(current - 1, 0))}
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          if (step < steps.length - 1) {
                            setStep((current) => Math.min(current + 1, steps.length - 1));
                          } else {
                            handleSubmit();
                          }
                        }}
                        disabled={!canContinue || status === "loading"}
                      >
                        {status === "loading" ? "Sending…" : step < steps.length - 1 ? "Next" : "Submit"}
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {confirmClose && (
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.65)] p-4">
              <div className="w-full max-w-md rounded-3xl border border-[color:rgba(255,255,255,0.18)] bg-[color:var(--bg)] p-6 text-[color:var(--text)] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <h3 className="text-2xl font-bold">Are you sure you want to leave?</h3>
                <p className="muted mt-4 text-sm leading-7 text-[color:rgba(255,255,255,0.82)]">
                  Your progress will be lost if you close the wizard.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    className="btn btn-secondary text-[color:var(--accent)]"
                    onClick={() => setConfirmClose(false)}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setOpen(false);
                      setConfirmClose(false);
                      resetWizard();
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
