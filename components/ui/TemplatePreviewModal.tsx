"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface TemplateData {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
  /** Optional: path to a demo video. Falls back to image poster if absent. */
  video?: string;
  time: string;
  successRate: number;
  pages: number;
  reviews: number;
  rating: number;
}

interface FormValues {
  email: string;
  organization: string;
  request: string;
}

interface FormErrors {
  email?: string;
  request?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}



// ─── Video Player ─────────────────────────────────────────────────────────────
function VideoPlayer({ src, poster, title }: { src?: string; poster: string; title: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration) setProgress((currentTime / duration) * 100);
  };

  const onEnded = () => setPlaying(false);

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  if (!src) {
    // Fallback: static image with "coming soon" overlay
    return (
      <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl">
        <Image src={poster} alt={title} fill className="object-cover" sizes="600px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
          <div className="text-center text-white">
            <div
              className="mx-auto mb-3 h-14 w-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(37, 99, 235, 0.6)", backdropFilter: "blur(8px)" }}
            >
              <Play className="h-6 w-6 fill-white text-white ml-0.5" aria-hidden />
            </div>
            <p className="text-sm font-medium opacity-80">Demo video coming soon</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl group/vid bg-black">
      {/* Lazy-loaded video element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onCanPlay={() => setLoaded(true)}
        className="w-full h-full object-cover"
        aria-label={`Demo video for ${title}`}
      />

      {/* Loading spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-2 opacity-0 group-hover/vid:opacity-100 transition-opacity duration-200">
        {/* Progress bar */}
        <div
          role="slider"
          aria-label="Video progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          className="h-1 w-full rounded-full bg-white/30 cursor-pointer"
          onClick={seekTo}
          onKeyDown={(e) => {
            if (!videoRef.current) return;
            if (e.key === "ArrowRight") videoRef.current.currentTime += 5;
            if (e.key === "ArrowLeft") videoRef.current.currentTime -= 5;
          }}
        >
          <div
            className="h-full rounded-full bg-primary-blue transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="h-8 w-8 rounded-full flex items-center justify-center text-white focus-ring"
            style={{ background: "rgba(37,99,235,0.7)", backdropFilter: "blur(6px)" }}
          >
            {playing ? (
              <Pause className="h-4 w-4 fill-white" />
            ) : (
              <Play className="h-4 w-4 fill-white ml-0.5" />
            )}
          </button>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="h-8 w-8 rounded-full flex items-center justify-center text-white focus-ring"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Click centre to play/pause */}
      {loaded && (
        <button
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="absolute inset-0 focus:outline-none group-hover/vid:opacity-0 transition-opacity flex items-center justify-center"
        >
          {!playing && (
            <div
              className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "rgba(37, 99, 235, 0.75)", backdropFilter: "blur(8px)" }}
            >
              <Play className="h-7 w-7 fill-white text-white ml-1" />
            </div>
          )}
        </button>
      )}
    </div>
  );
}

