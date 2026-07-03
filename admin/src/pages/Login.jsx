import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import kureLogo from "@/assets/img/logo/logo.png";

const Login = () => {
  const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0a2d52 0%, #0F4C81 50%, #1a6cb5 100%)" }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Ambient blobs */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-blue-400/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 -left-20 w-64 h-64 bg-[#C1272D]/15 rounded-full blur-[80px]" />

        {/* Top: Logo */}
        <div className="relative z-10 px-10 pt-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 inline-block border border-white/20">
            <img src={kureLogo} alt="Kure Pharma" className="h-12 w-auto object-contain" />
          </div>
        </div>

        {/* Center: Tagline */}
        <div className="relative z-10 px-10">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C1272D]/20 border border-[#C1272D]/40 text-red-300 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Admin Portal
            </span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Manage Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">
              Pharma Business
            </span>
          </h1>
          <p className="text-blue-200 text-sm leading-relaxed font-medium max-w-xs">
            Kure Pharma's centralised admin panel for managing enquiries, products, orders, and business operations.
          </p>

          {/* Trust badges */}
          <div className="mt-8 space-y-3">
            {[
              "Enquiry & Lead Management",
              "Products & Catalog Control",
              "Orders & Shipment Tracking",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C1272D]/30 border border-[#C1272D]/50 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                </div>
                <span className="text-blue-100 text-xs font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Footer text */}
        <div className="relative z-10 px-10 pb-8">
          <p className="text-blue-300/60 text-[11px] font-medium">
            © {new Date().getFullYear()} Kure Pharma · All Rights Reserved
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-50 px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <img src={kureLogo} alt="Kure Pharma" className="h-12 w-auto object-contain mx-auto" />
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-1.5 font-medium">
              Sign in to your admin account
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0F4C81]/30 focus-within:border-[#0F4C81] transition overflow-hidden">
                  <div className="pl-4 pr-2 text-gray-400 flex items-center justify-center shrink-0">
                    <FiMail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    autoComplete="username"
                    className="w-full pr-4 py-3.5 bg-transparent text-sm font-medium focus:outline-none text-gray-900"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative flex items-center rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0F4C81]/30 focus-within:border-[#0F4C81] transition overflow-hidden">
                  <div className="pl-4 pr-2 text-gray-400 flex items-center justify-center shrink-0">
                    <FiLock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="w-full pr-12 py-3.5 bg-transparent text-sm font-medium focus:outline-none text-gray-900"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-[#0F4C81] text-xs font-bold hover:underline transition"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F4C81] hover:bg-[#0a3460] text-white font-black text-sm py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </form>

            {/* Trust note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
              <FiShield className="w-3.5 h-3.5 text-[#0F4C81]" />
              Secure admin access · Kure Pharma
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