// ─── Glass Form Field ─────────────────────────────────────────────────────────
function GlassField({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-neutral-900">
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3 flex-shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Glass Input Styles ───────────────────────────────────────────────────────
const glassInputCls =
  "w-full rounded-xl border bg-white/60 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-0 " +
  "transition-all duration-200 " +
  "border-white/60 hover:border-primary-blue/40";

const glassInputErrCls = "border-red-400 focus-visible:ring-red-400";

// ─── Main Modal ───────────────────────────────────────────────────────────────
export interface TemplatePreviewModalProps {
  template: TemplateData | null;
  onClose: () => void;
}

export function TemplatePreviewModal({ template, onClose }: TemplatePreviewModalProps) {
  const isOpen = !!template;

  // ── Form state ──────────────────────────────────────────────────────────────
  const [values, setValues] = React.useState<FormValues>({
    email: "",
    organization: "",
    request: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [touched, setTouched] = React.useState<Partial<Record<keyof FormValues, boolean>>>({});

  // ── Focus trap ──────────────────────────────────────────────────────────────
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  // Reset form when a new template opens
  React.useEffect(() => {
    if (isOpen) {
      setValues({ email: "", organization: "", request: "" });
      setErrors({});
      setStatus("idle");
      setTouched({});
      // Move focus to close button on open
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    }
  }, [isOpen, template?.id]);

  // Body scroll lock
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Keyboard: Escape to close + focus trap
  React.useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first?.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (vals: FormValues): FormErrors => {
    const errs: FormErrors = {};
    if (!vals.email.trim()) errs.email = "Email address is required.";
    else if (!validateEmail(vals.email)) errs.email = "Please enter a valid email address.";
    if (!vals.request.trim()) errs.request = "Please describe your project or request.";
    else if (vals.request.trim().length < 20)
      errs.request = "Please provide a bit more detail (at least 20 characters).";
    return errs;
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field as keyof FormErrors] }));
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Clear error as user types if field was touched
    if (touched[field]) {
      const fieldErrors = validate(next);
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field as keyof FormErrors] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, request: true });
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    // Simulate API call (replace with real endpoint)
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  if (!template) return null;

  // ── Category badge color ────────────────────────────────────────────────────
  const badgeColor: Record<string, string> = {
    Grant: "bg-blue-500/20 text-blue-900 border-blue-300/40",
    Report: "bg-emerald-500/20 text-emerald-900 border-emerald-300/40",
    Donor: "bg-violet-500/20 text-violet-900 border-violet-300/40",
    Compliance: "bg-amber-500/20 text-amber-900 border-amber-300/40",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-50"
            style={{
              background: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* ── Centering wrapper (flex, NOT transform-based) ─────────────────── */}
          <div
            key="centering"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
          {/* ── Modal Panel ──────────────────────────────────────────────────── */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tpm-title"
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className={cn(
              // Sizing — no fixed/translate needed; parent flex handles centering
              "relative w-full max-w-5xl",
              "scrollbar-thin",
              "rounded-2xl",
              "pointer-events-auto",
            )}
            style={{
              background: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow:
                "0 32px 64px -12px rgba(15,23,42,0.35), 0 0 0 1px rgba(255,255,255,0.15) inset",
            }}
          >
            {/* ── Close button ───────────────────────────────────────────────── */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close preview modal"
              className={cn(
                "absolute right-4 top-4 z-10",
                "h-9 w-9 rounded-full flex items-center justify-center",
                "text-neutral-600 hover:text-neutral-900",
                "transition-all duration-150 hover:scale-110 focus-ring",
              )}
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <X className="h-4 w-4" />
            </button>

            {/* ── Inner grid: left | right ────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] items-stretch">

              {/* ── LEFT: Video + info ─────────────────────────────────────────── */}
              <div
                className="flex flex-col gap-4 p-6 lg:p-8 h-full"
                style={{
                  borderRight: "1px solid rgba(255,255,255,0.4)",
                }}
              >
                {/* Header: badge + title */}
                <div className="flex flex-col gap-2 pr-8 flex-shrink-0">
                  <span
                    className={cn(
                      "self-start text-xs font-semibold px-2.5 py-1 rounded-full border",
                      badgeColor[template.category] ?? "bg-neutral-100 text-neutral-700 border-neutral-200"
                    )}
                  >
                    {template.category}
                  </span>
                  <h2 id="tpm-title" className="text-xl font-bold text-neutral-900 leading-snug">
                    {template.title}
                  </h2>
                </div>

                {/* Video player — stretches to fill remaining height */}
                <div className="flex-1 min-h-0 w-full rounded-xl overflow-hidden">
                  <VideoPlayer
                    src={template.video}
                    poster={template.image}
                    title={template.title}
                  />
                </div>

              </div>

              {/* ── RIGHT: Request Form ────────────────────────────────────────── */}
              <div className="flex flex-col p-6 lg:p-8">
                {status === "success" ? (
                  // ── Success state ──────────────────────────────────────────────
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-5 text-center py-12"
                  >
                    <div
                      className="h-20 w-20 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #10B981, #2563EB)",
                      }}
                    >
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">
                        Request Received! 🎉
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
                        We&apos;ll review your request for{" "}
                        <span className="font-semibold text-primary-blue">{template.title}</span> and
                        reach out within 1 business day.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="mt-2 text-sm font-medium text-primary-blue hover:underline focus-ring rounded"
                    >
                      Close this window →
                    </button>
                  </motion.div>
                ) : (
                  // ── Form ──────────────────────────────────────────────────────
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5 h-full"
                    aria-label={`Request access to ${template.title}`}
                  >
                    {/* Form header */}
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 mb-1">
                        Request This Template
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Tell us about your project and we&apos;ll set you up in minutes.
                      </p>
                    </div>

                    {/* Email */}
                    <GlassField
                      label="Email Address"
                      id="tpm-email"
                      error={errors.email}
                      required
                    >
                      <input
                        id="tpm-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@organization.org"
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        aria-describedby={errors.email ? "tpm-email-error" : undefined}
                        aria-invalid={!!errors.email}
                        className={cn(glassInputCls, errors.email && glassInputErrCls)}
                        disabled={status === "loading"}
                      />
                    </GlassField>

                    {/* Organization (optional) */}
                    <GlassField label="Organization Name" id="tpm-org">
                      <input
                        id="tpm-org"
                        type="text"
                        autoComplete="organization"
                        placeholder="e.g. Community Health Foundation"
                        value={values.organization}
                        onChange={(e) => handleChange("organization", e.target.value)}
                        className={cn(glassInputCls)}
                        disabled={status === "loading"}
                      />
                    </GlassField>

                    {/* Project details */}
                    <GlassField
                      label="Project Details"
                      id="tpm-request"
                      error={errors.request}
                      required
                    >
                      <textarea
                        id="tpm-request"
                        rows={5}
                        placeholder={`Describe your project or use case for the ${template.title} template…`}
                        value={values.request}
                        onChange={(e) => handleChange("request", e.target.value)}
                        onBlur={() => handleBlur("request")}
                        aria-describedby={errors.request ? "tpm-request-error" : undefined}
                        aria-invalid={!!errors.request}
                        className={cn(
                          glassInputCls,
                          "resize-y min-h-[120px]",
                          errors.request && glassInputErrCls
                        )}
                        disabled={status === "loading"}
                      />
                      <span className="text-right text-[11px] text-neutral-400 -mt-1">
                        {values.request.length} chars
                      </span>
                    </GlassField>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={cn(
                        "relative w-full h-12 rounded-xl font-semibold text-sm text-white",
                        "flex items-center justify-center gap-2",
                        "transition-all duration-200 active:scale-[0.98]",
                        "focus-ring",
                        status === "loading"
                          ? "cursor-not-allowed opacity-80"
                          : "hover:-translate-y-0.5 hover:shadow-lg"
                      )}
                      style={{
                        background:
                          status === "loading"
                            ? "linear-gradient(135deg, #2563EB, #10B981)"
                            : "linear-gradient(135deg, #2563EB 0%, #059669 100%)",
                        boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)",
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Send Request
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-neutral-400 leading-relaxed">
                      By submitting, you agree to our{" "}
                      <a href="#" className="underline hover:text-primary-blue">
                        Terms
                      </a>{" "}
                      &amp;{" "}
                      <a href="#" className="underline hover:text-primary-blue">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}


